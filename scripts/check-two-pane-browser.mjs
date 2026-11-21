// Dependency-free real-layout checks using an installed headless Chromium and CDP.
import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { createServer } from 'vite'

export async function checkTwoPaneBrowser() {
 const executable = process.env.CHROME_PATH || ['C:/Program Files/Google/Chrome/Application/chrome.exe','C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe','/usr/bin/chromium','/usr/bin/google-chrome'].find(existsSync)
 if (!executable) { console.log('Headless browser unavailable; real-layout checks require CHROME_PATH.'); return }
 const profile = await mkdtemp(join(tmpdir(),'examdesk-ui-'))
 const server = await createServer({ server:{host:'127.0.0.1',port:0,strictPort:false}, clearScreen:false })
 await server.listen()
 const origin = `http://127.0.0.1:${server.httpServer.address().port}`
 const child = spawn(executable,['--headless=new','--no-sandbox','--disable-gpu','--no-first-run','--no-default-browser-check','--remote-debugging-port=0',`--user-data-dir=${profile}`,'about:blank'],{windowsHide:true,stdio:['ignore','ignore','pipe']})
 let socket
 try {
  const endpoint = await new Promise((resolve,reject)=>{
   let stderr=''; const timer=setTimeout(()=>reject(Error('Chromium did not start within 15s: '+stderr.slice(-500))),15000)
   child.stderr.on('data',chunk=>{stderr+=chunk; const match=/DevTools listening on (ws:\/\/[^\s]+)/.exec(stderr);if(match){clearTimeout(timer);resolve(match[1])}})
   child.on('error',error=>{clearTimeout(timer);reject(error)})
   child.on('exit',code=>{clearTimeout(timer);reject(Error(`Chromium exited ${code}: ${stderr.slice(-500)}`))})
  })
  socket = new WebSocket(endpoint)
  await new Promise((resolve,reject)=>{socket.onopen=resolve;socket.onerror=reject})
  let sequence=0,session
  const pending = new Map()
  let pageLoaded
  socket.onmessage = event => { const data=JSON.parse(event.data);if(data.method==='Page.loadEventFired')pageLoaded?.();if(data.id&&pending.has(data.id)){const {resolve,reject,timer}=pending.get(data.id);clearTimeout(timer);pending.delete(data.id);data.error?reject(Error(JSON.stringify(data.error))):resolve(data.result)} }
  const send=(method,params={},target=session)=>new Promise((resolve,reject)=>{const id=++sequence; const timer=setTimeout(()=>{pending.delete(id);reject(Error('CDP timeout: '+method))},15000);pending.set(id,{resolve,reject,timer});socket.send(JSON.stringify({id,method,params,...(target?{sessionId:target}:{})}))})
  const {targetId}=await send('Target.createTarget',{url:'about:blank'})
  session=(await send('Target.attachToTarget',{targetId,flatten:true})).sessionId
  await send('Page.enable'); await send('Runtime.enable')
  const evaluate=async expression=>{const result=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(result.exceptionDetails)throw Error(result.exceptionDetails.text+' '+result.exceptionDetails.exception?.description);return result.result.value}
  const wait=async expression=>{for(let i=0;i<100;i++){if(await evaluate(`Boolean(${expression})`))return;await new Promise(r=>setTimeout(r,100))}throw Error('UI timeout: '+expression)}
  const load=async action=>{const loaded=new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('Page load timeout')),15000);pageLoaded=()=>{clearTimeout(timer);resolve()}});await action();await loaded;pageLoaded=undefined}
  const navigate=async path=>{await load(()=>send('Page.navigate',{url:origin+path}));await wait('document.querySelector(".code-editor")')}
  const click=selector=>evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`)
  const select=(label,value)=>evaluate(`(()=>{const el=[...document.querySelectorAll('.filter-bar label')].find(el=>el.firstChild?.textContent===${JSON.stringify(label)}).querySelector('select');el.value=${JSON.stringify(value)};el.dispatchEvent(new Event('change',{bubbles:true}));})()`)
  const type=async(id,value)=>{await evaluate(`(()=>{const el=document.querySelector('[data-blank="${id}"]');Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(el,${JSON.stringify(value)});el.dispatchEvent(new Event('input',{bubbles:true}));})()`)}
  const pools=await Promise.all(['past','original','mocks'].map(n=>readFile(new URL(`../src/data/itp/${n}.json`,import.meta.url),'utf8').then(JSON.parse)))
  await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false})
  await navigate('/?view=practice&topic=structs')
  const selectedId=await evaluate('document.querySelector(".question-heading").dataset.questionId')
  const q=pools.flat().find(q=>q.id===selectedId), keys=Object.fromEntries(q.blanks.map(b=>[b.id,b.accepted[0]]))
  assert(await evaluate('!document.querySelector(".concept-note").open'),'Concept note starts closed')
  await click('.concept-note>summary')
  assert(await evaluate('document.querySelector(".concept-note").open && document.querySelector(".concept-note-body p").textContent.trim().length>0'))
  assert(await evaluate('document.querySelector(".concept-lesson-link").getAttribute("aria-label").startsWith("Open the full ")'))
  assert(await evaluate(`document.querySelector('.concept-lesson-link').getAttribute('href')==='?view=learn&topic=${q.topic}'`))
  assert.equal(await evaluate('document.querySelectorAll(".blank-field input").length'),10)
  assert.equal(await evaluate('document.querySelectorAll(".program-window input").length'),0)
  const rendered=await evaluate('[...document.querySelectorAll(".code-line:not(.code-comment)>code")].map(el=>el.textContent).join("\\n")')
  assert.equal(rendered,q.code.replace(/__([A-Z])__/g,(_,id)=>`_________Blank${q.blanks.findIndex(b=>b.id===id)+1}_________`))
  assert.equal(await evaluate('document.querySelector(".expected-output pre:last-child").textContent'),q.expectedOutput || '(no standard output; see output files)')
  assert(await evaluate('document.querySelector(".program-window").nextElementSibling.classList.contains("expected-output")'),'Expected output directly follows the program')
  assert.equal(await evaluate('document.querySelectorAll(".code-comment").length'),0)
  await click('.explain-switch'); assert(await evaluate('document.querySelectorAll(".code-comment").length>0'))
  await load(()=>send('Page.reload'));await wait('document.querySelector(".code-comment")')
  await click('.explain-switch');assert.equal(await evaluate('document.querySelectorAll(".code-comment").length'),0)
  await type('A','wrong');await wait('document.querySelector(".blank-field.is-wrong input[aria-invalid=true]")')
  assert(await evaluate('document.querySelector(".program-blank").textContent==="_________Blank1_________"'),'Wrong input keeps the marker')
  await type('A',keys.A);await wait('document.querySelector(".blank-field.is-correct")')
  assert.equal(await evaluate('document.querySelector(".program-answer.is-correct>span:last-child").textContent'),keys.A)
  assert.equal(await evaluate('document.querySelector(".program-answer").getAttribute("aria-label")'),`Blank 1, correct: ${keys.A}`)
  await type('A','');await wait('document.querySelector(".blank-field.is-neutral")')
  assert(await evaluate('document.querySelector(".program-blank").textContent==="_________Blank1_________"'),'Empty input restores the marker')
  await click('.program-blank'); assert.equal(await evaluate('document.activeElement.dataset.blank'),'A')
  assert(await evaluate('document.querySelector(".program-blank.is-active")!==null'))
  await evaluate('[...document.querySelectorAll(".program-blank")].at(-1).click()')
  assert.equal(await evaluate('document.activeElement.dataset.blank'),'J')
  assert(await evaluate('(()=>{const input=document.activeElement.getBoundingClientRect(),pane=document.querySelector(".answer-window").getBoundingClientRect();return input.top>=pane.top&&input.bottom<=pane.bottom})()'),'A chip brings its focused answer into the local answer viewport')
  await type('A','my draft');await wait('document.querySelector(".blank-field.is-wrong")')
  await click('.reveal-answer')
  assert.equal(await evaluate('document.querySelector(".blank-field input").value'),keys.A,'Reveal shows the key inside the box')
  assert(await evaluate('document.querySelector(".blank-field input").readOnly'))
  assert.equal(await evaluate('document.querySelector(".program-answer.is-revealed>span:last-child").textContent'),keys.A)
  assert.equal(await evaluate('document.querySelector(".program-answer.is-revealed").getAttribute("aria-label")'),`Blank 1, revealed: ${keys.A}`)
  assert(await evaluate('document.querySelector(".reveal-answer").getAttribute("aria-pressed")==="true"'))
  await click('.reveal-answer')
  assert.equal(await evaluate('document.querySelector(".blank-field input").value'),'my draft','Hide restores the student draft')
  assert(await evaluate('!document.querySelector(".blank-field input").readOnly && !document.querySelector(".program-answer.is-revealed")'))
  assert(await evaluate('document.querySelector(".program-blank").textContent==="_________Blank1_________"'),'Hide restores the chip')
  for(const [id,value] of Object.entries(keys)) await type(id,value)
  await wait('document.querySelector(".answer-summary").textContent.includes("9 of 10 correct")')
  assert(!await evaluate('document.querySelector(".report")'))
  await click('#practice-submit');await wait('document.querySelector(".report")')
  const saved=await evaluate('JSON.parse(localStorage.getItem("exam-desk.progress.v1")).attempts.at(-1)')
  assert.deepEqual(saved.revealed,['A']);assert.equal(saved.results.A,false)
  assert.equal(Object.values(saved.results).filter(Boolean).length,9)
  assert(await evaluate('document.querySelector(".answer-card.revealed").textContent.includes("Revealed")'))
  assert.equal(await evaluate('document.querySelector(".answer-card .text-button")'),null,'Revealed blanks cannot be self-marked')
  await evaluate('[...document.querySelectorAll(".dock-main button")].find(b=>b.textContent==="Try again").click()')
  for(const [id,value] of Object.entries(keys)) await type(id,value)
  await wait('document.querySelector(".report")?.textContent.includes("All 10 correct!")')
  assert.equal(await evaluate('JSON.parse(localStorage.getItem("exam-desk.progress.v1")).attempts.length'),2,'Live completion records exactly once')
  assert.equal(await evaluate('document.querySelector(".streak-badge").textContent.trim()'),'✦ 1 fully correct in a row')
  await click('.concept-note .concept-lesson-link');await wait('document.querySelector(".learn-article")')
  assert.equal(await evaluate('new URL(location.href).searchParams.get("topic")'),q.topic)
  await evaluate('[...document.querySelectorAll("button")].find(b=>b.textContent==="Back to your question").click()')
  await wait('document.querySelector("#main>div:not([hidden]) .blank-field input")')
  assert.equal(await evaluate('document.querySelector(".blank-field input").value'),keys.A,'Learn round-trip retains the current answers')
  // Mixed visibility becomes all-visible with one click, then all-hidden without losing drafts.
  await evaluate('[...document.querySelectorAll(".dock-main button")].find(b=>b.textContent==="Try again").click()')
  await type('B',keys.B+' '.repeat(500));await wait('document.querySelector(".blank-field.is-correct")')
  await click('.reveal-answer');assert.equal(await evaluate('document.querySelector(".reveal-all").getAttribute("aria-pressed")'),'false')
  await click('.reveal-all')
  await wait('document.querySelectorAll(".program-answer.is-revealed").length===10')
  assert.equal(await evaluate('document.querySelector(".reveal-all").textContent'),'Hide all')
  assert.equal(await evaluate('document.querySelector(".reveal-all").getAttribute("aria-pressed")'),'true')
  assert.deepEqual(await evaluate('[...document.querySelectorAll(".blank-field input")].map(el=>el.value)'),Object.values(keys))
  assert.equal(await evaluate('document.querySelectorAll(".reveal-answer[aria-pressed=true]").length'),10)
  assert(await evaluate('document.querySelector(".answer-summary").textContent.includes("0 of 10 correct · 10 revealed")'),'Reveal-all earns no live credit')
  await click('.reveal-all')
  assert.equal(await evaluate('document.querySelector(".reveal-all").getAttribute("aria-pressed")'),'false')
  assert.equal(await evaluate('document.querySelectorAll(".program-answer").length'),0,'Hide-all restores all chips, including previously revealed and correct fields')
  assert.equal(await evaluate('document.querySelector("[data-blank=B]").value'),keys.B+' '.repeat(500))
  await type('B','');await type('B',keys.B)
  await wait('document.querySelector(".answer-summary").textContent.includes("10 revealed")')
  await click('#practice-submit');await wait('document.querySelector(".report")')
  const allRevealed=await evaluate('JSON.parse(localStorage.getItem("exam-desk.progress.v1")).attempts.at(-1)')
  assert.deepEqual(allRevealed.revealed,Object.keys(keys))
  assert(Object.values(allRevealed.results).every(result=>result===false),'Hiding and retyping never regain marks')
  assert.equal(await evaluate('document.querySelector(".streak-badge").textContent.trim()'),'✦ 0 fully correct in a row')
  await evaluate('[...document.querySelectorAll(".dock-main button")].find(b=>b.textContent==="Try again").click()')
  await type('B',keys.B+' '.repeat(500));await wait('document.querySelector(".program-answer.is-correct")')
  await click('.reveal-answer')
  // Layout is measured in the actual rendering engine for every supported palette.
  for(const width of [1440,768,390,320]) {
   await send('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:width<768})
   for(const theme of ['paper','sky','midnight','ember']){
    await evaluate(`document.documentElement.dataset.theme=${JSON.stringify(theme)}`)
    assert(await evaluate('document.documentElement.scrollWidth <= innerWidth'),`${theme} page overflow at ${width}px`)
    if(width>=1200) assert(await evaluate('document.querySelector(".answer-window").getBoundingClientRect().left > document.querySelector(".program-window").getBoundingClientRect().left'),`Two columns at ${width}`)
    else assert(await evaluate('!document.querySelector(".answer-window") && document.querySelectorAll(".program-window .ib input").length===10'),`Inline answers below 75rem (${width}px)`)
   }
  }
  await navigate('/?view=practice')
  assert.equal(await evaluate('document.querySelector(".expected-output")'),null,'Predict-the-output questions never disclose their output')
  assert.deepEqual(await evaluate('[...document.querySelectorAll(".question-nav .practice-topic")].map(el=>el.dataset.topic)'),['operators','loops','arrays','matrices','strings','functions','pointers','structs','memory','files','scope'])
  await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true})
  await click('.question-bar-position');await wait('document.querySelector(".sheet[open] .practice-topic[open]")')
  for(const theme of ['paper','sky','midnight','ember']){
    await evaluate(`document.documentElement.dataset.theme=${JSON.stringify(theme)}`)
    assert(await evaluate('document.documentElement.scrollWidth<=innerWidth && document.querySelector(".sheet[open]").scrollWidth<=document.querySelector(".sheet[open]").clientWidth'),`${theme}: topic sheet fits 390px`)
  }
  await click('.sheet[open] .practice-topic[data-topic="operators"] .question-list button:last-child')
  await wait('document.querySelector(".topic-end-actions")')
  assert(await evaluate('document.querySelectorAll(".question-bar-step")[1].disabled'),'Next stays inside the current topic')
  assert(await evaluate('document.querySelector(".topic-end-actions").textContent.includes("Next topic:")'))
  await click('.topic-end-actions button:first-child')
  await wait('document.querySelector(".question-bar-position").textContent.includes("Loops")')
  assert(await evaluate('document.querySelectorAll(".question-bar-step")[0].disabled'),'Next topic starts at its first question')
  await select('Priority','extra');await select('Question bank','exam21');await select('Question type','blanks');await select('Topic','arrays')
  await wait('document.querySelector(".question-heading .priority-extra")')
  assert(await evaluate('document.querySelectorAll(".question-nav .practice-topic").length===1 && document.querySelector(".question-nav .practice-topic").dataset.topic==="arrays"'),'Topic/type/bank/priority filters compose')
  assert(await evaluate('[...document.querySelectorAll(".question-nav .question-list button")].every(el=>el.querySelector(".priority-extra") && el.dataset.questionId.startsWith("exam21-"))'))
  await evaluate('document.querySelector(".filter-bar input[type=checkbox]").click()')
  await wait('document.querySelector(".empty-state")')
  assert(await evaluate('document.querySelector(".empty-state").textContent.includes("A clean slate")'),'Only mistakes composes with all other filters')
  // Check the expected output in every new paper slot, with neutral answers throughout.
  const allPapers=JSON.parse(await readFile(new URL('../src/data/itp/papers.json',import.meta.url),'utf8'))
  for(const paperId of ['mock-d','mock-e','mock-f']){
    const candidate=allPapers.find(p=>p.id===paperId),started=Date.now()
    await evaluate(`localStorage.setItem('exam-desk.exam.v1',${JSON.stringify(JSON.stringify({paperId,startedAt:started,deadline:started+9000000,index:0,answers:{},submitted:false,attemptIds:[]}))})`)
    await navigate('/?view=exam')
    for(let index=0;index<5;index++){
      const expected=pools[2].find(q=>q.id===candidate.questionIds[index])
      await evaluate(`document.querySelectorAll('.exam-tabs>button')[${index}].click()`)
      await wait(`document.querySelector('.question-heading h2').textContent===${JSON.stringify(expected.title)}`)
      assert.equal(await evaluate('document.querySelector(".expected-output pre:last-child").textContent'),expected.expectedOutput)
      assert.equal(await evaluate('document.querySelectorAll(".reveal-answer,.reveal-all,.program-answer,.concept-note,.is-correct,.is-wrong").length'),0)
      assert(await evaluate('document.documentElement.scrollWidth<=innerWidth'),`${expected.id}: fits 390px`)
    }
  }
  const paper=JSON.parse(await readFile(new URL('../src/data/itp/papers.json',import.meta.url),'utf8'))[0]
  const mock=pools[2].find(q=>q.id===paper.questionIds[0]),start=Date.now()
  const exam={paperId:paper.id,startedAt:start,deadline:start+9000000,index:0,answers:{[mock.id]:Object.fromEntries(mock.blanks.map(b=>[b.id,b.accepted[0]]))},submitted:false,attemptIds:[]}
  await evaluate(`localStorage.setItem('exam-desk.exam.v1',${JSON.stringify(JSON.stringify(exam))});localStorage.setItem('exam-desk.explain-code.v1','true')`)
  await navigate('/?view=exam')
  assert.equal(await evaluate('document.querySelectorAll(".reveal-answer,.reveal-all,.program-answer,.concept-note,.is-correct,.is-wrong,.code-comment,input[aria-invalid]").length'),0)
  await click('.explain-switch');assert(await evaluate('document.querySelector(".code-comment")!==null'))
  await click('#exam-submit');await wait('document.querySelector("dialog[open]")')
  await click('.dialog-actions button:last-child');await wait('document.querySelector(".exam-reports")')
  assert.equal(await evaluate('document.querySelectorAll(".exam-question-report:first-child :is(.blank-field,.ib).is-correct").length'),10)
  assert(await evaluate('document.querySelector(".exam-question-report:nth-child(2) :is(.blank-field,.ib).is-wrong")!==null'))
  assert(await evaluate('document.querySelector(".accepted-answer")!==null'))
  assert(await evaluate('document.documentElement.scrollWidth <= innerWidth'),'Mock report overflow at 320px')
  if(process.env.EXAMDESK_SCREENSHOT) {
   await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false})
   await evaluate("localStorage.removeItem('exam-desk.explain-code.v1')")
   await navigate('/?view=practice&topic=structs')
   await type('B',keys.B);await wait('document.querySelector(".program-answer.is-correct")')
   await click('.reveal-answer');await click('.concept-note>summary')
   await evaluate("document.querySelector('.program-window').scrollIntoView({block:'start'})")
   const shot=await send('Page.captureScreenshot',{format:'png'})
   await writeFile(process.env.EXAMDESK_SCREENSHOT,Buffer.from(shot.data,'base64'))
   await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true})
   await evaluate("document.querySelector('.program-window').scrollIntoView({block:'start'})")
   const mobileShot=await send('Page.captureScreenshot',{format:'png'})
   await writeFile(process.env.EXAMDESK_SCREENSHOT.replace('.png','-mobile.png'),Buffer.from(mobileShot.data,'base64'))
   await evaluate("document.documentElement.dataset.theme='midnight';document.querySelector('.answer-window').scrollIntoView({block:'start'})")
   await evaluate('new Promise(resolve=>setTimeout(resolve,200))')
   const darkShot=await send('Page.captureScreenshot',{format:'png'})
   await writeFile(process.env.EXAMDESK_SCREENSHOT.replace('.png','-midnight.png'),Buffer.from(darkShot.data,'base64'))
   await navigate('/?view=practice')
   await click('.question-bar-position');await wait('document.querySelector(".sheet[open]")')
   const topicShot=await send('Page.captureScreenshot',{format:'png'})
   await writeFile(process.env.EXAMDESK_SCREENSHOT.replace('.png','-topics.png'),Buffer.from(topicShot.data,'base64'))
  }
  console.log('Browser checks passed: inline correct/revealed code and accessible labels, reveal-all/hide-all with preserved drafts and no marks/streak credit, closed concept disclosure and matching Learn round-trip, live validation, comments, chip focus, one completion/streak, grouped topic/sheet navigation, composed filters, expected output in all 15 new mock slots, neutral mocks/reports without reveal controls, original whitespace and 1440/768/390/320px reflow in all four themes.')
  socket.send(JSON.stringify({id:++sequence,method:'Browser.close'}))
 } finally {
  socket?.close();child.kill();await server.close()
  // Only remove the exact temporary profile we created under the system temp directory.
  assert(resolve(profile).startsWith(resolve(tmpdir())+'\\')||resolve(profile).startsWith(resolve(tmpdir())+'/'))
  await rm(profile,{recursive:true,force:true,maxRetries:5,retryDelay:200}).catch(()=>{})
 }
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href) await checkTwoPaneBrowser()
