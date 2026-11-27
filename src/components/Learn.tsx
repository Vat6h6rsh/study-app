import { useEffect, useRef, useState } from 'react'
import type { MouseEvent, ReactNode } from 'react'
import { concepts as itpConcepts, wpConcepts, dmConcepts } from '../data/concepts'
import { conceptExamples } from '../lib/concepts'
import { StudyLink } from './StudyLink'
import { topicTone } from '../topicColors'
import { Sheet } from './Sheet'
import { prefersReducedMotion, useIsMobile } from '../lib/viewport'

// A deliberately small Markdown subset for these locally authored notes. React escapes
// all text; no HTML injection, network assets, or third-party Markdown runtime is used.
function inline(text: string): ReactNode[] {
  return text.split(/(==[^=]+==|`[^`]+`|\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('==') ? <mark key={i}>{part.slice(2,-2)}</mark> : part.startsWith('`') ? <code key={i}>{part.slice(1, -1)}</code>
      : part.startsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong> : part)
}

const headingId = (title: string) => `note-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '')}`

/** `idPrefix` keeps heading ids unique when several documents share one page (e.g. DM lessons). */
export function Markdown({ text, idPrefix = '' }: { text: string; idPrefix?: string }) {
  const lines = text.replace(/\r\n/g, '\n').split('\n')
  const blocks: ReactNode[] = []
  let i = 0
  while (i < lines.length) {
    const blockKey = i
    const line = lines[i]
    if (!line.trim() || line.startsWith('Topic ID:')) { i++; continue }
    if (line.startsWith('```')) {
      const language = line.slice(3)
      const code: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith('```')) code.push(lines[i++])
      i++
      blocks.push(<div className="learn-code" key={blockKey}><span>{language === 'c' ? 'C · fill the blanks before revealing' : language === 'text' ? 'Template / reference' : language ? `${language} · example` : 'Code example'}</span><pre tabIndex={0}><code>{code.join('\n')}</code></pre></div>)
      continue
    }
    const cells = (row: string) => row.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(cell => cell.trim())
    if (line.includes('|') && lines[i + 1] && /^\|?\s*:?-{3,}/.test(lines[i + 1].trim())) {
      const headers = cells(line)
      i += 2
      const rows: string[][] = []
      while (i < lines.length && lines[i].trim() && lines[i].includes('|')) rows.push(cells(lines[i++]))
      blocks.push(<div className="learn-table-wrap" key={blockKey} tabIndex={0} role="region" aria-label={`Reference table: ${headers.join(', ')}`}><table><thead><tr>{headers.map((cell, j) => <th scope="col" key={j}>{inline(cell)}</th>)}</tr></thead><tbody>{rows.map((row, j) => <tr key={j}>{headers.map((_, k) => <td key={k}>{inline(row[k] || '')}</td>)}</tr>)}</tbody></table></div>)
      continue
    }
    const callout = /^(?:>\s*)?(?:\*\*)?(Tip|Trap|Note|Remember):(?:\*\*)?\s*(.*)$/i.exec(line)
    if (callout) {
      const kind = callout[1].toLowerCase()
      const text = [callout[2]]
      i++
      while (i < lines.length && lines[i].trim() && !/^(#|```|\||- |\d+\. |Answers:|Topic ID:|(?:>\s*)?(?:\*\*)?(?:Tip|Trap|Note|Remember):)/i.test(lines[i])) text.push(lines[i++].replace(/^>\s*/, ''))
      blocks.push(<aside className={`learn-callout callout-${kind}`} key={blockKey}><strong><span aria-hidden="true">{({ tip: '✦', trap: '⚑', note: 'ⓘ', remember: '◆' })[kind]}</span> {callout[1]}</strong><p>{inline(text.join(' '))}</p></aside>)
      continue
    }
    if (line.startsWith('Answers:')) {
      const answer: string[] = []
      while (i < lines.length && !/^#{1,3} /.test(lines[i])) answer.push(lines[i++])
      blocks.push(<details className="learn-solution" key={blockKey}><summary>Reveal answers and reasoning</summary><Markdown idPrefix={idPrefix} text={answer.join('\n').replace(/^Answers:/, '**Answers:**')}/></details>)
      continue
    }
    const heading = /^(#{1,3}) (.+)$/.exec(line)
    if (heading) {
      const title = inline(heading[2])
      const id = idPrefix ? `${idPrefix}-${headingId(heading[2])}` : headingId(heading[2])
      blocks.push(heading[1].length === 1 ? <h2 tabIndex={-1} key={blockKey} id={id}>{title}</h2> : heading[1].length === 2 ? <h3 tabIndex={-1} key={blockKey} id={id}>{title}</h3> : <h4 tabIndex={-1} key={blockKey} id={id}>{title}</h4>)
      i++; continue
    }
    if (/^(- |\d+\. )/.test(line)) {
      const ordered = /^\d+\. /.test(line)
      const items: ReactNode[] = []
      const pattern = ordered ? /^\d+\. / : /^- /
      while (i < lines.length && pattern.test(lines[i])) {
        items.push(<li key={i}>{inline(lines[i++].replace(pattern, ''))}</li>)
      }
      blocks.push(ordered ? <ol key={blockKey}>{items}</ol> : <ul key={blockKey}>{items}</ul>)
      continue
    }
    const paragraph = [line]
    i++
    while (i < lines.length && lines[i].trim() && !/^(#|```|\||- |\d+\. |Answers:|Topic ID:|(?:>\s*)?(?:\*\*)?(?:Tip|Trap|Note|Remember):)/i.test(lines[i])) paragraph.push(lines[i++])
    blocks.push(<p key={blockKey}>{inline(paragraph.join(' '))}</p>)
  }
  return <>{blocks}</>
}


interface Props {
  subject?: string
  selected: string
  onSelect: (id: string) => void
  onPractice: (topic?: string) => void
  onRun: (code: string, title: string) => void
  /** True when the reader arrived from a practice question's concept note. */
  fromPractice?: boolean
  onBackToPractice?: () => void
}

const generalNotes = ['strategy', 'idioms', 'phrases', 'cheatsheet', 'examweek']

export function Learn({ subject = 'itp', selected, onSelect, onPractice, onRun, fromPractice = false, onBackToPractice }: Props) {
  const [query, setQuery] = useState('')
  const [pickerOpen, setPickerOpen] = useState(false)
  const [jumpOpen, setJumpOpen] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const mobile = useIsMobile()
  const article = useRef<HTMLElement>(null)
  const concepts = subject === 'dm' ? dmConcepts : subject === 'wp' ? wpConcepts : itpConcepts
  const note = concepts.find(c => c.id === selected) || concepts[0]
  const index = concepts.indexOf(note)
  const matches = concepts.filter(c => `${c.title}\n${c.markdown}`.toLowerCase().includes(query.trim().toLowerCase()))
  const sections = [...note.markdown.matchAll(/^## (.+)$/gm)].map(m => m[1])
  const examples = conceptExamples(note.markdown)
  const practiseTopic = generalNotes.includes(note.id) ? 'all' : note.id
  const practiseLabel = generalNotes.includes(note.id) ? 'Practise all topics' : 'Practise this topic'
  const previous = index > 0 ? concepts[index - 1] : null
  const next = index < concepts.length - 1 ? concepts[index + 1] : null
  useEffect(() => {
    const update = () => setShowTop(window.scrollY > 900)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  useEffect(() => { setJumpOpen(false) }, [note.id])
  function choose(id: string) {
    onSelect(id)
    requestAnimationFrame(() => { article.current?.focus({ preventScroll: true }); article.current?.scrollIntoView({ block: 'start' }) })
  }
  // Jump links scroll without writing #hash history entries, so Back still leaves the note.
  function jump(event: MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault()
    setJumpOpen(false)
    requestAnimationFrame(() => {
      const target = document.getElementById(id)
      if (!target) return
      target.scrollIntoView({ block: 'start', behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
      target.focus({ preventScroll: true })
    })
  }
  const noteLinks = (close: boolean) => matches.map(c => <StudyLink key={c.id} view="learn" topic={c.id} data-tone={topicTone(c.id)} current={note.id === c.id} className={note.id === c.id ? 'selected' : ''} onNavigate={() => { if (close) setPickerOpen(false); choose(c.id) }}><i className="topic-dot" aria-hidden="true"/><span>{c.fileName.slice(0, 2)}</span>{c.title}</StudyLink>)
  return <>
    <div className="page-heading"><div><h1>Learn</h1><p className="muted">Read a note, try the examples, then practise the same pattern.</p></div><span className="tag">{subject === 'dm' ? 'DM · Exam 28 Nov · Typed steps' : subject === 'wp' ? 'Exam-order study route' : '2-day study route'}</span></div>
    <div className="learn-bar" data-tone={topicTone(note.id)}>
      <button type="button" className="button secondary learn-bar-notes" aria-haspopup="dialog" onClick={() => setPickerOpen(true)}><span aria-hidden="true">☰</span> Notes</button>
      <div className="learn-bar-title"><span className="small muted">Study {index + 1} of {concepts.length}</span><strong>{note.title}</strong></div>
      {fromPractice && onBackToPractice && <button type="button" className="button primary learn-bar-back" aria-label="Back to your practice question" onClick={onBackToPractice}><span aria-hidden="true">←</span> Question</button>}
    </div>
    <Sheet title="Choose a note" open={pickerOpen} onClose={() => setPickerOpen(false)}>
      <label htmlFor="learn-search-sheet">Find a concept</label><input id="learn-search-sheet" type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Try scanf, transpose, heap…"/>
      <p className="small muted" role="status">{query ? `${matches.length} matching notes` : `${concepts.length} notes · read in this order`}</p>
      <nav className="sheet-list" aria-label="Notes, in study order">{noteLinks(true)}</nav>
      {!matches.length && <p className="small">No notes found. Try a shorter term or <button type="button" className="text-button" onClick={() => setQuery('')}>clear search</button>.</p>}
    </Sheet>
    <div className="learn-layout">
      <aside className="panel learn-nav">
        <label htmlFor="learn-search">Find a concept</label><input id="learn-search" type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Try scanf, transpose, heap…"/>
        <p className="small muted" role="status">{query ? `${matches.length} matching notes` : `${concepts.length} notes · read in this order`}</p>
        <details className="learn-picker"><summary>Choose a note · study {index + 1}</summary><nav aria-label="Concept study order">{noteLinks(false)}</nav></details>
        {!matches.length && <p className="small">No notes found. Try a shorter term or <button type="button" className="text-button" onClick={() => setQuery('')}>clear search</button>.</p>}
      </aside>
      <article ref={article} tabIndex={-1} className="panel learn-article" data-tone={topicTone(note.id)} aria-label={note.title}>
        <div className="learn-toolbar"><span className="eyebrow">Study {index + 1} / {concepts.length}</span><StudyLink view="practice" topic={practiseTopic} className="button secondary" onNavigate={() => onPractice(practiseTopic)}>{practiseLabel}</StudyLink></div>
        {sections.length > 0 && <details className="learn-jump" open={!mobile || jumpOpen} onToggle={event => { if (mobile) setJumpOpen(event.currentTarget.open) }}>
          <summary onClick={event => { if (!mobile) event.preventDefault() }}>On this page · {sections.length} {sections.length === 1 ? 'section' : 'sections'}</summary>
          <nav className="learn-sections" aria-label="On this page">{sections.map(title => <a href={`#${headingId(title)}`} key={title} onClick={event => jump(event, headingId(title))}>{title}</a>)}</nav>
        </details>}
        <div className="learn-prose" key={note.id}><Markdown text={note.markdown}/></div>
        {examples.length > 0 && <section className="learn-experiments"><h3>Try a small change</h3><p>Open a completed example in the scratchpad. Predict what changes when you alter an input or operator, then run it with local GCC.</p><div>{examples.map((example, i) => <button type="button" key={i} className="button secondary" onClick={() => onRun(example.code, `${note.title} · example ${i + 1}`)}>Experiment with example {i + 1}</button>)}</div></section>}
        <div className="learn-end">
          <p className="learn-end-label small muted">End of note · {index + 1} of {concepts.length}</p>
          <div className="learn-end-actions">
            {fromPractice && onBackToPractice && <button type="button" className="button primary" onClick={onBackToPractice}>Back to your question</button>}
            <StudyLink view="practice" topic={practiseTopic} className={`button ${fromPractice && onBackToPractice ? 'secondary' : 'primary'}`} onNavigate={() => onPractice(practiseTopic)}>{practiseLabel}</StudyLink>
          </div>
          <div className="learn-pagination">
            {previous ? <StudyLink view="learn" topic={previous.id} className="button secondary pager pager-prev" onNavigate={() => choose(previous.id)}><span className="pager-label"><span aria-hidden="true">←</span> Previous note</span><span className="pager-title">{previous.title}</span></StudyLink> : <span className="pager-empty small muted">First note</span>}
            {next ? <StudyLink view="learn" topic={next.id} className="button secondary pager pager-next" onNavigate={() => choose(next.id)}><span className="pager-label">Next note <span aria-hidden="true">→</span></span><span className="pager-title">{next.title}</span></StudyLink> : <span className="pager-empty small muted">Last note</span>}
          </div>
        </div>
      </article>
    </div>
    {showTop && <button type="button" className="button secondary to-top" aria-label="Back to top of this note" onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })}><span aria-hidden="true">↑</span> Top</button>}
  </>
}
