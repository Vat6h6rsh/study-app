import type { CodeQuestion, Question } from '../data/types'
import { markWP } from './wp.ts'
export const normalizeCode = (value: string) => value.replace(/\s/g, '').replace(/;+$/, '')
// Line breaks and leading whitespace matter; CRLF is equivalent to LF.
export const normalizeOutput = (value: string) => value.replace(/\r\n/g, '\n').split('\n').map(line => line.replace(/[\t ]+$/, '')).join('\n')
export function mark(question: Question, answers: Record<string, string>): Record<string, boolean> {
  if ('partLabel' in question) return markWP(question, answers)
  if (question.type === 'output') return { output: normalizeOutput(answers.output || '') === normalizeOutput(question.expectedOutput || '') }
  return Object.fromEntries(question.blanks.map(blank => [blank.id, blank.accepted.some(answer => normalizeCode(answer) === normalizeCode(answers[blank.id] || ''))]))
}
export function filledCode(question: CodeQuestion, answers: Record<string, string>) {
  return question.code.replace(/__([A-Z])__/g, (_, id: string) => {
    const answer = answers[id] || ''
    const expected = question.blanks.find(blank => blank.id === id)?.accepted[0] || ''
    // A semicolon outside a token should not be supplied twice, but full statement blanks retain theirs.
    if (/;\s*$/.test(expected)) return answer.trim() && !/;\s*$/.test(answer) ? answer + ';' : answer
    return answer.replace(/;+\s*$/, '')
  })
}
