// Dependency-free headless Chromium harness (CDP over WebSocket) shared by the browser checks.
import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { mkdtemp, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { createServer, preview } from 'vite'
import assert from 'node:assert/strict'

export const chromePath = () => process.env.CHROME_PATH || ['C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', '/usr/bin/chromium', '/usr/bin/google-chrome'].find(existsSync)

// Runs `body(api)` against a Vite dev server and a throw-away headless browser profile.
export async function withBrowser(body, options = {}) {
  const executable = chromePath()
  if (!executable) { console.log('Headless browser unavailable; real-layout checks require CHROME_PATH.'); return }
  const profile = await mkdtemp(join(tmpdir(), 'examdesk-ui-'))
  // options.preview: serve a production build from `options.root` (default: this app) instead of the dev server.
  const root = options.root
  const server = options.preview
    ? await preview({ root, preview: { host: '127.0.0.1', port: 0, strictPort: false }, logLevel: 'error' })
    : await createServer({ root, server: { host: '127.0.0.1', port: 0, strictPort: false }, clearScreen: false, logLevel: 'error' })
  if (!options.preview) await server.listen()
  const origin = options.preview ? server.resolvedUrls.local[0].replace(/\/$/, '') : `http://127.0.0.1:${server.httpServer.address().port}`
  const child = spawn(executable, ['--headless=new', '--no-sandbox', '--disable-gpu', '--no-first-run', '--no-default-browser-check', '--remote-debugging-port=0', `--user-data-dir=${profile}`, 'about:blank'], { windowsHide: true, stdio: ['ignore', 'ignore', 'pipe'] })
  let socket
  try {
    const endpoint = await new Promise((resolve, reject) => {
      let stderr = ''; const timer = setTimeout(() => reject(Error('Chromium did not start within 15s: ' + stderr.slice(-500))), 15000)
      child.stderr.on('data', chunk => { stderr += chunk; const match = /DevTools listening on (ws:\/\/[^\s]+)/.exec(stderr); if (match) { clearTimeout(timer); resolve(match[1]) } })
      child.on('error', error => { clearTimeout(timer); reject(error) })
      child.on('exit', code => { clearTimeout(timer); reject(Error(`Chromium exited ${code}: ${stderr.slice(-500)}`)) })
    })
    socket = new WebSocket(endpoint)
    await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject })
    let sequence = 0, session, pageLoaded
    const pending = new Map()
    socket.onmessage = event => { const data = JSON.parse(event.data); if (data.method === 'Page.loadEventFired') pageLoaded?.(); if (data.id && pending.has(data.id)) { const { resolve, reject, timer } = pending.get(data.id); clearTimeout(timer); pending.delete(data.id); data.error ? reject(Error(JSON.stringify(data.error))) : resolve(data.result) } }
    const send = (method, params = {}, target = session) => new Promise((resolve, reject) => { const id = ++sequence; const timer = setTimeout(() => { pending.delete(id); reject(Error('CDP timeout: ' + method)) }, 30000); pending.set(id, { resolve, reject, timer }); socket.send(JSON.stringify({ id, method, params, ...(target ? { sessionId: target } : {}) })) })
    const { targetId } = await send('Target.createTarget', { url: 'about:blank' })
    session = (await send('Target.attachToTarget', { targetId, flatten: true })).sessionId
    await send('Page.enable'); await send('Runtime.enable')
    const evaluate = async expression => { const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true }); if (result.exceptionDetails) throw Error(result.exceptionDetails.text + ' ' + result.exceptionDetails.exception?.description); return result.result.value }
    const wait = async expression => { for (let i = 0; i < 100; i++) { if (await evaluate(`Boolean(${expression})`)) return; await new Promise(r => setTimeout(r, 100)) } throw Error('UI timeout: ' + expression) }
    const load = async action => { const loaded = new Promise((resolve, reject) => { const timer = setTimeout(() => reject(Error('Page load timeout')), 20000); pageLoaded = () => { clearTimeout(timer); resolve() } }); await action(); await loaded; pageLoaded = undefined }
    const navigate = async (path, ready = '.code-editor') => { await load(() => send('Page.navigate', { url: origin + path })); await wait(`document.querySelector(${JSON.stringify(ready)})`) }
    const click = selector => evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`)
    const viewport = (width, height = 1000) => send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 768 })
    const sleep = ms => new Promise(r => setTimeout(r, ms))
    await body({ send, evaluate, wait, load, navigate, click, viewport, sleep, origin })
    socket.send(JSON.stringify({ id: ++sequence, method: 'Browser.close' }))
  } finally {
    socket?.close(); child.kill(); await (server.close?.() ?? server.httpServer.close())
    // Only remove the exact temporary profile we created under the system temp directory.
    assert(resolve(profile).startsWith(resolve(tmpdir()) + '\\') || resolve(profile).startsWith(resolve(tmpdir()) + '/'))
    await rm(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 }).catch(() => {})
  }
}
