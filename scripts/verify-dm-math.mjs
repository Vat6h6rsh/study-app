// Pure, dependency-free DM checking helpers. No eval, Function or external code.
export function arithmetic(source, n=0) {
  const tokens=source.match(/\d+|n|[()+*/^\-]/g)||[];
  if(tokens.join('')!==source.replace(/\s/g,'')) throw Error(`Unsafe arithmetic: ${source}`);
  let i=0;
  const atom=()=>{const t=tokens[i++]; if(t==='n')return n;if(/^\d+$/.test(t||''))return Number(t);if(t==='('){const v=sum();if(tokens[i++]!==')')throw Error('Missing )');return v;}throw Error('Expected integer, n or (');};
  const power=()=>{let v=atom();if(tokens[i]==='^'){i++;v=v**unary();}return v;};
  const unary=()=>tokens[i]==='-'?(i++,-unary()):tokens[i]==='+'?(i++,unary()):power();
  const product=()=>{let v=unary();while(tokens[i]==='*'||tokens[i]==='/'){const op=tokens[i++],b=unary();v=op==='*'?v*b:v/b;}return v;};
  const sum=()=>{let v=product();while(tokens[i]==='+'||tokens[i]==='-'){const op=tokens[i++],b=product();v=op==='+'?v+b:v-b;}return v;};
  const answer=sum();if(i!==tokens.length||!Number.isFinite(answer))throw Error('Invalid/nonfinite expression');return answer;
}
export function logic(source, env) {
  const t=source.match(/<->|->|[a-z]+|[~^()]/g)||[];
  if(t.join('')!==source.replace(/\s/g,''))throw Error(`Unsafe logic: ${source}`);
  let i=0;
  const atom=()=>{let s=t[i++];if(s==='~')return !atom();if(s==='('){let v=iff();if(t[i++]!==')')throw Error('Missing logic )');return v;}if(!(s in env))throw Error(`Unknown variable ${s}`);return env[s];};
  const and=()=>{let v=atom();while(t[i]==='^'){i++;const b=atom();v=v&&b;}return v;};
  const or=()=>{let v=and();while(t[i]==='v'){i++;const b=and();v=v||b;}return v;};
  const imp=()=>{const a=or();if(t[i]==='->'){i++;const b=imp();return !a||b;}return a;};
  // Parse RHS even when a boolean result could short-circuit.
  const iff=()=>{let a=or();if(t[i]==='->'){i++;const b=imp();a=!a||b;}while(t[i]==='<->'){i++;const b=iff();a=a===b;}return a;};
  const a=iff();if(i!==t.length)throw Error(`Unparsed logic ${source}`);return a;
}
export function truth(variables,columns) {return Array.from({length:2**variables.length},(_,row)=>{const e=Object.fromEntries(variables.map((v,k)=>[v,!(row&(1<<(variables.length-1-k)))]));return columns.map(c=>logic(c,e));});}
export const canon = a=>JSON.stringify([...a].sort());
export const partitionCanon = a=>canon(a.map(c=>canon(c)));
export function relationFacts(r) {
  const {elements:a,pairs}=r;const s=new Set(pairs.map(p=>JSON.stringify(p))),has=(x,y)=>s.has(JSON.stringify([x,y]));
  const reflexive=a.every(x=>has(x,x)),irreflexive=a.every(x=>!has(x,x));
  const symmetric=a.every(x=>a.every(y=>!has(x,y)||has(y,x)));
  const antisymmetric=a.every(x=>a.every(y=>x===y||!has(x,y)||!has(y,x)));
  const transitive=a.every(x=>a.every(y=>a.every(z=>!has(x,y)||!has(y,z)||has(x,z))));
  const equivalence=reflexive&&symmetric&&transitive,partial=reflexive&&antisymmetric&&transitive;
  const classes=equivalence?[...new Map(a.map(x=>{const c=a.filter(y=>has(x,y));return[canon(c),c];})).values()]:[];
  const minimal=a.filter(x=>!a.some(y=>x!==y&&has(y,x))),maximal=a.filter(x=>!a.some(y=>x!==y&&has(x,y)));
  const least=a.filter(x=>a.every(y=>has(x,y))),greatest=a.filter(x=>a.every(y=>has(y,x)));
  const bounds=subset=>{const upperBounds=a.filter(y=>subset.every(x=>has(x,y))),lowerBounds=a.filter(y=>subset.every(x=>has(y,x)));return {upperBounds,lowerBounds,lub:upperBounds.filter(x=>upperBounds.every(y=>has(x,y))),glb:lowerBounds.filter(x=>lowerBounds.every(y=>has(y,x)))};};
  const covers=pairs.filter(([x,y])=>x!==y&&!a.some(z=>z!==x&&z!==y&&has(x,z)&&has(z,y))).map(([x,y])=>`(${x},${y})`);
  const lattice=partial&&a.every(x=>a.every(y=>{const b=bounds([x,y]);return b.lub.length===1&&b.glb.length===1;}));
  return {reflexive,irreflexive,symmetric,antisymmetric,transitive,'equivalence relation':equivalence,'partial order':partial,lattice,classes,minimal,maximal,least,greatest,covers,bounds,has};
}
export function mstRun(graph, algorithm, startVertex, sequence) {
  const parent=Object.fromEntries(graph.vertices.map(v=>[v,v]));const root=x=>parent[x]===x?x:(parent[x]=root(parent[x]));
  const reached=new Set([startVertex||graph.vertices[0]]),chosen=[],eligible=()=>graph.edges.filter(e=>!chosen.includes(e.id)&&(algorithm==='kruskal'?root(e.u)!==root(e.v):reached.has(e.u)!==reached.has(e.v)));
  for(let i=0;i<graph.vertices.length-1;i++) {
    const candidates=eligible();if(!candidates.length)throw Error('Disconnected graph');const min=Math.min(...candidates.map(e=>e.weight));
    const next=sequence?graph.edges.find(e=>e.id===sequence[i]):candidates.find(e=>e.weight===min);
    if(!next||!candidates.includes(next)||next.weight!==min)throw Error(`Invalid ${algorithm} step ${i+1}: ${sequence?.[i]}`);
    parent[root(next.u)]=root(next.v);reached.add(next.u);reached.add(next.v);chosen.push(next.id);
  }
  if(sequence&&sequence.length!==chosen.length)throw Error('Wrong edge count');
  return {edgeSequence:chosen,totalWeight:chosen.reduce((s,id)=>s+graph.edges.find(e=>e.id===id).weight,0)};
}
export function graphFacts(g) {
  const a=g.vertices,es=g.edges,adj=Object.fromEntries(a.map(v=>[v,new Set()]));
  for(const e of es){adj[e.u].add(e.v);if(!g.directed)adj[e.v].add(e.u);}
  const components=(omitV,omitE)=>{const seen=new Set();let c=0;for(const x of a.filter(v=>v!==omitV)){if(seen.has(x))continue;c++;const q=[x];seen.add(x);while(q.length){const u=q.pop();for(const e of es){if(e.id===omitE||e.u===omitV||e.v===omitV)continue;const v=e.u===u?e.v:(!g.directed&&e.v===u?e.u:null);if(v&&!seen.has(v)){seen.add(v);q.push(v);}}}}return c;};
  const degrees=a.map(v=>es.reduce((s,e)=>s+(e.u===v?1:0)+(e.v===v?1:0),0));
  let bipartite=true;const color={};for(const v of a){if(v in color)continue;color[v]=0;const q=[v];while(q.length){const u=q.pop();for(const w of adj[u]){if(!(w in color)){color[w]=1-color[u];q.push(w);}else if(color[w]===color[u])bipartite=false;}}}
  let hamiltonian=false;const visit=(path)=>{if(path.length===a.length){if(adj[path.at(-1)].has(path[0]))hamiltonian=true;return;}for(const w of adj[path.at(-1)])if(!path.includes(w))visit([...path,w]);};if(a.length>=3)visit([a[0]]);
  let chromatic=0;for(let k=1;k<=a.length;k++){const cols={};const solve=i=>{if(i===a.length)return true;const v=a[i];for(let c=0;c<k;c++){if([...adj[v]].some(w=>cols[w]===c))continue;cols[v]=c;if(solve(i+1))return true;delete cols[v];}return false;};if(solve(0)){chromatic=k;break;}}
  const reach=x=>{const s=new Set([x]),q=[x];while(q.length)for(const y of adj[q.pop()])if(!s.has(y)){s.add(y);q.push(y);}return s;};const reachSets=Object.fromEntries(a.map(v=>[v,reach(v)]));
  const scc=new Set(a.map(v=>canon(a.filter(w=>reachSets[v].has(w)&&reachSets[w].has(v)))));
  const c=components(),oddDegrees=degrees.filter(d=>d%2).length;
  return {edges:es.length,vertices:a.length,components:c,oddDegrees,degreeSequence:degrees.sort((x,y)=>y-x),chromatic,bipartite,Eulerian:c===1&&oddDegrees===0,Hamiltonian:hamiltonian,cutEdges:es.filter(e=>components(null,e.id)>c).map(e=>e.id),cutVertices:a.filter(v=>components(v)>c),sccCount:scc.size};
}
export function count(v,n=0) {
  if(v.operation==='pigeonhole')return BigInt(v.boxes)*BigInt(v.occupancy-1)+1n;
  if(v.operation==='choose'){let x=0n;const visit=(start,left)=>{if(left===0){x++;return;}for(let i=start;i<=v.n-left;i++)visit(i+1,left-1);};visit(0,v.r);return x;}
  if(v.operation==='permutations'){let x=0n;const visit=used=>{if(used.size===v.r){x++;return;}for(let i=0;i<v.n;i++)if(!used.has(i)){used.add(i);visit(used);used.delete(i);}};visit(new Set());return x;}
  if(v.operation==='labelledGraphs'){const k=v.directed?(v.loops?n*n:n*(n-1)):n*(n-1)/2+(v.loops?n:0);return 2n**BigInt(k);}
  if(v.operation==='stringsUpTo'){let s=v.plusOne?1n:0n;for(let i=1;i<=v.maxLength;i++)s+=BigInt(v.alphabet)**BigInt(i);return s;}
  if(v.operation==='bitstrings'){let s=0n;for(let i=0;i<2**v.length;i++){const x=i.toString(2).padStart(v.length,'0'),p=x.startsWith(v.prefix??''),q=x.endsWith(v.suffix??'');if(v.mode==='or'?(p||q):(p&&q))s++;}return s;}
  throw Error('Unknown counting operation');
}
