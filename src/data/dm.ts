import manifest from './dm/manifest.json'
import type { MockPaper, Question } from './dm/types'

// Only the manifest decides which arrays are practice. Mocks never enter this pool.
const modules = import.meta.glob('./dm/*.json', { eager: true, import: 'default' }) as Record<string, unknown>
export type DMQuestion = Question & { pool: 'past' | 'original' | 'mock' }
export const dmPracticeQuestions: DMQuestion[] = manifest.practiceFiles.flatMap(file => {
  const questions = modules[`./dm/${file}`]
  if (!Array.isArray(questions)) throw Error(`Missing DM practice file: ${file}`)
  return (questions as Question[]).map(q => ({ ...q, pool: /^Past paper/i.test(q.source) ? 'past' : 'original' }))
})
export const dmMockPapers = modules[`./dm/${manifest.mockFile}`] as MockPaper[]
export const dmQuestions: DMQuestion[] = [...dmPracticeQuestions, ...dmMockPapers.flatMap(p => p.questions.map(q => ({ ...q, pool: 'mock' as const })))]
export const dmCoreTopics = new Set(['logic', 'induction', 'relations', 'posets', 'recurrences', 'graphs', 'mst'])
export const isSlot1 = (q: Pick<Question, 'source' | 'tags' | 'id'>) => /slot[ -]?1/i.test([q.source, q.id, ...(q.tags || [])].join(' '))
