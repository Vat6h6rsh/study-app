import type { CodeQuestion } from '../data/types'
import { mark, normalizeCode } from './grading.ts'

export const EXPLAIN_KEY = 'exam-desk.explain-code.v1'
export function readExplainCode() {
  try { return localStorage.getItem(EXPLAIN_KEY) === 'true' } catch { return false }
}
export function storeExplainCode(value: boolean) {
  try { localStorage.setItem(EXPLAIN_KEY, String(value)) } catch { /* Preferences are optional. */ }
}
export function blankState(accepted: string[], value: string, revealed = false, mock = false) {
  if (mock) return 'neutral'
  if (revealed) return 'revealed'
  if (!value.trim()) return 'neutral'
  return accepted.some(answer => normalizeCode(answer) === normalizeCode(value)) ? 'correct' : 'wrong'
}
export function markPractice(question: CodeQuestion, answers: Record<string, string>, revealed: string[] = []) {
  const results = mark(question, answers)
  for (const id of revealed) if (Object.hasOwn(results, id)) results[id] = false
  return results
}
