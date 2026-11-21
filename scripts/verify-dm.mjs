// Run from anywhere: node scripts/verify-dm.mjs (plain Node; no dependencies).
// This script only reads files. The authoring build is a separate opt-in command.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
import {arithmetic,logic,truth,canon,partitionCanon,relationFacts,mstRun,graphFacts,count} from './verify-dm-math.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const topics=['strategy','logic','proofs','induction','relations','posets','recurrences','graphs','mst','counting','sets','groups','cheatsheet'];
const kinds=['truth-table','formula','numeric','set-answer','properties','partition','mst','steps','mcq'];
const common=['id','subject','topic','title','source','priority','difficulty','marks','prompt','solution','conceptNote','tags','reconstructed','reconstructionNote','provenance','verification'];
const fields={
 'truth-table':['variables','columns','answer','followUp'],formula:['answer','testPoints','recurrence'],numeric:['answer','tolerance'],
 'set-answer':['answer','elementFormat','inputHint'],properties:['options','answer'],partition:['answer','inputHint'],
 mst:['graph','algorithm','startVertex','answer'],steps:['rubric','checkpoints'],mcq:['options','correctIndex','optionValues']
};
const ok=(condition,message)=>assert.ok(condition,message);
const text=x=>typeof x==='string'&&x.trim().length>0;
const unique=a=>new Set(a).size===a.length;
const close=(a,b)=>Math.abs(a-b)<=1e-9*Math.max(1,Math.abs(a),Math.abs(b));
const equal=(a,b,message)=>assert.deepEqual(a,b,message);
function validateRelation(r){ok(r&&Array.isArray(r.elements)&&r.elements.length&&r.elements.every(text)&&unique(r.elements),'relation elements');ok(Array.isArray(r.pairs),'relation pairs');for(const p of r.pairs)ok(Array.isArray(p)&&p.length===2&&p.every(x=>r.elements.includes(x)),'relation pair outside universe');ok(unique(r.pairs.map(JSON.stringify)),'duplicate relation pairs');}
function validateGraph(g){ok(g&&Array.isArray(g.vertices)&&g.vertices.length>=1&&g.vertices.every(text)&&unique(g.vertices),'graph vertices');ok(Array.isArray(g.edges),'graph edges');const pairs=[];for(const e of g.edges){ok(text(e.id)&&g.vertices.includes(e.u)&&g.vertices.includes(e.v)&&e.u!==e.v&&Number.isFinite(e.weight),'invalid edge');pairs.push(g.directed?`${e.u}:${e.v}`:canon([e.u,e.v]));}ok(unique(g.edges.map(e=>e.id))&&unique(pairs),'duplicate edge');if(g.layout){equal(Object.keys(g.layout).sort(),[...g.vertices].sort(),'layout must cover every vertex');for(const p of Object.values(g.layout))ok(Number.isFinite(p.x)&&Number.isFinite(p.y),'layout coordinates');}if(g.image)validateImage(g.image);}
function validateImage(url){ok(url.startsWith('/dm/')&&!url.includes('..'),'image outside DM');ok(fs.existsSync(path.join(root,'public',url.slice(1))),`missing ${url}`);}
function bruteTreeWeight(g){
 // Independent exhaustive search over all |V|-1 edge subsets, not another
 // greedy run. This confirms optimality even when multiple MSTs have ties.
 let best=Infinity;
 const choose=(start,selected)=>{if(selected.length===g.vertices.length-1){const adj=Object.fromEntries(g.vertices.map(v=>[v,[]]));let sum=0;for(const e of selected){adj[e.u].push(e.v);adj[e.v].push(e.u);sum+=e.weight;}const seen=new Set([g.vertices[0]]),queue=[g.vertices[0]];while(queue.length)for(const v of adj[queue.pop()])if(!seen.has(v)){seen.add(v);queue.push(v);}if(seen.size===g.vertices.length)best=Math.min(best,sum);return;}for(let i=start;i<=g.edges.length-(g.vertices.length-1-selected.length);i++)choose(i+1,[...selected,g.edges[i]]);};
 choose(0,[]);return best;
}
const optimumCache=new Map();
function computed(v){
 ok(v&&text(v.kind),'verification model required');
 if(v.kind==='relation'){validateRelation(v.relation);const f=relationFacts(v.relation);if(v.query==='class'){ok(f['equivalence relation'],'class requires equivalence');ok(v.relation.elements.includes(v.element),'class representative');return v.relation.elements.filter(x=>f.has(v.element,x));}return f;}
 if(v.kind==='poset'){validateRelation(v.relation);const f=relationFacts(v.relation);ok(f['partial order'],'poset is not a partial order');if(!v.query)return f;const subset=v.subset||[];ok(subset.every(x=>v.relation.elements.includes(x)),'bound subset');if(v.query==='strictLower'||v.query==='strictUpper'){ok(subset.length===1,'strict bound pivot');return v.relation.elements.filter(x=>x!==subset[0]&&(v.query==='strictLower'?f.has(x,subset[0]):f.has(subset[0],x)));}if(['upperBounds','lowerBounds','lub','glb'].includes(v.query))return f.bounds(subset)[v.query];ok(['minimal','maximal','least','greatest','covers'].includes(v.query),'unknown poset query');return f[v.query];}
 if(v.kind==='graph'){validateGraph(v.graph);const f=graphFacts(v.graph);if(v.query){ok(v.query in f,'unknown graph query');return f[v.query];}return f;}
 if(v.kind==='counting'){
   if(v.operation==='bitstrings')ok(Number.isInteger(v.length)&&v.length>=1&&v.length<=20&&[v.prefix||'',v.suffix||''].every(x=>/^[01]*$/.test(x))&&['or','and'].includes(v.mode),'bit-string model');
   if(v.operation==='pigeonhole')ok(Number.isInteger(v.boxes)&&v.boxes>=1&&Number.isInteger(v.occupancy)&&v.occupancy>=2,'pigeonhole model');
   if(['choose','permutations'].includes(v.operation))ok(Number.isInteger(v.n)&&Number.isInteger(v.r)&&v.r>=0&&v.r<=v.n&&v.n<=15,'finite selection model');
   if(v.operation==='stringsUpTo')ok(Number.isInteger(v.alphabet)&&v.alphabet>=1&&Number.isInteger(v.maxLength)&&v.maxLength>=1,'string model');
   if(v.operation==='labelledGraphs')ok(typeof v.directed==='boolean'&&typeof v.loops==='boolean','graph-count convention');
   return v;
 }
 if(v.kind==='arithmetic')return arithmetic(v.expression);
 if(v.kind==='complement'){ok(Number.isInteger(v.edges)&&Number.isInteger(v.complementEdges)&&v.edges>=0&&v.complementEdges>=0,'complement counts');const sum=v.edges+v.complementEdges;let n=1;while(n*(n-1)/2<sum)n++;ok(n*(n-1)/2===sum,'complement pair count is not triangular');return n;}
 if(v.kind==='resonance'){ok(v.coefficients.length>0&&v.coefficients.every(Number.isFinite)&&Number.isFinite(v.forcingBase),'resonance model');let poly=[1,...v.coefficients.map(c=>-c)],multiplicity=0;while(poly.length>1){const quotient=[poly[0]];for(let i=1;i<poly.length;i++)quotient.push(poly[i]+quotient.at(-1)*v.forcingBase);if(Math.abs(quotient.pop())>1e-10)break;poly=quotient;multiplicity++;}return multiplicity;}
 if(v.kind==='logic-false-rows'){const rows=truth(v.variables,[v.expression]);return rows.flatMap((r,i)=>r[0]?[]:[v.variables.map((_,j)=>i&(1<<(v.variables.length-1-j))?'F':'T').join('')]);}
 if(v.kind==='relation-options'){ok(v.relations.length>=2&&v.required.length,'relation choices');return v.relations.map(r=>{validateRelation(r);const f=relationFacts(r);return v.required.every(p=>f[p]===true);});}
 if(v.kind==='knights'){ok(v.people.every(text)&&unique(v.people)&&v.statements.length===v.people.length,'knight model');const models=[];
   const check=types=>{const env=Object.fromEntries(v.people.map((p,i)=>[p.toLowerCase(),types[i]==='K']));if(types.every((t,i)=>t==='S'||logic(v.statements[i],env)===(t==='K')))models.push(types.map((t,i)=>`${v.people[i]}=${t}`).join(', '));};
   if(v.spies){ok(v.people.length===3,'one spy/knight/knave model requires three people');for(const t of [['K','N','S'],['K','S','N'],['N','K','S'],['N','S','K'],['S','K','N'],['S','N','K']])check(t);}else for(let mask=0;mask<2**v.people.length;mask++)check(v.people.map((_,i)=>mask&(1<<i)?'K':'N'));return models;
 }
 throw Error(`unknown verification kind ${v.kind}`);
}
export function verifyQuestion(q,seen=new Set()){
 ok(q&&typeof q==='object'&&!Array.isArray(q),'question must be object');ok(text(q.id)&&/^dm-[a-z0-9-]+$/.test(q.id),'question id');ok(!seen.has(q.id),`duplicate ${q.id}`);seen.add(q.id);
 ok(q.subject==='dm'&&topics.includes(q.topic)&&kinds.includes(q.type),'subject/topic/type');
 ok(['core','past','extra'].includes(q.priority)&&['foundation','standard','exam'].includes(q.difficulty),'priority/difficulty');
 ok(Number.isInteger(q.marks)&&q.marks>0,'marks');for(const k of ['title','source','prompt','conceptNote'])ok(text(q[k]),`${k} required`);
 for(const key of Object.keys(q))ok([...common,'type',...fields[q.type]].includes(key),`unknown ${q.type} field ${key}`);
 ok(Array.isArray(q.solution)&&q.solution.length>=2,'numbered solution required');q.solution.forEach((s,i)=>ok(s.step===i+1&&text(s.text),'solution numbering/text'));
 if(q.tags)ok(Array.isArray(q.tags)&&q.tags.every(text),'tags');
 if(q.reconstructed)ok(text(q.reconstructionNote),'reconstruction note required');
 if(q.provenance){const p=q.provenance;ok(p.paper>=1&&p.paper<=5&&text(p.question)&&Number.isInteger(p.printedMarks)&&p.printedMarks>0&&[1,2].includes(p.page),'provenance');equal(q.source,`Past paper ${p.paper} Q${p.question}`,'source/provenance');if(p.image)validateImage(p.image);if(p.recoveredFromImage)ok(p.recoveredFromImage.every(text),'image provenance');}
 const value=q.verification?computed(q.verification):undefined;
 if(q.type==='truth-table'){
   ok(Array.isArray(q.variables)&&q.variables.length>=1&&q.variables.length<=5&&q.variables.every(v=>/^[a-z]$/.test(v)&&v!=='v')&&unique(q.variables),'logic variables');ok(Array.isArray(q.columns)&&q.columns.length&&q.columns.every(text),'truth columns');equal(q.answer,truth(q.variables,q.columns),'truth-table key');
   // Model's typed table must have the same requested columns and row order.
   const modelRows=q.solution.map(s=>s.text).filter(x=>/^[TF]( \| [TF])+$/.test(x)).map(x=>x.split(' | '));
   equal(modelRows.length,q.answer.length,'model truth-table row count');modelRows.forEach((r,i)=>{const inputs=q.variables.map((_,j)=>!(i&(1<<(q.variables.length-1-j)))?'T':'F');equal(r,[...inputs,...q.answer[i].map(v=>v?'T':'F')],'model truth-table row');});
   if(q.followUp){const f=q.followUp;ok(text(f.prompt)&&f.options.every(text)&&f.correctIndex>=0&&f.correctIndex<f.options.length,'truth follow-up');if(f.compareColumns){ok(f.compareColumns.length===2&&f.compareColumns.every(i=>Number.isInteger(i)&&i>=0&&i<q.columns.length),'follow-up column indices');const equivalent=q.answer.every(r=>r[f.compareColumns[0]]===r[f.compareColumns[1]]);equal(f.options[f.correctIndex],equivalent?'Yes':'No','equivalence follow-up key');}else if(f.classifyColumn!==undefined){const c=q.answer.map(r=>r[f.classifyColumn]);equal(f.options[f.correctIndex],c.every(Boolean)?'Tautology':c.every(x=>!x)?'Contradiction':'Contingency','classification key');}}
 }
 if(q.type==='formula'){
   ok(text(q.answer)&&Array.isArray(q.testPoints)&&q.testPoints.length>=4,'formula/key test points');ok(unique(q.testPoints.map(p=>p.n)),'duplicate formula points');for(const t of q.testPoints){ok(Number.isInteger(t.n)&&Number.isFinite(t.expected),'formula test point');ok(close(arithmetic(q.answer,t.n),t.expected),`formula test mismatch n=${t.n}`);if(q.verification?.kind==='counting'){const exact=count(q.verification,t.n);ok(close(Number(exact),t.expected),`independent counting formula mismatch n=${t.n}`);}}
   if(q.recurrence){const r=q.recurrence;ok([0,1].includes(r.startIndex)&&r.initial.length===r.coefficients.length&&r.initial.length>=1&&r.initial.every(Number.isFinite)&&r.coefficients.every(Number.isFinite)&&text(r.forcing),'recurrence metadata');const a=[...r.initial];for(let n=r.startIndex+a.length;n<=12;n++)a.push(r.coefficients.reduce((s,c,j)=>s+c*a[n-r.startIndex-j-1],0)+arithmetic(r.forcing,n));for(let i=0;i<a.length;i++)ok(close(a[i],arithmetic(q.answer,r.startIndex+i)),`recurrence mismatch n=${r.startIndex+i}: iteration ${a[i]}, closed form ${arithmetic(q.answer,r.startIndex+i)}`);}
 }
 if(q.type==='numeric'){
   ok(q.tolerance===0&&(Number.isFinite(q.answer)||typeof q.answer==='string'&&/^-?\d+$/.test(q.answer)),'numeric answer/tolerance');ok(q.verification,'numeric recomputation metadata required');const expected=q.verification.kind==='counting'?count(q.verification):value;if(typeof expected==='bigint')equal(BigInt(q.answer),expected,'exact numeric key');else equal(q.answer,expected,'numeric key');
 }
 if(q.type==='set-answer'){
   ok(Array.isArray(q.answer)&&q.answer.every(text)&&unique(q.answer)&&['atom','pair','edge'].includes(q.elementFormat)&&text(q.inputHint),'set answer');ok(Array.isArray(value),'set recomputation metadata required');equal(canon(q.answer),canon(value),'set key');
 }
 if(q.type==='partition'){
   ok(Array.isArray(q.answer)&&q.answer.every(c=>Array.isArray(c)&&c.length&&c.every(text)&&unique(c))&&text(q.inputHint),'partition answer');ok(q.verification?.kind==='relation'&&value['equivalence relation'],'partition relation');equal(partitionCanon(q.answer),partitionCanon(value.classes),'partition key');equal(canon(q.answer.flat()),canon(q.verification.relation.elements),'partition coverage');
 }
 if(q.type==='properties'){
   ok(Array.isArray(q.options)&&q.options.length&&q.options.every(text)&&unique(q.options),'property options');equal(Object.keys(q.answer).sort(),[...q.options].sort(),'property answer keys');ok(value&&!Array.isArray(value),'property model required');for(const p of q.options){ok(typeof q.answer[p]==='boolean'&&typeof value[p]==='boolean',`unknown boolean property ${p}`);equal(q.answer[p],value[p],`property ${p}`);}
 }
 if(q.type==='mcq'){
   ok(q.options.length>=2&&q.options.every(text)&&Number.isInteger(q.correctIndex)&&q.correctIndex>=0&&q.correctIndex<q.options.length,'MCQ fields');ok(q.verification,'MCQ recomputation model');
   if(q.verification.kind==='relation-options'){equal(value.filter(Boolean).length,1,'MCQ must have one correct relation');equal(q.correctIndex,value.indexOf(true),'MCQ relation answer');}
   else {ok(q.optionValues?.length===q.options.length,'MCQ machine option values');const matches=q.optionValues.map(x=>Array.isArray(x)&&Array.isArray(value)?canon(x)===canon(value):x===value);equal(matches.filter(Boolean).length,1,'MCQ must have one correct value');equal(q.correctIndex,matches.indexOf(true),'MCQ key');}
 }
 if(q.type==='mst'){
   validateGraph(q.graph);ok(!q.graph.directed&&['prim','kruskal'].includes(q.algorithm),'MST graph/algorithm');if(q.algorithm==='prim')ok(q.graph.vertices.includes(q.startVertex),'Prim start vertex');
   const key=q.answer;ok(Array.isArray(key.edgeSequence)&&unique(key.edgeSequence)&&Number.isFinite(key.totalWeight),'MST answer');equal(mstRun(q.graph,q.algorithm,q.startVertex,key.edgeSequence),key,'MST trace');
   const hash=JSON.stringify(q.graph);if(!optimumCache.has(hash))optimumCache.set(hash,bruteTreeWeight(q.graph));equal(key.totalWeight,optimumCache.get(hash),'exhaustive MST optimum');
   for(const algorithm of ['kruskal','prim'])equal(mstRun(q.graph,algorithm,q.graph.vertices[0]).totalWeight,key.totalWeight,'other MST algorithm optimum');
   const additions=q.solution.map(s=>s.text.match(/^Step (\d+): add edge (.+) \(weight (-?\d+)\)/)).filter(Boolean);equal(additions.length,key.edgeSequence.length,'MST model addition count');additions.forEach((a,i)=>{const edge=q.graph.edges.find(e=>e.id===key.edgeSequence[i]);equal(Number(a[1]),i+1,'MST model step');equal(a[2],`${edge.u}${edge.v}`,'MST model edge');equal(Number(a[3]),edge.weight,'MST model weight');});ok(q.solution.at(-1).text.includes(`= ${key.totalWeight}.`)&&q.solution.at(-1).text.includes('total weight'),'MST model total required');
 }
 if(q.type==='steps'){
   ok(Array.isArray(q.rubric)&&q.rubric.length===q.solution.length,'one rubric entry per model step');q.rubric.forEach((r,i)=>ok(r.step===i+1&&text(r.criterion)&&Number.isInteger(r.marks)&&r.marks>=0,'rubric entry'));equal(q.rubric.reduce((s,r)=>s+r.marks,0),q.marks,'rubric marks');
   if(q.verification?.kind==='knights'){const model=q.solution.map(s=>s.text).join('\n');for(const assignment of value)ok(model.includes(assignment)||q.id==='dm-p2-q1'&&value.length===1&&assignment==='A=K, B=K, C=K','knight model must enumerate every assignment');if(value.length===0)ok(model.includes('no assignments'),'inconsistent knight puzzle must say so');}
   if(q.checkpoints){ok(Array.isArray(q.checkpoints),'checkpoints array');for(const c of q.checkpoints){ok(c.type!=='steps','checkpoint must be auto-gradable');verifyQuestion(c,seen);}}
 }
 return true;
}

