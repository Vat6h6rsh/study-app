// Real-layout checks (headless Chromium over CDP) for the ITP program window:
//  - no inner scroll box, no horizontal panning, soft wrap with hanging indent: every blanks question, 390/768/1280px
//  - mobile inline answering, keyboard accessory toolbar, comment markers, folded expected output / task details
//  - desktop Side panel | Inline toggle, mocks (no reveal, no live marking)
//  - render-count assertion: typing re-renders only the typed blank's line, not the whole program
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { withBrowser } from './lib/cdp.mjs'

const json = async name => JSON.parse(await readFile(new URL(`../src/data/itp/${name}.json`, import.meta.url), 'utf8'))

const MEASURE = `(() => {
  const out = [], code = window.__measureTarget || document.querySelector('.code-lines')
  if (!code) return ['no program']
  const targets = [code, document.querySelector('.program-window'), ...code.querySelectorAll('.code-line>code')]
  for (const el of targets) {
    if (el.scrollHeight > el.clientHeight + 1) out.push('vertical scroll in ' + el.className)
    if (el.scrollWidth > el.clientWidth + 1) out.push('horizontal scroll in ' + el.className + ' (' + el.scrollWidth + '>' + el.clientWidth + ')')
    const cs = getComputedStyle(el)
    if (/auto|scroll/.test(cs.overflowX + cs.overflowY)) out.push('scrollable overflow ' + cs.overflowX + '/' + cs.overflowY)
    if (cs.maxHeight !== 'none') out.push('max-height ' + cs.maxHeight)
  }
  if (document.documentElement.scrollWidth > innerWidth) out.push('page overflow ' + document.documentElement.scrollWidth + '>' + innerWidth)
  const box = code.getBoundingClientRect()
  if (box.right > innerWidth + 1) out.push('program wider than the viewport')
  for (const input of code.querySelectorAll('input')) if (input.getBoundingClientRect().right > box.right + 1) out.push('input beyond the program')
  for (const el of code.querySelectorAll('.code-line:not(.code-comment)>code')) {
    const cs = getComputedStyle(el)
    if (parseFloat(cs.textIndent) >= 0 || Math.abs(parseFloat(cs.textIndent) + parseFloat(cs.paddingLeft)) > 0.5) { out.push('hanging indent missing'); break }
  }
  return out
})()`

