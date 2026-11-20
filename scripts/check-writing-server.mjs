import assert from 'node:assert/strict'
import { createServer } from 'vite'
import { readFile, readdir, unlink } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
const directory=fileURLToPath(new URL('../content/wp/submissions/',import.meta.url))
const existing=new Set(await readdir(directory).catch(e=>{if(e.code==='ENOENT')return [];throw e}))
const original=JSON.parse(await readFile(new URL('../src/data/wp/original.json',import.meta.url),'utf8'))
const now=new Date(),prefix=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}_`,time=String(now.getHours()).padStart(2,'0')+String(now.getMinutes()).padStart(2,'0')
const q=original.find(q=>q.type==='writing'&&!existing.has(`${prefix}${q.id}_${time}.md`));assert(q)
const server=await createServer({logLevel:'silent',server:{host:'127.0.0.1',port:0,strictPort:false}})
let created
try{
 await server.listen();const address=server.httpServer.address();const base=`http://127.0.0.1:${address.port}`
 const post=(body,origin=base)=>fetch(base+'/api/save-writing',{method:'POST',headers:{'Content-Type':'application/json',Origin:origin},body:typeof body==='string'?body:JSON.stringify(body)})
 assert.equal((await fetch(base+'/api/save-writing')).status,405)
 assert.equal((await post({},'https://foreign.invalid')).status,403)
 assert.equal((await post('{broken')).status,400)
 assert.equal((await post('x'.repeat(131073))).status,413)
 assert.equal((await post({parts:[{questionId:'../../escape',answers:{text:'x'},seconds:0}]})).status,400)
 const payload={parts:[{questionId:q.id,answers:{text:'Server test: café हिंदी ==keyword==','rubric:r1':'true'},seconds:42}]}
 const response=await post(payload);assert.equal(response.status,200);const saved=await response.json()
 const resolved=path.resolve(fileURLToPath(new URL('..',import.meta.url)),saved.file)
 assert.equal(path.dirname(resolved),path.resolve(directory));assert(!existing.has(path.basename(resolved)),'Test must not alter a pre-existing submission');created=resolved
 let md=await readFile(created,'utf8');assert(md.includes('café हिंदी ==keyword==')&&md.includes(q.prompt)&&md.includes('Time taken: 42 seconds')&&md.includes('- [x]'))
 const again=await post(payload);assert.equal(again.status,200);assert.equal((await again.json()).file,saved.file);md=await readFile(created,'utf8');assert.equal((md.match(/^# WP submission:/gm)||[]).length,2)
 const papers=JSON.parse(await readFile(new URL('../src/data/wp/papers.json',import.meta.url),'utf8'))
 assert.equal((await post({paperId:papers[0].id,parts:payload.parts})).status,400)
 console.log('Writing endpoint passed: POST-only, same-origin, malformed/oversized requests, catalog/path validation, real UTF-8 Markdown save, rubric/time data and non-overwriting same-minute versions. Test submission removed.')
}finally{await server.close();if(created&&path.dirname(created)===path.resolve(directory)&&!existing.has(path.basename(created)))await unlink(created)}
