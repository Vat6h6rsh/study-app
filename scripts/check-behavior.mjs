import assert from 'node:assert/strict'
import { mark, normalizeCode, normalizeOutput, filledCode } from '../src/lib/grading.ts'
import { blankState, markPractice, readExplainCode, storeExplainCode, EXPLAIN_KEY } from '../src/lib/practice.ts'
import { accuracy, latestMistakes, loadProgress, readSaved, save, remove, PROGRESS_KEY } from '../src/lib/storage.ts'
const question = { type: 'blanks', code: 'int n=__A__;\n__B__;', blanks: [{ id: 'A', accepted: ['n + 1', '1+n'] }, { id: 'B', accepted: ['++i'] }] }
assert.equal(normalizeCode(' n + 1 ; ; '), 'n+1')
assert.equal(normalizeCode('a=1; b=2;'), 'a=1;b=2')
assert.deepEqual(mark(question, { A: ' 1 + n; ', B: '++i ;' }), { A: true, B: true })
assert.deepEqual(mark(question, { A: 'n+2', B: '' }), { A: false, B: false })
assert.equal(blankState(['n + 1', '1+n'], ''), 'neutral')
assert.equal(blankState(['n + 1', '1+n'], ' 1 + n; '), 'correct')
assert.equal(blankState(['n + 1'], 'n+2'), 'wrong')
assert.equal(blankState(['n + 1'], 'n+1', true), 'revealed')
for (const value of ['', 'n+1', 'wrong']) assert.equal(blankState(['n+1'], value, false, true), 'neutral', 'Mocks never validate live')
assert.deepEqual(markPractice(question, { A: 'n+1', B: '++i' }, ['A']), { A: false, B: true }, 'A revealed answer never earns a mark, even after hiding or retyping')
assert.equal(filledCode(question, { A: '3;', B: '++i;' }), 'int n=3;\n++i;')
assert.equal(normalizeOutput('x \r\ny\t\n'), 'x\ny\n')
assert.equal(mark({ type: 'output', expectedOutput: ' x\ny\n' }, { output: ' x \r\ny\t\r\n' }).output, true)
assert.equal(mark({ type: 'output', expectedOutput: 'x\n' }, { output: 'x' }).output, false)
assert.equal(mark({ type: 'output', expectedOutput: ' x' }, { output: 'x' }).output, false)
const attempts = [{ questionId: 'q1', results: { A: false, B: true } }, { questionId: 'q2', results: { A: false } }, { questionId: 'q1', results: { A: true, B: true } }]
assert.deepEqual(latestMistakes(attempts).map(a => a.questionId), ['q2'])
assert.deepEqual(accuracy(attempts), { total: 5, correct: 3, percent: 60 })
assert.equal(accuracy([]).percent, null)
const memory = new Map()
globalThis.localStorage = { getItem: k => memory.get(k) ?? null, setItem: (k, v) => memory.set(k, v), removeItem: k => memory.delete(k) }
memory.set(PROGRESS_KEY, '{corrupt')
storeExplainCode(true); assert.equal(memory.get(EXPLAIN_KEY), 'true'); assert.equal(readExplainCode(), true)
storeExplainCode(false); assert.equal(readExplainCode(), false)
memory.set(EXPLAIN_KEY, 'corrupt'); assert.equal(readExplainCode(), false)
assert.deepEqual(loadProgress(), { version: 1, attempts: [] })
memory.set(PROGRESS_KEY, JSON.stringify({ version: 1, attempts: [null, { results: null }] }))
assert.deepEqual(loadProgress(), { version: 1, attempts: [] })
assert(save('key', { x: 1 })); assert.deepEqual(readSaved('key'), { x: 1 }); assert(remove('key'))
globalThis.localStorage = { getItem() { throw Error('denied') }, setItem() { throw Error('quota') }, removeItem() { throw Error('denied') } }
assert.equal(readSaved('key'), null); assert.equal(save('key', {}), false); assert.equal(remove('key'), false)
assert.deepEqual(loadProgress(), { version: 1, attempts: [] })
console.log('Behavior checks passed: exact per-blank marking, accepted alternatives, normalization, output line boundaries, latest-attempt mistakes, accuracy, corrupt and unavailable localStorage.')
assert.equal(readExplainCode(), false); assert.doesNotThrow(() => storeExplainCode(true))
import { readFile } from 'node:fs/promises'
import { markWP, wpScore, normalizeSentence, wordCount, grammarMatches, wordDiff, highlightSelection, initialWPAnswers } from '../src/lib/wp.ts'
import { submissionMarkdown } from '../server/save-writing.mjs'
const wpPools=await Promise.all(['past','original','mocks'].map(n=>readFile(new URL(`../src/data/wp/${n}.json`,import.meta.url),'utf8').then(JSON.parse)))
const wpAll=wpPools.flat()
assert.equal(normalizeSentence('  A   result.\n '),'a result')
assert.equal(wordCount('Title\n\n==two words== here.'),4)
assert.equal(highlightSelection('one two three',4,7),'one ==two== three')
assert.equal(highlightSelection('abc',1,1),'abc')
for(const q of wpAll){
 const blank=markWP(q,{})
 assert(Object.values(blank).every(v=>!v),`Blank answer should not earn marks: ${q.id}`)
 if(q.type==='abstract-parts')for(const p of q.parts){for(const key of p.accepted){assert(markWP(q,{[p.id]:' \n'+key.replace(/\s+/g,'   ').replace(/[.!?;:,]+$/,'')+'\n'})[p.id]);assert(!markWP(q,{[p.id]:key+' unrelated text'})[p.id])}assert(!markWP(q,{[p.id]:'A'})[p.id])}
 if(q.type==='grammar-rewrite'){
  assert.deepEqual(initialWPAnswers(q),{text:q.original})
  assert(Object.values(grammarMatches(q,q.corrected)).every(Boolean));assert(Object.values(grammarMatches(q,q.original)).every(v=>!v))
  assert.equal(wpScore(q,{text:q.corrected}),q.marks);assert.equal(wpScore(q,{text:q.original}),0)
  assert.equal(wpScore(q,{text:q.original,selfScore:'4.5'}),4.5);assert.equal(wpScore(q,{selfScore:'99'}),6);assert.equal(wpScore(q,{selfScore:'-1'}),0)
  const diff=wordDiff(q.original,q.corrected);assert(diff.some(d=>d.kind==='extra')&&diff.some(d=>d.kind==='missing'))
  assert(wordDiff('=='+q.corrected+'==',q.corrected).every(d=>d.kind==='same'))
 }
 if(q.type==='mcq'){assert(markWP(q,{answer:q.answer}).answer);for(const o of q.options.filter(o=>o.id!==q.answer))assert(!markWP(q,{answer:o.id}).answer)}
 if(q.type==='match'){
  const a=Object.fromEntries(q.items.map(i=>[i.id,i.answer]));assert(Object.values(markWP(q,a)).every(Boolean));assert.equal(wpScore(q,a),q.marks)
  a[q.items[0].id]='not a category';assert.equal(Object.values(markWP(q,a)).filter(Boolean).length,q.items.length-1)
 }
 if(q.type==='writing'){
  const a=Object.fromEntries(q.rubric.map(r=>['rubric:'+r.id,'true']));assert(Math.abs(wpScore(q,a)-q.marks)<1e-6)
  a['rubric:'+q.rubric[0].id]='false';assert(Math.abs(wpScore(q,a)-(q.marks-q.rubric[0].marks))<1e-6)
 }
}
assert.deepEqual(wordDiff('A cat.','A dog.'),[{text:'A',kind:'same'},{text:'dog',kind:'missing'},{text:'cat',kind:'extra'},{text:'.',kind:'same'}])
const qSave=wpAll.find(q=>q.type==='writing'&&q.task==='summary'),savedMD=await submissionMarkdown({parts:[{questionId:qSave.id,answers:{text:'Title\n\n==A safe answer==','rubric:r1':'true'},seconds:90}]},new Date(2026,10,20,12,34))
assert.equal(savedMD.filename,`2026-11-20_${qSave.id}_1234.md`);assert(savedMD.markdown.includes(qSave.prompt)&&savedMD.markdown.includes(qSave.passage)&&savedMD.markdown.includes('Word count: 4')&&savedMD.markdown.includes('Time taken: 90 seconds')&&savedMD.markdown.includes('- [x]'))
const wpPapers=JSON.parse(await readFile(new URL('../src/data/wp/papers.json',import.meta.url),'utf8'))
const parts=wpPapers[0].questionIds.map(questionId=>({questionId,answers:{text:'A draft'},seconds:10}))
const mockMD=await submissionMarkdown({paperId:wpPapers[0].id,parts});assert.equal((mockMD.markdown.match(/^## Q/gm)||[]).length,9)
for(const invalid of [null,{parts:[]},{parts:[{questionId:'../../escape',answers:{},seconds:0}]},{parts:[{questionId:qSave.id,answers:{text:42},seconds:1}]},{parts:[{questionId:qSave.id,answers:{},seconds:-1}]},{paperId:wpPapers[0].id,parts:parts.slice(1)},{parts:parts.slice(0,2)}])await assert.rejects(submissionMarkdown(invalid))
console.log('WP behavior checks passed: every key/alternative, whitespace and punctuation, wrong/blank choices, partial marks, grammar diff/count/overrides, highlights, word counts and validated practice/mock Markdown exports.')
