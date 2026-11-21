import { Fragment, useEffect, useId, useRef, useState } from 'react'
import type { CodeQuestion as Question } from '../data/types'
import { blankState, readExplainCode, storeExplainCode } from '../lib/practice'
import { isMobileLayout } from '../lib/viewport'

interface Props {
  question: Question; answers: Record<string, string>; onChange: (id: string, value: string) => void
  locked?: boolean; results?: Record<string, boolean>; submitId?: string; feedback?: boolean
  mode?: 'practice' | 'mock'; revealed?: string[]; onReveal?: (ids: string[]) => void; onComplete?: () => void
}
function Eye({ open }: { open: boolean }) {
  return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>{open && <path d="m3 3 18 18"/>}</svg>
}
export function CodeQuestion({ question, answers, onChange, locked, results, submitId = 'practice-submit', feedback = false, mode = 'practice', revealed = [], onReveal, onComplete }: Props) {
  const container = useRef<HTMLDivElement>(null)
  const source = useRef<HTMLDivElement>(null)
  const inputs = useRef<Record<string, HTMLInputElement | null>>({})
  const chips = useRef<Record<string, HTMLButtonElement | null>>({})
  const uid = useId()
  const [active, setActive] = useState<string | null>(null)
  const [visible, setVisible] = useState<string[]>([])
  const [explain, setExplain] = useState(() => mode === 'mock' ? false : readExplainCode())
  const [settled, setSettled] = useState(answers)
  const [jump, setJump] = useState('program')
  const completeCallback = useRef(onComplete)
  const completionSent = useRef(false)
  completeCallback.current = onComplete
  useEffect(() => { const timer = window.setTimeout(() => setSettled(answers), 180); return () => clearTimeout(timer) }, [answers])
  const blanks = question.type === 'blanks'
  const allVisible = question.blanks.length > 0 && question.blanks.every(blank => visible.includes(blank.id))
  function toggleReveal(ids: string[], hide: boolean) {
    if (mode !== 'practice' || locked) return
    if (!hide) onReveal?.(ids)
    setVisible(values => hide ? values.filter(id => !ids.includes(id)) : [...new Set([...values, ...ids])])
  }
  const states = Object.fromEntries(question.blanks.map(blank => [blank.id, mode === 'mock' && !locked ? 'neutral' : revealed.includes(blank.id) ? 'revealed' : results ? results[blank.id] ? 'correct' : 'wrong' : blankState(blank.accepted, settled[blank.id] || '')]))
  const correct = Object.values(states).filter(state => state === 'correct').length
  useEffect(() => {
    if (blanks && mode === 'practice' && !locked && !completionSent.current && settled === answers && correct === question.blanks.length && correct > 0) { completionSent.current = true; completeCallback.current?.() }
  }, [answers, settled, correct, blanks, locked, mode, question.blanks.length])
  function highlight(id: string) {
    setActive(id)
    // Scroll only the source viewport, leaving the page and keyboard focus in place.
    const chip = chips.current[id], viewport = source.current
    if (chip && viewport) {
      const c = chip.getBoundingClientRect(), v = viewport.getBoundingClientRect()
      if (c.left < v.left + 48 || c.right > v.right - 16) viewport.scrollLeft += c.left - v.left - 64
      if (c.top < v.top + 16 || c.bottom > v.bottom - 16) viewport.scrollTop += c.top - v.top - 48
    }
  }
  function focusInput(id: string) {
    const input = inputs.current[id]
    if (!input) return
    input.focus({ preventScroll: true })
    if (isMobileLayout()) input.scrollIntoView({ block: 'center' })
    else {
      const pane = input.closest<HTMLElement>('.answer-window')
      if (pane) {
        const field = input.getBoundingClientRect(), bounds = pane.getBoundingClientRect()
        if (field.top < bounds.top + 48 || field.bottom > bounds.bottom - 16) pane.scrollTop += field.top - bounds.top - 80
      }
    }
  }
  function goTo(pane: 'program' | 'answers') {
    setJump(pane)
    container.current?.querySelector<HTMLElement>(pane === 'program' ? '.program-window' : '.answer-window')?.scrollIntoView({ block: 'start' })
  }
  const lines = question.code.split('\n')
  return <div ref={container} className={`question-editor${blanks ? ' two-pane' : ''}${feedback ? ' feedback-live' : ''}`}>
    {blanks && <div className="pane-jump" role="group" aria-label="Jump within question"><button type="button" aria-pressed={jump === 'program'} onClick={() => goTo('program')}>Program</button><button type="button" aria-pressed={jump === 'answers'} onClick={() => goTo('answers')}>Answers <span className="small">· 10</span></button></div>}
    <div className="program-column"><section className="code-editor program-window" aria-label="Program window">
      <div className="editor-top"><div className="window-title"><strong>Program</strong><span>{blanks ? 'complete.c' : 'predict.c'} · C11</span></div>{blanks && <button type="button" className="explain-switch" role="switch" aria-checked={explain} onClick={() => { setExplain(value => !value); if (mode !== 'mock') storeExplainCode(!explain) }}><span className="switch-track" aria-hidden="true"><span/></span>Explain code</button>}</div>
      <div ref={source} className="code-scroll" tabIndex={0} role="region" aria-label="C program, scroll horizontally for long lines"><div className="code-lines">{lines.map((line, index) => <Fragment key={index}>
        {explain && question.explanations?.filter(comment => comment.line === index + 1).map((comment, i) => <div className="code-line code-comment" key={`comment-${i}`}><span className="line-number" aria-hidden="true"/><code>{line.match(/^\s*/)?.[0]}// {comment.text}</code></div>)}
        <div className="code-line"><span className="line-number" aria-hidden="true">{index + 1}</span><code>{line.split(/(__[A-Z]__)/g).map((part, i) => {
          const match = /^__([A-Z])__$/.exec(part)
          if (!match) return <span key={i}>{part}</span>
          const id = match[1], number = question.blanks.findIndex(blank => blank.id === id) + 1
          const blank = question.blanks[number - 1]
          const showing = mode === 'practice' && visible.includes(id)
          const filled = showing ? 'revealed' : states[id] === 'correct' && (!!results || blankState(blank.accepted, answers[id] || '') === 'correct') ? 'correct' : null
          const value = showing ? blank.accepted[0] : answers[id]
          return <button key={i} ref={element => { chips.current[id] = element }} type="button" className={`program-blank${filled ? ` program-answer is-${filled}` : ''}${active === id ? ' is-active' : ''}`} aria-label={filled ? `Blank ${number}, ${filled}: ${value}` : `Blank ${number}, go to answer`} onMouseEnter={() => setActive(id)} onMouseLeave={() => setActive(null)} onFocus={() => setActive(id)} onBlur={() => setActive(null)} onClick={() => focusInput(id)}>{filled ? <>{showing ? <Eye open={false}/> : <span className="program-answer-check" aria-hidden="true">✓</span>}<span>{value}</span></> : `_________Blank${number}_________`}</button>
        })}</code></div>
      </Fragment>)}</div></div>
      <div className="editor-bottom"><span>{lines.length} lines{explain ? ' · explanations on' : ''}</span><span>{blanks ? 'Select a blank to write its answer.' : 'Read first. Trace one statement at a time.'}</span></div>
    </section>
    {blanks && <section className="expected-output" aria-label="Expected output">
      {(question.brief?.sample?.input ?? question.stdin) && <div><h3>Sample input</h3><pre>{question.brief?.sample?.input ?? question.stdin}</pre></div>}
      <h3>Expected output</h3><pre>{question.expectedOutput ?? question.brief?.sample?.output ?? 'No defined output: this source program has undefined signed overflow. See the source caveat.'}{(question.expectedOutput ?? question.brief?.sample?.output) === '' ? '(no standard output; see output files)' : ''}</pre>
    </section>}</div>
    {blanks && <section className="answer-window" aria-label="Answer window">
      <div className="answer-window-head"><div className="window-title"><h3>Answers <span className="answer-count">10 blanks</span></h3><span>{mode === 'mock' && !locked ? 'Feedback after submission' : locked ? 'Your marked attempt' : 'One expression at a time'}</span></div>{mode === 'practice' && !locked && <button type="button" className="reveal-all" aria-pressed={allVisible} onClick={() => toggleReveal(question.blanks.map(blank => blank.id), allVisible)}><Eye open={allVisible}/>{allVisible ? 'Hide all' : 'Reveal all'}</button>}</div>
      <p id={`${uid}-help`} className="answer-help">{mode === 'mock' && !locked ? 'Enter moves to the next blank. Your work is saved.' : locked ? 'Review the correct answers and explanations below.' : 'Enter moves to the next blank. The eye reveals a key and gives up its mark.'}</p>
      {mode !== 'mock' && <p className="answer-summary" role="status" aria-live="polite" aria-atomic="true">{correct} of 10 correct{revealed.length ? ` · ${revealed.length} revealed` : ''}</p>}
      <div className="blank-fields">{question.blanks.map((blank, index) => {
        const number = index + 1, showing = visible.includes(blank.id), state = states[blank.id]
        const status = state === 'correct' ? 'Correct' : state === 'wrong' ? locked ? 'Answer differs; review marked answers below' : 'Not yet correct' : state === 'revealed' ? 'Revealed · no mark' : ''
        return <div key={blank.id} className={`blank-field is-${state}${active === blank.id ? ' is-active' : ''}`} onMouseEnter={() => setActive(blank.id)} onMouseLeave={() => setActive(null)}>
          <div className="field-label"><label htmlFor={`${uid}-${blank.id}`}>Blank {number}</label><span id={`${uid}-${blank.id}-state`} className="field-state">{status}</span></div>
          <div className="answer-input-wrap"><input ref={element => { inputs.current[blank.id] = element }} id={`${uid}-${blank.id}`} data-blank={blank.id} type="text" autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck={false} readOnly={locked || showing} value={showing ? blank.accepted[0] : answers[blank.id] || ''} aria-describedby={`${uid}-help ${uid}-${blank.id}-state`} aria-invalid={state === 'wrong' ? true : undefined} onFocus={event => { highlight(blank.id); if (isMobileLayout()) window.setTimeout(() => event.target.isConnected && document.activeElement === event.target && event.target.scrollIntoView({ block: 'center' }), 250) }} onBlur={() => setActive(null)} onChange={event => onChange(blank.id, event.target.value)} onKeyDown={event => {
            if (event.key !== 'Enter' || locked) return
            event.preventDefault()
            const next = question.blanks[index + 1]
            if (next) focusInput(next.id); else document.getElementById(submitId)?.focus()
          }}/>{(state === 'correct' || state === 'wrong') && <span className="field-verdict" aria-hidden="true">{state === 'correct' ? '✓' : '✗'}</span>}{mode === 'practice' && !locked && <button type="button" className="reveal-answer" aria-label={showing ? `Hide answer for Blank ${number}` : `Reveal answer for Blank ${number}`} aria-pressed={showing} onFocus={() => highlight(blank.id)} onClick={() => toggleReveal([blank.id], showing)}><Eye open={showing}/></button>}</div>
        </div>
      })}</div>
    </section>}
  </div>
}
