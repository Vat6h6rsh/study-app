import type { CodeQuestion, MockPaper, Question, Subject } from './types'
import past from './itp/past.json'
import original from './itp/original.json'
import mocks from './itp/mocks.json'
import papers from './itp/papers.json'

import wpPast from './wp/past.json'
import wpOriginal from './wp/original.json'
import wpMocks from './wp/mocks.json'
import wpPapers from './wp/papers.json'
import { dmQuestions, dmCoreTopics } from './dm'
import { dmConcepts } from './concepts'

export const subjects: Subject[] = [
  { id: 'itp', shortName: 'ITP', name: 'Introduction to Programming', code: 'BCS ZC313', active: true, topics: [
    { id: 'structs', name: 'Structs & records', priority: 'High' },
    { id: 'memory', name: 'Dynamic memory', priority: 'High' },
    { id: 'arrays', name: 'Arrays, sorting & search', priority: 'High' },
    { id: 'matrices', name: '2D arrays & matrices', priority: 'High' },
    { id: 'strings', name: 'Strings & characters', priority: 'High' },
    { id: 'files', name: 'File handling', priority: 'High' },
    { id: 'pointers', name: 'Pointers & references', priority: 'High' },
    { id: 'loops', name: 'Loops & digit algorithms', priority: 'High' },
    { id: 'functions', name: 'Functions & recursion', priority: 'High' },
    { id: 'operators', name: 'Operators & conversions', priority: 'Medium' },
    { id: 'scope', name: 'Scope & storage', priority: 'Medium' },
  ] },
  { id: 'dm', shortName: 'DM', name: 'Discrete Mathematics', code: 'BCS ZC219', active: true, topics: dmConcepts.filter(n => dmQuestions.some(q => q.topic === n.id)).map(n => ({ id: n.id, name: n.title, priority: dmCoreTopics.has(n.id) ? 'High' as const : 'Medium' as const })) },
  { id: 'wp', shortName: 'WP', name: 'Writing Practice', code: 'BCS ZC239', active: true, topics: [
    { id: 'essay', name: 'Q1A · Argumentative essay', priority: 'High' },
    { id: 'paraphrase', name: 'Q1B · Paraphrasing', priority: 'High' },
    { id: 'email', name: 'Q2A · Formal email', priority: 'High' },
    { id: 'questionnaire', name: 'Q2B · Questionnaire', priority: 'High' },
    { id: 'graph', name: 'Q3A · Graphs and tables', priority: 'High' },
    { id: 'summary', name: 'Q3B · Summarising', priority: 'High' },
    { id: 'report', name: 'Q4 · Investigation report', priority: 'High' },
    { id: 'abstracts', name: 'Q5A · Abstract parts', priority: 'High' },
    { id: 'grammar', name: 'Q5B · Grammar correction', priority: 'High' },
    { id: 'style', name: 'Academic style and vocabulary', priority: 'Medium' }
  ] },
]
export const codeQuestions = [...past, ...original, ...mocks] as CodeQuestion[]
export const codeQuestionById = new Map(codeQuestions.map(q => [q.id, q]))
export const codePracticeQuestions = codeQuestions.filter(q => q.pool !== 'mock')
export const questions = [...codeQuestions, ...wpPast, ...wpOriginal, ...wpMocks, ...dmQuestions] as Question[]
export const mockPapers = [...papers, ...wpPapers] as MockPaper[]
export const practiceQuestions = questions.filter(q => q.pool !== 'mock')
export const questionById = new Map(questions.map(q => [q.id, q]))
