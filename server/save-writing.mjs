import { readFile, mkdir, appendFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

export class SubmissionError extends Error { constructor(message, status=400) { super(message); this.status=status } }
const directory = fileURLToPath(new URL('../content/wp/submissions/',import.meta.url))
const words = text => text.replace(/==/g,'').trim().split(/\s+/u).filter(Boolean).length
const fence = text => { const longest=Math.max(2,...[...text.matchAll(/`+/g)].map(m=>m[0].length));const ticks='`'.repeat(longest+1);return `${ticks}text\n${text}\n${ticks}` }
export async function submissionMarkdown(data, now = new Date()) {
 const pools=await Promise.all(['past','original','mocks'].map(n=>readFile(new URL(`../src/data/wp/${n}.json`,import.meta.url),'utf8').then(JSON.parse)))
 const catalog=new Map(pools.flat().map(q=>[q.id,q])),papers=JSON.parse(await readFile(new URL('../src/data/wp/papers.json',import.meta.url),'utf8'))
 if(!data || typeof data!=='object'||!Array.isArray(data.parts)||!data.parts.length||data.parts.length>9)throw new SubmissionError('Supply 1 practice part or a complete 9-part WP mock.')
 const ids=data.parts.map(p=>p?.questionId)
 if(new Set(ids).size!==ids.length||ids.some(id=>typeof id!=='string'||!catalog.has(id)))throw new SubmissionError('Unknown or duplicate WP question ID.')
 let identifier=ids[0]
 if(data.paperId!==undefined){const paper=papers.find(p=>p.id===data.paperId);if(!paper||JSON.stringify(paper.questionIds)!==JSON.stringify(ids))throw new SubmissionError('A mock must contain all nine parts in paper order.');identifier=paper.id}
 else if(data.parts.length!==1)throw new SubmissionError('Multiple parts require a valid mock paper ID.')
 const date=[now.getFullYear(),String(now.getMonth()+1).padStart(2,'0'),String(now.getDate()).padStart(2,'0')].join('-')
 const hhmm=String(now.getHours()).padStart(2,'0')+String(now.getMinutes()).padStart(2,'0')
 const filename=`${date}_${identifier}_${hhmm}.md`
 let markdown=`# WP submission: ${identifier}\n\nSaved: ${now.toISOString()}\n\nCourse: BCS ZC239 · Writing Practice\n\n${data.paperId?'Mock: 5 questions, 9 parts, 50 marks. Assumed duration: 150 minutes.':'Practice submission. Writing scores are self-assessed.'}\n`
 for(const part of data.parts){
  if(!part||typeof part.answers!=='object'||!part.answers||Array.isArray(part.answers)||Object.keys(part.answers).length>80||Object.values(part.answers).some(v=>typeof v!=='string'||v.length>65536)||!Number.isFinite(part.seconds)||part.seconds<0||part.seconds>31536000)throw new SubmissionError('Answers must be strings; time taken must be a valid non-negative number of seconds.')
  const q=catalog.get(part.questionId),a=part.answers
  const answer=q.type==='abstract-parts'?q.parts.map(p=>`${p.name}: ${a[p.id]||''}`).join('\n\n'):q.type==='mcq'?(q.options.find(o=>o.id===a.answer)?.text||'(blank)'):q.type==='match'?q.items.map(i=>`${i.text}: ${a[i.id]||'(blank)'}`).join('\n'):a.text??(q.type==='grammar-rewrite'?q.original:'')
  markdown+=`\n## ${q.partLabel}: ${q.title}\n\nQuestion ID: ${q.id}\n\nMarks: ${q.marks}\n\nSource: ${q.source}\n\n### Task prompt\n\n${q.prompt}\n`
  if(q.passage)markdown+=`\n### Source passage\n\n${q.passage}\n`
  if(q.abstract)markdown+=`\n### Abstract\n\n${q.abstract}\n`
  if(q.original)markdown+=`\n### Original erroneous paragraph\n\n${q.original}\n`
  if(q.chart)markdown+=`\n### Chart data\n\n${fence(JSON.stringify(q.chart,null,2))}\n`
  if(q.image)markdown+=`\nOriginal chart image: ${q.image}\n`
  markdown+=`\n### Student answer\n\n${fence(answer)}\n\nWord count: ${words(answer)}\n\nTime taken: ${Math.round(part.seconds)} seconds\n\n### Self-rubric ticks\n\n`
  markdown+=q.rubric?q.rubric.map(r=>`- [${a['rubric:'+r.id]==='true'?'x':' '}] ${r.label} (${r.marks} marks)`).join('\n'):'Not applicable: this task uses an automatic key, with manual review for grammar.'
  if(a.selfScore?.trim())markdown+=`\n\nSelf-adjusted grammar score: ${a.selfScore} / ${q.marks}`
  markdown+='\n'
 }
 return {filename,markdown}
}
export async function saveSubmission(data) {
 const {filename,markdown}=await submissionMarkdown(data)
 // IDs are resolved from the local catalog. Assert containment before writing as a second boundary.
 const target=path.resolve(directory,filename)
 if(path.dirname(target)!==path.resolve(directory))throw new SubmissionError('Invalid output path.')
 await mkdir(directory,{recursive:true})
 // Same-minute saves append a new dated version; no existing answer is overwritten.
 await appendFile(target,`\n---\n\n${markdown}`,'utf8')
 return {file:`content/wp/submissions/${filename}`}
}
export function writingSaver(){return {name:'local-writing-submissions',configureServer(server){server.middlewares.use('/api/save-writing',async(req,res)=>{
 res.setHeader('Content-Type','application/json')
 if(req.method!=='POST'){res.statusCode=405;res.end(JSON.stringify({error:'Use POST /api/save-writing'}));return}
 if(req.headers.origin){try{if(new URL(req.headers.origin).host!==req.headers.host)throw Error('origin')}catch{res.statusCode=403;res.end(JSON.stringify({error:'Only same-origin requests are accepted'}));return}}
 try{let body='',size=0;for await(const chunk of req){size+=Buffer.byteLength(chunk);if(size>131072){res.statusCode=413;res.end(JSON.stringify({error:'Request too large (128 KiB maximum).'}));return}body+=chunk.toString()}
 const result=await saveSubmission(JSON.parse(body));res.end(JSON.stringify(result))
 }catch(error){res.statusCode=error instanceof SubmissionError?error.status:400;res.end(JSON.stringify({error:error instanceof Error?error.message:'Could not save writing'}))}
 })}}}
