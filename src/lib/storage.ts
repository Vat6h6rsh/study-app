export interface Attempt {
  id: string
  questionId: string
  subject: string
  topic: string
  at: string
  mode: 'practice' | 'exam'
  answers: Record<string, string>
  results: Record<string, boolean>
  overrides: string[]
  revealed?: string[]
  score?: number
  total?: number
}
export interface Progress { version: 1; attempts: Attempt[] }
export const PROGRESS_KEY = 'exam-desk.progress.v1'
export const EXAM_KEY = 'exam-desk.exam.v1'
export function readSaved<T>(key: string): T | null {
  try { const value = localStorage.getItem(key); return value ? JSON.parse(value) as T : null } catch { return null }
}
export function save(key: string, value: unknown): boolean {
  try { localStorage.setItem(key, JSON.stringify(value)); return true } catch { return false }
}
export function remove(key: string): boolean {
  try { localStorage.removeItem(key); return true } catch { return false }
}
export function loadProgress(): Progress {
  const data = readSaved<Progress>(PROGRESS_KEY)
  if (data?.version !== 1 || !Array.isArray(data.attempts)) return { version: 1, attempts: [] }
  return { version: 1, attempts: data.attempts.filter(a => a && typeof a.id === 'string' && typeof a.questionId === 'string' && typeof a.topic === 'string' && typeof a.subject === 'string' && typeof a.at === 'string' && (a.mode === 'practice' || a.mode === 'exam') && a.answers && Object.values(a.answers).every(x => typeof x === 'string') && a.results && Object.keys(a.results).length > 0 && Object.values(a.results).every(x => typeof x === 'boolean') && Array.isArray(a.overrides) && (a.score === undefined || typeof a.score === 'number' && Number.isFinite(a.score) && a.score >= 0 && typeof a.total === 'number' && Number.isFinite(a.total) && a.total > 0 && a.score <= a.total) && (a.total === undefined || typeof a.total === 'number' && Number.isFinite(a.total) && a.total > 0)) }
}
export function latestMistakes(attempts: Attempt[]) {
  const latest = new Map<string, Attempt>()
  for (const attempt of attempts) latest.set(attempt.questionId, attempt)
  return [...latest.values()].filter(a => typeof a.score === 'number' && typeof a.total === 'number' ? a.score < a.total : Object.values(a.results).some(result => !result))
}
export function accuracy(attempts: Attempt[]) {
  const total = attempts.reduce((n,a) => n + (typeof a.total === 'number' ? a.total : Object.keys(a.results).length), 0)
  const correct = attempts.reduce((n,a) => n + (typeof a.score === 'number' ? a.score : Object.values(a.results).filter(Boolean).length), 0)
  return { total, correct, percent: total ? Math.round(correct / total * 100) : null }
}
