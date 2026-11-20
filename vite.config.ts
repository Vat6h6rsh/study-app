import react from '@vitejs/plugin-react'
import { defineConfig, searchForWorkspaceRoot } from 'vite'
import type { Plugin } from 'vite'
import { fileURLToPath } from 'node:url'
import { writingSaver } from './server/save-writing.mjs'
import { runC } from './server/run-c.mjs'

function cRunner(): Plugin {
  let running = false
  return {
    name: 'local-c-runner',
    configureServer(server) {
      server.middlewares.use('/api/run-c', async (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        if (req.method !== 'POST') { res.statusCode = 405; res.end(JSON.stringify({ error: 'Use POST /api/run-c' })); return }
        if (req.headers.origin) {
          try {
            if (new URL(req.headers.origin).host !== req.headers.host) throw new Error('origin')
          } catch { res.statusCode = 403; res.end(JSON.stringify({ error: 'Only same-origin requests are accepted' })); return }
        }
        if (running) { res.statusCode = 429; res.end(JSON.stringify({ error: 'A program is already running. Try again shortly.' })); return }
        let body = ''
        let ownsRunner = false
        try {
          for await (const chunk of req) {
            body += chunk.toString()
            if (body.length > 131072) { res.statusCode = 413; res.end(JSON.stringify({ error: 'Request too large (128 KiB maximum).' })); return }
          }
          const { code, stdin = '' } = JSON.parse(body)
          if (typeof code !== 'string' || typeof stdin !== 'string' || code.length > 65536 || stdin.length > 65536) {
            res.statusCode = 400; res.end(JSON.stringify({ error: 'Code and stdin must be strings of at most 64 KiB each.' })); return
          }
          if (running) { res.statusCode = 429; res.end(JSON.stringify({ error: 'A program is already running. Try again shortly.' })); return }
          running = true
          ownsRunner = true
          res.end(JSON.stringify(await runC(code, stdin)))
        } catch (error) {
          res.statusCode = 400
          res.end(JSON.stringify({ error: error instanceof Error ? error.message : 'Could not run program' }))
        } finally { if (ownsRunner) running = false }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), cRunner(), writingSaver()],
  server: {
    host: '127.0.0.1',
    fs: { allow: [searchForWorkspaceRoot(process.cwd()), fileURLToPath(new URL('../docs/itp/concepts', import.meta.url)), fileURLToPath(new URL('../docs/wp/concepts', import.meta.url))] },
  },
})
