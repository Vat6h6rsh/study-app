import assert from 'node:assert/strict'
const base = process.env.EXAMDESK_URL || 'http://127.0.0.1:5173'
const home = await fetch(base)
assert.equal(home.status, 200)
assert((await home.text()).includes('Examdesk'))
// Exercise sibling Markdown through the actual Vite dev-server allowlist as well as SSR.
const notesModule = await fetch(base + '/src/data/concepts.ts')
assert.equal(notesModule.status, 200)
const imports = [...new Set([...(await notesModule.text()).matchAll(/from\s+"([^"\n]+\?(?:import&)?raw[^"\n]*)"/g)].map(m => m[1]))]
assert.equal(imports.length, 13, 'All concept Markdown files should be bundled')
for (const path of imports) {
  const note = await fetch(new URL(path, base))
  assert.equal(note.status, 200, path)
  assert((await note.text()).includes('Topic ID:'), path)
}
const post = (body, headers = {}) => fetch(base + '/api/run-c', { method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body })
const simple = await post(JSON.stringify({ code: '#include <stdio.h>\nint main(void){puts("ok");return 0;}', stdin: '' }))
assert.equal(simple.status, 200)
const result = await simple.json()
assert.equal(typeof result.compileOutput, 'string')
if (result.unavailable) assert(result.compileOutput.includes('GCC was not found'))
else { assert.equal(result.exitCode, 0); assert.equal(result.stdout.replace(/\r/g, ''), 'ok\n') }
assert.equal((await post('bad json')).status, 400)
assert.equal((await post(JSON.stringify({ code: 1 }))).status, 400)
assert.equal((await post(JSON.stringify({ code: 'x'.repeat(65537) }))).status, 400)
assert.equal((await post('x'.repeat(131073))).status, 413)
assert.equal((await post('{}', { Origin: 'https://unrelated.example' })).status, 403)
assert.equal((await post('{}', { Origin: 'invalid' })).status, 403)
assert.equal((await fetch(base + '/api/run-c')).status, 405)
console.log(`HTTP checks passed: home page, all 13 sibling Markdown modules, runner ${result.unavailable ? 'GCC-unavailable message' : 'compilation/output'}, bad JSON, invalid payload, request/code limits, origin and method validation.`)
