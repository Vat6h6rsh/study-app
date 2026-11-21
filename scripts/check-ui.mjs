import { checkWPUI } from './check-wp-ui.mjs'
import { checkTwoPaneBrowser } from './check-two-pane-browser.mjs'
import { checkInlineBrowser } from './check-inline-browser.mjs'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'
import { runInNewContext } from 'node:vm'

// Vite reports Windows paths with an upper-case drive letter; a lower-case shell cwd would load a
// second copy of React (Invalid hook call). Resolve React exactly as Vite does.
const requireReact = createRequire(fileURLToPath(import.meta.url).replace(/^[a-z]:/, drive => drive.toUpperCase()))
const { createElement } = requireReact('react')
const { renderToString } = requireReact('react-dom/server')

// Resolve actual CSS aliases and each explicit theme; never duplicate palette values here.
const css = await readFile(new URL('../src/index.css', import.meta.url), 'utf8')
const tokens = text => Object.fromEntries([...text.matchAll(/(--[\w-]+)\s*:\s*(#[\da-fA-F]+|var\(--[\w-]+\))/g)].map(m => [m[1], m[2]]))
const base = tokens(/:root \{([^}]+)\}/.exec(css)[1])
const themes = Object.fromEntries(['paper', 'sky', 'midnight', 'ember'].map(name => {
  const block = css.match(new RegExp(':root\\[data-theme="' + name + '"\\] \\{([^}]+)\\}'))
  assert(block, 'Missing theme: ' + name)
  const values = { ...base, ...tokens(block[1]) }
  const resolve = (key, seen = []) => {
    assert(!seen.includes(key), 'Circular CSS token: ' + key)
    const value = values[key]
    assert(value, 'Missing CSS token: ' + key)
    return value.startsWith('var(') ? resolve(value.slice(4, -1), [...seen, key]) : value
  }
  return [name, Object.fromEntries(Object.keys(values).map(key => [key, resolve(key)]))]
}))
function luminance(hex) {
  let value = hex.slice(1)
  if (value.length === 3) value = [...value].map(c => c + c).join('')
  const c = [0, 2, 4].map(i => parseInt(value.slice(i, i + 2), 16) / 255).map(n => n <= .04045 ? n / 12.92 : ((n + .055) / 1.055) ** 2.4)
  return .2126 * c[0] + .7152 * c[1] + .0722 * c[2]
}
function contrast(a, b) { const [hi, lo] = [luminance(a), luminance(b)].sort((a, b) => b - a); return (hi + .05) / (lo + .05) }
const pairs = []
// Cover every opaque text/control/focus surface, including code and blank highlights.
const backgrounds = ['bg', 'surface', 'surface-2', 'blank-highlight', 'code-bg']
for (const fg of ['text', 'muted', 'primary', 'accent', 'correct', 'wrong']) for (const bg of backgrounds) pairs.push([fg, bg, 4.5])
for (const fg of ['control-border', 'focus']) for (const bg of backgrounds) pairs.push([fg, bg, 3])
pairs.push(['on-primary', 'primary', 4.5], ['on-primary', 'primary-hover', 4.5], ['primary-hover', 'surface', 3], ['primary-hover', 'blank-highlight', 3])
// Component aliases are asserted as well as the public palette roles.
for (const bg of ['code', 'code-field']) for (const [fg, min] of [['code-text', 4.5], ['code-muted', 4.5], ['code-border', 3], ['code-focus', 3], ['code-good', 4.5], ['code-bad', 4.5]]) pairs.push([fg, bg, min])
pairs.push(['warning', 'warning-bg', 4.5])
// Two-pane code chips, comments, revealed keys, eye controls and input verdicts use these aliases.
pairs.push(['code-muted', 'code-bg', 4.5], ['accent', 'blank-highlight', 4.5], ['accent', 'code-bg', 3], ['muted', 'surface-2', 4.5], ['primary', 'blank-highlight', 4.5], ['correct', 'surface', 4.5], ['wrong', 'surface', 4.5])
// Concept disclosure/link, amber revealed tokens/fields, green completed code and reveal-all.
pairs.push(['muted', 'surface', 4.5], ['text', 'surface', 4.5], ['primary', 'surface-2', 4.5], ['hue-amber', 'tint-amber', 4.5], ['correct', 'code-bg', 4.5])
// Topic surfaces also form the hero, feedback and score gradients. Both opaque
// endpoints and their actual sRGB interpolations must retain readable text.
const hues = ['indigo', 'teal', 'amber', 'sky', 'pink', 'violet', 'cyan', 'orange', 'iris', 'gold', 'plum']
for (const hue of hues) {
  for (const bg of [...backgrounds, ...hues.map(h => 'tint-' + h)]) pairs.push(['hue-' + hue, bg, 4.5])
  for (const fg of ['text', 'muted', 'primary', 'correct', 'wrong']) pairs.push([fg, 'tint-' + hue, 4.5])
  for (const fg of ['control-border', 'focus']) pairs.push([fg, 'tint-' + hue, 3])
}
const rows = []
for (const [theme, values] of Object.entries(themes)) {
  for (const [fg, bg, min] of pairs) {
    const ratio = contrast(values['--' + fg], values['--' + bg])
    assert(ratio >= min, [theme, fg, bg, ratio, 'requires', min].join(' '))
    rows.push({ theme, fg, bg, foreground: values['--' + fg], background: values['--' + bg], ratio: +ratio.toFixed(4), minimum: min })
  }
  for (const [from, to] of [['indigo', 'sky'], ['sky', 'pink'], ['violet', 'sky']]) {
    const rgb = name => values['--tint-' + name].slice(1).match(/../g).map(c => parseInt(c, 16))
    const a = rgb(from), b = rgb(to)
    for (let step = 0; step <= 10; step++) {
      const bg = '#' + a.map((n, i) => Math.round(n + (b[i] - n) * step / 10).toString(16).padStart(2, '0')).join('')
      for (const fg of ['text', 'muted', 'primary', 'correct', 'hue-violet']) assert(contrast(values['--' + fg], bg) >= 4.5, `${theme}: ${fg} on ${from}/${to} gradient at ${step * 10}%`)
    }
  }
}
if (process.argv.includes('--ratios')) console.log(JSON.stringify(rows, null, 2))
assert(!/font-size:\s*[\d.]+px/.test(css), 'Text sizes should follow the user root size')
assert(css.includes('prefers-reduced-motion') && css.includes('forced-colors'))
// The program renders in the page flow: no height cap or scroll box on any code container, soft wrap with a hanging indent.
assert(!/\.code-scroll|\.program-window[^{]*\{[^}]*(max-height|overflow:\s*(auto|scroll))/.test(css), 'No scroll box on the program window')
const codeRule = /\.code-line>code \{([^}]+)\}/.exec(css)?.[1] || ''
assert(codeRule.includes('white-space:pre-wrap') && codeRule.includes('text-indent:calc(var(--ind) * -1ch)') && codeRule.includes('padding-left:calc(var(--ind) * 1ch)'), 'Soft wrap with hanging indent')
assert(!/\.code-lines[^{]*\{[^}]*(overflow-x|width:max-content)/.test(css), 'No horizontal panning in the code')
assert(css.includes('.kbd-bar') && css.includes('html[data-bar] main'), 'Keyboard accessory toolbar styles')

// Execute the real first-paint script with saved, invalid and denied storage.
const index = await readFile(new URL('../index.html', import.meta.url), 'utf8')
const bootstrap = /<script>([\s\S]*?)<\/script>/.exec(index)
assert(bootstrap && index.indexOf(bootstrap[0]) < index.indexOf('src="/src/main.tsx"'))
for (const dark of [false, true]) for (const choice of [null, 'system', 'paper', 'sky', 'midnight', 'ember', 'invalid', 'denied']) {
  const root = { dataset: {} }
  runInNewContext(bootstrap[1], {
    document: { documentElement: root },
    localStorage: { getItem() { if (choice === 'denied') throw Error('denied'); return choice } },
    matchMedia: () => ({ matches: dark }),
  })
  assert.equal(root.dataset.theme, Object.hasOwn(themes, choice) ? choice : dark ? 'midnight' : 'paper')
}

const server = await createServer({ server: { middlewareMode: true }, appType: 'custom' })
const oldWindow = globalThis.window, oldStorage = globalThis.localStorage
try {
  const { savedTheme, resolvedTheme, persistPreference, THEME_KEY, SIDEBAR_KEY } = await server.ssrLoadModule('/src/preferences.ts')
  const { default: App } = await server.ssrLoadModule('/src/App.tsx')
  const { RunnerResults } = await server.ssrLoadModule('/src/components/Scratchpad.tsx')
  const { ConfirmDialog } = await server.ssrLoadModule('/src/components/ConfirmDialog.tsx')
  const { Report } = await server.ssrLoadModule('/src/components/Report.tsx')
  const { CodeQuestion } = await server.ssrLoadModule('/src/components/CodeQuestion.tsx')
  const { QuestionBrief } = await server.ssrLoadModule('/src/components/QuestionBrief.tsx')
  const { Markdown, Learn } = await server.ssrLoadModule('/src/components/Learn.tsx')
  const { AnswerFeedback, ExamScoreRing } = await server.ssrLoadModule('/src/components/Delight.tsx')
  const { loadStreak, storeStreak, STREAK_KEY } = await server.ssrLoadModule('/src/streak.ts')
  const { topicTones } = await server.ssrLoadModule('/src/topicColors.ts')
  const { questions, mockPapers } = await server.ssrLoadModule('/src/data/index.ts')
  const { PROGRESS_KEY, EXAM_KEY } = await server.ssrLoadModule('/src/lib/storage.ts')
  function app(view, saved = {}, topic = '') {
    globalThis.window = { location: new URL('http://localhost/?view=' + view + '&topic=' + topic) }
    globalThis.localStorage = { getItem: key => typeof saved[key] === 'string' ? saved[key] : saved[key] ? JSON.stringify(saved[key]) : null }
    const html = renderToString(createElement(App)).replace(/<!--[\s\S]*?-->/g, '')
    const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map(m => m[1])
    assert.equal(new Set(ids).size, ids.length, view + ': duplicate IDs')
    assert(!/tabindex="[1-9]/.test(html), 'No positive Tab order')
    return html
  }
  const home = app('home')
  for (const topic of ['structs', 'memory', 'arrays', 'matrices', 'strings', 'files', 'pointers', 'loops', 'functions', 'operators', 'scope']) {
    assert(hues.includes(topicTones[topic]), `Topic needs a contrast-checked tone: ${topic}`)
    assert(home.includes(`class="topic-card" data-tone="${topicTones[topic]}"`))
  }
  assert.equal(new Set(Object.values(topicTones).slice(0, 11)).size, 11, 'Each topic has its own shade')
  assert(home.includes('Not started'))
  assert(home.includes('aria-label="Collapse sidebar"') && home.includes('aria-expanded="true"') && home.includes('aria-controls="sidebar-menu"'))
  assert(home.includes('aria-label="Open navigation menu"') && home.includes('aria-expanded="false"'))
  assert(home.includes('<label for="theme-choice">') && home.includes('<select id="theme-choice"'))
  for (const name of ['System', 'Paper', 'Sky', 'Midnight', 'Ember']) assert(home.includes('>' + name + '</option>'))
  for (const name of ['Overview', 'Learn', 'Practice', 'Mock exams', 'C scratchpad']) assert(home.includes('title="' + name + '"'))
  const collapsed = app('home', { [SIDEBAR_KEY]: 'true', [THEME_KEY]: 'ember' })
  assert(collapsed.includes('sidebar is-collapsed') && collapsed.includes('aria-label="Expand sidebar"'))
  assert(collapsed.includes('value="ember" selected=""'))
  assert.equal(savedTheme(), 'ember')
  for (const name of Object.keys(themes)) for (const dark of [false, true]) assert.equal(resolvedTheme(name, dark), name)
  assert.equal(resolvedTheme('system', false), 'paper')
  assert.equal(resolvedTheme('system', true), 'midnight')
  globalThis.localStorage = { getItem() { throw Error('denied') }, setItem() { throw Error('quota') } }
  assert.equal(savedTheme(), 'system')
  assert.doesNotThrow(() => persistPreference(THEME_KEY, 'sky'))

  assert(app('learn').includes('Opening your study notes'))
  assert(app('practice').includes('Check output'))
  const practice = app('practice')
  assert(practice.indexOf('What this program does') < practice.indexOf('class="code-editor'), 'Practice brief precedes code')
  assert(practice.includes('0 fully correct in a row'))
  // Phone navigation: four labelled primary tabs with the current one marked, a position bar,
  // a collapsed concept note and a sticky action dock; the top bar and safe areas are in the CSS.
  const learnHtml = app("learn"), tabs = learnHtml.slice(learnHtml.indexOf("<nav class=\"tab-bar\""), learnHtml.indexOf("</nav>", learnHtml.indexOf("<nav class=\"tab-bar\"")))
  for (const label of ['Home', 'Learn', 'Practice', 'Mock']) assert(tabs.includes('>' + label + '</span>'), 'Tab: ' + label)
  assert(/class="tab active"[^>]*aria-current="page"/.test(tabs) && (tabs.match(/aria-current/g) || []).length === 1, 'Exactly one current tab')
  assert(practice.includes('Question 1 of') && practice.includes('aria-label="Previous question"') && practice.includes('<details class="concept-note">') && practice.includes('Concept:') && practice.includes('sticky-dock'))
  const phoneCss = css.slice(css.indexOf("--bar-h:calc("))
  assert(phoneCss.includes(".sidebar { position:sticky; top:0"), "Phone top bar is sticky")
  assert(css.includes("env(safe-area-inset-bottom)") && css.includes("html[data-kbd] .sticky-dock") && css.includes("--tab-h:3.5rem"))
  assert(!phoneCss.includes("is-collapsed"), "Desktop collapse state must not touch phone navigation")
  assert(app('practice', { [STREAK_KEY]: '7' }).includes('7 fully correct in a row'))
  for (const stored of ['-1', '1.5', 'null', '"7"', '{}', '{corrupt', '9007199254740992']) {
    globalThis.localStorage = { getItem: () => stored }
    assert.equal(loadStreak(), 0, `Invalid streak: ${stored}`)
  }
  const streakMemory = new Map()
  globalThis.localStorage = { getItem: key => streakMemory.get(key) ?? null, setItem: (key, value) => streakMemory.set(key, value) }
  storeStreak(4); assert.equal(loadStreak(), 4)
  storeStreak(0); assert.equal(loadStreak(), 0)
  globalThis.localStorage = { getItem() { throw Error('denied') }, setItem() { throw Error('quota') } }
  assert.equal(loadStreak(), 0); assert.doesNotThrow(() => storeStreak(3))
  assert(!app('practice').includes('Department payroll'), 'Unsubmitted mocks remain exclusive')
  assert(app('practice', {}, 'mistakes').includes('Browse all questions'))
  assert(app('exam').includes('Start paper 3'))
  assert(app('scratch').includes('Use Tab for indentation'))
  const paper = mockPapers[0], start = Date.now()
  const session = { paperId: paper.id, startedAt: start, deadline: start + 150 * 60000, index: 0, answers: {}, submitted: false, attemptIds: [] }
  for (let index = 0; index < 5; index++) {
    const html = app('exam', { [EXAM_KEY]: { ...session, index } })
    assert(html.includes('Question ' + (index+1) + ' / 5'))
    assert(html.includes('role="timer"') && html.includes('id="exam-submit"') && html.includes('aria-current="step"'))
    assert(html.indexOf('What this program does') < html.indexOf('class="code-editor'), 'Mock brief precedes code')
  }
  assert(app('exam', { [EXAM_KEY]: { ...session, deadline: start + 30000 } }).includes('One minute or less remains'))
  const attempts = paper.questionIds.map((id, i) => {
    const q = questions.find(q => q.id === id)
    return { id: 'a' + i, questionId: id, subject: 'itp', topic: q.topic, at: new Date(start).toISOString(), mode: 'exam', answers: {}, results: Object.fromEntries(q.blanks.map(b => [b.id, false])), overrides: [] }
  })
  const saved = { [PROGRESS_KEY]: { version: 1, attempts }, [EXAM_KEY]: { ...session, submitted: true, attemptIds: attempts.map(a => a.id) } }
  assert(app('exam', saved).includes('Review your answers'))
  assert(app('exam', saved).includes('--score-offset:100'), 'A zero score retains an empty ring under reduced motion')
  assert(app('practice', saved).includes('Department payroll'), 'Submitted mocks are available for review')
  assert(app('exam', { [EXAM_KEY]: saved[EXAM_KEY] }).includes('Report unavailable'))
  const modal = renderToString(createElement(ConfirmDialog, { title: 'Submit this exam?', action: 'Submit and see report', onConfirm(){}, onClose(){} }, 'Answers will be locked.'))
  assert(modal.includes('<dialog') && modal.includes('aria-labelledby=') && modal.includes('aria-describedby=') && modal.includes('Keep working'))
  const cases = [
    [{ unavailable: true, compileOutput: 'GCC was not found', stdout: '', stderr: '', exitCode: null }, 'GCC is not available yet', 'Install GCC'],
    [{ phase: 'compile', compileOutput: 'main.c:3: error', stdout: '', stderr: '', exitCode: 1 }, 'Compilation failed', 'Edit the C source'],
    [{ phase: 'run', compileOutput: '', stdout: 'partial', stderr: 'Stopped after 5 seconds.', exitCode: null }, 'Program stopped with an error', 'Check standard error'],
    [{ phase: 'run', compileOutput: '', stdout: '42', stderr: '', exitCode: 0 }, 'Run complete', 'Standard output'],
  ]
  for (const [result, heading, remedy] of cases) {
    const html = renderToString(createElement(RunnerResults, { result }))
    assert(html.includes(heading) && html.includes(remedy))
    if (result.phase === 'compile' || result.unavailable) assert(!html.includes('Standard output'))
  }
  const previous = renderToString(createElement(RunnerResults, { result: cases[3][0], stale: true, running: true }))
  assert(previous.includes('Previous run') && previous.includes('Code or input changed') && previous.includes('aria-busy="true"'))
  const q = questions.find(q => q.type === 'blanks'), failed = Object.fromEntries(questions.find(q => q.type === 'blanks').blanks.map(b => [b.id, false]))
  const code = renderToString(createElement(CodeQuestion, { question:q, answers:{}, results:failed, locked:true, onChange(){} }))
  assert(code.includes('Answer differs; review marked answers below') && /readonly/i.test(code))
  assert(!/<pre[^>]*>[^<]*<div/.test(code), 'Code lines must not create invalid pre/div nesting')
  assert(code.includes('aria-label="Expected output"') && code.indexOf('Expected output') > code.indexOf('editor-bottom'), 'Expected stdout follows the program window')
  const liveCode = renderToString(createElement(CodeQuestion, { question:q, answers:{}, results:{ ...failed, [q.blanks[0].id]: true }, locked:true, feedback:true, onChange(){} }))
  assert(liveCode.includes('feedback-live') && liveCode.includes('is-wrong') && liveCode.includes('is-correct') && liveCode.includes('✗') && liveCode.includes('✓'))
  const { EXPLAIN_KEY } = await server.ssrLoadModule('/src/lib/practice.ts')
  const renderCode = props => renderToString(createElement(CodeQuestion, { question:q, answers:{}, onChange(){}, ...props })).replace(/<!--[\s\S]*?-->/g, '')
  globalThis.localStorage = { getItem: () => null }
  const neutral = renderCode({})
  assert(neutral.includes('class="reveal-all" aria-pressed="false"') && neutral.includes('Reveal all'))
  assert.equal((neutral.match(/class="blank-field is-neutral/g) || []).length, 10)
  assert.equal((neutral.match(/type="text"/g) || []).length, 10)
  for (let i = 1; i <= 10; i++) assert(neutral.includes(`_________Blank${i}_________`) && neutral.includes(`>Blank ${i}</label>`))
  assert(!neutral.includes('code-comment') && neutral.includes('role="switch" aria-checked="false"'))
  assert(neutral.includes('aria-label="Reveal answer for Blank 1" aria-pressed="false"'))
  assert(neutral.includes('autoCorrect="off"') || neutral.includes('autocorrect="off"'))
  globalThis.localStorage = { getItem: key => key === EXPLAIN_KEY ? 'true' : null }
  const explained = renderCode({})
  assert(explained.includes('code-comment') && explained.includes('class="code-note"') && explained.includes('aria-expanded="true"') && /aria-label="Explain line 1"/.test(explained))
  assert(!neutral.includes('code-comment') && neutral.includes('aria-expanded="false"') && neutral.includes('class="line-marker"'), 'Comment markers exist, comments stay folded until asked')
  assert(neutral.includes('class="mode-toggle"') && neutral.includes('Side panel') && neutral.includes('Inline'), 'Desktop answer-mode toggle')
  assert(!neutral.includes('class="code-scroll"') && neutral.includes('class="code-lines"'), 'The program has no scroll container')
  assert(neutral.includes('<summary><h3>Expected output</h3>') && neutral.includes('class="out-preview"'), 'Expected output is a compact disclosure')
  const mockCode = renderCode({ mode:'mock', answers:Object.fromEntries(q.blanks.map(b => [b.id,b.accepted[0]])) })
  assert(!mockCode.includes('reveal-answer') && !mockCode.includes('reveal-all') && !mockCode.includes('program-answer') && !mockCode.includes('is-correct') && !mockCode.includes('is-wrong') && !mockCode.includes('code-comment') && !mockCode.includes('aria-invalid'))
  const revealedCode = renderCode({ revealed:[q.blanks[0].id], answers:{ [q.blanks[0].id]:q.blanks[0].accepted[0] } })
  assert(revealedCode.includes('is-revealed') && revealedCode.includes('Revealed · no mark') && revealedCode.includes('1 revealed'))
  const escape = value => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#x27;')
  const typed = renderCode({ answers:{ [q.blanks[0].id]:q.blanks[0].accepted[0] } })
  assert(typed.includes('program-answer is-correct') && typed.includes(`aria-label="Blank 1, correct: ${escape(q.blanks[0].accepted[0])}"`))
  assert(renderCode({answers:{[q.blanks[0].id]:'equivalent expression'},results:{[q.blanks[0].id]:true},locked:true}).includes('aria-label="Blank 1, correct: equivalent expression"'),'A self-marked equivalent fills the code with the student answer')
  assert(!renderCode({ answers:{ [q.blanks[0].id]:'definitely wrong' } }).includes('program-answer'))
  const { ConceptNote } = await server.ssrLoadModule('/src/components/ConceptNote.tsx')
  const { conceptByTopic } = await server.ssrLoadModule('/src/data/concepts.ts')
  const { firstConceptParagraph } = await server.ssrLoadModule('/src/lib/concepts.ts')
  const note = conceptByTopic.get(q.topic)
  const conceptHtml = question => renderToString(createElement(ConceptNote,{question,onLearn(){}})).replace(/<!--[\s\S]*?-->/g,'')
  const fallbackConcept = conceptHtml({...q,concept:undefined})
  assert(fallbackConcept.includes('<details class="concept-note">') && !fallbackConcept.includes(' open='))
  assert(fallbackConcept.includes(escape(firstConceptParagraph(note.markdown))) && fallbackConcept.includes(`aria-label="Open the full ${escape(note.title)} lesson"`))
  assert(conceptHtml({...q,concept:'A local concept. Keep the idea in mind.'}).includes('<p>A local concept. Keep the idea in mind.</p>'))
  for (const question of questions.filter(q => q.subject === 'itp' && q.type === 'blanks')) {
    assert.equal(question.blanks.length,10)
    assert.deepEqual([...question.code.matchAll(/__([A-Z])__/g)].map(m => m[1]), Array.from({length:10},(_,i)=>String.fromCharCode(65+i)))
  }
  const fallback = renderToString(createElement(QuestionBrief, { question: { ...q, brief: undefined, prompt: 'Read the input. Calculate the sum. Print the result.' } }))
  assert(fallback.includes('<p>Read the input. Calculate the sum.</p><p>Print the result.</p>'))
  const brief = renderToString(createElement(QuestionBrief, { question: { ...q, prompt: 'Preserve the final newline.', brief: { goal: 'Sum two values.', rules: ['Read two integers.', 'Add the values.'], sample: { input: '2 3', output: '5\n<script>' } } } }))
  assert(brief.includes('Rules</h4><ul><li>Read two integers.') && !brief.includes('Sample output') && brief.includes('Preserve the final newline.'))
  const expectedSample = renderToString(createElement(CodeQuestion, { question:{ ...q, expectedOutput:undefined, stdin:'', brief:{ sample:{input:'2 3',output:'5\n<script>'} } }, answers:{}, onChange(){} }))
  assert(expectedSample.includes('Sample input') && expectedSample.includes('Expected output') && expectedSample.includes('&lt;script&gt;') && !expectedSample.includes('<script>'))
  const { TopicPicker, studyTopics } = await server.ssrLoadModule('/src/components/TopicPicker.tsx')
  const itpSubject = (await server.ssrLoadModule('/src/data/index.ts')).subjects.find(s=>s.id==='itp')
  const picker = renderToString(createElement(TopicPicker,{subject:itpSubject,pool:questions.filter(q=>q.subject==='itp'&&q.pool!=='mock'),current:q,attempts:[],onSelect(){},onLearn(){}})).replace(/<!--[\s\S]*?-->/g,'')
  assert(picker.includes('Core 0/') && picker.includes('correct') && picker.includes('revisit') && picker.includes('Read the note') && picker.includes('priority-extra'))
  let previousTitle=-1
  for(const topic of studyTopics(itpSubject)) {const index=picker.indexOf(topic.name.replaceAll('&','&amp;'));assert(index>previousTitle,'Picker follows Learn order');previousTitle=index}
  assert(home.includes('Start Core practice') && home.includes('Go further'))
  assert(practice.includes('All · Core first') && practice.includes('Only mistakes'))
  for (const question of questions.filter(q=>q.subject==='itp')) {
    const html=renderToString(createElement(CodeQuestion,{question,answers:{},onChange(){}}))
    assert.equal(html.includes('aria-label="Expected output"'),question.type==='blanks',question.id+': expected output visibility')
  }
  const markdown = renderToString(createElement(Markdown, { text: 'Intro.\nTip: Use `sizeof`.\n\n**Trap:** Check bounds.\n\nNote: Read carefully.\n\nRemember: End with a newline.\n\n| Name | Meaning |\n| --- | --- |\n| **n** | <script> |\n\n```c\nputs("ok");\n```' }))
  for (const kind of ['tip', 'trap', 'note', 'remember']) assert(markdown.includes('callout-' + kind))
  assert(markdown.includes('<table>') && markdown.includes('scope="col"') && markdown.includes('<strong>n</strong>') && markdown.includes('C · fill the blanks'))
  assert(!markdown.includes('<script>') && markdown.includes('&lt;script&gt;'))
  const learn = renderToString(createElement(Learn, { selected:'arrays', onSelect(){}, onPractice(){}, onRun(){} }))
  assert(learn.includes('class="topic-dot" aria-hidden="true"') && learn.includes('data-tone="amber"'))
  const feedback = (correct, total, celebrate) => renderToString(createElement(AnswerFeedback, { correct, total, celebrate, burst:'new-attempt' }))
  const full = feedback(10, 10, true), partial = feedback(7, 10, true)
  assert(full.includes('All 10 correct!') && full.includes('<canvas') && full.includes('aria-hidden="true"'))
  assert(partial.includes('7/10') && partial.includes('Fix the red ones') && !partial.includes('<canvas'))
  assert(!feedback(10, 10, false).includes('<canvas'), 'Reviewing a result must not replay confetti')
  assert(!feedback(0, 0, true).includes('All 0 correct!'))
  for (const percent of [0, 79, 80, 100]) {
    const ring = renderToString(createElement(ExamScoreRing, { percent }, String(percent)))
    assert(ring.includes(`--score-offset:${100 - percent}`), 'Reduced motion uses the actual score')
    assert(ring.includes('aria-hidden="true"') && ring.includes('stroke-dashoffset:100'))
  }
  const report = renderToString(createElement(Report, { question:q, attempt:{ id:'test', answers:{}, results:failed, overrides:[] }, onOverride(){} }))
  assert(report.includes('Mark blank 1 as equivalent'))
  await checkWPUI(server, app, themes, contrast)
  console.log('UI checks passed: ' + rows.length + ' CSS contrast pairs across Paper/Sky/Midnight/Ember plus gradient samples; topic colours, briefs/fallbacks, escaped note tables/callouts, feedback states, score rings and guarded streak storage; startup preferences, labelled theme/sidebar controls; all screens, mock states, timer warnings, missing reports, confirmations, runner results, verdict semantics and unique IDs. Headless interaction/reflow checks follow; physical-device keyboard, animation feel and assistive technology still need device testing.')
} finally {
  globalThis.window = oldWindow; globalThis.localStorage = oldStorage
  await server.close()
}
await checkTwoPaneBrowser()
await checkInlineBrowser()
