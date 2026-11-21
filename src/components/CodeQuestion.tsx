import { memo, useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties, MouseEvent } from 'react'
import { createPortal } from 'react-dom'
import type { CodeQuestion as Question } from '../data/types'
import { storeAnswerMode, useAnswerMode } from '../lib/answerMode'
import { countRender } from '../lib/perf'
import { blankState, readExplainCode, storeExplainCode } from '../lib/practice'
import { isMobileLayout, prefersReducedMotion, useIsMobile } from '../lib/viewport'

interface Props {
  question: Question; answers: Record<string, string>; onChange: (id: string, value: string) => void
  locked?: boolean; results?: Record<string, boolean>; submitId?: string; feedback?: boolean
  mode?: 'practice' | 'mock'; revealed?: string[]; onReveal?: (ids: string[]) => void; onComplete?: () => void
}
type State = 'neutral' | 'wrong' | 'correct' | 'revealed'
// Everything one blank needs to draw itself. Views are cached by value so an unchanged blank keeps the
// same object and its line is skipped by React.memo while the student types elsewhere.
interface BlankView { id: string; number: number; value: string; state: State; showing: boolean; filled: 'correct' | 'revealed' | null; active: boolean; chars: number }
type Part = string | { blank: string }
interface ParsedLine { indent: number; parts: Part[]; ids: string[] }
interface Handlers {
  uid: string
  change(id: string, value: string): void; focus(id: string): void; blur(): void; enter(id: string): void
  chip(id: string): void; hover(id: string | null): void; note(line: number): void; reveal(id: string): void
  setInput(id: string, element: HTMLInputElement | null): void; setChip(id: string, element: HTMLButtonElement | null): void
}

function Eye({ open, size = 20 }: { open: boolean; size?: number }) {
  return <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>{open && <path d="m3 3 18 18"/>}</svg>
}
function parseCode(code: string): ParsedLine[] {
  return code.split('\n').map(text => ({
    indent: text.length - text.trimStart().length,
    parts: text.split(/(__[A-Z]__)/g).filter(Boolean).map(part => { const match = /^__([A-Z])__$/.exec(part); return match ? { blank: match[1] } : part }),
    ids: [...text.matchAll(/__([A-Z])__/g)].map(match => match[1]),
  }))
}
const statusText = (state: State, locked?: boolean) => state === 'correct' ? 'Correct' : state === 'wrong' ? locked ? 'Answer differs; review marked answers below' : 'Not yet correct' : state === 'revealed' ? 'Revealed · no mark' : ''

// ---- One program line (memoised): typing in a blank re-renders only that blank's line. ----
interface LineProps { n: number; line: ParsedLine; views: BlankView[]; note?: string; noteOpen: boolean; inline: boolean; locked: boolean; total: number; h: Handlers }
const sameLine = (a: LineProps, b: LineProps) => a.n === b.n && a.line === b.line && a.note === b.note && a.noteOpen === b.noteOpen && a.inline === b.inline && a.locked === b.locked && a.h === b.h && a.views.length === b.views.length && a.views.every((view, i) => view === b.views[i])
const CodeLine = memo(function CodeLine({ n, line, views, note, noteOpen, inline, locked, total, h }: LineProps) {
  countRender('CodeLine')
  return <>
    <div className={`code-line${note ? ' has-note' : ''}`}>
      <span className="line-gutter"><span className="line-number" aria-hidden="true">{n}</span>{note && <button type="button" className="line-marker" aria-expanded={noteOpen} aria-label={`Explain line ${n}`} onClick={() => h.note(n)}><span aria-hidden="true">{noteOpen ? '−' : '+'}</span></button>}</span>
      <code style={{ '--ind': line.indent + 2 } as CSSProperties}>{line.parts.map((part, i) => {
        if (typeof part === 'string') return part
        const view = views.find(candidate => candidate.id === part.blank)
        if (!view) return null
        return inline ? <InlineInput key={i} view={view} locked={locked} total={total} h={h}/> : <Chip key={i} view={view} h={h}/>
      })}</code>
    </div>
    {note && noteOpen && <div className="code-line code-comment" style={{ '--ind': line.indent } as CSSProperties}><span className="line-gutter" aria-hidden="true"/><span className="note-indent" aria-hidden="true"/><p className="code-note">{note}</p></div>}
  </>
}, sameLine)

