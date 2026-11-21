import { memo } from 'react'
import type { CodeQuestion } from '../data/types'
import { conceptByTopic } from '../data/concepts'
import { firstConceptParagraph } from '../lib/concepts'
import { StudyLink } from './StudyLink'

export const ConceptNote = memo(function ConceptNote({ question, onLearn }: { question: CodeQuestion; onLearn: (topic: string) => void }) {
  const note = conceptByTopic.get(question.topic)
  const topic = note?.title || question.topic
  const text = question.concept?.trim() || firstConceptParagraph(note?.markdown || '')
  return <details className="concept-note">
    <summary><span>Concept: {topic}</span><svg className="concept-chevron" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg></summary>
    <div className="concept-note-body"><p>{text}</p><StudyLink view="learn" topic={question.topic} className="concept-lesson-link" aria-label={`Open the full ${topic} lesson`} title={`Open the full ${topic} lesson`} onNavigate={() => onLearn(question.topic)}><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M7 17 17 7M7 7h10v10"/></svg></StudyLink></div>
  </details>
})
