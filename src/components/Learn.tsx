import { useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { concepts as itpConcepts, wpConcepts } from '../data/concepts'
import { conceptExamples } from '../lib/concepts'
import { StudyLink } from './StudyLink'
import { topicTone } from '../topicColors'

// A deliberately small Markdown subset for these locally authored notes. React escapes
// all text; no HTML injection, network assets, or third-party Markdown runtime is used.
function inline(text: string): ReactNode[] {
  return text.split(/(==[^=]+==|`[^`]+`|\*\*[^*]+\*\*)/g).map((part, i) =>
    part.startsWith('==') ? <mark key={i}>{part.slice(2,-2)}</mark> : part.startsWith('`') ? <code key={i}>{part.slice(1, -1)}</code>
      : part.startsWith('**') ? <strong key={i}>{part.slice(2, -2)}</strong> : part)
}

const headingId = (title: string) => `note-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '')}`

export function Markdown({ text }: { text: string }) {
  const lines = text.replace(/\r\n/g, '\n').split('\n')
  const blocks: ReactNode[] = []
  let i = 0
  while (i < lines.length) {
    const line = lines[i]
    if (!line.trim() || line.startsWith('Topic ID:')) { i++; continue }
    if (line.startsWith('```')) {
      const language = line.slice(3)
      const code: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith('```')) code.push(lines[i++])
      i++
      blocks.push(<div className="learn-code" key={i}><span>{language === 'c' ? 'C · fill the blanks before revealing' : language === 'text' ? 'Template / reference' : language ? `${language} · example` : 'Code example'}</span><pre tabIndex={0}><code>{code.join('\n')}</code></pre></div>)
      continue
    }
    const cells = (row: string) => row.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map(cell => cell.trim())
    if (line.includes('|') && lines[i + 1] && /^\|?\s*:?-{3,}/.test(lines[i + 1].trim())) {
      const headers = cells(line)
      i += 2
      const rows: string[][] = []
      while (i < lines.length && lines[i].trim() && lines[i].includes('|')) rows.push(cells(lines[i++]))
      blocks.push(<div className="learn-table-wrap" key={i} tabIndex={0} role="region" aria-label={`Reference table: ${headers.join(', ')}`}><table><thead><tr>{headers.map((cell, j) => <th scope="col" key={j}>{inline(cell)}</th>)}</tr></thead><tbody>{rows.map((row, j) => <tr key={j}>{headers.map((_, k) => <td key={k}>{inline(row[k] || '')}</td>)}</tr>)}</tbody></table></div>)
      continue
    }
    const callout = /^(?:>\s*)?(?:\*\*)?(Tip|Trap|Note|Remember):(?:\*\*)?\s*(.*)$/i.exec(line)
    if (callout) {
      const kind = callout[1].toLowerCase()
      const text = [callout[2]]
      i++
      while (i < lines.length && lines[i].trim() && !/^(#|```|\||- |\d+\. |Answers:|Topic ID:|(?:>\s*)?(?:\*\*)?(?:Tip|Trap|Note|Remember):)/i.test(lines[i])) text.push(lines[i++].replace(/^>\s*/, ''))
      blocks.push(<aside className={`learn-callout callout-${kind}`} key={i}><strong><span aria-hidden="true">{({ tip: '✦', trap: '⚑', note: 'ⓘ', remember: '◆' })[kind]}</span> {callout[1]}</strong><p>{inline(text.join(' '))}</p></aside>)
      continue
    }
    if (line.startsWith('Answers:')) {
      const answer: string[] = []
      while (i < lines.length && !/^#{1,3} /.test(lines[i])) answer.push(lines[i++])
      blocks.push(<details className="learn-solution" key={i}><summary>Reveal answers and reasoning</summary><Markdown text={answer.join('\n').replace(/^Answers:/, '**Answers:**')}/></details>)
      continue
    }
    const heading = /^(#{1,3}) (.+)$/.exec(line)
    if (heading) {
      const title = inline(heading[2])
      const id = headingId(heading[2])
      blocks.push(heading[1].length === 1 ? <h2 tabIndex={-1} key={i} id={id}>{title}</h2> : heading[1].length === 2 ? <h3 tabIndex={-1} key={i} id={id}>{title}</h3> : <h4 tabIndex={-1} key={i} id={id}>{title}</h4>)
      i++; continue
    }
    if (/^(- |\d+\. )/.test(line)) {
      const ordered = /^\d+\. /.test(line)
      const items: ReactNode[] = []
      const pattern = ordered ? /^\d+\. / : /^- /
      while (i < lines.length && pattern.test(lines[i])) {
        items.push(<li key={i}>{inline(lines[i++].replace(pattern, ''))}</li>)
      }
      blocks.push(ordered ? <ol key={i}>{items}</ol> : <ul key={i}>{items}</ul>)
      continue
    }
    const paragraph = [line]
    i++
    while (i < lines.length && lines[i].trim() && !/^(#|```|\||- |\d+\. |Answers:|Topic ID:|(?:>\s*)?(?:\*\*)?(?:Tip|Trap|Note|Remember):)/i.test(lines[i])) paragraph.push(lines[i++])
    blocks.push(<p key={i}>{inline(paragraph.join(' '))}</p>)
  }
  return <>{blocks}</>
}

interface Props {
  subject?: string
  selected: string
  onSelect: (id: string) => void
  onPractice: (topic?: string) => void
  onRun: (code: string, title: string) => void
}

export function Learn({ subject = 'itp', selected, onSelect, onPractice, onRun }: Props) {
  const [query, setQuery] = useState('')
  const article = useRef<HTMLElement>(null)
  const concepts = subject === 'wp' ? wpConcepts : itpConcepts
  const note = concepts.find(c => c.id === selected) || concepts[0]
  const index = concepts.indexOf(note)
  const matches = concepts.filter(c => `${c.title}\n${c.markdown}`.toLowerCase().includes(query.trim().toLowerCase()))
  const sections = [...note.markdown.matchAll(/^## (.+)$/gm)].map(m => m[1])
  const examples = conceptExamples(note.markdown)
  function choose(id: string) {
    onSelect(id)
    requestAnimationFrame(() => { article.current?.focus(); article.current?.scrollIntoView({ block: 'start' }) })
  }
  return <>
    <div className="page-heading"><div><h1>Learn</h1><p className="muted">Read a note, try the examples, then practise the same pattern.</p></div><span className="tag">{subject === 'wp' ? 'Exam-order study route' : '2-day study route'}</span></div>
    <div className="learn-layout">
      <aside className="panel learn-nav">
        <label htmlFor="learn-search">Find a concept</label><input id="learn-search" type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Try scanf, transpose, heap…"/>
        <p className="small muted" role="status">{query ? `${matches.length} matching notes` : `${concepts.length} notes · read in this order`}</p>
        <details className="learn-picker"><summary>Choose a note · study {index + 1}</summary><nav aria-label="Concept study order">{matches.map(c => <StudyLink key={c.id} view="learn" topic={c.id} data-tone={topicTone(c.id)} current={note.id === c.id} className={note.id === c.id ? 'selected' : ''} onNavigate={() => choose(c.id)}><i className="topic-dot" aria-hidden="true"/><span>{c.fileName.slice(0, 2)}</span>{c.title}</StudyLink>)}</nav></details>
        {!matches.length && <p className="small">No notes found. Try a shorter term or <button type="button" className="text-button" onClick={() => setQuery('')}>clear search</button>.</p>}
      </aside>
      <article ref={article} tabIndex={-1} className="panel learn-article" data-tone={topicTone(note.id)} aria-label={note.title}>
        <div className="learn-toolbar"><span className="eyebrow">Study {index + 1} / {concepts.length}</span><StudyLink view="practice" topic={['strategy','idioms','phrases'].includes(note.id) ? 'all' : note.id} className="button secondary" onNavigate={() => onPractice(['strategy','idioms','phrases'].includes(note.id) ? 'all' : note.id)}>Practise {['strategy','idioms','phrases'].includes(note.id) ? 'all topics' : 'this topic'}</StudyLink></div>
        <nav className="learn-sections" aria-label="On this page">{sections.map(title => <a href={`#${headingId(title)}`} key={title}>{title}</a>)}</nav>
        <div className="learn-prose" key={note.id}><Markdown text={note.markdown}/></div>
        {examples.length > 0 && <section className="learn-experiments"><h3>Try a small change</h3><p>Open a completed example in the scratchpad. Predict what changes when you alter an input or operator, then run it with local GCC.</p><div>{examples.map((example, i) => <button type="button" key={i} className="button secondary" onClick={() => onRun(example.code, `${note.title} · example ${i + 1}`)}>Experiment with example {i + 1}</button>)}</div></section>}
        <div className="learn-pagination">{index > 0 ? <StudyLink view="learn" topic={concepts[index - 1].id} className="text-button" onNavigate={() => choose(concepts[index - 1].id)}>Previous note</StudyLink> : <span className="small muted">First note</span>}<span className="small muted">Continue in study order</span>{index < concepts.length - 1 ? <StudyLink view="learn" topic={concepts[index + 1].id} className="text-button" onNavigate={() => choose(concepts[index + 1].id)}>Next note</StudyLink> : <span className="small muted">Last note</span>}</div>
      </article>
    </div>
  </>
}
