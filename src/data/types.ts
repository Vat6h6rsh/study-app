export interface Blank {
  id: string
  accepted: string[]
  explanation: string
}
export interface CodeQuestion {
  id: string
  subject: string
  topic: string
  title: string
  source: string
  difficulty: 'Foundation' | 'Exam' | 'Challenge'
  pool: 'past' | 'original' | 'mock'
  priority: 'core' | 'extra'
  /** Audited IDs from itp/methods.json. Coverage gates exclude mocks and output drills. */
  methods: string[]
  mainMethods?: string[]
  set?: string
  pattern?: 'P1' | 'P2' | 'P3' | 'P4' | 'P5'
  type: 'blanks' | 'output'
  prompt: string
  /** Short, answer-free concept note (2–4 sentences); falls back to the topic lesson. */
  concept?: string
  code: string
  blanks: Blank[]
  /** Comments placed above a 1-based line of the original code, without disclosing keys. */
  explanations?: { line: number; text: string }[]
  expectedOutput?: string
  trace: string[]
  notes?: string
  runnable: boolean
  stdin: string
  fixtures?: Record<string, string>
  expectedFiles?: Record<string, string>
  verified?: boolean
  /** Plain-English task brief shown above the code, like a real exam question statement. */
  brief?: QuestionBrief
}
export interface QuestionBase {
  id: string
  subject: 'wp'
  topic: string
  title: string
  source: string
  difficulty: 'Foundation' | 'Exam' | 'Challenge'
  pool: 'past' | 'original' | 'mock'
  prompt: string
  partLabel: string
  marks: number
  suggestedMinutes: number
  notes?: string
  originalMarks?: number
  originalPrompt?: string
}
export interface RubricItem { id: string; label: string; marks: number }
export interface ChartSpec {
  kind: 'bar' | 'line' | 'pie' | 'table'
  title: string
  xLabel: string
  yLabel: string
  labels: string[]
  series: { name: string; values: number[] }[]
  note?: string
}
export type WritingTask = 'essay' | 'paraphrase' | 'email' | 'questionnaire' | 'graph' | 'summary' | 'report'
export interface WritingQuestion extends QuestionBase {
  type: 'writing'
  task: WritingTask
  wordTarget?: { min: number; max: number }
  passage?: string
  chart?: ChartSpec
  image?: string
  modelAnswer: string
  annotations: string[]
  rubric: RubricItem[]
  checklist: string[]
  questionnaire?: { open: string[]; closed: string[]; intro: string }
}
export interface AbstractQuestion extends QuestionBase {
  type: 'abstract-parts'
  abstract: string
  parts: { id: string; name: string; accepted: string[]; explanation: string }[]
}
export interface GrammarQuestion extends QuestionBase {
  type: 'grammar-rewrite'
  original: string
  corrected: string
  errors: { id: string; error: string; correction: string; rule: string; accepted?: string[] }[]
  explanation: string
}
export interface McqQuestion extends QuestionBase {
  type: 'mcq'
  options: { id: string; text: string; explanation: string }[]
  answer: string
}
export interface MatchQuestion extends QuestionBase {
  type: 'match'
  categories: string[]
  items: { id: string; text: string; answer: string; explanation: string }[]
}
export type WPQuestion = WritingQuestion | AbstractQuestion | GrammarQuestion | McqQuestion | MatchQuestion
export type Question = CodeQuestion | WPQuestion | import('./dm').DMQuestion
export interface QuestionBrief {
  /** One or two short sentences: what the finished program does. */
  goal: string
  /** The rules the code must follow: formulas, conditions, definitions, loop ranges, file names/modes. Short bullet-style strings. */
  rules: string[]
  /** Optional worked sample, e.g. input -> output, exactly as the program prints it. */
  sample?: { input?: string; output: string }
}
export interface Subject {
  id: string
  shortName: string
  name: string
  code?: string
  active: boolean
  topics: { id: string; name: string; priority: 'High' | 'Medium' }[]
}
export interface MockPaper { id: string; subject: string; title: string; description: string; questionIds: string[]; priority?: 'core' | 'extra' }
