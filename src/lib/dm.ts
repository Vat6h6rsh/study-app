import type { AutoQuestion, FormulaQuestion, Graph, MstQuestion, Question, SetQuestion } from '../data/dm/types'
import type { Attempt } from './storage'

export type DMAnswers = Record<string, string>
export const DM_EXAM_KEY = 'exam-desk.dm.exam.v1'
export const dmDraftKey = (id: string) => `exam-desk.dm.draft.${id}`
export const dmCellKey = (row: number, col: number) => `cell:${row}:${col}`
export const dmCheckpointPrefix = (id: string) => `checkpoint:${id}:`
export function checkpointAnswers(answers: DMAnswers, id: string): DMAnswers {
  const prefix = dmCheckpointPrefix(id)
  return Object.fromEntries(Object.entries(answers).filter(([key]) => key.startsWith(prefix)).map(([key, value]) => [key.slice(prefix.length), value]))
}

/** Bounded recursive descent. Explicit multiplication; exponentiation precedes unary minus. */
export function evaluateFormula(source: string, n: number): number {
  if (!source.trim() || source.length > 512) throw Error('Enter an expression of at most 512 characters.')
  const tokens = source.match(/\d+|n|[()+*/^-]/g) || []
  if (tokens.join('') !== source.replace(/\s/g, '')) throw Error('Use only integers, n, + - * / ^ and parentheses. Use explicit *.')
  let index = 0, depth = 0
  function nested<T>(fn: () => T): T {
    if (++depth > 64) throw Error('Expression is too deeply nested.')
    try { return fn() } finally { depth-- }
  }
  function atom(): number {
    const token = tokens[index++]
    if (token === 'n') return n
    if (/^\d+$/.test(token || '')) return Number(token)
    if (token === '(') {
      const value = nested(sum)
      if (tokens[index++] !== ')') throw Error('Missing closing parenthesis.')
      return value
    }
    throw Error('Expected an integer, n or parentheses.')
  }
  function power(): number {
    const value = atom()
    if (tokens[index] !== '^') return value
    index++
    return value ** nested(unary)
  }
  function unary(): number {
    if (tokens[index] === '-' || tokens[index] === '+') {
      const negative = tokens[index++] === '-'
      return (negative ? -1 : 1) * nested(unary)
    }
    return power()
  }
  function product(): number {
    let value = unary()
    while (tokens[index] === '*' || tokens[index] === '/') {
      const op = tokens[index++], right = unary()
      value = op === '*' ? value * right : value / right
    }
    return value
  }
  function sum(): number {
    let value = product()
    while (tokens[index] === '+' || tokens[index] === '-') {
      const op = tokens[index++], right = product()
      value = op === '+' ? value + right : value - right
    }
    return value
  }
  const value = sum()
  if (index !== tokens.length) throw Error('Unexpected text. Multiplication needs an explicit *.')
  if (!Number.isFinite(value)) throw Error('The expression must produce a finite number at every test point.')
  return value
}
export function formulaValues(q: FormulaQuestion, source: string) {
  return q.testPoints.map(point => {
    try {
      const value = evaluateFormula(source, point.n)
      return { ...point, value, correct: Math.abs(value - point.expected) <= 1e-9 * Math.max(1, Math.abs(point.expected)) }
    } catch (error) { return { ...point, value: null, correct: false, error: error instanceof Error ? error.message : 'Invalid expression.' } }
  })
}