function Chip({ view, h }: { view: BlankView; h: Handlers }) {
  const { id, number, value, filled, active } = view
  return <button ref={element => h.setChip(id, element)} type="button" className={`program-blank${filled ? ` program-answer is-${filled}` : ''}${active ? ' is-active' : ''}`} aria-label={filled ? `Blank ${number}, ${filled}: ${value}` : `Blank ${number}, go to answer`} onMouseEnter={() => h.hover(id)} onMouseLeave={() => h.hover(null)} onFocus={() => h.hover(id)} onBlur={() => h.hover(null)} onClick={() => h.chip(id)}>{filled ? <>{filled === 'revealed' ? <Eye open={false}/> : <span className="program-answer-check" aria-hidden="true">✓</span>}<span>{value}</span></> : `_________Blank${number}_________`}</button>
}
function InlineInput({ view, locked, total, h }: { view: BlankView; locked: boolean; total: number; h: Handlers }) {
  const { id, number, value, state, showing, chars } = view
  const last = number === total
  return <span className={`ib is-${state}${showing ? ' is-showing' : ''}`}>
    <input ref={element => h.setInput(id, element)} data-blank={id} type="text" inputMode="text" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false} enterKeyHint={last ? 'done' : 'next'} placeholder={String(number)} readOnly={locked || showing} value={value} style={{ '--chars': chars } as CSSProperties} aria-label={`Blank ${number} of ${total}`} aria-describedby={`${h.uid}-${id}-state`} aria-invalid={state === 'wrong' ? true : undefined}
      onFocus={() => h.focus(id)} onBlur={() => h.blur()} onChange={event => h.change(id, event.target.value)} onKeyDown={event => { if (event.key !== 'Enter' || locked) return; event.preventDefault(); h.enter(id) }}/>
    <span className="ib-icon" aria-hidden="true">{showing ? <Eye open={false} size={16}/> : state === 'correct' ? '✓' : state === 'wrong' ? '✗' : ''}</span>
    <span id={`${h.uid}-${id}-state`} className="sr-only">{statusText(state, locked)}</span>
  </span>
}

// ---- Side-panel field (memoised). ----
const AnswerField = memo(function AnswerField({ view, locked, canReveal, total, h }: { view: BlankView; locked: boolean; canReveal: boolean; total: number; h: Handlers }) {
  countRender('AnswerField')
  const { id, number, value, state, showing, active } = view
  return <div className={`blank-field is-${state}${active ? ' is-active' : ''}`} onMouseEnter={() => h.hover(id)} onMouseLeave={() => h.hover(null)}>
    <div className="field-label"><label htmlFor={`${h.uid}-${id}`}>Blank {number}</label><span id={`${h.uid}-${id}-state`} className="field-state">{statusText(state, locked)}</span></div>
    <div className="answer-input-wrap"><input ref={element => h.setInput(id, element)} id={`${h.uid}-${id}`} data-blank={id} type="text" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false} enterKeyHint={number === total ? 'done' : 'next'} readOnly={locked || showing} value={value} aria-describedby={`${h.uid}-help ${h.uid}-${id}-state`} aria-invalid={state === 'wrong' ? true : undefined} onFocus={() => h.focus(id)} onBlur={() => h.blur()} onChange={event => h.change(id, event.target.value)} onKeyDown={event => { if (event.key !== 'Enter' || locked) return; event.preventDefault(); h.enter(id) }}/>{(state === 'correct' || state === 'wrong') && <span className="field-verdict" aria-hidden="true">{state === 'correct' ? '✓' : '✗'}</span>}{canReveal && <button type="button" className="reveal-answer" aria-label={showing ? `Hide answer for Blank ${number}` : `Reveal answer for Blank ${number}`} aria-pressed={showing} onFocus={() => h.hover(id)} onClick={() => h.reveal(id)}><Eye open={showing}/></button>}</div>
  </div>
})

