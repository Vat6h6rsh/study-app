import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'
const requireReact=createRequire(fileURLToPath(import.meta.url).replace(/^[a-z]:/,d=>d.toUpperCase()))
const {createElement}=requireReact('react'),{renderToString}=requireReact('react-dom/server')
export async function checkWPUI(server,app,themes,contrast){
 const {questions,subjects,mockPapers}=await server.ssrLoadModule('/src/data/index.ts')
 const {WPFields,WPFeedback}=await server.ssrLoadModule('/src/components/WPQuestion.tsx')
 const {Learn,Markdown}=await server.ssrLoadModule('/src/components/Learn.tsx')
 const {wpConcepts}=await server.ssrLoadModule('/src/data/concepts.ts')
 const {markWP,initialWPAnswers,SUBJECT_KEY,WP_EXAM_KEY,wpDraftKey}=await server.ssrLoadModule('/src/lib/wp.ts')
 const {Chart}=await server.ssrLoadModule('/src/components/Chart.tsx')
 const {topicTones}=await server.ssrLoadModule('/src/topicColors.ts')
 const wp=questions.filter(q=>q.subject==='wp'),render=(Component,props)=>renderToString(createElement(Component,props)).replace(/<!--[\s\S]*?-->/g,'')
 const savedSubject={ [SUBJECT_KEY]:'"wp"' }
 const home=app('home',savedSubject)
 assert(home.includes('BCS ZC239')&&home.includes('Practise writing for the exam')&&home.includes('158 in your practice bank'))
 assert(!home.includes('title="C scratchpad"'));assert(!home.includes('Coming soon'));assert(home.includes('WP / Writing Practice'))
 assert(app('home',{[SUBJECT_KEY]:'"dm"'}).includes('Slot 1 exam pattern'),'DM is active and can be restored')
 assert(app('home',{[SUBJECT_KEY]:'{broken'}).includes('Practise C programming'))
 for(const topic of subjects.find(s=>s.id==='wp').topics){assert(topicTones[topic.id]);assert(wpConcepts.some(c=>c.id===topic.id))}
 assert.equal(wpConcepts.length,13)
 for(const note of wpConcepts){const html=render(Learn,{subject:'wp',selected:note.id,onSelect(){},onPractice(){},onRun(){}});assert(html.includes('Exam-order study route'));assert(html.includes(note.title.replaceAll('&','&amp;')));assert(!html.includes('Experiment with example'));if(note.id==='summary')assert(html.includes('<mark>'))}
 const practice=app('practice',savedSubject)
 assert(practice.includes('Submit answer')&&practice.includes('Save for grading')&&practice.includes('wp-editor')&&!practice.includes('code-editor'))
 const drill=wp.find(q=>q.type==='mcq')
 assert(/exactly (four|4) open/i.test(app('practice',savedSubject,'questionnaire')))
 const restored=app('practice',{...savedSubject,[wpDraftKey(wp[0].id)]:{answers:{text:'MY PERSISTED WP DRAFT'},startedAt:Date.now(),submitted:false,seconds:0}})
 assert(restored.includes('MY PERSISTED WP DRAFT'))
 for(const q of wp){
  const props={question:q,answers:initialWPAnswers(q),onChange(){}}
  const form=render(WPFields,props);assert(form.includes(q.partLabel));assert(!form.includes('Reveal model answer'));assert(!form.includes('Auto-marked score'))
  if(q.type==='writing'||q.type==='grammar-rewrite'){assert(form.includes('<textarea'));assert(form.includes('<label'));if(q.type==='grammar-rewrite'||q.task==='summary')assert(form.includes('Highlight selection')&&form.includes('Rendered answer preview'))}
  if(q.type==='abstract-parts')assert.equal((form.match(/<textarea/g)||[]).length,4)
  if(q.type==='mcq')assert.equal((form.match(/type="radio"/g)||[]).length,q.options.length)
  if(q.type==='match')assert.equal((form.match(/<select/g)||[]).length,q.items.length)
  const a=q.type==='writing'?Object.fromEntries(q.rubric.map(r=>['rubric:'+r.id,'true'])):q.type==='abstract-parts'?Object.fromEntries(q.parts.map(p=>[p.id,p.accepted[0]])):q.type==='grammar-rewrite'?{text:q.corrected}:q.type==='mcq'?{answer:q.answer}:Object.fromEntries(q.items.map(i=>[i.id,i.answer]))
  const feedback=render(WPFeedback,{question:q,answers:a,onChange(){},celebrate:true});assert(feedback.includes('WP marked report'))
  if(q.type==='writing')assert(feedback.includes('Self-assessment rubric')&&feedback.includes('Reveal model answer and annotations')&&!feedback.includes('<details open'))
  if(q.type==='grammar-rewrite')assert(feedback.includes('Word-level diff')&&feedback.includes('Self-adjust grammar score')&&feedback.includes('<mark>'))
  if(q.type==='mcq'||q.type==='match')assert(feedback.includes('<canvas')&&feedback.includes('All '),'Full-marks drills reuse confetti')
  const ids=[...form.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);assert.equal(new Set(ids).size,ids.length,`WP duplicate IDs ${q.id}`)
  if(q.type==='writing'&&q.chart){const chart=render(Chart,{chart:q.chart});assert(chart.includes('<table>')&&chart.includes('scope="row"'));if(q.chart.kind!=='table')assert(chart.includes('role="img"')&&chart.includes('Show accessible data table'));assert(chart.includes(q.chart.title.replaceAll('&','&amp;')))}
 }
 const grammar=wp.find(q=>q.type==='grammar-rewrite'),partial=render(WPFeedback,{question:drill,answers:{},onChange(){},celebrate:true});assert(!partial.includes('<canvas'))
 assert(/readonly/i.test(render(WPFields,{question:grammar,answers:initialWPAnswers(grammar),locked:true,onChange(){}})))
 const escaped=render(Markdown,{text:'==<script>=='});assert(escaped.includes('<mark>&lt;script&gt;</mark>')&&!escaped.includes('<script>'))
 const paper=mockPapers.find(p=>p.subject==='wp'),start=Date.now(),session={paperId:paper.id,startedAt:start,deadline:start+150*60000,index:0,answers:{},seconds:{},partStartedAt:start,submitted:false}
 assert(app('exam',savedSubject).includes('5 questions · 9 typed parts · 50 marks'))
 for(let index=0;index<9;index++){const html=app('exam',{...savedSubject,[WP_EXAM_KEY]:{...session,index}});const q=questions.find(q=>q.id===paper.questionIds[index]);assert(html.includes(q.partLabel+': '));assert(html.includes('role="timer"')&&html.includes('aria-current="step"'));assert(!html.includes('Reveal model answer'));assert(!html.includes('Self-assessment rubric'))}
 assert(app('exam',{...savedSubject,[WP_EXAM_KEY]:{...session,deadline:start+30000}}).includes('One minute or less remains'))
 const report=app('exam',{...savedSubject,[WP_EXAM_KEY]:{...session,submitted:true,finishedAt:start+1000}})
 assert(report.includes('Provisional total')&&report.includes('Save all parts for grading')&&report.includes('/ 50')&&report.includes('Self-assessment rubric'))
 assert(!app('practice',savedSubject).includes('Accessible materials'),'Exclusive mock content stays hidden')
 for(const values of Object.values(themes)){
  // Highlights use the existing text/blank-highlight pair; word-count warnings use accent/surface.
  for(const [fg,bg] of [['text','blank-highlight'],['accent','surface'],['correct','surface'],['wrong','surface']])assert(contrast(values['--'+fg],values['--'+bg])>=4.5)
  for(const hue of ['indigo','teal','amber','pink','sky'])assert(contrast(values['--surface'],values['--hue-'+hue])>=4.5,'Pie labels need contrast on every series')
 }
 console.log(`WP UI checks passed: subject persistence and isolation, all ${wp.length} editors/reports, 13 lessons (incl. cheatsheet), source charts/data tables, draft restoration, escaped highlights, 9 mock steps/reports and 4-theme token contrast.`)
}
