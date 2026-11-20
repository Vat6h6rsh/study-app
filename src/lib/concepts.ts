export interface ConceptExample {
  template: string
  code: string
  answers: Record<string, string>
  expectedOutput: string
}

// Keep answer extraction shared by the lesson runner and the GCC verifier.
// Authoring format: a C fence with main, then Answers: A = `...`, then a text output fence.
export function conceptExamples(markdown: string): ConceptExample[] {
  const examples: ConceptExample[] = []
  const fences = [...markdown.matchAll(/^```c\r?\n([\s\S]*?)^```\s*$/gm)]
  for (const [i, fence] of fences.entries()) {
    const template = fence[1].replace(/\r\n/g, '\n')
    if (!/\bmain\s*\(/.test(template)) continue // Explicit fragments have no standalone driver.
    const after = markdown.slice(fence.index! + fence[0].length, fences[i + 1]?.index ?? markdown.length)
    const answerLine = /^Answers: (.+)$/m.exec(after)?.[1] || ''
    const answers = Object.fromEntries([...answerLine.matchAll(/\b([A-Z]) = `([^`]+)`/g)].map(m => [m[1], m[2]]))
    const tokens = [...new Set([...template.matchAll(/__([A-Z])__/g)].map(m => m[1]))].sort()
    if (JSON.stringify(tokens) !== JSON.stringify(Object.keys(answers).sort())) throw new Error('Example blanks and answers differ')
    const output = /^```text\r?\n([\s\S]*?)^```\s*$/m.exec(after)?.[1]
    if (output === undefined) throw new Error('Complete concept example needs an expected output fence')
    examples.push({ template, code: template.replace(/__([A-Z])__/g, (_, id: string) => answers[id]), answers, expectedOutput: output.replace(/\r\n/g, '\n') })
  }
  return examples
}
