import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

export async function verifyITPMethods(questions, papers) {
  const methods = JSON.parse(await readFile(new URL('../src/data/itp/methods.json', import.meta.url), 'utf8'))
  const document = await readFile(new URL('../content/itp/method-coverage.md', import.meta.url), 'utf8')
  const catalog = new Map(methods.map(method => [method.id, method]))
  assert.equal(catalog.size, methods.length, 'Unique method IDs')
  for (const q of questions) {
    assert(['core', 'extra'].includes(q.priority), `${q.id}: required Core/Extra priority`)
    assert(Array.isArray(q.methods) && q.methods.length && new Set(q.methods).size === q.methods.length, `${q.id}: method tags required and unique`)
    for (const method of q.methods) assert(catalog.has(method), `${q.id}: unknown method ${method}`)
    if (q.mainMethods) assert(q.mainMethods.length >= 1 && q.mainMethods.length <= 3 && q.mainMethods.every(m => q.methods.includes(m)), `${q.id}: 1–3 main methods drawn from tags`)
    if (q.pool === 'past' || q.pattern && q.pool !== 'mock') assert.equal(q.priority, 'core', `${q.id}: past / P1–P5 are Core`)
    if (q.id.startsWith('exam21-') || /^mock-[def]/.test(q.id)) {
      const lines = q.code.trimEnd().split('\n').length
      assert(lines >= 20 && lines <= 45, `${q.id}: complete 20–45-line exam program`)
      assert(/^[^,]+, .+ and .+$/.test(q.title), `${q.id}: descriptive combined-concept title`)
      assert(q.runnable && !q.stdin && !/\bscanf\s*\(/.test(q.code), `${q.id}: runnable, hard-coded data, no stdin`)
      assert(q.brief.rules.length >= 2 && q.brief.goal.length >= 40, `${q.id}: detailed goal and rules`)
      assert.equal(typeof q.expectedOutput, 'string', `${q.id}: deterministic expected output`)
      assert(document.includes(`- ${q.id} (`), `${q.id}: listed in supervisor compiler manifest`)
    }
  }
  let starred = 0
  for (const method of methods) {
    assert([1, 2].includes(method.minimum) && ['core', 'extra'].includes(method.priority), method.id)
    assert.equal(method.priority === 'core', method.sources.length > 0, `${method.id}: priority needs source evidence`)
    const practice = questions.filter(q => q.type === 'blanks' && q.pool !== 'mock' && q.methods.includes(method.id))
    assert(practice.length >= method.minimum, `${method.id}: needs ${method.minimum} distinct practice questions, has ${practice.length}`)
    const row = document.split('\n').find(line => line.startsWith(`| ${method.label}${method.minimum === 2 ? ' *' : ''} |`))
    assert(row, `${method.id}: coverage document row`)
    for (const q of practice) assert(row.includes(q.id), `${method.id}: missing documented ${q.id}`)
    if (method.minimum === 2) starred++
  }
  const freshPractice = questions.filter(q => q.id.startsWith('exam21-') && q.pool === 'original')
  assert(freshPractice.length >= 30, 'At least 30 new exam-pattern practice questions')
  for (const family of ['P1','P2','P3','P4','P5']) assert(freshPractice.filter(q => q.pattern === family).length >= 3, `${family}: at least three practice variants`)
  for (const letter of ['d','e','f']) {
    const paper = papers.find(p => p.id === `mock-${letter}`)
    assert(paper, `Mock ${letter.toUpperCase()} required`)
    assert.equal(paper.priority, letter === 'f' ? 'extra' : 'core')
    for (const [i, id] of paper.questionIds.entries()) {
      const q = questions.find(q => q.id === id)
      assert(q && q.pool === 'mock' && q.priority === paper.priority)
      if (letter !== 'f') assert.equal(q.pattern, `P${i + 1}`, `${paper.id}: preserve P1..P5 order`)
    }
  }
  for (let slot = 1; slot <= 5; slot++) {
    const d = questions.find(q => q.id === `mock-d${slot}`), e = questions.find(q => q.id === `mock-e${slot}`)
    assert(d.mainMethods.every(m => !e.mainMethods.includes(m)), `D/E slot ${slot}: different main methods`)
  }
  const de = new Set(questions.filter(q => /^mock-[de]/.test(q.id)).flatMap(q => q.mainMethods))
  for (const q of questions.filter(q => /^mock-f/.test(q.id))) assert(q.mainMethods.every(m => !de.has(m)), `${q.id}: main methods extend D/E`)
  console.log(`Method coverage passed: ${methods.length} methods (${starred} require two practice programs); ${freshPractice.length} new practice questions; exclusive ordered D/E and mixed F.`)
}
