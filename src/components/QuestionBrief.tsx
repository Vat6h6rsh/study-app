import { useState } from 'react'
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

// Progressive disclosure on phones: the brief is open by default and can be folded away
// once understood, so the code is reachable without a long scroll. From 48rem it is always open.
export function QuestionBrief({ question }: { question: Question }) {
  const brief = question.brief
  const mobile = useIsMobile()
  const [open, setOpen] = useState(true)
  return <section className="question-brief" aria-label="What this program does">
    <details open={!mobile || open} onToggle={event => { if (mobile) setOpen(event.currentTarget.open) }}>
      <summary className="brief-summary" onClick={event => { if (!mobile) event.preventDefault() }}><h3><span aria-hidden="true">↳</span> What this program does</h3></summary>
      <div className="brief-goal"><PromptText text={brief?.goal || question.prompt}/></div>
      {brief && brief.rules.length > 0 && <div className="brief-rules"><h4>Rules</h4><ul>{brief.rules.map((rule, i) => <li key={i}>{rule}</li>)}</ul></div>}
      {brief && question.prompt.trim() && question.prompt.trim() !== brief.goal.trim() && <div className="brief-context"><h4>Question details</h4><PromptText text={question.prompt}/></div>}
    </details>
  </section>
}
