import assert from 'node:assert/strict'
import { writeFile, rm } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'
import { withBrowser } from './lib/cdp.mjs'

export async function checkDMBrowser() {
 const harnessName=`.dm-browser-check-${process.pid}.html`,harness=resolve(harnessName)
 await writeFile(harness,`<!doctype html><html data-theme="paper"><head><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/src/index.css"></head><body><div class="app-shell"><div class="workspace"><main id="qa"></main></div></div><script type="module">
 import React from 'react';
 import {createRoot} from 'react-dom/client';
 import {DMFields,DMFeedback,DMHeading} from '/src/components/DMQuestion.tsx';
 import {dmQuestions} from '/src/data/dm.ts';
 import {dmModelAnswers} from '/src/lib/dm.ts';
 const root=createRoot(document.getElementById('qa')),h=React.createElement;
 window.dmQA={questions:dmQuestions,async show(id,report=false){const q=dmQuestions.find(q=>q.id===id),answers=q.type==='steps'?{working:'Step 1: typed mathematical reasoning.'}:dmModelAnswers(q);root.render(h(React.Fragment,null,h(DMHeading,{question:q}),h(DMFields,{question:q,answers:report?answers:{},locked:report,checked:report,onChange(){}}),report?h(DMFeedback,{question:q,answers,onAssess(){},onLearn(){}}):null));await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));}};
 </script></body></html>`,'utf8')
 try { await withBrowser(async ({navigate,evaluate,viewport,wait,click,load,send,sleep})=>{
   await viewport(390,844)
   await navigate('/'+harnessName,'#qa')
   await wait('window.dmQA')
   await sleep(1000)
   console.log('DM browser: checking all 390px editors/reports…')
   const failures=await evaluate(`(async()=>{
     const failures=[];for(const q of dmQA.questions)for(const report of [false,true]){
       await dmQA.show(q.id,report);
       for(const el of [document.documentElement,document.querySelector('.workspace'),document.querySelector('main')])if(el.scrollWidth>el.clientWidth+1)failures.push(q.id+' '+report+' '+el.tagName+' '+el.scrollWidth+'/'+el.clientWidth);
       for(const el of document.querySelectorAll('.dm-truth-cell')){const r=el.getBoundingClientRect();if(r.width<44||r.height<44)failures.push(q.id+' small truth cell');}
     }return failures;})()`)
   assert.deepEqual(failures,[],'Every DM editor/report must fit 390px')
   console.log('DM browser: checking themes and practice interactions…')
   for(const theme of ['sky','midnight','ember']) {
     await evaluate(`document.documentElement.dataset.theme=${JSON.stringify(theme)}`)
     const failures=await evaluate(`(async()=>{const samples=[...new Map(dmQA.questions.map(q=>[q.type,q])).values()],f=[];for(const q of samples){await dmQA.show(q.id,true);if(document.querySelector('.workspace').scrollWidth>document.querySelector('.workspace').clientWidth+1)f.push(q.id);}return f;})()`)
     assert.deepEqual(failures,[],theme)
   }
   await navigate('/?subject=dm&view=practice&topic=logic','.dm-truth-cell')
   await evaluate('localStorage.clear()')
   await load(()=>send('Page.reload'));await wait('document.querySelector(".dm-truth-cell")')
   assert.equal(await evaluate('document.querySelector(".dm-truth-cell").textContent'),'·')
   await click('.dm-truth-cell');await wait('document.querySelector(".dm-truth-cell").textContent==="T"')
   await click('.dm-truth-cell');await wait('document.querySelector(".dm-truth-cell").textContent==="F"')
   await click('.dm-truth-cell');await wait('document.querySelector(".dm-truth-cell").textContent==="·"')
   await evaluate(`(()=>{const el=document.querySelector('.dm-working textarea');Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype,'value').set.call(el,'Step 1: persisted reasoning.');el.dispatchEvent(new Event('input',{bubbles:true}));})()`)
   await wait('document.querySelector(".dm-working textarea").value.includes("persisted")')
   await load(()=>send('Page.reload'));await wait('document.querySelector(".dm-working textarea")?.value.includes("persisted")')
   await click('.dm-truth-table .text-button')
   await wait('document.querySelectorAll(".dm-truth-cell.revealed").length>0')
   await evaluate(`[...document.querySelectorAll('.dm-question-actions button')].find(b=>b.textContent==='Reveal all').click()`)
   await evaluate(`[...document.querySelectorAll('.dm-question-actions button')].find(b=>b.textContent==='Check answers').click()`)
   await wait('document.querySelector(".dm-report")')
   assert(await evaluate('document.querySelector(".dm-report .score").textContent.startsWith("0")'),'Reveal earns zero marks')
   await navigate('/?subject=dm&view=home','main')
   assert(await evaluate('document.querySelector("#dm-slot-title").textContent.includes("Slot 1")'))
   assert(await evaluate('[...document.querySelectorAll("#main a")].filter(a=>a.href.includes("view=practice")).every(a=>a.href.includes("subject=dm"))'))
   await click('.menu-toggle')
   await evaluate(`[...document.querySelectorAll('.subject-option')].find(b=>b.querySelector('.subject-initial')?.textContent==='ITP').click()`)
   await wait('document.querySelector(".subject-tag")?.textContent.includes("ITP")')
   await evaluate('history.back()')
   await wait('document.querySelector("#dm-slot-title")')
   await load(()=>send('Page.reload'));await wait('document.querySelector("#dm-slot-title")')
   await navigate('/?subject=dm&view=practice&topic=mst','.dm-mst')
   await evaluate(`(async()=>{const {dmPracticeQuestions}=await import('/src/data/dm.ts');const q=dmPracticeQuestions.find(q=>q.id===document.querySelector('.dm-practice-question .question-heading').dataset.questionId);window.mstQA=q;})()`)
   await evaluate(`(()=>{const q=mstQA,e=q.graph.edges.find(e=>e.id===q.answer.edgeSequence[0]);[...document.querySelectorAll('.dm-edge-buttons button')].find(b=>b.textContent.startsWith(e.u+e.v+' ')).click();})()`)
   await wait('document.querySelector(".dm-mst input").value.length>0')
   await evaluate(`[...document.querySelectorAll('.dm-mst button')].find(b=>b.textContent==='Undo last edge').click()`)
   await wait('document.querySelector(".dm-mst input").value===""')
   // Seed a running mock, then exercise neutral inputs, navigation, reload and auto-submit.
   const exam=await evaluate(`(async()=>{const {dmMockPapers}=await import('/src/data/dm.ts');const p=dmMockPapers[0],startedAt=Date.now();const s={paperId:p.id,startedAt,deadline:startedAt+600000,index:0,answers:{},submitted:false};localStorage.setItem('exam-desk.dm.exam.v1',JSON.stringify(s));return {id:p.id,count:p.questions.length};})()`)
   await navigate('/?subject=dm&view=exam','.dm-exam-active')
   assert(!await evaluate('document.querySelector(".dm-exam-active").textContent.includes("Reveal")'))
   assert(!await evaluate('document.querySelector(".dm-exam-active .dm-verdict")'))
   await evaluate(`[...document.querySelectorAll('.question-actions button')].find(b=>b.textContent==='Next part').click()`)
   await wait('JSON.parse(localStorage.getItem("exam-desk.dm.exam.v1")).index===1')
   await load(()=>send('Page.reload'));await wait('document.querySelector(".dm-exam-tabs [aria-current=step]")?.textContent.startsWith("Part 2")')
   await evaluate(`(()=>{const s=JSON.parse(localStorage.getItem('exam-desk.dm.exam.v1'));s.startedAt=Date.now()-20000;s.deadline=Date.now()-1000;localStorage.setItem('exam-desk.dm.exam.v1',JSON.stringify(s));})()`)
   await load(()=>send('Page.reload'));await wait('document.querySelector(".dm-exam-summary")')
   assert.equal(await evaluate('JSON.parse(localStorage.getItem("exam-desk.progress.v1")).attempts.filter(a=>a.mode==="exam"&&a.subject==="dm").length'),exam.count,'Expiry records each part exactly once')
   await load(()=>send('Page.reload'));await wait('document.querySelector(".dm-exam-summary")')
   assert.equal(await evaluate('JSON.parse(localStorage.getItem("exam-desk.progress.v1")).attempts.filter(a=>a.mode==="exam"&&a.subject==="dm").length'),exam.count)
   await evaluate(`[...document.querySelectorAll('.dm-rubric label')].filter(l=>l.textContent.includes('I have reviewed every criterion')).forEach(l=>l.querySelector('input').click())`)
   await wait('document.querySelector(".dm-exam-summary").textContent.includes("Assessed total")')
   assert(await evaluate('document.querySelector(".dm-exam-summary .exam-score").textContent.startsWith("0")'),'Reviewed blank proofs still earn zero')
   await load(()=>send('Page.reload'));await wait('document.querySelector(".dm-exam-summary")?.textContent.includes("Assessed total")')
   console.log('DM browser passed: all practice/mock editors and reports at 390px, 44px truth cells, four-theme samples, T/F cycle, draft reload, reveal penalties, subject links, MST selection/undo, neutral mocks, saved navigation and single auto-submit after expiry.')
 }) } finally { await rm(harness,{force:true}) }
}
if(process.argv[1]&&import.meta.url===pathToFileURL(resolve(process.argv[1])).href)await checkDMBrowser()
