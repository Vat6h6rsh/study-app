import { memo, useEffect, useMemo, useState } from 'react'
import type { Question, Subject } from '../data/types'
import { concepts, wpConcepts } from '../data/concepts'
import type { Attempt } from '../lib/storage'
import { questionProgress, topicGroups } from '../lib/practiceNavigation'
import { topicTone } from '../topicColors'
import { StudyLink } from './StudyLink'

export function studyTopics(subject: Subject) {
  const notes = subject.id === 'wp' ? wpConcepts : concepts
  return notes.flatMap(note => {
    const topic = subject.topics.find(t => t.id === note.id)
    return topic ? [{ ...topic, name: note.title }] : []
  })
}
export function PriorityChip({ priority }: { priority: 'core' | 'extra' }) {
  return <span className={`tag priority-chip priority-${priority}`}>{priority === 'core' ? 'Core' : 'Extra'}</span>
}
export const TopicPicker = memo(function TopicPicker({ subject, pool, current, attempts, onSelect, onLearn }: {
  subject: Subject; pool: Question[]; current?: Question; attempts: Attempt[]
  onSelect: (id: string) => void; onLearn: (topic: string) => void
}) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ [current?.topic || '']: true })
  useEffect(() => { if (current) setExpanded(open => ({ ...open, [current.topic]: true })) }, [current?.topic])
  const latest = useMemo(() => new Map(attempts.map(a => [a.questionId, a])), [attempts])
  const groups = useMemo(() => topicGroups(pool, studyTopics(subject)), [pool, subject])
  return <nav className="topic-groups" aria-label="Practice topics in Learn order">{groups.map(group => {
    const progress = questionProgress(group.questions, attempts)
    return <details key={group.id} className="practice-topic" data-topic={group.id} data-tone={topicTone(group.id)} open={!!expanded[group.id]} onToggle={e => {
      const open = e.currentTarget.open
      setExpanded(state => state[group.id] === open ? state : { ...state, [group.id]: open })
    }}>
      <summary><span className="topic-dot" aria-hidden="true"/><span><strong>{group.name}</strong><span className="topic-group-progress">{subject.id === 'itp' && <b>Core {progress.coreDone}/{progress.coreCount} done · </b>}{group.questions.length} questions<span className="small muted">{progress.done} done · {progress.correct} correct · {progress.revisit} revisit</span></span></span></summary>
      <StudyLink view="learn" topic={group.id} className="text-button read-topic-note" onNavigate={() => onLearn(group.id)}>Read the note</StudyLink>
      <div className="question-list">{group.questions.map((q, i) => {
        const attempt = latest.get(q.id), status = questionProgress([q], attempts)
        return <button type="button" key={q.id} data-question-id={q.id} className={q.id === current?.id ? 'selected' : ''} aria-current={q.id === current?.id ? 'true' : undefined} onClick={() => onSelect(q.id)}>
          <span className="num">{i + 1}</span><span className="question-list-copy">{q.title}<span className="question-row-tags">{'priority' in q && <PriorityChip priority={q.priority}/>}<span className="tag">{q.difficulty}</span><span className="tag">{q.source}</span></span></span>
          {attempt && <span className={status.revisit ? 'mistake-label' : 'done-label'}>{status.revisit ? 'Revisit' : '✓ Done'}</span>}
        </button>
      })}</div>
    </details>
  })}</nav>
})
