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
  const navigate=async path=>{await load(()=>send('Page.navigate',{url:origin+path}));await wait('document.querySelector(".blank-field input")')}
  const click=selector=>evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`)
  const type=async(id,value)=>{await evaluate(`(()=>{const el=document.querySelector('[data-blank="${id}"]');Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(el,${JSON.stringify(value)});el.dispatchEvent(new Event('input',{bubbles:true}));})()`)}
  const pools=await Promise.all(['past','original','mocks'].map(n=>readFile(new URL(`../src/data/itp/${n}.json`,import.meta.url),'utf8').then(JSON.parse)))
  const q=pools[0].find(q=>q.type==='blanks'), keys=Object.fromEntries(q.blanks.map(b=>[b.id,b.accepted[0]]))
  await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false})
  await navigate('/?view=practice')
  assert.equal(await evaluate('document.querySelectorAll(".blank-field input").length'),10)
  assert.equal(await evaluate('document.querySelectorAll(".program-window input").length'),0)
  const rendered=await evaluate('[...document.querySelectorAll(".code-line:not(.code-comment)>code")].map(el=>el.textContent).join("\\n")')
  assert.equal(rendered,q.code.replace(/__([A-Z])__/g,(_,id)=>`_________Blank${q.blanks.findIndex(b=>b.id===id)+1}_________`))
  assert.equal(await evaluate('document.querySelectorAll(".code-comment").length'),0)
  await click('.explain-switch'); assert(await evaluate('document.querySelectorAll(".code-comment").length>0'))
  await load(()=>send('Page.reload'));await wait('document.querySelector(".code-comment")')
  await click('.explain-switch');assert.equal(await evaluate('document.querySelectorAll(".code-comment").length'),0)
  await type('A','wrong');await wait('document.querySelector(".blank-field.is-wrong input[aria-invalid=true]")')
  await type('A',keys.A);await wait('document.querySelector(".blank-field.is-correct")')
  await type('A','');await wait('document.querySelector(".blank-field.is-neutral")')
  await click('.program-blank'); assert.equal(await evaluate('document.activeElement.dataset.blank'),'A')
  assert(await evaluate('document.querySelector(".program-blank.is-active")!==null'))
  await evaluate('[...document.querySelectorAll(".program-blank")].at(-1).click()')
  assert.equal(await evaluate('document.activeElement.dataset.blank'),'J')
  assert(await evaluate('(()=>{const input=document.activeElement.getBoundingClientRect(),pane=document.querySelector(".answer-window").getBoundingClientRect();return input.top>=pane.top&&input.bottom<=pane.bottom})()'),'A chip brings its focused answer into the local answer viewport')
  await click('.reveal-answer');assert(await evaluate('document.querySelector(".revealed-key")?.textContent.includes("Answer")'))
  assert(await evaluate('document.querySelector(".reveal-answer").getAttribute("aria-pressed")==="true"'))
  await click('.reveal-answer');assert.equal(await evaluate('document.querySelector(".revealed-key")'),null)
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
  // Layout is measured in the actual rendering engine for every supported palette.
  for(const width of [1440,768,390,320]) {
   await send('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:width<768})
   for(const theme of ['paper','sky','midnight','ember']){
    await evaluate(`document.documentElement.dataset.theme=${JSON.stringify(theme)}`)
    assert(await evaluate('document.documentElement.scrollWidth <= innerWidth'),`${theme} page overflow at ${width}px`)
    if(width>=768) assert(await evaluate('document.querySelector(".answer-window").getBoundingClientRect().left > document.querySelector(".program-window").getBoundingClientRect().left'),`Two columns at ${width}`)
    else assert(await evaluate('document.querySelector(".answer-window").getBoundingClientRect().top > document.querySelector(".program-window").getBoundingClientRect().top'),'Source precedes answers on phones')
   }
  }
  const paper=JSON.parse(await readFile(new URL('../src/data/itp/papers.json',import.meta.url),'utf8'))[0]
  const mock=pools[2].find(q=>q.id===paper.questionIds[0]),start=Date.now()
  const exam={paperId:paper.id,startedAt:start,deadline:start+9000000,index:0,answers:{[mock.id]:Object.fromEntries(mock.blanks.map(b=>[b.id,b.accepted[0]]))},submitted:false,attemptIds:[]}
  await evaluate(`localStorage.setItem('exam-desk.exam.v1',${JSON.stringify(JSON.stringify(exam))});localStorage.setItem('exam-desk.explain-code.v1','true')`)
  await navigate('/?view=exam')
  assert.equal(await evaluate('document.querySelectorAll(".reveal-answer,.is-correct,.is-wrong,.code-comment,input[aria-invalid]").length'),0)
  await click('.explain-switch');assert(await evaluate('document.querySelector(".code-comment")!==null'))
  await click('#exam-submit');await wait('document.querySelector("dialog[open]")')
  await click('.dialog-actions button:last-child');await wait('document.querySelector(".exam-reports")')
  assert.equal(await evaluate('document.querySelectorAll(".exam-question-report:first-child .blank-field.is-correct").length'),10)
  assert(await evaluate('document.querySelector(".exam-question-report:nth-child(2) .blank-field.is-wrong")!==null'))
  assert(await evaluate('document.querySelector(".accepted-answer")!==null'))
  assert(await evaluate('document.documentElement.scrollWidth <= innerWidth'),'Mock report overflow at 320px')
  if(process.env.EXAMDESK_SCREENSHOT) {
   await send('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false})
   await evaluate("localStorage.removeItem('exam-desk.explain-code.v1')")
   await navigate('/?view=practice')
   await evaluate("document.querySelector('.program-window').scrollIntoView({block:'start'})")
   const shot=await send('Page.captureScreenshot',{format:'png'})
   await writeFile(process.env.EXAMDESK_SCREENSHOT,Buffer.from(shot.data,'base64'))
   await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true})
   await evaluate("document.querySelector('.program-window').scrollIntoView({block:'start'})")
   const mobileShot=await send('Page.captureScreenshot',{format:'png'})
   await writeFile(process.env.EXAMDESK_SCREENSHOT.replace('.png','-mobile.png'),Buffer.from(mobileShot.data,'base64'))
   await evaluate("document.documentElement.dataset.theme='midnight';document.querySelector('.answer-window').scrollIntoView({block:'start'})")
   const darkShot=await send('Page.captureScreenshot',{format:'png'})
   await writeFile(process.env.EXAMDESK_SCREENSHOT.replace('.png','-midnight.png'),Buffer.from(darkShot.data,'base64'))
  }
  console.log('Browser checks passed: live validation, reveal/hide and no-mark scoring, comments DOM/persistence, chip focus, one completion/streak, neutral mocks and marked reports, original whitespace, 1440/768/390/320px reflow in all four themes.')
  socket.send(JSON.stringify({id:++sequence,method:'Browser.close'}))
 } finally {
  socket?.close();child.kill();await server.close()
  // Only remove the exact temporary profile we created under the system temp directory.
  assert(resolve(profile).startsWith(resolve(tmpdir())+'\\')||resolve(profile).startsWith(resolve(tmpdir())+'/'))
  await rm(profile,{recursive:true,force:true,maxRetries:5,retryDelay:200}).catch(()=>{})
 }
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href) await checkTwoPaneBrowser()