export async function checkInlineBrowser() {
  const [past, original, mocks, papers] = await Promise.all(['past', 'original', 'mocks', 'papers'].map(json))
  const practiceBlanks = [...past, ...original] // fill-in and predict-the-output programs alike
  const mockById = new Map(mocks.map(q => [q.id, q]))
  await withBrowser(async ({ send, evaluate, wait, navigate, click, viewport, sleep }) => {
    const type = (id, value) => evaluate(`(() => { const el = document.querySelector('[data-blank="${id}"]'); Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(el, ${JSON.stringify(value)}); el.dispatchEvent(new Event('input', { bubbles: true })) })()`)
    const pick = async id => { await evaluate(`document.querySelector('.question-nav button[data-question-id="${id}"]').click()`); await wait(`document.querySelector('.question-heading')?.dataset.questionId === ${JSON.stringify(id)} && document.querySelector('.code-lines')`) }

    // ---- 1. No scroll box, no panning: every blanks question, three widths, both answer modes on wide screens ----
    let checked = 0
    for (const [width, mode] of [[390, 'inline'], [768, 'inline'], [1280, 'side'], [1280, 'inline']]) {
      await viewport(width, 900)
      await navigate('/?view=practice')
      await evaluate(`localStorage.setItem('exam-desk.answer-mode.v1', ${JSON.stringify(mode)}); localStorage.setItem('exam-desk.explain-code.v1','true')`)
      await navigate('/?view=practice')
      for (const question of practiceBlanks) {
        await pick(question.id)
        const problems = await evaluate(MEASURE)
        assert.deepEqual(problems, [], `${question.id} @${width}px (${mode}): ${problems.join('; ')}`)
        checked++
      }
      // mock questions: five per paper
      for (const paper of papers) {
        const started = Date.now()
        await evaluate(`localStorage.setItem('exam-desk.exam.v1', ${JSON.stringify(JSON.stringify({ paperId: paper.id, startedAt: started, deadline: started + 9000000, index: 0, answers: {}, submitted: false, attemptIds: [] }))})`)
        await navigate('/?view=exam')
        for (let i = 0; i < 5; i++) {
          await evaluate(`document.querySelectorAll('.exam-tabs>button')[${i}].click()`)
          const title = mockById.get(paper.questionIds[i]).title
          await wait(`document.querySelector('.question-heading h2')?.textContent === ${JSON.stringify(title)}`)
          const problems = await evaluate(MEASURE)
          assert.deepEqual(problems, [], `${paper.questionIds[i]} (mock) @${width}px: ${problems.join('; ')}`)
          checked++
        }
      }
    }
    await evaluate(`localStorage.removeItem('exam-desk.exam.v1')`)

    // ---- 2. Phone: inline answering ----
    await evaluate(`localStorage.removeItem('exam-desk.explain-code.v1'); localStorage.removeItem('exam-desk.answer-mode.v1')`)
    await viewport(390, 844)
    await navigate('/?view=practice&topic=structs')
    const id = await evaluate('document.querySelector(".question-heading").dataset.questionId')
    const q = [...past, ...original].find(x => x.id === id), keys = Object.fromEntries(q.blanks.map(b => [b.id, b.accepted[0]]))
    assert.equal(await evaluate('document.querySelectorAll(".program-window .ib input").length'), 10, 'Ten inline inputs on phones')
    assert.equal(await evaluate('document.querySelectorAll(".answer-window,.pane-jump,.blank-field,.program-blank").length'), 0, 'No side panel or chips on phones')
    assert.equal(await evaluate('!document.querySelector(".kbd-bar")'), true, 'Toolbar only while a blank is focused')
    assert.deepEqual(await evaluate('[...document.querySelectorAll(".ib input")].map(el => el.placeholder)'), Array.from({ length: 10 }, (_, i) => String(i + 1)))
    assert(await evaluate('[...document.querySelectorAll(".ib input")].every(el => parseFloat(getComputedStyle(el).fontSize) >= 16 && el.autocapitalize === "none" && el.getAttribute("autocorrect") === "off" && el.spellcheck === false && el.enterKeyHint === (el.dataset.blank === "J" ? "done" : "next"))'), 'Inputs: 16px+, no autocorrect/capitalise/spellcheck, enterkeyhint')
    assert(await evaluate('[...document.querySelectorAll(".line-number")].every(el => getComputedStyle(el).display === "none")'), 'Line numbers hidden on phones')
    assert.equal(await evaluate('getComputedStyle(document.querySelector(".task-details")).display !== "none" && !document.querySelector(".task-details").open'), true, 'Task details folded on phones, one tap away')
    await click('.task-details>summary'); assert(await evaluate('document.querySelector(".task-details").open && !!document.querySelector(".brief-rules li")'))
    assert.equal(await evaluate('document.querySelector(".expected-output details").open'), false, 'Expected output folded on phones')
    assert((await evaluate('document.querySelector(".out-preview").textContent')).length > 0, 'One-line preview')
    await click('.expected-output summary'); assert(await evaluate('document.querySelector(".expected-output details").open && getComputedStyle(document.querySelector(".out-preview")).display === "none"'))
    // keyboard accessory toolbar
    await evaluate('document.querySelector("[data-blank=B]").focus()')
    await wait('document.querySelector(".kbd-bar")')
    assert((await evaluate('document.querySelector(".kbd-count").textContent')).replace(/\s+/g, ' ').trim() === 'Blank 2 of 10')
    assert(await evaluate('(() => { const bar = document.querySelector(".kbd-bar").getBoundingClientRect(); return Math.abs(bar.bottom - innerHeight) <= 1 && bar.left === 0 && bar.right === innerWidth })()'), 'Toolbar pinned to the bottom edge when no keyboard resizes the viewport')
    await evaluate('[...document.querySelectorAll(".kbd-btn")].find(b => b.getAttribute("aria-label") === "Next blank").click()')
    assert.equal(await evaluate('document.activeElement.dataset.blank'), 'C')
    await wait('document.querySelector(".kbd-count").textContent.includes("Blank 3 of 10")')
    await evaluate('[...document.querySelectorAll(".kbd-btn")].find(b => b.getAttribute("aria-label") === "Previous blank").click()')
    assert.equal(await evaluate('document.activeElement.dataset.blank'), 'B')
    await evaluate('document.activeElement.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }))')
    assert.equal(await evaluate('document.activeElement.dataset.blank'), 'C', 'Enter = Next')
    assert(await evaluate('(() => { const r = document.activeElement.getBoundingClientRect(), bar = document.querySelector(".kbd-bar").getBoundingClientRect(); return r.top >= 0 && r.bottom <= bar.top })()'), 'Focused blank stays clear of the toolbar')
    // live validation inside the code
    await type('C', 'wrong'); await wait('document.querySelector("[data-blank=C]").closest(".ib").classList.contains("is-wrong")')
    assert.equal(await evaluate('document.querySelector("[data-blank=C]").closest(".ib").querySelector(".ib-icon").textContent'), '✗')
    const rowBefore = await evaluate('document.querySelector("[data-blank=C]").closest(".code-line").getBoundingClientRect().height')
    await type('C', keys.C); await wait('document.querySelector("[data-blank=C]").closest(".ib").classList.contains("is-correct")')
    assert.equal(await evaluate('document.querySelector("[data-blank=C]").closest(".code-line").getBoundingClientRect().height'), rowBefore, 'Marking never changes the line height')
    assert.match(await evaluate('document.querySelector(".question-bar .bar-score").textContent'), /^ ?1\/10 correct$/, 'Score lives in the sticky question bar')
    // reveal from the toolbar counts as revealed, not correct
    await evaluate('document.querySelector("[data-blank=D]").focus()'); await wait('document.querySelector(".kbd-bar")')
    await evaluate('document.querySelector(".kbd-icon").click()')
    assert.equal(await evaluate('document.querySelector("[data-blank=D]").value'), keys.D)
    assert(await evaluate('document.querySelector("[data-blank=D]").readOnly && document.querySelector("[data-blank=D]").closest(".ib").classList.contains("is-showing")'))
    await evaluate('[...document.querySelectorAll(".kbd-btn")].find(b => b.textContent.trim() === "Done").click()')
    assert.equal(await evaluate('!document.querySelector(".kbd-bar")'), true, 'Done dismisses the toolbar')
    // comment markers: one at a time, the switch expands / collapses all
    assert.equal(await evaluate('document.querySelectorAll(".code-comment").length'), 0)
    await click('.line-marker'); assert.equal(await evaluate('document.querySelectorAll(".code-comment").length'), 1)
    assert.equal(await evaluate('document.querySelector(".line-marker").getAttribute("aria-expanded")'), 'true')
    await click('.explain-switch'); assert(await evaluate('document.querySelectorAll(".code-comment").length === document.querySelectorAll(".line-marker").length'), 'Explain switch expands all')
    assert((await evaluate('(() => { const n = document.querySelector(".code-note"); return parseFloat(getComputedStyle(n).fontSize) })()')) >= 14, 'Comments stay readable')
    await click('.explain-switch'); assert.equal(await evaluate('document.querySelectorAll(".code-comment").length'), 0)
    // finishing every blank submits once, like before
    for (const [blank, value] of Object.entries(keys)) await type(blank, value)
    await click('.reveal-all').catch(() => {})
    assert(await evaluate('!!document.querySelector("#practice-submit") || !!document.querySelector(".report")'))

    // ---- 3. Desktop: Side panel | Inline toggle ----
    await viewport(1280, 900)
    await navigate('/?view=practice&topic=structs')
    assert.equal(await evaluate('document.querySelectorAll(".answer-window").length'), 1, 'Side panel is the wide-screen default')
    assert.equal(await evaluate('document.querySelector(".expected-output details").open && document.querySelector(".task-details").open'), true, 'Expected output and task details open on desktop')
    assert.equal(await evaluate('document.querySelector(".mode-toggle [aria-pressed=true]").textContent'), 'Side panel')
    assert(await evaluate('getComputedStyle(document.querySelector(".answer-window")).position === "sticky"'), 'Answers stay beside the program')
    assert(await evaluate('document.querySelector(".program-window").getBoundingClientRect().width <= 54 * 16 + 1'), 'Code column keeps a readable measure')
    await click('.mode-toggle button:nth-of-type(2)')
    await wait('!document.querySelector(".answer-window") && document.querySelectorAll(".ib input").length === 10')
    assert.equal(await evaluate('localStorage.getItem("exam-desk.answer-mode.v1")'), 'inline')
    await evaluate('document.querySelector("[data-blank=B]").focus()'); assert.equal(await evaluate('!document.querySelector(".kbd-bar")'), true, 'No keyboard toolbar with a hardware keyboard')
    await navigate('/?view=practice&topic=structs'); assert.equal(await evaluate('document.querySelectorAll(".ib input").length'), 10, 'Preference is remembered')
    await click('.mode-toggle button:nth-of-type(1)'); await wait('document.querySelector(".answer-window")')
    await viewport(768, 900); await wait('!document.querySelector(".mode-toggle") && !document.querySelector(".answer-window")')  // tablets are inline only
    await viewport(1280, 900)

    // ---- 4. Mock on a phone: inline, no reveal, no live marking ----
    await viewport(390, 844)
    const paper = papers[0], mq = mockById.get(paper.questionIds[0]), started = Date.now()
    await evaluate(`localStorage.setItem('exam-desk.exam.v1', ${JSON.stringify(JSON.stringify({ paperId: paper.id, startedAt: started, deadline: started + 9000000, index: 0, answers: {}, submitted: false, attemptIds: [] }))})`)
    await navigate('/?view=exam')
    assert.equal(await evaluate('document.querySelectorAll(".program-window .ib input").length'), 10)
    await evaluate('document.querySelector("[data-blank=A]").focus()'); await wait('document.querySelector(".kbd-bar")')
    assert.equal(await evaluate('document.querySelectorAll(".kbd-icon,.reveal-all,.reveal-answer").length'), 0, 'No reveal in mocks')
    await type('A', mq.blanks[0].accepted[0]); await sleep(400)
    assert.equal(await evaluate('document.querySelectorAll(".ib.is-correct,.ib.is-wrong,.ib-icon:not(:empty)").length'), 0, 'Neutral fields while the timer runs')
    // marked mock report: every program in it also reads in the page flow
    await click('#exam-submit'); await wait('document.querySelector("dialog[open]")')
    await click('.dialog-actions button:last-child'); await wait('document.querySelector(".exam-reports")')
    for (let i = 0; i < 5; i++) {
      const problems = await evaluate(`(() => { window.__measureTarget = document.querySelectorAll('.exam-question-report .code-lines')[${i}]; const r = ${MEASURE}; window.__measureTarget = null; return r })()`)
      assert.deepEqual(problems, [], `mock report ${i + 1} @390px: ${problems.join('; ')}`)
    }
    await evaluate(`localStorage.removeItem('exam-desk.exam.v1')`)

    // ---- 5. Performance: typing re-renders one line, not the program ----
    for (const [width, mode] of [[390, 'inline'], [1280, 'side'], [1280, 'inline']]) {
      await viewport(width, 900)
      await evaluate(`localStorage.setItem('exam-desk.answer-mode.v1', ${JSON.stringify(mode)})`)
      await navigate('/?view=practice&topic=structs')
      const lines = await evaluate('document.querySelectorAll(".code-lines>.code-line").length')
      await evaluate('window.__renders = {}; document.querySelector("[data-blank=A]").focus()')
      const typed = 'abcdefghijklmnopqrst'
      for (let i = 1; i <= typed.length; i++) { await type('A', typed.slice(0, i)); await sleep(15) }
      await sleep(300)
      const renders = await evaluate('window.__renders')
      // React StrictMode renders each component twice in development: allow 2 per keystroke plus the settled-validation pass.
      const allowed = 2 * typed.length + 8
      assert(renders.CodeLine <= allowed, `${width}px ${mode}: ${renders.CodeLine} line renders for ${typed.length} keystrokes in a ${lines}-line program (limit ${allowed})`)
      if (mode === 'side') assert(renders.AnswerField <= allowed, `${width}px side: ${renders.AnswerField} answer-field renders (limit ${allowed})`)
      console.log(`  perf ${width}px ${mode}: ${typed.length} keystrokes -> ${renders.CodeLine || 0} line renders${renders.AnswerField ? `, ${renders.AnswerField} field renders` : ''} (${lines}-line program; unmemoised would be ~${lines * typed.length * 2})`)
    }
    await evaluate(`localStorage.removeItem('exam-desk.answer-mode.v1')`)
    console.log(`Inline browser checks passed: no inner scroll or horizontal panning with hanging indent for ${checked} program views (every practice question and mock slot at 390/768/1280px, both answer modes), phone inline inputs with toolbar (Prev/Next/Enter/Reveal/Done), in-code validation without layout shift, score in the question bar, comment markers, folded task details and expected output, desktop Side panel | Inline toggle, neutral mock, per-line render counts.`)
  })
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) await checkInlineBrowser()
