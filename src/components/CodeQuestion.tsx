import { useId, useRef } from 'react'
import type { CodeQuestion as Question } from '../data/types'

interface Props { question: Question; answers: Record<string, string>; onChange: (id: string, value: string) => void; locked?: boolean; results?: Record<string, boolean>; submitId?: string; feedback?: boolean }
export function CodeQuestion({ question, answers, onChange, locked, results, submitId = 'practice-submit', feedback = false }: Props) {
  const container = useRef<HTMLDivElement>(null)
  const helpId = useId()
  const seen = new Set<string>()
  return <div className={`code-editor${feedback ? ' feedback-live' : ''}`} ref={container}>
    <div className="editor-top"><span><i className="file-dot" />{question.type === 'blanks' ? 'complete.c' : 'predict.c'}</span><span>C11</span></div>
    <div className="code-scroll" tabIndex={0} role="region" aria-label="C program, scroll horizontally for long lines"><div className="code-lines">{question.code.trimEnd().split('\n').map((line, index) => <div className="code-line" key={index}>
      <span className="line-number" aria-hidden="true">{index + 1}</span><code>{line.split(/(__[A-Z]__)/g).map((part, partIndex) => {
        const match = /^__([A-Z])__$/.exec(part)
        if (!match) return <span key={partIndex}>{part}</span>
        const id = match[1]
        const repeated = seen.has(id)
        seen.add(id)
        return <label className={`inline-blank ${results ? results[id] ? 'is-correct' : 'is-wrong' : ''}`} key={partIndex}>
          <span aria-hidden="true">{id}</span><input aria-label={`Blank ${id}${repeated ? ' (repeated, shares the same answer)' : ''}${results ? results[id] ? ', correct' : ', answer differs; review marked answers below' : ''}${locked ? ', marked and read only' : ''}`} aria-describedby={helpId} data-blank={id} autoComplete="off" autoCapitalize="off" spellCheck={false} readOnly={locked} value={answers[id] || ''} style={{ width: `${Math.min(48, Math.max(10, (answers[id] || '').length + 2))}ch` }} onChange={event => onChange(id, event.target.value)} onKeyDown={event => {
            if (event.key !== 'Enter' || locked) return
            event.preventDefault()
            const inputs = [...container.current!.querySelectorAll<HTMLInputElement>('input')]
            const next = inputs.slice(inputs.indexOf(event.currentTarget) + 1).find(input => input.dataset.blank !== id)
            if (next) { next.focus(); next.select() }
            else document.getElementById(submitId)?.focus()
          }} />{results && <span className="blank-verdict" aria-hidden="true">{results[id] ? '✓' : '✗'}</span>}
        </label>
      })}</code>
    </div>)}</div></div>
    <div className="editor-bottom"><span>{question.code.trimEnd().split('\n').length} lines</span><span id={helpId}>{question.type === 'blanks' ? locked ? 'Marked answers are read only. Review the explanations below.' : 'Answers may be left blank. Enter moves to the next blank.' : 'Read first. Trace one statement at a time.'}</span></div>
  </div>
}
