export interface Concept {
  id: string
  title: string
  fileName: string
  markdown: string
}

// The sibling Markdown files are the single source, bundled by Vite for offline use.
const notes = import.meta.glob('../../content/itp/concepts/*.md', {
  query: '?raw', import: 'default', eager: true,
}) as Record<string, string>

export const concepts: Concept[] = Object.entries(notes).sort(([a], [b]) => a.localeCompare(b)).map(([path, markdown]) => {
  const id = /^Topic ID: `([a-z]+)`$/m.exec(markdown)?.[1]
  const title = /^# (.+)$/m.exec(markdown)?.[1]
  if (!id || !title) throw new Error(`Missing concept metadata: ${path}`)
  return { id, title, fileName: path.split('/').at(-1)!, markdown }
})

export const conceptByTopic = new Map(concepts.map(note => [note.id, note]))

const wpNotes = import.meta.glob('../../content/wp/concepts/*.md', {
  query: '?raw', import: 'default', eager: true,
}) as Record<string, string>
export const wpConcepts: Concept[] = Object.entries(wpNotes).sort(([a],[b]) => a.localeCompare(b)).map(([path,markdown]) => {
  const id = /^Topic ID: `([a-z]+)`$/m.exec(markdown)?.[1]
  const title = /^# (.+)$/m.exec(markdown)?.[1]
  if (!id || !title) throw new Error(`Missing WP concept metadata: ${path}`)
  return { id,title,fileName:path.split('/').at(-1)!,markdown }
})
