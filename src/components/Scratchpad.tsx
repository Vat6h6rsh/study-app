import { useEffect, useRef, useState } from 'react'
import type { CodeQuestion as Question } from '../data/types'
import { filledCode } from '../lib/grading'

export interface ScratchDraft { code: string; stdin: string; title?: string }
export function scratchDraft(question: Question, answers: Record<string, string>): ScratchDraft {
  let code = filledCode(question, answers)
  if (question.fixtures) {
    const literal = (value: string) => JSON.stringify(value)
    const seeds = Object.entries(question.fixtures).map(([name, contents]) => `{ FILE *f=fopen(${literal(name)},"w"); if(!f) return 1; fputs(${literal(contents)},f); fclose(f); }`).join('\n    ')
    const inspect = Object.keys(question.expectedFiles || {}).map(name => `{ FILE *f=fopen(${literal(name)},"r"); if(f) { int c; printf("\\n--- %s ---\\n",${literal(name)}); while((c=fgetc(f))!=EOF) putchar(c); fclose(f); } }`).join('\n    ')
    code = `/* Local fixture harness: seed files before the exercise, display results after it. */\n#include <stdio.h>\n#define main exercise_main\n${code}\n#undef main\nint main(void) {\n    ${seeds}\n    int result=exercise_main();\n    ${inspect}\n    return result;\n}\n`
  }
  return { code, stdin: question.stdin, title: question.title }
}
export const defaultDraft: ScratchDraft = { code: '#include <stdio.h>\n\nint main(void) {\n    printf("Ready for the exam.\\n");\n    return 0;\n}\n', stdin: '' }
interface RunResult { compileOutput: string; stdout: string; stderr: string; exitCode: number | null; unavailable?: boolean; phase?: 'compile' | 'run' }
const runOutcome = (result: RunResult | null) => result?.unavailable ? 'GCC is not available yet' : result?.phase === 'compile' ? 'Compilation failed' : result?.exitCode !== 0 ? 'Program stopped with an error' : 'Run complete'
export function Scratchpad({ draft, onChange }: { draft: ScratchDraft; onChange: (draft: ScratchDraft) => void }) {
  const [result, setResult] = useState<RunResult | null>(null)
  const [running, setRunning] = useState(false)
  const [error, setError] = useState('')
  const [snapshot, setSnapshot] = useState<ScratchDraft | null>(null)
  const [indent, setIndent] = useState(false)
  const active = useRef<AbortController | null>(null)
  useEffect(() => () => active.current?.abort(), [])
  async function run() {
    if (active.current) return
    if (!draft.code.trim()) { setError('Add a C program in the source editor, then choose Run program.'); document.getElementById('scratch-code')?.focus(); return }
    const controller = new AbortController()
    active.current = controller
    const timeout = window.setTimeout(() => controller.abort(), 25000)
    setRunning(true); setError('')
    try {
      const response = await fetch('/api/run-c', { signal: controller.signal, method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code: draft.code, stdin: draft.stdin }) })
      if (!response.headers.get('content-type')?.includes('application/json')) throw new Error('The C runner needs the local dev server. Start the app with npm run dev, then try Run program again.')
      const data = await response.json()
      if (!response.ok || data.error) throw new Error(data.error || 'Could not run the program. Try Run program again.')
      setResult(data); setSnapshot({ ...draft })
    } catch (err) { setError(controller.signal.aborted ? 'The runner did not respond within 25 seconds. Your code is still here. Check that the local dev server is running, then try Run program again.' : err instanceof Error && err.message !== 'Failed to fetch' ? err.message : 'Could not reach the local C runner. Start the app with npm run dev, then try Run program again.') }
    finally { window.clearTimeout(timeout); active.current = null; setRunning(false) }
  }
  const stale = snapshot && (snapshot.code !== draft.code || snapshot.stdin !== draft.stdin)
  const outcome = runOutcome(result)
  return <>
    <div className="page-heading"><div><h1>C scratchpad</h1><p className="muted">Edit a program, add input if needed, then run it with local GCC.</p><a className="text-button" href="#scratch-run">Go to Run program</a></div></div>
    {draft.title && <div className="notice">Loaded example: <strong>{draft.title}</strong>. Your answers are inserted as written.</div>}
    <div className="scratch-layout"><section className="panel scratch-code"><div className="section-heading"><label htmlFor="scratch-code">C source code · scratch.c</label><span className="tag">C11 · -Wall</span></div><textarea id="scratch-code" aria-describedby={ `editor-help${error && !draft.code.trim() ? ' runner-error' : ''}` } aria-invalid={error && !draft.code.trim() ? true : undefined} spellCheck={false} autoCapitalize="off" autoComplete="off" value={draft.code} onChange={e => { onChange({ ...draft, code: e.target.value }); if (error && !draft.code.trim() && e.target.value.trim()) setError('') }} onKeyDown={e => {
      if (e.key === 'Escape') { setIndent(false); return }
      if (e.key !== 'Tab' || e.shiftKey || !indent) return
      e.preventDefault()
      const start = e.currentTarget.selectionStart, end = e.currentTarget.selectionEnd, element = e.currentTarget
      onChange({ ...draft, code: draft.code.slice(0, start) + '    ' + draft.code.slice(end) })
      requestAnimationFrame(() => { element.selectionStart = element.selectionEnd = start + 4 })
    }} /><p id="editor-help" className="small muted">{indent ? 'Tab inserts 4 spaces. Shift+Tab moves back; Escape restores normal Tab navigation.' : 'Tab moves to the next control. Enable indentation to insert 4 spaces; Escape turns it off.'}</p><label className="check-label"><input type="checkbox" checked={indent} onChange={e => setIndent(e.target.checked)}/>Use Tab for indentation</label></section>
    <div className="scratch-side"><section className="panel"><label htmlFor="stdin">Standard input (optional)</label><p id="stdin-help" className="small muted">Values to read with scanf or fgets.</p><textarea id="stdin" aria-describedby="stdin-help" rows={6} spellCheck={false} placeholder="e.g. 5 10 15" value={draft.stdin} onChange={e => onChange({ ...draft, stdin: e.target.value })}/><button type="button" id="scratch-run" className="button primary full" aria-disabled={running} onClick={run}>Run program</button><p className="small muted">Local dev server and GCC required. Compilation can take 15 seconds; execution stops after 5 seconds.</p></section><div className="runner-note"><strong>Runs on this computer</strong><p>The runner uses your local GCC and a fresh temporary folder. File fixtures from practice are included in the code. Run code you trust.</p></div></div></div>
    <p className="run-status" role="status">{running ? 'Compiling and running… Your code remains editable.' : error ? 'Run could not finish. See the message below.' : result ?  `${outcome}.${stale ? ' Code or input changed; run again for current results.' : ' Results are below.'}`  : 'Ready to run.'}</p>
    {running && <progress aria-label="Compiling and running"/>}
    {error && <div id="runner-error" className="notice error" role="alert">{error}</div>}
    {result && <RunnerResults result={result} running={running} stale={!!stale}/>}
  </>
}


