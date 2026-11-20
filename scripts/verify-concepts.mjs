import assert from 'node:assert/strict'
import { readFile, readdir, writeFile } from 'node:fs/promises'
import { conceptExamples } from '../src/lib/concepts.ts'
import { findGcc, runC } from '../server/run-c.mjs'

const directory = new URL('../content/itp/concepts/', import.meta.url)
const files = (await readdir(directory)).filter(name => name.endsWith('.md')).sort()
const expectedTopics = ['strategy', 'operators', 'loops', 'arrays', 'matrices', 'strings', 'functions', 'pointers', 'structs', 'memory', 'files', 'scope', 'idioms']
const gcc = await findGcc()
const runnerArg = process.argv.find(arg => arg.startsWith('--runner-url='))?.slice('--runner-url='.length)
const runner = runnerArg ? new URL(runnerArg) : null
if (runner) assert(runner.protocol === 'http:' && ['127.0.0.1', 'localhost', '[::1]'].includes(runner.hostname) && !runner.username && !runner.password, 'Only a local HTTP runner is allowed')
const compiler = runner ? `Local GCC runner (${runner.origin})` : gcc
const report = { compiler, examples: 0, verified: 0, failures: [], results: [] }
async function compileExample(code) {
  if (!runner) return runC(code)
  const response = await fetch(new URL('/api/run-c', runner), {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code, stdin: '' }),
    redirect: 'error', signal: AbortSignal.timeout(30000),
  })
  if (!response.ok) throw new Error(`Local runner returned HTTP ${response.status}`)
  const result = await response.json()
  if (result.error || result.unavailable) throw new Error(result.error || result.compileOutput)
  return result
}
const topics = []
for (const file of files) {
  const markdown = await readFile(new URL(file, directory), 'utf8')
  assert(![...markdown].some(char => char.charCodeAt(0) < 32 && !'\t\r\n'.includes(char)), `${file}: unexpected control character`)
  assert.equal((markdown.match(/^```/gm) || []).length % 2, 0, `${file}: unbalanced code fences`)
  const topic = /^Topic ID: `([a-z]+)`$/m.exec(markdown)?.[1]
  assert(topic && !topics.includes(topic), `${file}: missing or duplicate topic ID`)
  topics.push(topic)
  const examples = conceptExamples(markdown)
  if (!['strategy', 'idioms'].includes(topic)) {
    for (const heading of ['Concept from zero', 'Blank-spotting tips', 'Common traps', 'Must memorise']) assert(markdown.includes(`## ${heading}`), `${file}: missing ${heading}`)
    assert(examples.length >= 1 && examples.length <= 2, `${file}: expected 1–2 complete worked examples`)
    assert(/Adapted from.*bank section/.test(markdown), `${file}: missing bank provenance`)
  }
  for (const [i, example] of examples.entries()) {
    const id = `${file} example ${i + 1}`
    report.examples++
    if (!compiler) continue
    const result = await compileExample(example.code)
    const output = result.stdout.replace(/\r\n/g, '\n')
    const passed = result.exitCode === 0 && output === example.expectedOutput && !result.compileOutput.trim() && !result.stderr.trim()
    report.results.push({ id, passed, ...result })
    if (passed) { report.verified++; console.log(`PASS ${id}`) }
    else { report.failures.push(id); console.error(`FAIL ${id}: ${JSON.stringify(result)}`) }
  }
}
assert.deepEqual(topics, expectedTopics, 'Cover every question topic once, in study order, plus strategy and idioms')
await writeFile(new URL('../src/data/itp/concept-verification.json', import.meta.url), JSON.stringify(report, null, 2) + '\n')
console.log(`Concept structure passed: ${files.length} notes, ${report.examples} complete examples, all 11 question topics.`)
if (!compiler) console.error(`GCC unavailable on PATH and the WinGet location: 0/${report.examples} examples compiled. No network installation was attempted.`)
else console.log(`GCC verified ${report.verified}/${report.examples} examples, including exact stdout and no -Wall diagnostics.`)
if (report.failures.length || (!compiler && !process.argv.includes('--allow-missing-gcc'))) process.exitCode = 1
