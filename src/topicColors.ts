// Eight colour families, with three extra shades for related topics.
export const topicTones: Record<string, string> = {
  structs: 'indigo', memory: 'teal', arrays: 'amber', matrices: 'sky',
  strings: 'pink', files: 'violet', pointers: 'cyan', loops: 'orange',
  functions: 'iris', operators: 'gold', scope: 'plum',
  strategy: 'sky', idioms: 'teal',
  essay: 'indigo', paraphrase: 'teal', email: 'amber', questionnaire: 'sky', graph: 'pink', summary: 'violet', report: 'cyan', abstracts: 'orange', grammar: 'iris', style: 'gold', phrases: 'plum',
}
export const topicTone = (topic: string) => topicTones[topic] || 'indigo'
