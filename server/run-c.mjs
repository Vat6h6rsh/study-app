import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { mkdtemp, writeFile, rm, readdir, readFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, delimiter, dirname, basename } from 'node:path'

export async function findGcc() {
  for (const directory of (process.env.PATH || '').split(delimiter)) {
    const candidate = join(directory.replace(/^"|"$/g, ''), process.platform === 'win32' ? 'gcc.exe' : 'gcc')
    if (existsSync(candidate)) return candidate
  }
  if (process.env.LOCALAPPDATA) {
    const packages = join(process.env.LOCALAPPDATA, 'Microsoft', 'WinGet', 'Packages')
    for (const name of await readdir(packages).catch(() => [])) {
      if (!name.startsWith('BrechtSanders.WinLibs')) continue
      const candidate = join(packages, name, 'mingw64', 'bin', 'gcc.exe')
      if (existsSync(candidate)) return candidate
    }
  }
  return null
}

function execute(command, args, cwd, stdin, timeout, gcc) {
  return new Promise(resolve => {
    let stdout = '', stderr = '', timedOut = false, settled = false, clipped = false
    const env = { ...process.env, PATH: `${dirname(gcc)}${delimiter}${process.env.PATH || ''}` }
    const child = spawn(command, args, { cwd, env, windowsHide: true, stdio: 'pipe' })
    const timer = setTimeout(() => { timedOut = true; child.kill('SIGKILL') }, timeout)
    const finish = exitCode => {
      if (settled) return
      settled = true
      clearTimeout(timer)
      if (timedOut) stderr += `\nStopped after ${timeout / 1000} seconds.`
      if (clipped) stderr += '\nOutput limit reached (256 KiB).'
      resolve({ stdout, stderr, exitCode })
    }
    for (const stream of ['stdout', 'stderr']) child[stream].on('data', chunk => {
      if (stdout.length + stderr.length < 262144) {
        if (stream === 'stdout') stdout += chunk.toString()
        else stderr += chunk.toString()
      } else { clipped = true; child.kill('SIGKILL') }
    })
    child.on('error', error => { stderr += error.message; finish(null) })
    child.on('close', code => finish(code))
    child.stdin.on('error', () => {})
    child.stdin.end(stdin)
  })
}

// Fixture options are used by the offline content verifier, never accepted by the HTTP endpoint.
export async function runC(code, stdin = '', options = {}) {
  const gcc = await findGcc()
  if (!gcc) return { compileOutput: 'GCC was not found. Install GCC and put it on PATH, or install WinLibs through WinGet. The app also checks LOCALAPPDATA/Microsoft/WinGet/Packages/BrechtSanders.WinLibs*/mingw64/bin/gcc.exe. Try Run again after installation.', stdout: '', stderr: '', exitCode: null, unavailable: true }
  const directory = await mkdtemp(join(tmpdir(), 'exam-c-'))
  try {
    await writeFile(join(directory, 'main.c'), code)
    for (const [name, contents] of Object.entries(options.fixtures || {})) {
      if (basename(name) !== name) throw new Error('Fixtures must be simple filenames')
      await writeFile(join(directory, name), contents)
    }
    const executable = join(directory, process.platform === 'win32' ? 'program.exe' : 'program')
    const compiled = await execute(gcc, ['-std=c11', '-Wall', 'main.c', '-o', executable], directory, '', 15000, gcc)
    const compileOutput = compiled.stdout + compiled.stderr
    if (compiled.exitCode !== 0) return { phase: 'compile', compileOutput, stdout: '', stderr: '', exitCode: compiled.exitCode }
    const result = await execute(executable, [], directory, stdin, 5000, gcc)
    const files = {}
    for (const name of Object.keys(options.expectedFiles || {})) {
      if (basename(name) === name) files[name] = await readFile(join(directory, name), 'utf8').catch(() => '[missing file]')
    }
    return { phase: 'run', compileOutput, ...result, files }
  } finally {
    await rm(directory, { recursive: true, force: true }).catch(() => {})
  }
}
