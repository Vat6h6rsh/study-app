import manifest from './dm/manifest.json'
import lessonText from './dm/lessons.json'
import type { MockPaper, Question } from './dm/types'

// Only the manifest decides which arrays are practice. Mocks never enter this pool.
const modules = import.meta.glob('./dm/*.json', { eager: true, import: 'default' }) as Record<string, unknown>
// Teacher-style lessons live beside (not inside) the generated question files so regeneration cannot wipe them.
const lessons = lessonText as Record<string, string>
const withLesson = <T extends Question>(q: T): T => lessons[q.id]?.trim() ? { ...q, lesson: lessons[q.id] } : q
export type DMQuestion = Question & { pool: 'past' | 'original' | 'mock' }
export const dmPracticeQuestions: DMQuestion[] = manifest.practiceFiles.flatMap(file => {
  const questions = modules[`./dm/${file}`]
  if (!Array.isArray(questions)) throw Error(`Missing DM practice file: ${file}`)
  return (questions as Question[]).map(q => ({ ...withLesson(q), pool: /^Past paper/i.test(q.source) ? 'past' : 'original' }))
})
export const dmMockPapers = (modules[`./dm/${manifest.mockFile}`] as MockPaper[]).map(p => ({ ...p, questions: p.questions.map(withLesson) }))
export const dmQuestions: DMQuestion[] = [...dmPracticeQuestions, ...dmMockPapers.flatMap(p => p.questions.map(q => ({ ...q, pool: 'mock' as const })))]
export const dmCoreTopics = new Set(['logic', 'induction', 'relations', 'posets', 'recurrences', 'graphs', 'mst'])
export const isSlot1 = (q: Pick<Question, 'source' | 'tags' | 'id'>) => /slot[ -]?1/i.test([q.source, q.id, ...(q.tags || [])].join(' '))
