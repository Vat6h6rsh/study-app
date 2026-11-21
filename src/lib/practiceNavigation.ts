import type { Question, Subject } from '../data/types'
import type { Attempt } from './storage'

export type PriorityFilter = 'all' | 'core' | 'extra'
const difficulty = { Foundation: 0, Exam: 1, Challenge: 2 }
const bank = { past: 0, original: 1, mock: 2 }
export function sortPractice<T extends Question>(pool: T[]) {
  return [...pool].sort((a, b) =>
    // WP opens with the historical full task; its type filter still offers Foundation drills.
    (a.subject === 'wp' && b.subject === 'wp' ? bank[a.pool] - bank[b.pool] : 0) ||
    ('priority' in a && 'priority' in b ? Number(a.priority === 'extra') - Number(b.priority === 'extra') : 0) ||
    difficulty[a.difficulty] - difficulty[b.difficulty] || bank[a.pool] - bank[b.pool])
}
export function topicGroups<T extends Question>(pool: T[], topics: Subject['topics']) {
  return topics.map(topic => ({ ...topic, questions: sortPractice(pool.filter(q => q.topic === topic.id)) })).filter(group => group.questions.length)
}
export function questionProgress(pool: Question[], attempts: Attempt[]) {
  const latest = new Map(attempts.map(attempt => [attempt.questionId, attempt]))
  const done = pool.filter(q => latest.has(q.id))
  const isCorrect = (q: Question) => {
    const a = latest.get(q.id)
    return !!a && (a.score !== undefined && a.total !== undefined ? a.total > 0 && a.score >= a.total : Object.keys(a.results).length > 0 && Object.values(a.results).every(Boolean))
  }
  const correct = done.filter(isCorrect).length
  const core = pool.filter(q => 'priority' in q && q.priority === 'core')
  return { done: done.length, correct, revisit: done.length - correct, coreCount: core.length, coreDone: core.filter(q => latest.has(q.id)).length }
}
