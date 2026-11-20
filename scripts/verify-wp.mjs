import assert from 'node:assert/strict'
import { readFile, access, readdir } from 'node:fs/promises'
import { wordCount, markWP, wpScore, normalizeSentence, wpPartFormat } from '../src/lib/wp.ts'
const pools=await Promise.all(['past','original','mocks'].map(n=>readFile(new URL(`../src/data/wp/${n}.json`,import.meta.url),'utf8').then(JSON.parse)))
const all=pools.flat(), ids=new Set()
for(const q of all){
 assert(!ids.has(q.id),`Duplicate ${q.id}`);ids.add(q.id)
 assert(q.subject==='wp' && q.prompt?.trim() && q.title?.trim() && q.topic && q.source && q.marks>0 && q.suggestedMinutes>0 && q.partLabel,`WP metadata ${q.id}`)
 assert(!JSON.stringify(q).includes('\ufffd'),`Damaged source encoding ${q.id}`)
 if(q.pool==='past')assert(q.originalPrompt && q.originalMarks>0,`Original wording/marks ${q.id}`)
 if(q.type==='writing'){
  assert(q.modelAnswer?.trim() && q.annotations?.length>=2 && q.checklist?.length>=3,`Model/method ${q.id}`)
  assert(q.rubric.length>=4 && new Set(q.rubric.map(r=>r.id)).size===q.rubric.length,`Rubric IDs ${q.id}`)
  assert(q.rubric.every(r=>r.label?.trim()&&r.marks>0),`Rubric items ${q.id}`)
  assert(Math.abs(q.rubric.reduce((s,r)=>s+r.marks,0)-q.marks)<1e-6,`Rubric sum ${q.id}`)
  if(q.wordTarget){const t=q.wordTarget,w=wordCount(q.modelAnswer);assert(t.min>0&&t.max>=t.min);assert(w>=t.min*.85&&w<=t.max*1.15,`${q.id}: ${w} words vs ${t.min}–${t.max}`)}
  if(q.task==='essay' && q.pool!=='past')assert.equal(wordCount(q.modelAnswer),250,`Exact essay length ${q.id}`)
  if(q.task==='questionnaire'){
   assert.equal(q.questionnaire.open.length,4,q.id);assert.equal(q.questionnaire.closed.length,4,q.id)
   assert(q.questionnaire.intro && q.questionnaire.open.every(s=>s.trim())&&q.questionnaire.closed.every(s=>s.includes('/')),`Question options ${q.id}`)
   const numbered=q.modelAnswer.match(/^\d+\. /gm)||[];assert.equal(numbered.length,8,`Exactly eight model questions ${q.id}`)
   for(const s of [...q.questionnaire.open,...q.questionnaire.closed])assert(q.modelAnswer.includes(s),`Questionnaire model consistent ${q.id}`)
  }
  if(q.task==='summary')assert(/\n\n/.test(q.modelAnswer)&&/==[^=]+==/.test(q.modelAnswer)&&q.passage,`Summary title/keywords/source ${q.id}`)
  if(q.task==='paraphrase')assert(q.passage?.trim(),`Paraphrase source ${q.id}`)
  if(q.task==='report')for(const h of ['Executive Summary','Introduction','Methodology','Findings','Conclusion','Recommendations'])assert(q.modelAnswer.includes('\n'+h+'\n'),`Report heading ${q.id}: ${h}`)
  if(q.chart){const c=q.chart;assert(['bar','line','pie','table'].includes(c.kind)&&c.title&&c.xLabel&&c.yLabel&&c.labels.length&&c.series.length);assert.equal(new Set(c.labels).size,c.labels.length);for(const s of c.series)assert(s.name&&s.values.length===c.labels.length&&s.values.every(v=>Number.isFinite(v)&&v>=0),`Chart data ${q.id}`);if(c.kind==='pie')assert.equal(c.series.length,1)}
  if(q.image)await access(new URL('../public'+q.image,import.meta.url))
  const a=Object.fromEntries(q.rubric.map(r=>['rubric:'+r.id,'true']));assert(Math.abs(wpScore(q,a)-q.marks)<1e-6)
 }else if(q.type==='abstract-parts'){
  assert(q.abstract?.trim());assert.equal(q.parts.length,4,q.id);assert.equal(q.marks,4)
  for(const p of q.parts){assert(p.id&&p.name&&p.explanation&&p.accepted.length&&p.accepted.every(s=>s.trim()),`Abstract key ${q.id}`);assert.equal(markWP(q,{[p.id]:p.accepted[0]})[p.id],true)}
  assert.equal(new Set(q.parts.map(p=>p.id)).size,4)
 }else if(q.type==='grammar-rewrite'){
  assert(q.original&&q.corrected&&q.original!==q.corrected&&q.explanation)
  assert(q.errors.length>=6&&q.errors.length<=10,`Grammar error count ${q.id}`)
  for(const e of q.errors)assert(e.error&&e.correction&&e.rule&&q.original.includes(e.error)&&q.corrected.includes(e.correction),`Grammar correction ${q.id}: ${e.id}`)
  assert(Object.values(markWP(q,{text:q.corrected})).every(Boolean),`Grammar canonical key ${q.id}`)
  assert(Object.values(markWP(q,{text:q.original})).every(v=>!v),`Grammar original must not score ${q.id}`)
  assert.equal(new Set(q.errors.map(e=>e.id)).size,q.errors.length)
 }else if(q.type==='mcq'){
  assert(q.options.length>=3&&q.options.every(o=>o.id&&o.text&&o.explanation));assert.equal(new Set(q.options.map(o=>o.id)).size,q.options.length);assert(q.options.some(o=>o.id===q.answer));assert(markWP(q,{answer:q.answer}).answer)
 }else if(q.type==='match'){
  assert(q.categories.length>=2&&q.items.length>=2);assert.equal(new Set(q.items.map(i=>i.id)).size,q.items.length)
  for(const i of q.items)assert(i.id&&i.text&&i.explanation&&q.categories.includes(i.answer))
 }else assert.fail('Unknown WP type: '+q.type)
}
for(const t of ['essay','paraphrase','email','questionnaire','graph','summary','report'])assert(pools[1].filter(q=>q.task===t).length>=6,`Original minimum ${t}`)
assert(pools[1].filter(q=>q.type==='abstract-parts').length>=8);assert(pools[1].filter(q=>q.type==='grammar-rewrite').length>=10);assert(pools[1].filter(q=>['mcq','match'].includes(q.type)).length>=50)
assert.equal(pools[0].length,38)
const papers=JSON.parse(await readFile(new URL('../src/data/wp/papers.json',import.meta.url),'utf8')),used=new Set();assert.equal(papers.length,3)
const practiceSignatures=new Set([...pools[0],...pools[1]].map(q=>normalizeSentence(q.prompt)+'|'+normalizeSentence(q.passage||q.abstract||q.original||'')))
for(const p of papers){assert.equal(p.questionIds.length,9);let total=0;for(const [i,id] of p.questionIds.entries()){
 assert(!used.has(id),`Exclusive mock ${id}`);used.add(id);const q=all.find(q=>q.id===id);assert(q&&q.pool==='mock'&&q.subject===p.subject);const [label,kind,marks]=wpPartFormat[i];assert.equal(q.partLabel,label);assert.equal(q.task||q.type,kind);assert.equal(q.marks,marks);assert.equal(q.suggestedMinutes,marks*3);total+=q.marks
 assert(!practiceSignatures.has(normalizeSentence(q.prompt)+'|'+normalizeSentence(q.passage||q.abstract||q.original||'')),`Mock task reused in practice ${id}`)
 }assert.equal(total,50)}
const notes=await readdir(new URL('../content/wp/concepts/',import.meta.url));assert.equal(notes.filter(n=>n.endsWith('.md')).length,13)
for(const file of notes.filter(n=>n.endsWith('.md')&&!n.includes('cheatsheet'))){const md=await readFile(new URL('../content/wp/concepts/'+file,import.meta.url),'utf8');assert(/^Topic ID: `[a-z]+`$/m.test(md));for(const word of ['Concept','Step-by-step','model','mistakes','Tip:','Trap:','Remember:','Note:'])assert(md.toLowerCase().includes(word.toLowerCase()),`${file} missing ${word}`)}
console.log(`WP content validated: ${all.length} tasks (${pools[0].length} past, ${pools[1].length} original, ${pools[2].length} mock parts); 60 original drills; 12 notes + cheatsheet; 3 disjoint 50-mark papers.`)
