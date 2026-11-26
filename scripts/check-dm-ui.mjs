import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
const requireReact=createRequire(fileURLToPath(import.meta.url).replace(/^[a-z]:/,d=>d.toUpperCase()))
const {createElement}=requireReact('react'),{renderToString}=requireReact('react-dom/server')

export async function checkDMUI(server,app,themes,contrast) {
 const {dmQuestions,dmPracticeQuestions,dmMockPapers,isSlot1}=await server.ssrLoadModule('/src/data/dm.ts')
 const {DMFields,DMFeedback}=await server.ssrLoadModule('/src/components/DMQuestion.tsx')
 const {loadDMDraft}=await server.ssrLoadModule('/src/components/DMPractice.tsx')
 const {loadDMExam}=await server.ssrLoadModule('/src/components/DMExams.tsx')
 const {dmAttempt,dmModelAnswers,dmDraftKey,DM_EXAM_KEY}=await server.ssrLoadModule('/src/lib/dm.ts')
 const {dmConcepts}=await server.ssrLoadModule('/src/data/concepts.ts')
 const {Learn}=await server.ssrLoadModule('/src/components/Learn.tsx')
 const {SUBJECT_KEY}=await server.ssrLoadModule('/src/lib/wp.ts')
 const saved={[SUBJECT_KEY]:'"dm"'},render=(C,p)=>renderToString(createElement(C,p)).replace(/<!--.*?-->/g,'')
 const home=app('home',saved)
 for(const text of ['Discrete Mathematics','BCS ZC219','Slot 1 exam pattern','Q1','Q2','Q3','Q4','Q5','At least 50%','Core practice'])assert(home.includes(text),text)
 assert(!home.includes('title="C scratchpad"'))
 assert.equal((home.match(/class="topic-card"/g)||[]).length,11)
 assert.equal(dmPracticeQuestions.length,new Set(dmPracticeQuestions.map(q=>q.id)).size)
 assert(dmPracticeQuestions.filter(isSlot1).length>=39)
 const practice=app('practice',saved)
 assert(practice.includes('DM Practice')&&practice.includes('data-dm-type="truth-table"')&&!practice.includes('code-editor'))
 assert(practice.includes('subject=dm'),'Links preserve DM for new tabs')
 const first=dmPracticeQuestions.find(q=>q.type==='truth-table')
 const restored=app('practice',{...saved,[dmDraftKey(first.id)]:{answers:{working:'MY SAVED DM WORKING'},revealed:[]}},'logic')
 assert(restored.includes('MY SAVED DM WORKING'))
 const slot=app('practice',saved,'slot1')
 assert(slot.includes('Slot 1 pattern')&&slot.includes('Slot 1'))
 for(const note of dmConcepts){const html=render(Learn,{subject:'dm',selected:note.id,onSelect(){},onPractice(){},onRun(){}});assert(html.includes(note.title.replaceAll('&','&amp;')));assert(!html.includes('Experiment with example'))}
 for(const q of dmQuestions){
   const answers=q.type==='steps'?{working:'A typed step.',...Object.fromEntries(q.rubric.map(r=>[`rubric:${r.step}`,'true']))}:dmModelAnswers(q)
   const before=render(DMFields,{question:q,answers:{},onChange(){}})
   assert(before.includes('dm-prompt')&&before.includes('<textarea'),q.id)
   assert(!before.includes('Self-mark each step')&&!before.includes('Step-by-step model solution'),q.id+': no solution before submit')
   const active=render(DMFields,{question:q,answers,onChange(){},exam:true})
   assert(!active.includes('Reveal column')&&!active.includes('dm-verdict')&&!active.includes('Spanning tree complete'),q.id+': no live feedback in mocks')
   const marked=render(DMFields,{question:q,answers,checked:true,locked:true,onChange(){}})
   const report=render(DMFeedback,{question:q,answers,onAssess(){},onLearn(){}})
   assert(report.includes('DM marked answer')&&report.includes('Step-by-step model solution')&&report.includes('Read the lesson'),q.id)
   if(q.type==='truth-table'){assert.equal((marked.match(/class="dm-truth-cell /g)||[]).length,q.answer.length*q.columns.length);assert(marked.includes('scope="col"'))}
   if(q.type==='formula'){const wrong=render(DMFeedback,{question:q,answers:{answer:'n+'},onAssess(){},onLearn(){}});assert(wrong.includes('Your expression at each test point')&&wrong.includes('Expected'))}
   if(q.type==='mst'){assert(marked.includes('role="img"')&&marked.includes('Running weight')&&marked.includes('Undo last edge'));if(q.graph.image)assert(marked.includes('Show original figure'))}
   if(q.type==='steps')assert(report.includes('Self-mark each step')&&/self-assessed/i.test(report))
   const ids=[...marked.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);assert.equal(ids.length,new Set(ids).size,q.id+': unique ids')
 }
 for(const paper of dmMockPapers){
   const start=Date.now(),session={paperId:paper.id,startedAt:start,deadline:start+(paper.durationMinutes||150)*60000,index:0,answers:{},submitted:false}
   const running=app('exam',{...saved,[DM_EXAM_KEY]:session})
   assert(running.includes('DM mock in progress')&&running.includes('role="timer"')&&!running.includes('Reveal column')&&!running.includes('Step-by-step model solution'))
   const answers=Object.fromEntries(paper.questions.map(q=>[q.id,q.type==='steps'?{working:'Typed proof.',...Object.fromEntries(q.rubric.map(r=>[`rubric:${r.step}`,'true']))}:dmModelAnswers(q)]))
   const report=app('exam',{...saved,[DM_EXAM_KEY]:{...session,answers,submitted:true,finishedAt:start+1000}})
   assert(report.includes('DM mock report')&&report.includes('Assessed total')&&report.includes('50<small> / 50'))
   assert.equal((report.match(/aria-label="DM marked answer"/g)||[]).length,paper.questions.length+paper.questions.reduce((n,q)=>n+(q.checkpoints?.length||0),0))
   const attempt=dmAttempt(paper.questions[0],answers[paper.questions[0].id],'exam','test');assert.equal(attempt.subject,'dm')
 }
 app('home',{...saved,[DM_EXAM_KEY]:{paperId:dmMockPapers[0].id,index:999}});assert.equal(loadDMExam(),null)
 app('home',{...saved,[dmDraftKey('corrupt')]:{answers:{working:7},revealed:[]}});assert.deepEqual(loadDMDraft('corrupt'),{answers:{},revealed:[]})
 for(const values of Object.values(themes))for(const [fg,bg,min] of [['dm-selected','surface',4.5],['dm-right','surface',4.5],['dm-wrong','surface',4.5],['dm-graph-text','surface',4.5]])assert(contrast(values['--'+fg],values['--'+bg])>=min)
 console.log(`DM UI passed: ${dmQuestions.length} practice/mock editors and reports, ${dmConcepts.length} lessons, Slot 1 manifest discovery, saved drafts, subject isolation, mock timers/neutral editors, all 50-mark reports, unique labels/IDs and all four themes.`)
}