/** Split only at top level; pair orientation and nested set labels survive. */
export function splitTopLevel(source: string, separators = ',;\n'): string[] {
  source = source.trim()
  const parts: string[] = [], stack: string[] = []
  let start = 0
  const matching: Record<string, string> = { ')': '(', '}': '{', ']': '[' }
  for (let i = 0; i < source.length; i++) {
    const c = source[i]
    if ('({['.includes(c)) stack.push(c)
    else if (')}]'.includes(c)) { if (stack.pop() !== matching[c]) throw Error('Check the brackets in your answer.') }
    else if (!stack.length && separators.includes(c)) { parts.push(source.slice(start, i).trim()); start = i + 1 }
  }
  if (stack.length) throw Error('Check the brackets in your answer.')
  parts.push(source.slice(start).trim())
  if (parts.some(p => !p)) throw Error('Remove empty entries between separators.')
  return parts
}
const compact = (value: string) => value.replace(/\s/g, '')
function unwrap(source: string) {
  const s = source.trim()
  if (!s.startsWith('{') || !s.endsWith('}')) return s
  let depth = 0
  for (let i = 0; i < s.length - 1; i++) { if (s[i] === '{') depth++; if (s[i] === '}') depth--; if (!depth) return s }
  return s.slice(1, -1).trim()
}
function canonicalElement(value: string): string {
  const s = compact(value)
  // Sets used as elements have unordered contents, but ordered pairs remain ordered.
  if (s.startsWith('{') && s.endsWith('}') && unwrap(s) !== s) {
    return s === '{}' ? '{}' : `{${splitTopLevel(unwrap(s)).map(canonicalElement).sort().join(',')}}`
  }
  if (s.startsWith('(') && s.endsWith(')')) return `(${splitTopLevel(s.slice(1, -1)).map(canonicalElement).join(',')})`
  return s
}
const canonicalSet = (values: string[]) => JSON.stringify([...new Set(values)].sort())
export function setMatches(q: SetQuestion, source: string): boolean {
  if (!source.trim()) return false
  try {
    if (/^(NONE|empty|does not exist|∅)$/i.test(source.trim())) return q.answer.length === 0
    const normalize = (s: string) => {
      if (q.elementFormat === 'edge') {
        const g = q.verification?.kind === 'graph' ? q.verification.graph : null
        if (g) return resolveEdge(g, s)?.id || compact(s)
        const ends = compact(s).replace(/^\(|\)$/g, '').split(/[-,]/)
        if (ends.length === 2) return ends.sort().join('-')
      }
      return canonicalElement(s)
    }
    const expected = q.answer.map(normalize)
    // '{}' is a literal poset element. NONE is the unambiguous empty answer.
    const variants = [source.trim()]
    if (unwrap(source) !== source.trim() && source.trim() !== '{}') variants.push(unwrap(source))
    return variants.some(s => canonicalSet(splitTopLevel(s).map(normalize)) === canonicalSet(expected))
  } catch { return false }
}
export function partitionMatches(expected: string[][], source: string): boolean {
  if (!source.trim()) return false
  const normalized = source.trim().replace(/;\s*\n/g, ';').replace(/\r/g, '').replace(/\n\s*\n/g, '\n')
  const parse = (s: string) => {
    try {
      const groups = splitTopLevel(s, s.startsWith('{') ? ',;\n' : ';\n').map(group => splitTopLevel(unwrap(group)).map(canonicalElement))
      const elements = groups.flat()
      if (new Set(elements).size !== elements.length) return false
      return JSON.stringify(groups.map(canonicalSet).sort()) === JSON.stringify(expected.map(g => canonicalSet(g.map(canonicalElement))).sort())
    } catch { return false }
  }
  return parse(normalized) || unwrap(normalized) !== normalized && parse(unwrap(normalized))
}
export function numericMatches(expected: number | string, source: string): boolean {
  const s = source.trim()
  if (!s) return false
  if (/^[+-]?\d+$/.test(String(expected))) {
    if (!/^[+-]?\d+$/.test(s)) return false
    try { return BigInt(s) === BigInt(expected) } catch { return false }
  }
  return /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(s) && Number.isFinite(Number(s)) && Number(s) === Number(expected)
}
export function resolveEdge(graph: Graph, label: string) {
  const s = compact(label).toLowerCase()
  return graph.edges.find(e => [e.id, `${e.u}${e.v}`, `${e.v}${e.u}`, `${e.u}-${e.v}`, `${e.v}-${e.u}`, `(${e.u},${e.v})`, `(${e.v},${e.u})`].some(alias => alias.toLowerCase() === s))
}
export function mstSequence(q: MstQuestion, source: string): string[] {
  if (!source.trim()) return []
  try { return splitTopLevel(source).map(s => resolveEdge(q.graph, s)?.id || s) } catch { return [source] }
}
export function validateMst(q: MstQuestion, sequence: string[]) {
  const parent = new Map(q.graph.vertices.map(v => [v, v]))
  const root = (v: string): string => { while (parent.get(v) !== v) v = parent.get(v)!; return v }
  const reached = new Set([q.startVertex || q.graph.vertices[0]]), chosen = new Set<string>()
  const steps: boolean[] = []
  let weight = 0, error = ''
  for (let i = 0; i < sequence.length; i++) {
    const edge = resolveEdge(q.graph, sequence[i])
    const candidates = q.graph.edges.filter(e => !chosen.has(e.id) && (q.algorithm === 'kruskal' ? root(e.u) !== root(e.v) : reached.has(e.u) !== reached.has(e.v)))
    const minimum = Math.min(...candidates.map(e => e.weight))
    const valid = !error && i < q.graph.vertices.length - 1 && !!edge && candidates.includes(edge) && edge.weight === minimum
    steps.push(valid)
    if (!valid) { error ||= `Step ${i + 1}: ${!edge ? 'unknown edge.' : chosen.has(edge.id) ? 'this edge is already selected.' : q.algorithm === 'kruskal' ? 'choose a minimum-weight edge joining different components.' : 'choose a minimum-weight edge crossing the reached/unreached cut.'}`; continue }
    chosen.add(edge!.id); parent.set(root(edge!.u), root(edge!.v)); reached.add(edge!.u); reached.add(edge!.v); weight += edge!.weight
  }
  const complete = !error && chosen.size === q.graph.vertices.length - 1 && new Set(q.graph.vertices.map(root)).size === 1
  return { steps, weight, complete, error, valid: !error }
}
export function markDM(q: Question, answers: DMAnswers, revealed: string[] = []): Record<string, boolean> {
  let results: Record<string, boolean>
  switch (q.type) {
    case 'truth-table':
      results = Object.fromEntries(q.answer.flatMap((row, r) => row.map((value, c) => [dmCellKey(r, c), answers[dmCellKey(r, c)] === (value ? 'T' : 'F')])))
      if (q.followUp) results.followUp = answers.followUp === String(q.followUp.correctIndex)
      break
    case 'formula': results = { answer: formulaValues(q, answers.answer || '').every(p => p.correct) }; break
    case 'numeric': results = { answer: numericMatches(q.answer, answers.answer || '') }; break
    case 'set-answer': results = { answer: setMatches(q, answers.answer || '') }; break
    case 'partition': results = { answer: partitionMatches(q.answer, answers.answer || '') }; break
    case 'properties': results = Object.fromEntries(q.options.map(option => [option, answers.propertiesConfirmed === 'true' && (answers[`property:${option}`] === 'true') === q.answer[option]])); break
    case 'mcq': results = { answer: answers.answer === String(q.correctIndex) }; break
    case 'mst': {
      const trace = validateMst(q, mstSequence(q, answers.edges || ''))
      results = { trace: trace.complete, total: numericMatches(q.answer.totalWeight, answers.total || '') }
      break
    }
    case 'steps': results = Object.fromEntries(q.rubric.map(r => [`rubric:${r.step}`, !!answers.working?.trim() && answers[`rubric:${r.step}`] === 'true'])); break
  }
  for (const key of revealed) if (key in results) results[key] = false
  return results
}
export function dmScore(q: Question, answers: DMAnswers, revealed: string[] = []) {
  const results = markDM(q, answers, revealed)
  if (q.type === 'steps') return q.rubric.reduce((sum, r) => sum + (results[`rubric:${r.step}`] ? r.marks : 0), 0)
  return q.marks * Object.values(results).filter(Boolean).length / Object.keys(results).length
}
export function dmAttempt(q: Question, answers: DMAnswers, mode: 'practice' | 'exam', id: string = globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`, revealed: string[] = []): Attempt {
  return { id, questionId: q.id, subject: 'dm', topic: q.topic, at: new Date().toISOString(), mode, answers: { ...answers }, results: markDM(q, answers, revealed), score: dmScore(q, answers, revealed), total: q.marks, overrides: [], revealed }
}
export function dmModelAnswers(q: AutoQuestion): DMAnswers {
  switch (q.type) {
    case 'truth-table': return { ...Object.fromEntries(q.answer.flatMap((row, r) => row.map((v, c) => [dmCellKey(r, c), v ? 'T' : 'F']))), ...(q.followUp ? { followUp: String(q.followUp.correctIndex) } : {}) }
    case 'properties': return { propertiesConfirmed: 'true', ...Object.fromEntries(q.options.map(o => [`property:${o}`, String(q.answer[o])])) }
    case 'partition': return { answer: q.answer.map(g => `{${g.join(',')}}`).join('; ') }
    case 'set-answer': return { answer: q.answer.length ? q.answer.join(', ') : 'NONE' }
    case 'mst': return { edges: q.answer.edgeSequence.join(', '), total: String(q.answer.totalWeight) }
    case 'mcq': return { answer: String(q.correctIndex) }
    default: return { answer: String(q.answer) }
  }
}