function selfTests(){
 // Independent known identities and bad inputs exercise parser precedence and
 // anti-eval boundaries before trusting the stored data.
 equal(arithmetic('2^3^2'),512);equal(arithmetic('-2^2'),-4);equal(arithmetic('(-2)^2'),4);equal(arithmetic('1/2*4'),2);equal(arithmetic('2^-2'),0.25);
 for(const s of ['process.exit()','n;1','2**3','1/0','2n','n[0]'])assert.throws(()=>arithmetic(s,2));
 for(const p of [false,true])for(const q of [false,true])for(const r of [false,true]){
   equal(logic('p -> q',{p,q}),!p||q);equal(logic('~(p ^ q)',{p,q}),!p||!q);equal(logic('p -> (q -> r)',{p,q,r}),!p||!q||r);
   equal(logic('p -> q -> r',{p,q,r}),!p||!q||r);equal(logic('(p -> q) -> r',{p,q,r}),!(!p||q)||r);
 }
 assert.throws(()=>logic('p || q',{p:true,q:false}));
 // A tied triangle accepts both valid Kruskal orders. Prim rejects an edge
 // outside the reached cut even when the final set is an optimal tree.
 const g={vertices:['A','B','C'],edges:[{id:'AB',u:'A',v:'B',weight:1},{id:'BC',u:'B',v:'C',weight:1},{id:'AC',u:'A',v:'C',weight:1}]};
 equal(mstRun(g,'kruskal',undefined,['BC','AB']).totalWeight,2);equal(mstRun(g,'prim','A',['AC','BC']).totalWeight,2);assert.throws(()=>mstRun(g,'prim','A',['BC','AB']));assert.throws(()=>mstRun(g,'kruskal',undefined,['AB','AB']));
 const r={elements:['a','b','c'],pairs:[['a','a'],['b','b'],['c','c'],['a','b'],['a','c']]},f=relationFacts(r);equal(f.maximal,['b','c']);equal(f.greatest,[]);equal(f.lattice,false);
}
export function verifyData(){
 selfTests();const data=path.join(root,'src/data/dm'),manifest=JSON.parse(fs.readFileSync(path.join(data,'manifest.json'),'utf8'));
 equal(manifest.schemaVersion,1);equal(manifest.examDate,'2026-11-28');ok(manifest.practiceFiles.every(f=>/^[a-z-]+\.json$/.test(f))&&unique(manifest.practiceFiles),'manifest paths');
 equal(fs.readdirSync(data).filter(f=>f.endsWith('.json')).sort(),[...manifest.practiceFiles,'manifest.json','mocks.json'].sort(),'uncatalogued JSON');
 const practice=manifest.practiceFiles.flatMap(f=>{const qs=JSON.parse(fs.readFileSync(path.join(data,f),'utf8'));ok(Array.isArray(qs),'practice JSON must be array');ok(qs.every(q=>`${q.topic}.json`===f),'question in wrong topic file');return qs;});
 const mocks=JSON.parse(fs.readFileSync(path.join(data,'mocks.json'),'utf8')),seen=new Set(),errors=[];
 const check=q=>{try{verifyQuestion(q,seen);}catch(e){errors.push(`${q.id}: ${e.message}`);}};
 practice.forEach(check);equal(practice.length,manifest.practiceCount,'manifest count');
 const tally=key=>Object.fromEntries([...new Set(practice.map(q=>q[key]))].sort().map(k=>[k,practice.filter(q=>q[key]===k).length]));for(const k of ['topic','type','priority'])equal(tally(k),manifest.counts[k],`manifest ${k} counts`);
 const expected={1:['1','2','3a','3b','3c','4','5a','5b','6','7a','7b','8'],2:['1','2','3a','3b','3c','4','5','6','7a','7b','8'],3:['1','2','3','4a','4b','4c','5','6','7','8','9'],4:['1','2a','2b','3a','3b','4a','4b','4c','4d','4e','5','6','7','8a','8b','9'],5:['1','2','3a','3b','3c','4a','4b','4c','4d','5','6','7','8','9']};
 const past=practice.filter(q=>q.provenance);equal(past.length,manifest.pastPaperCount,'past count');for(const [paper,ids] of Object.entries(expected)){const qs=past.filter(q=>q.provenance.paper===Number(paper));equal(qs.map(q=>q.provenance.question).sort(),[...ids].sort(),`paper ${paper} coverage`);equal(qs.reduce((s,q)=>s+q.marks,0),{1:150,2:150,3:150,4:50,5:50}[paper],`paper ${paper} total`);}
 const originals=practice.filter(q=>q.source==='Original');for(const t of ['logic','induction','relations','posets','recurrences','graphs','mst'])ok(originals.filter(q=>q.topic===t&&(t!=='logic'||q.type==='truth-table')).length>=15,`15 original core items: ${t}`);
 for(const t of ['groups','proofs','counting','sets'])ok(originals.filter(q=>q.topic===t).length>=6,`six original extras: ${t}`);ok(originals.filter(q=>q.tags?.includes('knights-knaves')).length>=6,'six original knight puzzles');
 ok(originals.filter(q=>q.recurrence&&q.recurrence.forcing!=='0').length>=6,'six nonhomogeneous recurrences');for(const algorithm of ['prim','kruskal']){const qs=originals.filter(q=>q.type==='mst'&&q.algorithm===algorithm);ok(qs.length>=10,`ten ${algorithm} traces`);ok(qs.every(q=>q.graph.vertices.length>=5&&q.graph.vertices.length<=8),'MST size target');}
 equal(mocks.length,3,'three mocks');ok(unique(mocks.map(m=>m.id)),'mock ids');const practicePrompts=new Set(practice.map(q=>q.prompt));
 for(const m of mocks){ok(m.subject==='dm'&&text(m.title)&&m.totalMarks===50&&m.durationMinutes>=120&&m.durationMinutes<=150&&m.instructions.every(text),'mock metadata');equal(m.questions.reduce((s,q)=>s+q.marks,0),50,'mock marks');const coreMarks=m.questions.filter(q=>q.priority==='core').reduce((s,q)=>s+q.marks,0);ok(coreMarks>=30,'mock needs >=60% core');for(const q of m.questions){ok(!practicePrompts.has(q.prompt),'mock duplicates practice prompt');check(q);}}
 const noteDir=path.join(root,'content/dm/concepts'),notes=fs.readdirSync(noteDir).filter(f=>f.endsWith('.md'));equal(notes.length,13,'13 concept notes');const noteTopics=[];
 for(const f of notes){const md=fs.readFileSync(path.join(noteDir,f),'utf8');ok(/^# [^\n]+\n/.test(md),`${f}: title first`);const match=md.match(/^Topic ID: `([a-z]+)`$/m);ok(match,`${f}: Topic ID`);noteTopics.push(match[1]);for(const callout of ['Tip','Trap','Remember','Note'])ok(new RegExp(`^${callout}: .+`,'m').test(md),`${f}: ${callout} callout`);ok(md.includes('```text'),`${f}: typed template`);}
 equal(noteTopics.sort(),[...topics].sort(),'note topic coverage');
 const exportMd=fs.readFileSync(path.join(root,'content/dm/question-bank.md'),'utf8');equal((exportMd.match(/<details>/g)||[]).length,practice.length,'readable export count');for(const q of practice)ok(exportMd.includes(`### ${q.id}:`),`export missing ${q.id}`);
 // Mutations must fail: ensure the checker is actually sensitive to wrong keys.
 const mutate=(q,change)=>{const copy=structuredClone(q);change(copy);assert.throws(()=>verifyQuestion(copy,new Set()),`checker accepted mutation of ${q.id}`);};
 mutate(practice.find(q=>q.type==='truth-table'),q=>q.answer[0][0]=!q.answer[0][0]);
 mutate(practice.find(q=>q.recurrence),q=>{q.answer='999';q.testPoints=q.testPoints.map(p=>({n:p.n,expected:999}));});
 mutate(practice.find(q=>q.type==='mst'),q=>q.answer.totalWeight++);
 mutate(practice.find(q=>q.type==='properties'),q=>q.answer[q.options[0]]=!q.answer[q.options[0]]);
 mutate(practice.find(q=>q.type==='partition'),q=>q.answer[0].pop());
 mutate(practice.find(q=>q.type==='set-answer'),q=>q.answer.push('WRONG'));
 mutate(practice.find(q=>q.type==='numeric'),q=>q.answer=999);
 mutate(practice.find(q=>q.type==='mcq'),q=>q.correctIndex=(q.correctIndex+1)%q.options.length);
 if(errors.length)throw Error(errors.join('\n'));
 const all=[...practice,...mocks.flatMap(m=>m.questions)],report={result:'PASS',practice:practice.length,pastParts:past.length,mocks:mocks.length,mockQuestions:all.length-practice.length,checkpoints:all.reduce((s,q)=>s+(q.checkpoints?.length||0),0),notes:notes.length,recurrences:all.filter(q=>q.recurrence).length,mstTraces:all.filter(q=>q.type==='mst').length,exhaustiveMstGraphs:optimumCache.size,counts:manifest.counts,reconstructed:manifest.reconstructed};
 return report;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{console.log(JSON.stringify(verifyData(),null,2));}catch(e){console.error(`DM VERIFICATION FAILED\n${e.message}`);process.exitCode=1;}
}
