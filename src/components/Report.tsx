import { useState } from 'react'
import type { CodeQuestion as Question } from '../data/types'
import type { Attempt } from '../lib/storage'
import { AnswerFeedback } from './Delight'
import { ConceptNote } from './ConceptNote'

export function Report({ question, attempt, onOverride, onLearn, celebrate = false, animate = false }: { question: Question; attempt: Attempt; onOverride: (attemptId: string, blankId: string) => void; onLearn?: (topic: string) => void; celebrate?: boolean; animate?: boolean }) {
  const [announcement, setAnnouncement] = useState('')
  function equivalent(id: string) {
    if (attempt.results[id] || attempt.revealed?.includes(id)) return
    onOverride(attempt.id, id)
    setAnnouncement(`${id === 'output' ? 'Output' : `Blank ${question.blanks.findIndex(b => b.id === id) + 1}`} self-marked as equivalent. Score and progress updated.`)
  }
  const entries = Object.values(attempt.results)
  const correct = entries.filter(Boolean).length
  return <section className="report" aria-label="Marked answers">
    <p className="sr-only" role="status">{announcement}</p>
    <AnswerFeedback correct={correct} total={entries.length} burst={attempt.id} celebrate={celebrate} revealed={attempt.revealed?.length}/>
    <div className="report-heading"><div><p className="eyebrow">Your result</p><h3>{correct === entries.length ? 'All answers correct' : 'Review your answers'}</h3></div><span className={`score${animate ? ' score-pulse' : ''}`}><span className="sr-only">{correct} of {entries.length} answers correct</span><span aria-hidden="true">{correct}<small> / {entries.length}</small></span></span></div>
    {question.type === 'output' ? <>
      <div className={`result-row ${attempt.results.output ? 'correct' : 'wrong'}`}><strong>{attempt.results.output ? '✓ Correct output' : '× Output differs'}{attempt.overrides.includes('output') ? ' · self-marked' : ''}</strong>{(!attempt.results.output || attempt.overrides.includes('output')) && <button type="button" className="text-button" aria-disabled={attempt.results.output} onClick={() => equivalent('output')}>{attempt.results.output ? 'Marked correct' : 'Mark output as equivalent'}</button>}</div>
      <div className="output-compare"><div><h4>Your output</h4><pre>{attempt.answers.output || '(empty output)'}</pre></div><div><h4>Expected output</h4><pre>{question.expectedOutput || '(empty output)'}</pre><small>{question.expectedOutput?.endsWith('\n') ? 'Ends with a newline.' : 'No final newline.'}</small></div></div>
      <h4>Step-by-step trace</h4><ol className="trace">{question.trace.map((step, i) => <li key={i}>{step}</li>)}</ol>
    </> : <div className="answer-list">{question.blanks.map((blank, index) => <article key={blank.id} className={`answer-card ${attempt.revealed?.includes(blank.id) ? 'revealed' : attempt.results[blank.id] ? 'correct' : 'wrong'}`}>
      <div className="answer-label"><strong>Blank {index + 1}</strong><span>{attempt.revealed?.includes(blank.id) ? 'Revealed · no mark' : attempt.results[blank.id] ? '✓ Correct' : '× Answer differs'}{attempt.overrides.includes(blank.id) ? ' · self-marked' : ''}</span>{!attempt.revealed?.includes(blank.id) && (!attempt.results[blank.id] || attempt.overrides.includes(blank.id)) && <button type="button" className="text-button" aria-label={attempt.results[blank.id] ? `Blank ${index + 1} marked correct` : `Mark blank ${index + 1} as equivalent`} aria-disabled={attempt.results[blank.id]} onClick={() => equivalent(blank.id)}>{attempt.results[blank.id] ? 'Marked correct' : 'Mark as equivalent'}</button>}</div>
      <p className="submitted-answer">Your answer: <code>{attempt.answers[blank.id] || '(left blank)'}</code></p>
      <p>Accepted: {blank.accepted.map((answer, index) => <code className="accepted-answer" key={index}>{answer}</code>)}</p>
      <p className="explanation">{blank.explanation}</p>
    </article>)}</div>}
    {question.notes && <details className="source-notes"><summary>Source notes, repairs & alternate answers</summary><div>{question.notes}</div></details>}
    {onLearn && <ConceptNote key={question.id} question={question} onLearn={onLearn}/>}
    <p className="small muted">Equivalent code can be self-marked. An override updates this attempt and your saved progress.{!!attempt.revealed?.length && ' Revealed answers earn no mark; try again for a fresh attempt.'}</p>
  </section>
}
