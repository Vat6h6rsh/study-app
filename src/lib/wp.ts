import type { WPQuestion, GrammarQuestion } from '../data/types'

export const stripHighlights = (text: string) => text.replace(/==/g, '')
export const wordCount = (text: string) => stripHighlights(text).trim().split(/\s+/u).filter(Boolean).length
export const normalizeSentence = (text: string) => stripHighlights(text).trim().replace(/\s+/gu, ' ').replace(/[.!?;:,]+$/u, '').toLocaleLowerCase('en')
const tokens = (text: string) => stripHighlights(text).match(/[\p{L}\p{N}]+(?:['’][\p{L}]+)?|[^\s\p{L}\p{N}]/gu) || []
const phrase = (text: string, needle: string) => {
  const hay = tokens(text).map(t => t.toLowerCase()), key = tokens(needle).map(t => t.toLowerCase())
  return key.length > 0 && hay.some((_, i) => key.every((t, j) => t === hay[i + j]))
}
export function grammarMatches(q: GrammarQuestion, text: string): Record<string, boolean> {
  return Object.fromEntries(q.errors.map(e => [e.id, [e.correction, ...(e.accepted || [])].some(c => phrase(text, c)) && !phrase(text, e.error)]))
}
export function markWP(q: WPQuestion, answers: Record<string, string>): Record<string, boolean> {
  switch (q.type) {
    case 'writing': return Object.fromEntries(q.rubric.map(r => [r.id, answers['rubric:' + r.id] === 'true']))
    case 'abstract-parts': return Object.fromEntries(q.parts.map(p => [p.id, p.accepted.some(key => normalizeSentence(key) === normalizeSentence(answers[p.id] || ''))]))
    case 'grammar-rewrite': return grammarMatches(q, answers.text ?? q.original)
    case 'mcq': return { answer: answers.answer === q.answer }
    case 'match': return Object.fromEntries(q.items.map(i => [i.id, answers[i.id] === i.answer]))
  }
}
export function wpScore(q: WPQuestion, answers: Record<string, string>, results = markWP(q, answers)) {
  if (q.type === 'writing') return q.rubric.reduce((n, r) => n + (results[r.id] ? r.marks : 0), 0)
  if (q.type === 'grammar-rewrite' && answers.selfScore?.trim() && Number.isFinite(Number(answers.selfScore))) return Math.max(0, Math.min(q.marks, Number(answers.selfScore)))
  return q.marks * Object.values(results).filter(Boolean).length / Object.keys(results).length
}
export function initialWPAnswers(q: WPQuestion): Record<string, string> { return q.type === 'grammar-rewrite' ? { text: q.original } : {} }
export function highlightSelection(text: string, start: number, end: number) {
  if (end <= start) return text
  return text.slice(0, start) + '==' + text.slice(start, end) + '==' + text.slice(end)
}
export interface DiffToken { text: string; kind: 'same' | 'missing' | 'extra' }
// Longest common subsequence includes punctuation; cap input to keep pasted essays responsive.
export function wordDiff(student: string, key: string): DiffToken[] {
  const a = tokens(student).slice(0, 700), b = tokens(key).slice(0, 700)
  const grid = Array.from({ length: a.length + 1 }, () => new Uint16Array(b.length + 1))
  for (let i = a.length - 1; i >= 0; i--) for (let j = b.length - 1; j >= 0; j--) grid[i][j] = a[i] === b[j] ? 1 + grid[i + 1][j + 1] : Math.max(grid[i + 1][j], grid[i][j + 1])
  const result: DiffToken[] = []; let i = 0, j = 0
  while (i < a.length || j < b.length) {
    if (i < a.length && j < b.length && a[i] === b[j]) { result.push({ text: a[i++], kind: 'same' }); j++ }
    else if (j < b.length && (i === a.length || grid[i][j + 1] >= grid[i + 1][j])) result.push({ text: b[j++], kind: 'missing' })
    else result.push({ text: a[i++], kind: 'extra' })
  }
  return result
}
export const wpDraftKey = (id: string) => `exam-desk.wp.draft.${id}`
export const WP_EXAM_KEY = 'exam-desk.wp.exam.v1'
export const SUBJECT_KEY = 'exam-desk.subject.v1'
export const wpPartFormat = [
  ['Q1A', 'essay', 6], ['Q1B', 'paraphrase', 4], ['Q2A', 'email', 6], ['Q2B', 'questionnaire', 4],
  ['Q3A', 'graph', 5], ['Q3B', 'summary', 5], ['Q4', 'report', 10], ['Q5A', 'abstract-parts', 4], ['Q5B', 'grammar-rewrite', 6],
] as const
export function writingSubmission(q: WPQuestion, answers: Record<string, string>, seconds: number) { return { questionId: q.id, answers, seconds: Math.max(0, Math.round(seconds)) } }
export async function saveWriting(parts: ReturnType<typeof writingSubmission>[], paperId?: string) {
  const response = await fetch('/api/save-writing', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ parts, paperId }) })
  if (!response.headers.get('content-type')?.includes('application/json')) throw Error('Save for grading needs npm run dev. Your browser draft is still available.')
  const data = await response.json()
  if (!response.ok || data.error) throw Error(data.error || 'Could not save. Your answer is still available.')
  return data as { file: string }
}
