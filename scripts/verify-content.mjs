import './verify-wp.mjs'
import { readFile, writeFile } from 'node:fs/promises'
import assert from 'node:assert/strict'
import { findGcc, runC } from '../server/run-c.mjs'

const paths = ['past', 'original', 'mocks'].map(name => new URL(`../src/data/itp/${name}.json`, import.meta.url))
const pools = await Promise.all(paths.map(path => readFile(path, 'utf8').then(JSON.parse)))
const questions = pools.flat()
const papers = JSON.parse(await readFile(new URL('../src/data/itp/papers.json', import.meta.url), 'utf8'))
const coverage = JSON.parse(await readFile(new URL('../src/data/itp/coverage.json', import.meta.url), 'utf8'))
const ids = new Set()
for (const q of questions) {
  assert(!ids.has(q.id), `Duplicate question ${q.id}`); ids.add(q.id)
  const markers = [...q.code.matchAll(/__([A-Z])__/g)].map(m => m[1])
  const tokens = [...new Set(markers)].sort()
  assert.deepEqual(tokens, q.blanks.map(b => b.id).sort(), `Token mismatch ${q.id}`)
  assert(q.title && q.source && q.topic && q.prompt && q.trace.length && typeof q.runnable === 'boolean', `Metadata ${q.id}`)
  for (const b of q.blanks) assert(b.accepted.length && b.accepted.every(x => typeof x === 'string' && x.length) && b.explanation, `${q.id} blank ${b.id}`)
  if (q.type === 'blanks') {
    assert.equal(q.blanks.length, 10, `${q.id}: exactly 10 blanks required`)
    const ordered = Array.from({ length: 10 }, (_, i) => String.fromCharCode(65 + i))
    assert.deepEqual(markers, ordered, `${q.id}: Blank 1..10 must occur once each in program order (A..J internally)`)
    assert.deepEqual(q.blanks.map(b => b.id), ordered, `${q.id}: answer order`)
    assert(Array.isArray(q.explanations) && q.explanations.length >= 6 && q.explanations.length <= 15, `${q.id}: whole-program explanations required`)
    for (const comment of q.explanations) {
      assert(Number.isInteger(comment.line) && comment.line >= 1 && comment.line <= q.code.split('\n').length, `${q.id}: invalid explanation line`)
      assert(typeof comment.text === 'string' && comment.text.trim() && !/[\r\n]/.test(comment.text), `${q.id}: comments must be short single lines`)
      for (const blank of q.blanks) for (const answer of blank.accepted) if (answer.length >= 4) assert(!comment.text.includes(answer), `${q.id}: explanation leaks Blank ${blank.id}: ${answer}`)
    }
  }
  assert(q.brief && typeof q.brief.goal === 'string' && q.brief.goal.trim().length > 0, `${q.id} brief needs a goal`)
  assert(Array.isArray(q.brief.rules) && q.brief.rules.length >= 1 && q.brief.rules.every(r => typeof r === 'string' && r.trim()), `${q.id} brief needs at least one rule`)
  if (q.brief.sample !== undefined) assert(typeof q.brief.sample.output === 'string' && q.brief.sample.output.length && (q.brief.sample.input === undefined || typeof q.brief.sample.input === 'string'), `${q.id} malformed brief sample`)
  if (q.type === 'output') assert(!q.brief.sample, `${q.id} output question must not have a brief sample (reveals the answer)`)
  for (const b of q.blanks) for (const a of b.accepted) if (a.replace(/\s+/g, '').length >= 5 && q.brief.rules.some(r => r.replace(/\s+/g, '').includes(a.replace(/\s+/g, '')))) console.log(`LEAK? ${q.id} blank ${b.id} answer "${a}" appears in a brief rule`)
  if (q.type === 'output') assert.equal(typeof q.expectedOutput, 'string', `${q.id} has no expected output`)
  if (q.runnable) assert.equal(typeof q.expectedOutput, 'string', `${q.id} needs a worked test expectation`)
}
assert.equal(coverage.length, 69)
for (const section of coverage) for (const id of section.questionIds) assert(ids.has(id), `Missing source ${section.section}`)
assert.equal(questions.filter(q => q.pool === 'original' && q.type === 'blanks').length, 25)
assert.equal(questions.filter(q => q.pool === 'original' && q.type === 'output').length, 10)
const used = new Set()
for (const p of papers) {
  assert.equal(p.questionIds.length, 5)
  for (const id of p.questionIds) {
    assert(!used.has(id), `Mock reused ${id}`); used.add(id)
    const q = questions.find(q => q.id === id)
    assert(q && q.pool === 'mock' && q.type === 'blanks' && q.subject === p.subject)
    assert.equal(q.blanks.length, 10)
  }
}
console.log(`Structural validation passed: ${questions.length} questions, ${coverage.length} source sections, ${papers.length} disjoint mock papers.`)
const gcc = await findGcc()
// Structural-only runs must not erase the last real compiler evidence or verified flags.
if (!gcc) {
  console.log(`GCC unavailable on PATH and WinGet location. 0/${questions.filter(q => q.runnable).length} runnable questions compiled. Previous compiler evidence retained; re-run with readable GCC.`)
  process.exit(process.argv.includes('--require-gcc') ? 1 : 0)
}
const report = { checkedAt: new Date().toISOString(), compiler: gcc, structuralQuestions: questions.length, runnableQuestions: questions.filter(q => q.runnable).length, verified: 0, samplesVerified: 0, unrunSamples: [], skipped: [], failures: [], results: [] }
const normalize = s => s.replace(/\r\n/g, '\n').split('\n').map(l => l.replace(/[ \t]+$/, '')).join('\n')
for (const q of questions) {
  q.verified = false
  if (!q.runnable) { if (q.brief.sample) report.unrunSamples.push(q.id); report.skipped.push({ id: q.id, reason: 'Source signed-int loop has no defined infinite execution.' }); continue }
  if (!gcc) continue
  const answers = Object.fromEntries(q.blanks.map(b => [b.id, b.accepted[0]]))
  const code = q.code.replace(/__([A-Z])__/g, (_, id) => answers[id])
  const result = await runC(code, q.stdin, { fixtures: q.fixtures, expectedFiles: q.expectedFiles })
  const failures = []
  if (result.exitCode !== 0) failures.push(`Exit code ${result.exitCode}: ${result.compileOutput} ${result.stderr}`)
  if (q.expectedOutput !== undefined && normalize(result.stdout) !== normalize(q.expectedOutput)) failures.push(`stdout expected ${JSON.stringify(q.expectedOutput)}, received ${JSON.stringify(result.stdout)}`)
  for (const [name, expected] of Object.entries(q.expectedFiles || {})) {
    if (normalize(result.files?.[name] || '') !== normalize(expected)) failures.push(`${name} expected ${JSON.stringify(expected)}, received ${JSON.stringify(result.files?.[name])}`)
  }
  const sample = q.brief.sample
  if (sample) {
    const sampleResult = sample.input === undefined ? result : await runC(code, sample.input, { fixtures: q.fixtures, expectedFiles: q.expectedFiles })
    if (normalize(sampleResult.stdout) !== normalize(sample.output)) failures.push(`brief sample output ${JSON.stringify(sample.output)} differs from actual ${JSON.stringify(sampleResult.stdout)}`)
    else report.samplesVerified++
  }
  const entry = { id: q.id, stdout: result.stdout, compileOutput: result.compileOutput, stderr: result.stderr, exitCode: result.exitCode, files: result.files, outputCompared: q.expectedOutput !== undefined }
  report.results.push(entry)
  if (failures.length) { report.failures.push({ id: q.id, failures }); console.log(`FAIL ${q.id}: ${failures.join('; ')}`) }
  else { q.verified = true; report.verified++; console.log(`PASS ${q.id}`) }
}
await Promise.all(paths.map((path, i) => writeFile(path, JSON.stringify(pools[i], null, 2) + '\n')))
await writeFile(new URL('../src/data/itp/verification.json', import.meta.url), JSON.stringify(report, null, 2) + '\n')
console.log(gcc ? `GCC verified ${report.verified}/${report.runnableQuestions} runnable questions; ${report.failures.length} failures.` : `GCC unavailable on PATH and WinGet location. 0/${report.runnableQuestions} runnable questions compiled. Re-run npm run verify:content after GCC is installed.`)
if (report.failures.length || (!gcc && process.argv.includes('--require-gcc'))) process.exitCode = 1