// ---- Expected output: compact, folded on phones with a one-line preview. ----
const ExpectedOutput = memo(function ExpectedOutput({ input, output }: { input?: string; output: string }) {
  const mobile = useIsMobile()
  const [chosen, setChosen] = useState<boolean | null>(null)
  const first = output.split('\n').find(line => line.trim()) ?? ''
  const rows = output.replace(/\n$/, '').split('\n').length
  return <section className="expected-output" aria-label="Expected output">
    <details open={chosen ?? !mobile} onToggle={event => setChosen(event.currentTarget.open)}>
      <summary><h3>Expected output</h3><code className="out-preview">{first || '(empty)'}{rows > 1 ? ' …' : ''}</code></summary>
      {input && <div><h4>Sample input</h4><pre>{input}</pre></div>}
      <pre>{output}</pre>
    </details>
  </section>
})

// ---- Keyboard accessory toolbar, pinned above the on-screen keyboard (visual viewport). ----
function KeyboardBar({ number, total, canReveal, showing, onPrev, onNext, onReveal, onDone }: { number: number; total: number; canReveal: boolean; showing: boolean; onPrev: () => void; onNext: () => void; onReveal: () => void; onDone: () => void }) {
  const bar = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const element = bar.current, viewport = window.visualViewport
    if (!element) return
    let frame = 0
    const place = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(() => { element.style.bottom = `${viewport ? Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop) : 0}px` }) }
    place()
    viewport?.addEventListener('resize', place); viewport?.addEventListener('scroll', place)
    return () => { cancelAnimationFrame(frame); viewport?.removeEventListener('resize', place); viewport?.removeEventListener('scroll', place) }
  }, [])
  // Pressing a toolbar button must not steal focus from the blank (that would close the keyboard).
  const keep = (event: MouseEvent) => event.preventDefault()
  return createPortal(<div ref={bar} className="kbd-bar" role="toolbar" aria-label="Move between blanks">
    <span className="kbd-count"><strong>Blank {number}</strong> of {total}</span>
    <button type="button" className="kbd-btn" aria-label="Previous blank" disabled={number === 1} onMouseDown={keep} onClick={onPrev}><span aria-hidden="true">‹</span> Prev</button>
    <button type="button" className="kbd-btn" aria-label={number === total ? 'Finish, go to Check' : 'Next blank'} onMouseDown={keep} onClick={onNext}>{number === total ? 'Check' : 'Next'} <span aria-hidden="true">›</span></button>
    {canReveal && <button type="button" className="kbd-btn kbd-icon" aria-label={showing ? `Hide answer for Blank ${number}` : `Reveal answer for Blank ${number}`} aria-pressed={showing} onMouseDown={keep} onClick={onReveal}><Eye open={showing}/></button>}
    <button type="button" className="kbd-btn kbd-done" onMouseDown={keep} onClick={onDone}>Done</button>
  </div>, document.body)
}

// The practice question bar owns a slot for the score, so the summary needs no extra block on phones.
function useSlot(id: string) {
  const [slot, setSlot] = useState<HTMLElement | null>(null)
  useLayoutEffect(() => { setSlot(document.getElementById(id)) }, [id])
  return slot
}
// Bring a field into the visible part of the page (below sticky bars, above the keyboard) only if it is not already there.
function ensureVisible(input: HTMLElement, reserveBottom: number) {
  const viewport = window.visualViewport
  const scroller = isMobileLayout() ? null : document.querySelector<HTMLElement>('.workspace')
  const frame = scroller?.getBoundingClientRect()
  const top = Math.max(frame?.top ?? 0, ...(scroller ? ['.question-bar', '.exam-toolbar'] : ['.sidebar', '.question-bar', '.exam-toolbar']).map(selector => { const el = document.querySelector(selector); return el && getComputedStyle(el).position === 'sticky' ? el.getBoundingClientRect().bottom : 0 })) + 8
  const bottom = Math.min(frame?.bottom ?? Infinity, viewport ? viewport.offsetTop + viewport.height : window.innerHeight) - reserveBottom - 8
  const rect = input.getBoundingClientRect()
  if (rect.top >= top && rect.bottom <= bottom) return
  const delta = rect.top - (top + (bottom - top) / 2 - rect.height / 2)
  const options: ScrollToOptions = { top: delta, behavior: prefersReducedMotion() ? 'auto' : 'smooth' }
  if (scroller) scroller.scrollBy(options); else window.scrollBy(options)
}

