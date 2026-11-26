/** Examdesk DM schema v1. Standalone: intentionally does not import shared types.
 * JSON files contain arrays of Question, except mocks.json (MockPaper[]) and
 * manifest.json (catalogue/coverage metadata). See content/dm/SCHEMA.md.
 */
export type Topic = 'strategy' | 'logic' | 'proofs' | 'induction' | 'relations' | 'posets' | 'recurrences' | 'graphs' | 'mst' | 'counting' | 'sets' | 'groups' | 'cheatsheet';
export type Priority = 'core' | 'past' | 'extra';
export interface SolutionStep { step: number; text: string }
export interface RubricStep { step: number; criterion: string; marks: number }
export interface Edge { id: string; u: string; v: string; weight: number }
export interface Graph { vertices: string[]; edges: Edge[]; directed?: boolean; layout?: Record<string, { x: number; y: number }>; image?: string }
export interface Relation { elements: string[]; pairs: [string, string][] }
export type PosetQuery = 'minimal' | 'maximal' | 'least' | 'greatest' | 'upperBounds' | 'lowerBounds' | 'lub' | 'glb' | 'covers' | 'strictLower' | 'strictUpper';
export type Verification =
  | { kind: 'relation'; relation: Relation; query?: 'class'; element?: string }
  | { kind: 'poset'; relation: Relation; query?: PosetQuery; subset?: string[] }
  | { kind: 'graph'; graph: Graph; query?: 'edges' | 'vertices' | 'components' | 'oddDegrees' | 'chromatic' | 'cutEdges' | 'cutVertices' | 'sccCount' }
  | { kind: 'counting'; operation: 'bitstrings'; length: number; prefix?: string; suffix?: string; mode: 'or' | 'and' }
  | { kind: 'counting'; operation: 'pigeonhole'; boxes: number; occupancy: number }
  | { kind: 'counting'; operation: 'choose'; n: number; r: number }
  | { kind: 'counting'; operation: 'permutations'; n: number; r: number }
  | { kind: 'counting'; operation: 'labelledGraphs'; directed: boolean; loops: boolean }
  | { kind: 'counting'; operation: 'stringsUpTo'; alphabet: number; maxLength: number; plusOne: boolean }
  | { kind: 'knights'; people: string[]; statements: string[]; spies?: boolean }
  | { kind: 'arithmetic'; expression: string }
  | { kind: 'set-operation'; left: string[]; right: string[]; operation: 'union' | 'intersection' | 'difference' | 'product' }
  | { kind: 'complement'; edges: number; complementEdges: number }
  | { kind: 'resonance'; coefficients: number[]; forcingBase: number }
  | { kind: 'logic-false-rows'; variables: string[]; expression: string }
  | { kind: 'relation-options'; relations: Relation[]; required: string[] };
export interface BaseQuestion {
  id: string; subject: 'dm'; topic: Topic; title: string; source: string;
  priority: Priority; difficulty: 'foundation' | 'standard' | 'exam'; marks: number;
  prompt: string; solution: SolutionStep[]; conceptNote: string;
  tags?: string[]; reconstructed?: boolean; reconstructionNote?: string;
  provenance?: { paper: number; question: string; printedMarks: number; marksNote?: string; page: number; image?: string; recoveredFromImage?: string[]; sourceIssue?: string };
  verification?: Verification;
}
/** Grammar: ~, ^ (AND), v (OR), ->, <->, parentheses; variables p,q,r,...
 * Rows enumerate T before F, leftmost variable changes slowest. Each key row
 * contains ONLY the requested columns, in column order. Never use JS eval.
 */
export interface TruthTableQuestion extends BaseQuestion {
  type: 'truth-table'; variables: string[]; columns: string[]; answer: boolean[][];
  followUp?: { prompt: string; options: string[]; correctIndex: number; compareColumns?: [number, number]; classifyColumn?: number };
}
/** Arithmetic grammar: integers, n, + - * / ^ and (). ^ is right associative;
 * unary minus has lower precedence than exponentiation. Explicit * required.
 * Compare at EVERY supplied test point, finite results, relative tolerance 1e-9.
 * This is numerical evidence, not symbolic proof; retain the written derivation.
 */
export interface FormulaQuestion extends BaseQuestion {
  type: 'formula'; answer: string; testPoints: { n: number; expected: number }[];
  recurrence?: { startIndex: number; initial: number[]; coefficients: number[]; forcing: string };
}
/** Numeric answers may be canonical integer strings to preserve >2^53 values.
 * Parse integer strings with BigInt; numeric tolerance is always zero here.
 */
export interface NumericQuestion extends BaseQuestion { type: 'numeric'; answer: number | string; tolerance: 0 }
export interface SetQuestion extends BaseQuestion { type: 'set-answer'; answer: string[]; elementFormat: 'atom' | 'pair' | 'edge'; inputHint: string }
export interface PropertiesQuestion extends BaseQuestion { type: 'properties'; options: string[]; answer: Record<string, boolean> }
export interface PartitionQuestion extends BaseQuestion { type: 'partition'; answer: string[][]; inputHint: string }
/** Trace lists ACCEPTED edges, not rejected candidates. Endpoints undirected.
 * Kruskal: next edge has minimum weight among edges joining distinct components.
 * Prim: next edge has minimum weight crossing reached/unreached cut. Accept ties.
 * Require |V|-1 accepted edges, connectivity and the exact total weight.
 */
export interface MstQuestion extends BaseQuestion { type: 'mst'; graph: Graph; algorithm: 'kruskal' | 'prim'; startVertex?: string; answer: { edgeSequence: string[]; totalWeight: number } }
export interface StepsQuestion extends BaseQuestion { type: 'steps'; rubric: RubricStep[]; checkpoints?: AutoQuestion[] }
export interface McqQuestion extends BaseQuestion { type: 'mcq'; options: string[]; correctIndex: number; optionValues?: (number | boolean | string[])[] }
export type AutoQuestion = TruthTableQuestion | FormulaQuestion | NumericQuestion | SetQuestion | PropertiesQuestion | PartitionQuestion | MstQuestion | McqQuestion;
export type Question = AutoQuestion | StepsQuestion;
export interface MockPaper { id: string; title: string; subject: 'dm'; totalMarks: 50; durationMinutes: number; instructions: string[]; questions: Question[] }
