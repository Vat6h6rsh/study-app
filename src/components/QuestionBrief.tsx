import type { CodeQuestion as Question } from '../data/types'

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

export function QuestionBrief({ question }: { question: Question }) {
  const brief = question.brief
  return <section className="question-brief" aria-label="What this program does">
    <h3><span aria-hidden="true">↳</span> What this program does</h3>
    <div className="brief-goal"><PromptText text={brief?.goal || question.prompt}/></div>
    {brief && brief.rules.length > 0 && <div className="brief-rules"><h4>Rules</h4><ul>{brief.rules.map((rule, i) => <li key={i}>{rule}</li>)}</ul></div>}
    {brief?.sample && <div className="brief-sample">{brief.sample.input !== undefined && <div><h4>Sample input</h4><pre>{brief.sample.input || '(no input)'}</pre></div>}<div><h4>Sample output</h4><pre>{brief.sample.output || '(no output)'}</pre></div></div>}
    {brief && question.prompt.trim() && question.prompt.trim() !== brief.goal.trim() && <div className="brief-context"><h4>Question details</h4><PromptText text={question.prompt}/></div>}
  </section>
}