export function CodeQuestion({ question, answers, onChange, locked, results, submitId = 'practice-submit', feedback = false, mode = 'practice', revealed = [], onReveal, onComplete }: Props) {
  countRender('CodeQuestion')
  const container = useRef<HTMLDivElement>(null)
  const inputs = useRef<Record<string, HTMLInputElement | null>>({})
  const chips = useRef<Record<string, HTMLButtonElement | null>>({})
  const uid = useId()
  const { mode: answerMode, narrow, keyboard } = useAnswerMode()
  const blanks = question.type === 'blanks'
  const inline = blanks && answerMode === 'inline'
  const total = question.blanks.length
  const [active, setActive] = useState<string | null>(null)
  const [focusId, setFocusId] = useState<string | null>(null)
  const [visible, setVisible] = useState<string[]>([])
  const [explain, setExplain] = useState(() => mode === 'mock' ? false : readExplainCode())
  const [notes, setNotes] = useState<Record<number, boolean>>({})
  const [settled, setSettled] = useState(answers)
  const completeCallback = useRef(onComplete)
  const completionSent = useRef(false)
  completeCallback.current = onComplete
  // Validation feedback follows typing by a short pause; the field itself is always instant.
  useEffect(() => { const timer = window.setTimeout(() => setSettled(answers), 150); return () => clearTimeout(timer) }, [answers])
  const lines = useMemo(() => parseCode(question.code), [question.code])
  const explanations = useMemo(() => {
    const byLine = new Map<number, string>()
    for (const item of question.explanations ?? []) byLine.set(item.line, byLine.has(item.line) ? `${byLine.get(item.line)} ${item.text}` : item.text)
    return byLine
  }, [question.explanations])
  const allVisible = total > 0 && question.blanks.every(blank => visible.includes(blank.id))
  function toggleReveal(ids: string[], hide: boolean) {
    if (mode !== 'practice' || locked) return
    if (!hide) onReveal?.(ids)
    setVisible(values => hide ? values.filter(id => !ids.includes(id)) : [...new Set([...values, ...ids])])
  }

  // Per-blank views, cached so unchanged blanks keep their identity.
  const cache = useRef(new Map<string, BlankView>())
  const views: Record<string, BlankView> = {}
  let correct = 0
  question.blanks.forEach((blank, index) => {
    const showing = mode === 'practice' && visible.includes(blank.id)
    let state: State = mode === 'mock' && !locked ? 'neutral' : revealed.includes(blank.id) ? 'revealed' : results ? results[blank.id] ? 'correct' : 'wrong' : blankState(blank.accepted, settled[blank.id] || '') as State
    // While the student is still typing, never show a stale green mark.
    if (state === 'correct' && !results && blankState(blank.accepted, answers[blank.id] || '') !== 'correct') state = 'neutral'
    if (state === 'correct') correct++
    const next: BlankView = { id: blank.id, number: index + 1, value: showing ? blank.accepted[0] : answers[blank.id] || '', state, showing, filled: showing ? 'revealed' : state === 'correct' ? 'correct' : null, active: !inline && active === blank.id, chars: Math.min(40, Math.max(6, ...blank.accepted.map(answer => answer.length)) + 1) }
    const old = cache.current.get(blank.id)
    views[blank.id] = old && old.value === next.value && old.state === next.state && old.showing === next.showing && old.filled === next.filled && old.active === next.active && old.chars === next.chars && old.number === next.number ? old : (cache.current.set(blank.id, next), next)
  })
  useEffect(() => {
    if (blanks && mode === 'practice' && !locked && !completionSent.current && settled === answers && correct === total && correct > 0) { completionSent.current = true; completeCallback.current?.() }
  }, [answers, settled, correct, blanks, locked, mode, total])

  // ---- Focus and scrolling (only when a field is actually off-screen). ----
  const keyboardBar = inline && keyboard && !locked
  const barHeight = () => keyboardBar ? document.querySelector('.kbd-bar')?.getBoundingClientRect().height ?? 56 : 0
  function focusInput(id: string) {
    const input = inputs.current[id]
    if (!input) return
    input.focus({ preventScroll: true })
    if (inline) { ensureVisible(input, barHeight()); return }
    const pane = input.closest<HTMLElement>('.answer-window')
    if (pane) {
      const field = input.getBoundingClientRect(), bounds = pane.getBoundingClientRect()
      if (field.top < bounds.top + 48 || field.bottom > bounds.bottom - 16) pane.scrollTop += field.top - bounds.top - 80
    }
  }
  function goNext(id: string) {
    const next = question.blanks[question.blanks.findIndex(blank => blank.id === id) + 1]
    if (next) focusInput(next.id); else document.getElementById(submitId)?.focus()
  }
  const latest = useRef<Handlers>(null as unknown as Handlers)
  latest.current = {
    uid, change: onChange,
    focus(id) {
      setFocusId(id); setActive(id)
      const input = inputs.current[id]
      if (inline && input) requestAnimationFrame(() => document.activeElement === input && ensureVisible(input, barHeight()))
      if (!inline) {
        // Keep the program line for this blank in view while its answer is being written.
        const chip = chips.current[id]
        if (chip) { const rect = chip.getBoundingClientRect(); if (rect.bottom < 0 || rect.top > window.innerHeight) chip.scrollIntoView({ block: 'center', behavior: prefersReducedMotion() ? 'auto' : 'smooth' }) }
      }
    },
    blur() {
      setActive(null)
      requestAnimationFrame(() => { const now = document.activeElement; if (!(now instanceof HTMLInputElement && now.dataset.blank && container.current?.contains(now))) setFocusId(null) })
    },
    enter: goNext, chip: focusInput, hover: setActive,
    note: line => setNotes(current => ({ ...current, [line]: !(current[line] ?? explain) })),
    reveal: id => toggleReveal([id], visible.includes(id)),
    setInput(id, element) { inputs.current[id] = element }, setChip(id, element) { chips.current[id] = element },
  }
  const h = useMemo<Handlers>(() => ({
    uid,
    change: (id, value) => latest.current.change(id, value), focus: id => latest.current.focus(id), blur: () => latest.current.blur(), enter: id => latest.current.enter(id),
    chip: id => latest.current.chip(id), hover: id => latest.current.hover(id), note: line => latest.current.note(line), reveal: id => latest.current.reveal(id),
    setInput: (id, element) => latest.current.setInput(id, element), setChip: (id, element) => latest.current.setChip(id, element),
  }), [uid])

  // Keyboard toolbar: keep the focused blank clear of it when the keyboard opens, and leave room under the last line.
  useEffect(() => {
    if (!focusId || !keyboardBar) return
    document.documentElement.setAttribute('data-bar', '')
    const viewport = window.visualViewport
    const settle = () => { const input = inputs.current[focusId]; if (input && document.activeElement === input) ensureVisible(input, barHeight()) }
    viewport?.addEventListener('resize', settle)
    return () => { document.documentElement.removeAttribute('data-bar'); viewport?.removeEventListener('resize', settle) }
  }, [focusId, keyboardBar])

  const slot = useSlot('question-score-slot')
  const focusIndex = focusId ? question.blanks.findIndex(blank => blank.id === focusId) : -1
  const focusView = focusIndex >= 0 ? views[focusId!] : null
  const canReveal = mode === 'practice' && !locked
  const outputText = question.expectedOutput ?? question.brief?.sample?.output
  const summary = `${correct} of ${total} correct${revealed.length ? ` · ${revealed.length} revealed` : ''}`
  return <div ref={container} className={`question-editor${blanks ? ' two-pane' : ''}${inline ? ' is-inline' : ''}${feedback ? ' feedback-live' : ''}`}>
    <div className="program-column"><section className="code-editor program-window" aria-label="Program window">
      <div className="editor-top"><div className="window-title"><strong>Program</strong><span>{blanks ? 'complete.c' : 'predict.c'} · C11</span></div>
        <div className="editor-controls">
          {blanks && !narrow && <div className="mode-toggle" role="group" aria-label="Where to type answers"><span className="mode-label" aria-hidden="true">Answer</span><button type="button" aria-pressed={!inline} onClick={() => storeAnswerMode('side')}>Side panel</button><button type="button" aria-pressed={inline} onClick={() => storeAnswerMode('inline')}>Inline</button></div>}
          {blanks && <button type="button" className="explain-switch" role="switch" aria-checked={explain} onClick={() => { setExplain(value => !value); setNotes({}); if (mode !== 'mock') storeExplainCode(!explain) }}><span className="switch-track" aria-hidden="true"><span/></span>Explain code</button>}
        </div>
      </div>
      <div className="code-lines" role="group" aria-label="C program">{lines.map((line, index) => <CodeLine key={index} n={index + 1} line={line} views={line.ids.map(id => views[id])} note={explanations.get(index + 1)} noteOpen={notes[index + 1] ?? explain} inline={inline} locked={!!locked} total={total} h={h}/>)}</div>
      <div className="editor-bottom"><span>{lines.length} lines{explain ? ' · explanations on' : ''}</span>
        {inline ? <span className="editor-bottom-actions">{mode === 'practice' && !slot && <span className="inline-summary">{summary}</span>}{canReveal && <button type="button" className="reveal-all" aria-pressed={allVisible} onClick={() => toggleReveal(question.blanks.map(blank => blank.id), allVisible)}><Eye open={allVisible}/>{allVisible ? 'Hide all' : 'Reveal all'}</button>}</span>
          : <span>{blanks ? 'Select a blank to write its answer.' : 'Read first. Trace one statement at a time.'}</span>}
      </div>
    </section>
    {blanks && <ExpectedOutput input={question.brief?.sample?.input ?? question.stdin} output={`${outputText ?? 'No defined output: this source program has undefined signed overflow. See the source caveat.'}${outputText === '' ? '(no standard output; see output files)' : ''}`}/>}</div>
    {blanks && !inline && <section className="answer-window" aria-label="Answer window">
      <div className="answer-window-head"><div className="window-title"><h3>Answers <span className="answer-count">10 blanks</span></h3><span>{mode === 'mock' && !locked ? 'Feedback after submission' : locked ? 'Your marked attempt' : 'One expression at a time'}</span></div>{canReveal && <button type="button" className="reveal-all" aria-pressed={allVisible} onClick={() => toggleReveal(question.blanks.map(blank => blank.id), allVisible)}><Eye open={allVisible}/>{allVisible ? 'Hide all' : 'Reveal all'}</button>}</div>
      <p id={`${uid}-help`} className="answer-help">{mode === 'mock' && !locked ? 'Enter moves to the next blank. Your work is saved.' : locked ? 'Review the correct answers and explanations below.' : 'Enter moves to the next blank. The eye reveals a key and gives up its mark.'}</p>
      {mode !== 'mock' && <p className="answer-summary" role="status" aria-live="polite" aria-atomic="true">{summary}</p>}
      <div className="blank-fields">{question.blanks.map(blank => <AnswerField key={blank.id} view={views[blank.id]} locked={!!locked} canReveal={canReveal} total={total} h={h}/>)}</div>
    </section>}
    {inline && mode === 'practice' && <p className="sr-only" role="status">{summary}</p>}
    {inline && mode === 'practice' && slot && createPortal(<span aria-hidden="true">{correct}/{total} correct{revealed.length ? ` · ${revealed.length} revealed` : ''}</span>, slot)}
    {keyboardBar && focusView && <KeyboardBar number={focusView.number} total={total} canReveal={canReveal} showing={focusView.showing} onPrev={() => focusInput(question.blanks[focusIndex - 1].id)} onNext={() => goNext(focusId!)} onReveal={() => toggleReveal([focusId!], focusView.showing)} onDone={() => { inputs.current[focusId!]?.blur(); setFocusId(null) }}/>}
  </div>
}