export function RunnerResults({ result, running = false, stale = false }: { result: RunResult; running?: boolean; stale?: boolean }) {
  const outcome = runOutcome(result)
  return <section className="panel runner-results" aria-label="Execution result" aria-busy={running}>
      <div className="section-heading"><h2>{running ? 'Previous run' : outcome}</h2><span className="tag">Exit code: {result.exitCode ?? 'unavailable'}</span></div>
      {stale && <p className="notice">Code or input changed since this run. Choose Run program to update these results.</p>}
      {result.unavailable && <p>Install GCC on this computer and add it to PATH, then choose Run program again. You can continue Learn and Practice without GCC.</p>}
      {result.phase === 'compile' && <p>Check the compiler messages for a line number. <a href="#scratch-code">Edit the C source</a>, then run it again.</p>}
      {!result.unavailable && result.phase !== 'compile' && result.exitCode !== 0 && <p>Check standard error and your input, then edit the program and run it again.</p>}
      <h3>Compiler messages</h3><pre tabIndex={0}>{result.compileOutput || 'Compiled successfully. No warnings.'}</pre>
      {!result.unavailable && result.phase !== 'compile' && <><h3>Standard output</h3><pre tabIndex={0}>{result.stdout || '(no output)'}</pre><h3>Standard error</h3><pre tabIndex={0}>{result.stderr || '(none)'}</pre></>}
    </section>
}
