import { useId, useState } from 'react'
import type { AutoQuestion, Graph, MstQuestion, Question } from '../data/dm/types'
import { dmConcepts } from '../data/concepts'
import type { DMAnswers } from '../lib/dm'
import { checkpointAnswers, dmCellKey, dmCheckpointPrefix, dmModelAnswers, dmScore, formulaValues, markDM, mstSequence, resolveEdge, validateMst } from '../lib/dm'
import { AnswerFeedback } from './Delight'
import { PriorityChip } from './TopicPicker'
import { StudyLink } from './StudyLink'
import { Markdown } from './Learn'

export const dmTypeNames: Record<Question['type'], string> = { 'truth-table': 'Truth table', formula: 'Formula', numeric: 'Number', 'set-answer': 'Set', partition: 'Equivalence classes', properties: 'Properties', mcq: 'Multiple choice', mst: 'MST edge sequence', steps: 'Step-by-step proof' }
export const dmScoreText = (score: number) => Number(score.toFixed(2)).toString()
const notation = 'Use numbered steps. Type ~p, p ^ q, p v q, p -> q; n^2, a_(n-1), x in A, A subseteq B, LUB(S), GLB(S). In formulas use explicit *.'

export function DMHeading({ question }: { question: Question }) {
  return <div className="question-heading" data-question-id={question.id} tabIndex={-1}><div className="question-tags"><PriorityChip priority={question.priority}/><span className="tag">{dmTypeNames[question.type]}</span><span className="tag">{question.marks} marks</span><span className="meta-text">{question.source} · {question.difficulty}</span></div><h2>{question.title}</h2></div>
}
export function DMConcept({ question, onLearn }: { question: Question; onLearn: (topic: string) => void }) {
  const note = dmConcepts.find(n => n.id === question.topic)
  return <details className="concept-note"><summary>Concept: {note?.title || question.topic}</summary><div className="concept-note-body"><p>{question.conceptNote}</p><StudyLink view="learn" topic={question.topic} className="concept-lesson-link" onNavigate={() => onLearn(question.topic)}>Read the lesson →</StudyLink></div></details>
}

