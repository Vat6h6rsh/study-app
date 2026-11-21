import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { createServer } from 'vite'

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
try {
  const { default: App } = await server.ssrLoadModule('/src/App.tsx')
  const home = renderToString(createElement(App))
  assert(home.includes('<h1>Overview</h1>'))
  assert(home.includes('Coming soon'))
  const { practiceQuestions } = await server.ssrLoadModule('/src/data/index.ts')
  assert(home.includes(`${practiceQuestions.filter(q=>q.subject==='itp').length} in your practice bank`))
  assert(home.includes('Learn from zero'))
  const { Learn, Markdown } = await server.ssrLoadModule('/src/components/Learn.tsx')
  const { concepts } = await server.ssrLoadModule('/src/data/concepts.ts')
  const { subjects } = await server.ssrLoadModule('/src/data/index.ts')
  const { conceptExamples } = await server.ssrLoadModule('/src/lib/concepts.ts')
  assert.equal(concepts.length, 13)
  assert.equal(new Set(concepts.map(c => c.id)).size, concepts.length)
  for (const topic of subjects.find(s => s.id === 'itp').topics) assert(concepts.some(c => c.id === topic.id), `No Learn link for ${topic.id}`)
  for (const note of concepts) {
    const lesson = renderToString(createElement(Learn, { selected: note.id, onSelect(){}, onPractice(){}, onRun(){} }))
    assert(lesson.includes(note.title.replaceAll('&', '&amp;')), `Missing lesson ${note.id}`)
    const count = conceptExamples(note.markdown).length
    assert.equal((lesson.match(/<details class="learn-solution"/g) || []).length, count, `${note.id}: every example must have a reveal`)
    assert(!lesson.includes('<details open'), `${note.id}: answers should start collapsed`)
    if (!['strategy', 'idioms'].includes(note.id)) {
      for (const section of ['Concept from zero', 'Blank-spotting tips', 'Common traps', 'Must memorise']) assert(lesson.includes(section), `${note.id}: missing ${section}`)
      assert(count >= 1 && count <= 2, `${note.id}: expected 1–2 examples`)
    }
    for (const example of conceptExamples(note.markdown)) {
      assert(!/__([A-Z])__/.test(example.code))
      assert(example.expectedOutput.endsWith('\n'))
    }
  }
  const escaped = renderToString(createElement(Markdown, { text: '# Safety\n\n<script>alert(1)</script>\n\n```c\nchar *s = "<b>";\n```' }))
  assert(!escaped.includes('<script>'))
  assert(escaped.includes('&lt;script&gt;') && escaped.includes('&lt;b&gt;'))
  const { CodeQuestion } = await server.ssrLoadModule('/src/components/CodeQuestion.tsx')
  const { Report } = await server.ssrLoadModule('/src/components/Report.tsx')
  const { Scratchpad, defaultDraft } = await server.ssrLoadModule('/src/components/Scratchpad.tsx')
  const pools = await Promise.all(['past','original','mocks'].map(name => readFile(new URL(`../src/data/itp/${name}.json`,import.meta.url),'utf8').then(JSON.parse)))
  for (const question of pools.flat()) {
    const answers = Object.fromEntries(question.blanks.map(b => [b.id,b.accepted[0]]))
    if(question.type==='output') answers.output=question.expectedOutput
    const results = Object.fromEntries((question.type==='output' ? ['output'] : question.blanks.map(b=>b.id)).map(id=>[id,true]))
    const code = renderToString(createElement(CodeQuestion,{question,answers,results,locked:true,onChange(){}}))
    assert(code.includes('code-editor'))
    if(question.type==='blanks') assert(code.includes('aria-label="Blank 1, correct:') && (code.match(/type="text"/g)||[]).length===10)
    assert.equal(code.includes('aria-label="Expected output"'),question.type==='blanks',question.id)
    const report = renderToString(createElement(Report,{question,attempt:{id:'test',answers,results,overrides:[]},onOverride(){},onLearn(){}}))
    assert(report.includes('Marked answers'))
    assert(report.includes('<details class="concept-note">') && report.includes('aria-label="Open the full'))
  }
  assert(renderToString(createElement(Scratchpad,{draft:defaultDraft,onChange(){}})).includes('Run program'))
  console.log(`Render checks passed: dashboard, all 13 Learn notes with 21 collapsed solutions, topic coverage, escaped Markdown, all ${pools.flat().length} question and report views with Learn links, and scratchpad. This is server rendering, not interactive browser QA.`)
} finally { await server.close() }
