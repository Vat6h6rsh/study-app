import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { evaluateFormula, formulaValues, markDM, dmScore, dmModelAnswers, partitionMatches, setMatches, numericMatches, validateMst, mstSequence, checkpointAnswers } from '../src/lib/dm.ts'
import { arithmetic } from './verify-dm-math.mjs'
import { topicGroups } from '../src/lib/practiceNavigation.ts'

const read = async file => JSON.parse(await readFile(new URL('../src/data/dm/' + file, import.meta.url), 'utf8'))
const manifest = await read('manifest.json'), practice = (await Promise.all(manifest.practiceFiles.map(read))).flat(), papers = await read(manifest.mockFile)
const all = [...practice, ...papers.flatMap(p => p.questions)]
const recursive = all.flatMap(q => [q, ...(q.checkpoints || [])])
for (const [s, n, expected] of [['-2^2',0,-4],['(-2)^2',0,4],['2^3^2',0,512],['2^-2',0,.25],['+n',4,4],['n*(n+1)/2',5,15],['10/2/5',0,1],['1-2-3',0,-4]]) assert.equal(evaluateFormula(s,n),expected,s)
for (const source of ['', 'n;alert(1)', 'Math.pow(2,n)', 'n.constructor', '2(n+1)', '2 n', '1e3', 'Infinity', 'NaN', '1/0', '(-1)^(1/2)', 'n n', '2**3', '(2', '2)', ')2(', '1//2', 'n='.repeat(300), '('.repeat(100)+'n'+')'.repeat(100)]) assert.throws(()=>evaluateFormula(source,2),source)
for (const q of recursive) {
  const blank = markDM(q,{})
  assert(Object.values(blank).every(v=>!v),q.id+': blank answers earn no marks')
  if (q.type === 'steps') {
    const rubric=Object.fromEntries(q.rubric.map(r=>[`rubric:${r.step}`,'true']))
    assert.equal(dmScore(q,rubric),0,'No rubric credit for blank working')
    const a={working:'Step 1: a written proof.',...rubric}
    assert.equal(dmScore(q,a),q.marks,q.id)
    const r=q.rubric.find(r=>r.marks>0)
    assert.equal(dmScore(q,{...a,[`rubric:${r.step}`]:'false'}),q.marks-r.marks)
    for (const cp of q.checkpoints || []) {
      const nested=Object.fromEntries(Object.entries(dmModelAnswers(cp)).map(([key,v])=>[`checkpoint:${cp.id}:${key}`,v]))
      assert.deepEqual(checkpointAnswers(nested,cp.id),dmModelAnswers(cp))
      assert.equal(dmScore(q,{...nested,working:a.working,...rubric}),q.marks,'Checkpoint marks never inflate total')
    }
    continue
  }
  const model=dmModelAnswers(q),marked=markDM(q,model)
  assert(Object.values(marked).every(Boolean),q.id+': model answers pass the UI checker')
  assert.equal(dmScore(q,model),q.marks,q.id)
  const revealed=Object.keys(marked)
  assert.equal(dmScore(q,model,revealed),0,q.id+': reveals earn zero')
  if(q.type==='truth-table') {
    const key='cell:0:0',wrong={...model,[key]:model[key]==='T'?'F':'T'}
    assert.equal(Object.values(markDM(q,wrong)).filter(Boolean).length,Object.keys(marked).length-1)
    assert.equal(markDM(q,model,[key])[key],false)
  }
  if(q.type==='formula') {
    for(const point of q.testPoints)assert.equal(evaluateFormula(q.answer,point.n),arithmetic(q.answer,point.n))
    assert(!formulaValues(q,`(${q.answer})+1`).every(p=>p.correct),q.id)
  }
  if(q.type==='numeric')assert(!numericMatches(q.answer,String(BigInt(q.answer)+1n)))
  if(q.type==='set-answer') {
    if(q.answer.length)assert(setMatches(q,`{ ${[...q.answer].reverse().join(', ')} }`),q.id+': outer braces accepted')
    assert(!setMatches(q,'NOT_AN_ELEMENT'))
  }
  if(q.type==='partition') {
    assert(partitionMatches(q.answer,q.answer.slice().reverse().map(g=>`{ ${g.slice().reverse().join(', ')} }`).join('\n')))
    assert(!partitionMatches(q.answer,model.answer+`;{${q.answer[0][0]}}`),'Duplicate universe members rejected')
  }
  if(q.type==='properties') {
    const wrong={...model,[`property:${q.options[0]}`]:String(!q.answer[q.options[0]])}
    assert.equal(Object.values(markDM(q,wrong)).filter(Boolean).length,q.options.length-1)
    assert(Object.values(markDM(q,{propertiesConfirmed:'true',...Object.fromEntries(q.options.map(o=>[`property:${o}`,'true']))})).some(v=>!v) || Object.values(q.answer).every(Boolean))
  }
  if(q.type==='mcq')assert(!markDM(q,{answer:String((q.correctIndex+1)%q.options.length)}).answer)
  if(q.type==='mst') {
    assert(validateMst(q,q.answer.edgeSequence).complete)
    const typed=q.answer.edgeSequence.map(id=>{const e=q.graph.edges.find(e=>e.id===id);return `${e.v}${e.u}`}).join(', ')
    assert(validateMst(q,mstSequence(q,typed)).complete,q.id+': reversed undirected endpoints accepted')
    assert(!validateMst(q,[q.answer.edgeSequence[0],q.answer.edgeSequence[0]]).valid,'Duplicate edges rejected')
    assert(!validateMst(q,q.answer.edgeSequence.slice(0,-1)).complete)
    assert(!validateMst(q,[...q.answer.edgeSequence,'unknown']).complete)
    assert(!markDM(q,{...model,total:String(q.answer.totalWeight+1)}).total)
  }
}
const pair={type:'set-answer',elementFormat:'pair',answer:['((a,a),(a,c))','(c,d)']}
assert(setMatches(pair,' { (c, d), ((a, a), (a, c)) } '))
assert(!setMatches(pair,'((a,c),(a,a)), (c,d)'),'Pair orientation matters')
assert(setMatches({elementFormat:'atom',answer:['{a,b}','{}']},' {}, { b, a } '))
assert(setMatches({elementFormat:'atom',answer:[]},'NONE'))
assert(!setMatches({elementFormat:'atom',answer:[]},'{}'),'Empty answer differs from empty-set element')
assert(setMatches({elementFormat:'atom',answer:['{}']},'{}'))
assert(partitionMatches([['a','b'],['c']],'{{c},{b,a}}'))
assert(partitionMatches([['a','b'],['c']],'{b,a};\n{c}\n'))
assert(partitionMatches([['a','b'],['c']],'a,b\nc'))
assert(!partitionMatches([['a','b'],['c']],'{a,b};{c,c}'))
assert(numericMatches('9007199254740993','+09007199254740993'))
assert(!numericMatches('9007199254740993','9007199254740992'))
const graph={vertices:['A','B','C','D'],edges:[{id:'AB',u:'A',v:'B',weight:1},{id:'AC',u:'A',v:'C',weight:1},{id:'BC',u:'B',v:'C',weight:1},{id:'CD',u:'C',v:'D',weight:2},{id:'BD',u:'B',v:'D',weight:2}]}
for(const algorithm of ['prim','kruskal']) {
 const q={graph,algorithm,startVertex:'A'}
 assert(validateMst(q,['AC','BC','BD']).complete,'Valid alternate tied sequence accepted')
 assert(!validateMst(q,['CD']).valid,'Heavier first edge rejected')
 assert(!validateMst(q,['AB','AC','BC']).valid,'Cycle rejected')
 if(algorithm==='prim')assert(!validateMst(q,['BC']).valid,'Prim must start at specified vertex')
 else assert(validateMst(q,['BC']).valid,'Kruskal can begin away from A')
}
const topicOrder=['logic','proofs','induction','relations','posets','recurrences','graphs','mst','counting','sets','groups'].map(id=>({id,name:id}))
const groups=topicGroups(practice.map(q=>({...q,pool:q.source.startsWith('Past paper')?'past':'original'})),topicOrder)
for(const group of groups){const rank={core:0,past:1,extra:2};for(let i=1;i<group.questions.length;i++)assert(rank[group.questions[i-1].priority]<=rank[group.questions[i].priority])}
assert.deepEqual(new Set(groups.flatMap(g=>g.questions.map(q=>q.id))),new Set(practice.map(q=>q.id)))
for(const p of papers){assert.equal(p.questions.reduce((s,q)=>s+q.marks,0),50);assert(p.questions.every(q=>!practice.some(x=>x.id===q.id)))}
console.log(`DM behavior passed: ${recursive.length} questions/checkpoints, blank/wrong/model keys, bounded parser, numerical comparison, BigInt, nested sets/pairs, exact partitions, properties, per-cell grading, reveal penalties, rubric/checkpoint scoring, tied Prim/Kruskal steps, topic ordering and mock isolation.`)