/** Teacher-style lesson rendered with the Learn Markdown renderer. Renders nothing when the question has no lesson. */
// Lessons are stored as six "### " sections. Show the most useful first, each as its own block.
const LESSON_SECTIONS: { key: string; match: RegExp; label: string; icon: string; collapsed?: boolean }[] = [
  { key: 'asks', match: /question is asking/i, label: 'What is being asked', icon: '🎯' },
  { key: 'exam', match: /write it in the exam/i, label: 'What to write in the exam', icon: '✍️' },
  { key: 'steps', match: /step by step/i, label: 'How it is solved, step by step', icon: '🪜' },
  { key: 'concept', match: /need to know first/i, label: 'Concept refresher', icon: '📘', collapsed: true },
  { key: 'mistakes', match: /common mistakes/i, label: 'Common mistakes', icon: '⚠️' },
  { key: 'check', match: /check yourself/i, label: 'Check yourself', icon: '✅', collapsed: true },
]
export function splitLesson(md: string) {
  const parts = md.split(/^### /m)
  const intro = parts.shift()?.trim() || ''
  const sections = parts.map(p => { const nl = p.indexOf('\n'); return { title: (nl < 0 ? p : p.slice(0, nl)).trim(), body: nl < 0 ? '' : p.slice(nl + 1).trim() } })
  const ordered = LESSON_SECTIONS.flatMap(def => sections.filter(s => def.match.test(s.title)).map(s => ({ ...s, def })))
  const rest = sections.filter(s => !LESSON_SECTIONS.some(def => def.match.test(s.title))).map(s => ({ ...s, def: undefined }))
  return { intro, sections: [...ordered, ...rest] }
}
export function DMLesson({ question, open = false, summary = 'Lesson: how this was solved', className = '' }: { question: Question; open?: boolean; summary?: string; className?: string }) {
  const id = useId()
  if (!question.lesson?.trim()) return null
  const { intro, sections } = splitLesson(question.lesson)
  return <details className={`dm-lesson ${className}`.trim()} open={open} data-dm-lesson={question.id}><summary id={`${id}-lesson`}><span>📖 {summary}</span><span className="dm-lesson-chevron" aria-hidden="true">›</span></summary><div className="learn-prose dm-lesson-body" role="region" aria-labelledby={`${id}-lesson`}>
    {intro && <Markdown text={intro} idPrefix={`lesson-${question.id}-intro`}/>}
    {sections.map((s, i) => {
      const label = s.def ? s.def.label : s.title, icon = s.def?.icon || '•', key = s.def?.key || 'other'
      const body = <div className="lesson-sec-body"><Markdown text={s.body} idPrefix={`lesson-${question.id}-${i}`}/></div>
      return s.def?.collapsed
        ? <details key={i} className={`lesson-sec lesson-${key}`}><summary className="lesson-sec-title"><span aria-hidden="true">{icon}</span>{label}</summary>{body}</details>
        : <section key={i} className={`lesson-sec lesson-${key}`}><h4 className="lesson-sec-title"><span aria-hidden="true">{icon}</span>{label}</h4>{body}</section>
    })}
  </div></details>
}
export function DMGraph({ graph, chosen = [], onEdge, locked = false, weighted = true }: { graph: Graph; chosen?: string[]; onEdge?: (id: string) => void; locked?: boolean; weighted?: boolean }) {
  const id = useId()
  const points = Object.fromEntries(graph.vertices.map((v, i) => [v, graph.layout?.[v] || { x: 150 + 110 * Math.cos(i * 2 * Math.PI / graph.vertices.length - Math.PI / 2), y: 150 + 110 * Math.sin(i * 2 * Math.PI / graph.vertices.length - Math.PI / 2) }]))
  const xs = Object.values(points).map(p => p.x), ys = Object.values(points).map(p => p.y)
  const minX = Math.min(...xs) - 30, minY = Math.min(...ys) - 30, width = Math.max(300, Math.max(...xs) - minX + 30), height = Math.max(300, Math.max(...ys) - minY + 30)
  return <svg className="dm-graph" viewBox={`${minX} ${minY} ${width} ${height}`} role="img" aria-labelledby={`${id}-title ${id}-desc`}>
    <title id={`${id}-title`}>{weighted ? 'Weighted graph' : 'Graph'}</title><desc id={`${id}-desc`}>Vertices {graph.vertices.join(', ')}. {graph.edges.map(e => `${e.u} to ${e.v}${weighted ? ` weight ${e.weight}` : ''}`).join('; ')}. Use the edge buttons below to select edges.</desc>
    <defs><marker id={`${id}-arrow`} viewBox="0 0 10 10" refX="20" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="var(--muted)"/></marker></defs>
    {graph.edges.map((e, i) => {
      const a = points[e.u], b = points[e.v], selected = chosen.includes(e.id)
      // Small perpendicular offsets keep labels off the edge and separate intersecting weights.
      const length = Math.hypot(b.x - a.x, b.y - a.y) || 1, shift = 10 + (i % 2) * 4
      return <g key={e.id} className={selected ? 'dm-edge selected' : 'dm-edge'} onClick={onEdge && !locked ? () => onEdge(e.id) : undefined} aria-hidden="true">
        <line className="dm-edge-hit" x1={a.x} y1={a.y} x2={b.x} y2={b.y}/><line className="dm-edge-line" x1={a.x} y1={a.y} x2={b.x} y2={b.y} markerEnd={graph.directed ? `url(#${id}-arrow)` : undefined}/>
        {weighted && <text className="dm-edge-weight" x={(a.x + b.x) / 2 - (b.y - a.y) / length * shift} y={(a.y + b.y) / 2 + (b.x - a.x) / length * shift} textAnchor="middle" dominantBaseline="central">{e.weight}</text>}
      </g>
    })}
    {graph.vertices.map(v => <g key={v}><circle className="dm-vertex" cx={points[v].x} cy={points[v].y} r="15"/><text x={points[v].x} y={points[v].y} textAnchor="middle" dominantBaseline="central">{v}</text></g>)}
  </svg>
}

interface FieldsProps {
  question: Question; answers: DMAnswers; onChange: (answers: DMAnswers) => void
  locked?: boolean; checked?: boolean; exam?: boolean; revealed?: string[]
  onReveal?: (keys: string[], values: DMAnswers) => void
  /** Checkpoints use the same editors without another working area. */
  checkpoint?: boolean
}
function MstFields({ question: q, answers, onChange, locked, checked, exam }: FieldsProps & { question: MstQuestion }) {
  const id = useId(), [message, setMessage] = useState('')
  const sequence = mstSequence(q, answers.edges || ''), trace = validateMst(q, sequence)
  const chosen = sequence.map(label => resolveEdge(q.graph, label)?.id).filter((v): v is string => !!v)
  const total = chosen.reduce((sum, edge) => sum + q.graph.edges.find(e => e.id === edge)!.weight, 0)
  function add(edge: string) {
    const next = [...sequence, edge], validation = validateMst(q, next)
    if (!exam && !validation.valid) { setMessage(validation.error); return }
    onChange({ ...answers, edges: next.join(', ') }); setMessage(exam ? `Added ${edge}.` : `Step ${next.length}: added ${edge}. Running weight ${validation.weight}.`)
  }
  return <div className="dm-mst">
    <p><strong>{q.algorithm === 'kruskal' ? 'Kruskal' : `Prim · start at ${q.startVertex || q.graph.vertices[0]}`}</strong> · Select {q.graph.vertices.length - 1} edges, in order.</p>
    <DMGraph graph={q.graph} chosen={chosen} locked={locked} onEdge={add}/>
    <div className="dm-edge-buttons" role="group" aria-label="Choose an edge">{q.graph.edges.map(e => <button type="button" key={e.id} className={`button ${chosen.includes(e.id) ? 'primary' : 'secondary'}`} disabled={locked || chosen.includes(e.id)} aria-pressed={chosen.includes(e.id)} onClick={() => add(e.id)}>{e.u}{e.v} ({e.weight})</button>)}</div>
    <p className="small">Selected: {sequence.join(' → ') || 'No edges yet'} · Running weight: <strong>{total}</strong></p>
    <label htmlFor={`${id}-edges`}>Accepted edges in order</label><input id={`${id}-edges`} className="dm-expression" value={answers.edges || ''} readOnly={locked} autoCapitalize="off" autoComplete="off" spellCheck={false} placeholder="AB, CD, …" onChange={e => { onChange({ ...answers, edges: e.target.value }); setMessage('') }}/>
    <div className="dm-inline-actions"><button type="button" className="button secondary" disabled={locked || !sequence.length} onClick={() => { onChange({ ...answers, edges: sequence.slice(0, -1).join(', ') }); setMessage('Last edge removed.') }}>Undo last edge</button><span className="small muted">Either endpoint order is accepted. Ties are allowed.</span></div>
    {!exam && !!sequence.length && !trace.valid && <p className="dm-verdict wrong">{trace.error}</p>}
    {checked && !trace.complete && !trace.error && <p className="dm-verdict wrong">× Incomplete trace. A spanning tree needs {q.graph.vertices.length - 1} valid accepted edges.</p>}
    {!exam && trace.complete && <p className="dm-verdict correct">✓ Spanning tree complete. Enter the final total and explain your steps.</p>}
    <p role="status" className="small">{message}</p>
    <label htmlFor={`${id}-total`}>Final total weight</label><input id={`${id}-total`} inputMode="numeric" value={answers.total || ''} readOnly={locked} onChange={e => onChange({ ...answers, total: e.target.value })} aria-invalid={checked ? !markDM(q, answers).total : undefined}/>
    {checked && <p className={`dm-verdict ${markDM(q, answers).total ? 'correct' : 'wrong'}`}>{markDM(q, answers).total ? '✓ Final total correct' : '× Final total differs'}</p>}
    {q.graph.image && <details><summary>Show original figure</summary><img className="dm-source-image" src={q.graph.image} alt="Original weighted graph from the source paper; the accessible graph above contains the same vertices and weights." loading="lazy"/></details>}
  </div>
}

export function DMFields(props: FieldsProps) {
  const { question: q, answers, onChange, locked = false, checked = false, exam = false, revealed = [], onReveal, checkpoint = false } = props
  const id = useId(), [mono, setMono] = useState(true)
  const results = checked ? markDM(q, answers, revealed) : undefined
  const change = (key: string, value: string) => onChange({ ...answers, [key]: value })
  const verdict = (key: string) => revealed.includes(key) ? 'Revealed · no mark' : results?.[key] === true ? '✓ Correct' : results?.[key] === false ? '× Check your answer' : ''
  const cls = (key: string) => revealed.includes(key) ? 'revealed' : results ? results[key] ? 'correct' : 'wrong' : ''
  const simple = (hint: string, multiline = false) => <div className="dm-answer-field">
    <label htmlFor={`${id}-answer`}>Your {dmTypeNames[q.type].toLowerCase()} answer</label><p className="small muted" id={`${id}-hint`}>{hint}</p>
    {multiline ? <textarea id={`${id}-answer`} rows={4} value={answers.answer || ''} readOnly={locked} aria-describedby={`${id}-hint`} aria-invalid={results ? !results.answer : undefined} onChange={e => change('answer', e.target.value)}/> : <input id={`${id}-answer`} className="dm-expression" value={answers.answer || ''} readOnly={locked} maxLength={q.type === 'formula' ? 512 : 8000} inputMode={q.type === 'numeric' ? 'decimal' : 'text'} autoCapitalize="off" autoComplete="off" spellCheck={false} aria-describedby={`${id}-hint`} aria-invalid={results ? !results.answer : undefined} onChange={e => change('answer', e.target.value)}/>}
    {checked && <p className={`dm-verdict ${cls('answer')}`}>{verdict('answer')}</p>}
  </div>
  return <div className="dm-question" data-dm-type={q.type}>
    <div className="dm-prompt">{q.prompt}</div>
    {q.reconstructed && <details className="source-notes"><summary>Source notation note</summary><p>{q.reconstructionNote}</p></details>}
    {q.type === 'truth-table' && <>
      <p className="small muted" id={`${id}-table-hint`}>Tap each cell: blank → T → F. Rows use T before F; the leftmost variable changes slowest. Swipe inside the table for more columns.</p>
      <div className="dm-table-scroll" tabIndex={0} role="region" aria-label="Truth table, scroll for expression columns" aria-describedby={`${id}-table-hint`}><table className="dm-truth-table"><caption>Truth table · {q.answer.length} rows</caption><thead><tr>{q.variables.map(v => <th scope="col" key={v}><code>{v}</code></th>)}{q.columns.map((col, c) => <th scope="col" key={c}><code>{col}</code>{!exam && !locked && onReveal && <button type="button" className="text-button" aria-label={`Reveal column ${col}`} onClick={() => {
        const keys = q.answer.map((_, r) => dmCellKey(r, c))
        onReveal(keys, Object.fromEntries(q.answer.map((row, r) => [dmCellKey(r, c), row[c] ? 'T' : 'F'])))
      }}>Reveal column</button>}</th>)}</tr></thead><tbody>{q.answer.map((row, r) => <tr key={r}>{q.variables.map((v, k) => <th scope="row" key={v}>{!(r & (1 << (q.variables.length - 1 - k))) ? 'T' : 'F'}</th>)}{row.map((_, c) => {
        const key = dmCellKey(r, c), value = answers[key] || ''
        return <td key={c}><button type="button" className={`dm-truth-cell ${cls(key)}`} disabled={locked} aria-label={`Row ${r + 1}, ${q.variables.map((v, k) => `${v}=${!(r & (1 << (q.variables.length - 1 - k))) ? 'T' : 'F'}`).join(', ')}, ${q.columns[c]}: ${value || 'blank'}${checked ? `, ${verdict(key)}` : ''}`} aria-invalid={results ? !results[key] : undefined} onClick={() => change(key, value === '' ? 'T' : value === 'T' ? 'F' : '')}>{value || '·'}{checked && <span className="dm-cell-status" aria-hidden="true">{revealed.includes(key) ? 'R' : results?.[key] ? '✓' : '×'}</span>}</button></td>
      })}</tr>)}</tbody></table></div>
      {q.followUp && <fieldset className="dm-options"><legend>{q.followUp.prompt}</legend>{q.followUp.options.map((o, i) => <label key={i}><input type="radio" name={`${id}-followUp`} checked={answers.followUp === String(i)} disabled={locked} onChange={() => change('followUp', String(i))}/><span>{o}</span></label>)}{checked && <p className={`dm-verdict ${cls('followUp')}`}>{verdict('followUp')}</p>}</fieldset>}
    </>}
    {q.type === 'formula' && simple('Enter only the expression in n, without a_n=. Use integers, + - * / ^ and parentheses. Explicit * is required: 2*(n+1). Powers precede unary minus: -2^2 = -4.')}
    {q.type === 'numeric' && simple('Enter the exact number. Large integer answers are preserved without rounding.')}
    {q.type === 'set-answer' && simple(`${q.inputHint} Order is ignored. Braces around the whole answer are optional. Use NONE for no elements; {} means the empty-set element.`)}
    {q.type === 'partition' && simple(`${q.inputHint} You may also put one class on each line. Class order and element order do not matter; each element must occur exactly once.`, true)}
    {q.type === 'properties' && <fieldset className="dm-options"><legend>Select every property that holds</legend>{q.options.map(o => <label key={o} className={cls(o)}><input type="checkbox" checked={answers[`property:${o}`] === 'true'} disabled={locked} onChange={e => onChange({ ...answers, [`property:${o}`]: String(e.target.checked), propertiesConfirmed: 'true' })}/><span>{o}{checked && <small>{verdict(o)}</small>}</span></label>)}<label><input type="checkbox" checked={answers.propertiesConfirmed === 'true'} disabled={locked} onChange={e => change('propertiesConfirmed', String(e.target.checked))}/><span>I have considered every property (unchecked means false).</span></label></fieldset>}
    {q.type === 'mcq' && <fieldset className="dm-options"><legend>Choose one answer</legend>{q.options.map((o, i) => <label key={i}><input type="radio" name={`${id}-answer`} checked={answers.answer === String(i)} disabled={locked} onChange={() => change('answer', String(i))}/><span>{o}</span></label>)}{checked && <p className={`dm-verdict ${cls('answer')}`}>{verdict('answer')}</p>}</fieldset>}
    {q.type === 'mst' && <MstFields {...props} question={q}/>}
    {!checkpoint && <div className="dm-working"><label htmlFor={`${id}-working`}>{q.type === 'steps' ? 'Your step-by-step answer' : 'Your working · practise typing the exam steps'}</label><details><summary>Maths notation hint</summary><p className="small muted">{notation}</p></details><label className="check-label"><input type="checkbox" checked={mono} onChange={e => setMono(e.target.checked)}/>Monospace text</label><textarea id={`${id}-working`} className={mono ? 'dm-monospace' : 'dm-prose-answer'} rows={q.type === 'steps' ? 12 : 5} value={answers.working || ''} readOnly={locked} spellCheck={false} placeholder="Step 1: …&#10;Step 2: …&#10;Therefore …" onChange={e => change('working', e.target.value)}/></div>}
    {q.type === 'steps' && q.checkpoints?.map(cp => <section className="dm-checkpoint" key={cp.id}><h3>Optional checkpoint · {cp.title}</h3><p className="small muted">For feedback only; does not add to this question’s {q.marks} marks.</p><DMFields question={cp} answers={checkpointAnswers(answers, cp.id)} checkpoint locked={locked} checked={checked} exam={exam} onChange={next => {
      const prefix = dmCheckpointPrefix(cp.id)
      onChange({ ...Object.fromEntries(Object.entries(answers).filter(([key]) => !key.startsWith(prefix))), ...Object.fromEntries(Object.entries(next).map(([key, value]) => [prefix + key, value])) })
    }}/></section>)}
  </div>
}

export function DMFeedback({ question: q, answers, revealed = [], onAssess, onLearn, celebrate = false, burst = q.id, lessonOpen = true }: { question: Question; answers: DMAnswers; revealed?: string[]; onAssess: (answers: DMAnswers) => void; onLearn: (topic: string) => void; celebrate?: boolean; burst?: string; lessonOpen?: boolean }) {
  const score = dmScore(q, answers, revealed), results = markDM(q, answers, revealed)
  const completed = Object.values(results).filter(Boolean).length
  const id = useId()
  return <section className="report dm-report" aria-label="DM marked answer">
    {q.type !== 'steps' && <AnswerFeedback correct={completed} total={Object.keys(results).length} burst={burst} celebrate={celebrate} revealed={revealed.length}/>}
    <div className="report-heading"><h3>{q.type === 'steps' ? 'Assess your written steps' : 'Your result'}</h3><span className="score">{dmScoreText(score)}<small> / {q.marks}</small></span></div>
    <p className="small muted">{q.type === 'steps' ? 'Self-assessed marks · use the editorial rubric below. Checkpoints earn no additional marks.' : 'Automatically checked final answer. Compare your written reasoning with the model; the exam requires justified steps.'}</p>
    {!!revealed.length && <p className="notice">Revealed parts earn no marks in this attempt. Try again for a fresh attempt.</p>}
    {q.type === 'formula' && !results.answer && <div className="dm-table-scroll" tabIndex={0} role="region" aria-label="Formula comparison"><table><caption>Your expression at each test point</caption><thead><tr><th scope="col">n</th><th scope="col">Your value</th><th scope="col">Expected</th></tr></thead><tbody>{formulaValues(q, answers.answer || '').map(p => <tr key={p.n}><th scope="row">{p.n}</th><td>{p.value === null ? p.error : `${p.value} ${p.correct ? '✓' : '×'}`}</td><td>{p.expected}</td></tr>)}</tbody></table></div>}
    {q.type === 'formula' && <p className="small muted">Matching the test points is numerical evidence, not a symbolic proof.</p>}
    {q.type !== 'steps' && <p className="dm-model-answer"><strong>Model final answer: </strong><code>{Object.entries(dmModelAnswers(q as AutoQuestion)).filter(([key]) => !key.startsWith('cell:') && key !== 'propertiesConfirmed').map(([key, value]) => q.type === 'mcq' ? q.options[Number(value)] : q.type === 'properties' ? `${key.slice(9)}: ${value}` : `${q.type === 'mst' ? `${key}: ` : ''}${value}`).join(' · ') || 'See the completed truth table in the model steps below.'}</code></p>}
    {q.type === 'steps' && <fieldset className="dm-rubric"><legend>Self-mark each step</legend>{q.rubric.map(r => <label key={r.step}><input type="checkbox" checked={answers[`rubric:${r.step}`] === 'true'} disabled={!answers.working?.trim()} onChange={e => onAssess({ ...answers, [`rubric:${r.step}`]: String(e.target.checked) })}/><span><strong>Step {r.step} · {r.marks} {r.marks === 1 ? 'mark' : 'marks'}</strong>{r.criterion}</span></label>)}{!answers.working?.trim() && <p className="small muted">A blank written answer earns no rubric marks. Try again and type your reasoning.</p>}<label><input type="checkbox" checked={answers.rubricReviewed === 'true'} onChange={e => onAssess({ ...answers, rubricReviewed: String(e.target.checked) })}/><span>I have reviewed every criterion. Unchecked steps earn zero marks.</span></label></fieldset>}
    <details className="dm-model" open><summary id={`${id}-model`}>Step-by-step model solution</summary><ol aria-labelledby={`${id}-model`}>{q.solution.map(step => <li key={step.step}><span className="dm-solution-step">{/^Step \d+:/.test(step.text) ? step.text : `Step ${step.step}: ${step.text}`}</span></li>)}</ol></details>
    <DMLesson key={q.id} question={q} open={lessonOpen}/>
    {q.type === 'steps' && q.checkpoints?.map(cp => <section key={cp.id} className="dm-checkpoint-report"><h4>Checkpoint feedback · {cp.title}</h4><DMFeedback question={cp} answers={checkpointAnswers(answers, cp.id)} onAssess={() => {}} onLearn={onLearn}/></section>)}
    {q.provenance?.marksNote && <p className="small muted">{q.provenance.marksNote}</p>}
    <DMConcept question={q} onLearn={onLearn}/>
  </section>
}
