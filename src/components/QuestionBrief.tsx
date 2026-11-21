import { memo, useState } from 'react'
import type { CodeQuestion as Question } from '../data/types'
import { useIsMobile } from '../lib/viewport'

// Only break at sentence boundaries followed by a capital. Preserve code, decimal
// values and the original wording; source-code whitespace is rendered separately.
export function PromptText({ text }: { text: string }) {
  return <div className="prompt-prose">{text.split(/\n\s*\n/).flatMap(block => {
    const sentences = block.trim().split(/(?<=[.!?])\s+(?=[A-Z])/)
    const paragraphs: string[] = []
    for (let i = 0; i < sentences.length; i += 2) paragraphs.push(sentences.slice(i, i + 2).join(' '))
    return paragraphs
  }).filter(Boolean).map((paragraph, i) => <p key={i}>{paragraph}</p>)}</div>
}

// The goal is always visible; rules and extra wording sit behind "Task details" (open on wide screens,
// one tap away on phones), so the program stays the main thing on the page.
export const QuestionBrief = memo(function QuestionBrief({ question }: { question: Question }) {
  const brief = question.brief
  const mobile = useIsMobile()
  const [chosen, setChosen] = useState<boolean | null>(null)
  const rules = brief?.rules ?? []
  const context = !!brief && question.prompt.trim() !== '' && question.prompt.trim() !== brief.goal.trim()
  return <section className="question-brief" aria-label="What this program does">
    <h3 className="brief-label"><span aria-hidden="true">↳</span> What this program does</h3>
    <div className="brief-goal"><PromptText text={brief?.goal || question.prompt}/></div>
    {(rules.length > 0 || context) && <details className="task-details" open={chosen ?? !mobile} onToggle={event => setChosen(event.currentTarget.open)}>
      <summary>Task details{rules.length > 0 ? ` · ${rules.length} rules` : ''}</summary>
      {rules.length > 0 && <div className="brief-rules"><h4>Rules</h4><ul>{rules.map((rule, i) => <li key={i}>{rule}</li>)}</ul></div>}
      {context && <div className="brief-context"><h4>Question details</h4><PromptText text={question.prompt}/></div>}
    </details>}
  </section>
})
