// Generates content/wp/question-bank.md from the WP question data (past papers + original practice).
// Usage: node scripts/export-wp-bank.mjs
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const load = (f) => {
  const d = JSON.parse(readFileSync(join(root, 'src/data/wp', f), 'utf8'))
  return Array.isArray(d) ? d : d.questions
}
const past = load('past.json')
const original = load('original.json')

const ORDER = [
  ['essay', 'Q1A · Argumentative essay'],
  ['paraphrase', 'Q1B · Paraphrasing'],
  ['email', 'Q2A · Email'],
  ['questionnaire', 'Q2B · Questionnaire'],
  ['graph', 'Q3A · Interpreting graphs and tables'],
  ['summary', 'Q3B · Summary'],
  ['report', 'Q4 · Report writing'],
  ['abstract-parts', 'Q5A · Parts of an abstract'],
  ['grammar-rewrite', 'Q5B · Grammar correction'],
]
const kind = (q) => (q.type === 'writing' ? q.task : q.type)
const quote = (s) => String(s).trim().split('\n').map((l) => '> ' + l).join('\n')
const details = (summary, body) => `<details><summary>${summary}</summary>\n\n${body.trim()}\n\n</details>\n`

function chartTable(c) {
  const head = `| ${c.xLabel || ''} | ${c.series.map((s) => s.name).join(' | ')} |`
  const sep = `|${'---|'.repeat(c.series.length + 1)}`
  const rows = c.labels.map((l, i) => `| ${l} | ${c.series.map((s) => s.values[i]).join(' | ')} |`)
  return `**${c.title}** (${c.kind}${c.yLabel ? ', ' + c.yLabel : ''})\n\n${[head, sep, ...rows].join('\n')}${c.note ? `\n\n_${c.note}_` : ''}`
}

function render(q) {
  let out = `#### ${q.title}\n_${q.source} · ${q.partLabel} · ${q.marks} marks${q.suggestedMinutes ? ` · ~${Math.round(q.suggestedMinutes)} min` : ''}${q.wordTarget ? ` · ${q.wordTarget.min === q.wordTarget.max ? q.wordTarget.min : q.wordTarget.min + '–' + q.wordTarget.max} words` : ''}_\n\n`
  out += q.prompt.trim() + '\n\n'
  if (q.passage) out += quote(q.passage) + '\n\n'
  if (q.abstract) out += quote(q.abstract) + '\n\n'
  if (q.original) out += quote(q.original) + '\n\n'
  if (q.image) out += `![chart](../../public${q.image.startsWith('/') ? '' : '/'}${q.image})\n\n`
  if (q.chart) out += chartTable(q.chart) + '\n\n'
  if (q.type === 'match') out += q.items.map((i) => `- ${i.text}`).join('\n') + `\n\nCategories: ${q.categories.join(' · ')}\n\n`

  if (q.type === 'writing') {
    let body = q.modelAnswer.trim()
    if (q.annotations?.length) body += '\n\n**Why it scores:**\n' + q.annotations.map((a) => `- ${a}`).join('\n')
    if (q.rubric?.length) body += '\n\n**Rubric:** ' + q.rubric.map((r) => `${r.label} (${r.marks})`).join(' · ')
    out += details('Model answer', body)
  } else if (q.type === 'abstract-parts') {
    out += details('Answer key', q.parts.map((p) => `- **${p.name}:** ${p.accepted[0]}\n  - _${p.explanation}_`).join('\n'))
  } else if (q.type === 'grammar-rewrite') {
    out += details('Corrected paragraph + errors', `${q.corrected}\n\n` + q.errors.map((e) => `- ~~${e.error}~~ → **${e.correction}**: ${e.rule}`).join('\n'))
  } else if (q.type === 'match') {
    out += details('Answer key', q.items.map((i) => `- ${i.text.slice(0, 60)}… → **${i.answer}**: ${i.explanation}`).join('\n'))
  }
  return out + '\n'
}

let md = `# WP question bank\n\nGenerated from the study app data (\`study-app/scripts/export-wp-bank.mjs\`). Past-paper tasks first, then original practice, grouped in exam order. Model answers are collapsed: try first, then open.\n\nThe 3 mock papers are NOT included; keep them for timed practice in the app.\n\n## Contents\n`
md += ORDER.map(([, t]) => `- ${t}`).join('\n') + '\n\n'
for (const [k, title] of ORDER) {
  const p = past.filter((q) => kind(q) === k)
  const o = original.filter((q) => kind(q) === k)
  const extra = k === 'abstract-parts' ? past.filter((q) => q.type === 'match') : []
  if (!p.length && !o.length && !extra.length) continue
  md += `## ${title}\n\n`
  if (p.length || extra.length) md += `### From past papers (${p.length + extra.length})\n\n` + [...p, ...extra].map(render).join('')
  if (o.length) md += `### Practice (${o.length})\n\n` + o.map(render).join('')
}
const out = join(root, 'content/wp/question-bank.md')
writeFileSync(out, md)
console.log('Wrote', out, Math.round(md.length / 1024) + ' KB')
