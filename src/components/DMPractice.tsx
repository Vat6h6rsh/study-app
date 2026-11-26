import { useEffect, useState } from 'react'
import { subjects } from '../data'
import { dmPracticeQuestions, isSlot1 } from '../data/dm'
import type { DMAnswers } from '../lib/dm'
import { dmAttempt, dmDraftKey, dmModelAnswers, markDM } from '../lib/dm'
import type { Attempt } from '../lib/storage'
import { readSaved, save } from '../lib/storage'
import { topicGroups } from '../lib/practiceNavigation'
import { useIsMobile } from '../lib/viewport'
import { loadStreak, storeStreak } from '../streak'
import { DMConcept, DMFeedback, DMFields, DMHeading, dmTypeNames } from './DMQuestion'
import { Sheet } from './Sheet'
import { TopicPicker, studyTopics } from './TopicPicker'

export interface DMDraft { answers: DMAnswers; revealed: string[]; attemptId?: string }
export function loadDMDraft(id: string): DMDraft {
  const draft = readSaved<DMDraft>(dmDraftKey(id))
  return draft && draft.answers && typeof draft.answers === 'object' && !Array.isArray(draft.answers) && Object.values(draft.answers).every(v => typeof v === 'string') && Array.isArray(draft.revealed) && draft.revealed.every(v => typeof v === 'string') && (draft.attemptId === undefined || typeof draft.attemptId === 'string') ? draft : { answers: {}, revealed: [] }
}

function PracticeQuestion({ question: q, attempts, record, onLearn }: { question: typeof dmPracticeQuestions[number]; attempts: Attempt[]; record: (a: Attempt) => void; onLearn: (topic: string) => void }) {
  const [draft, setDraft] = useState(() => loadDMDraft(q.id)), [storageOk, setStorageOk] = useState(true)
  const [fresh, setFresh] = useState(false), [announcement, setAnnouncement] = useState('')
  const [streak, setStreak] = useState(loadStreak)
  const attempt = attempts.find(a => a.id === draft.attemptId)
  const submitted = !!attempt
  useEffect(() => { setStorageOk(save(dmDraftKey(q.id), draft)) }, [q.id, draft])
  useEffect(() => { if (!fresh) return; const timeout = setTimeout(() => setFresh(false), 1400); return () => clearTimeout(timeout) }, [fresh])
  function check() {
    if (submitted) return
    const next = dmAttempt(q, draft.answers, 'practice', undefined, draft.revealed)
    record(next); setDraft({ ...draft, attemptId: next.id }); setFresh(true)
    if (q.type !== 'steps') {
      const complete = Object.values(next.results).every(Boolean), count = complete ? Math.min(Number.MAX_SAFE_INTEGER, loadStreak() + 1) : 0
      storeStreak(count); setStreak(count)
      setAnnouncement(`${next.score?.toFixed(2)} of ${q.marks} marks. ${complete ? `${count} fully correct in a row.` : 'Review your answers below.'}`)
    } else setAnnouncement('Answer submitted. Compare the model and self-mark each rubric step below.')
    requestAnimationFrame(() => document.querySelector<HTMLElement>('.dm-practice-report')?.focus())
  }
  function reveal(keys: string[], values: DMAnswers) {
    setDraft({ ...draft, answers: { ...draft.answers, ...values }, revealed: [...new Set([...draft.revealed, ...keys])] })
    setAnnouncement('Revealed parts earn no marks in this attempt.')
  }
  function assess(answers: DMAnswers) {
    setDraft({ ...draft, answers })
    record(dmAttempt(q, answers, 'practice', attempt?.id, draft.revealed))
  }
  return <section className="dm-practice-question">
    <DMHeading question={q}/>
    {!storageOk && <p className="notice error" role="status">Browser storage is unavailable or full. Your current answer remains usable, but may not survive leaving this question.</p>}
    <DMFields question={q} answers={draft.answers} onChange={answers => setDraft({ ...draft, answers })} locked={submitted} checked={submitted} revealed={draft.revealed} onReveal={reveal}/>
    <div className="question-actions dm-question-actions">
      {submitted ? <button type="button" className="button primary" onClick={() => { setDraft({ answers: {}, revealed: [] }); setFresh(false); setAnnouncement('Fresh attempt started.'); requestAnimationFrame(() => document.querySelector<HTMLElement>('.dm-practice-question .question-heading')?.focus()) }}>Try again</button> : <><button type="button" className="button primary" onClick={check}>{q.type === 'steps' ? 'Submit and self-mark' : 'Check answers'}</button>{q.type !== 'steps' && <button type="button" className="button secondary" onClick={() => { const model = dmModelAnswers(q); reveal(Object.keys(markDM(q, model)), model) }}>Reveal all</button>}</>}
      <span className="small muted">{q.type === 'steps' ? 'Proof marks are self-assessed.' : `${streak} fully correct in a row`}</span>
    </div>
    <p role="status" className="small dm-status">{announcement}</p>
    {submitted ? <div className={`dm-practice-report${fresh && q.type !== 'steps' && Object.values(attempt.results).some(v => !v) ? ' wrong-shake' : ''}`} tabIndex={-1}><DMFeedback question={q} answers={draft.answers} revealed={draft.revealed} onAssess={assess} onLearn={onLearn} celebrate={fresh} burst={attempt.id}/></div> : <DMConcept question={q} onLearn={onLearn}/>}
  </section>
}

export function DMPractice({ topic: initialTopic, attempts, record, onLearn }: { topic: string; attempts: Attempt[]; record: (a: Attempt) => void; onLearn: (topic: string) => void }) {
  const [topic, setTopic] = useState(['core', 'past', 'extra', 'slot1'].includes(initialTopic) ? 'all' : initialTopic)
  const [priority, setPriority] = useState(['core', 'past', 'extra'].includes(initialTopic) ? initialTopic : 'all')
  const [source, setSource] = useState(initialTopic === 'slot1' ? 'slot1' : 'all'), [type, setType] = useState('all'), [mistakes, setMistakes] = useState(false)
  const [selected, setSelected] = useState(''), [pickerOpen, setPickerOpen] = useState(false)
  const mobile = useIsMobile()
  useEffect(() => { setTopic(['core', 'past', 'extra', 'slot1'].includes(initialTopic) ? 'all' : initialTopic); setPriority(['core', 'past', 'extra'].includes(initialTopic) ? initialTopic : 'all'); setSource(initialTopic === 'slot1' ? 'slot1' : 'all'); setSelected('') }, [initialTopic])
  const subject = subjects.find(s => s.id === 'dm')!, latest = new Map(attempts.map(a => [a.questionId, a]))
  const eligible = dmPracticeQuestions.filter(q => (topic === 'all' || q.topic === topic) && (priority === 'all' || q.priority === priority) && (source === 'all' || source === 'slot1' ? source !== 'slot1' || isSlot1(q) : q.pool === source) && (type === 'all' || q.type === type) && (!mistakes || latest.has(q.id) && (latest.get(q.id)!.score || 0) < q.marks))
  const groups = topicGroups(eligible, studyTopics(subject)), pool = groups.flatMap(g => g.questions)
  const question = pool.find(q => q.id === selected) || pool[0], index = pool.findIndex(q => q.id === question?.id)
  function choose(id: string) { setSelected(id); setPickerOpen(false); requestAnimationFrame(() => { document.querySelector<HTMLElement>('.dm-practice-question .question-heading')?.focus(); document.querySelector('.dm-practice-question')?.scrollIntoView({ block: 'start' }) }) }
  const picker = <TopicPicker subject={subject} pool={pool} current={question} attempts={attempts} onSelect={choose} onLearn={id => { setPickerOpen(false); onLearn(id) }}/>
  return <>
    <div className="page-heading"><div><h1>DM Practice</h1><p className="muted">Type the reasoning, check the result, then repair each missed step.</p></div><span className="tag" role="status">{pool.length} matching questions</span></div>
    <details className="filter-details" open={!mobile || undefined}><summary>Filters · {source === 'slot1' ? 'Slot 1 pattern' : topic === 'all' ? 'All topics' : subject.topics.find(t => t.id === topic)?.name} · {priority === 'all' ? 'Core first' : priority}</summary><div className="filter-bar">
      <label>Topic<select value={topic} onChange={e => { setTopic(e.target.value); setSelected('') }}><option value="all">All topics</option>{studyTopics(subject).map(t => <option key={t.id} value={t.id}>{t.name}</option>)}</select></label>
      <label>Priority<select value={priority} onChange={e => { setPriority(e.target.value); setSelected('') }}><option value="all">All · Core first</option><option value="core">Core</option><option value="past">Past</option><option value="extra">Extra</option></select></label>
      <label>Question type<select value={type} onChange={e => { setType(e.target.value); setSelected('') }}><option value="all">All types</option>{Object.entries(dmTypeNames).map(([key, name]) => <option key={key} value={key}>{name}</option>)}</select></label>
      <label>Source<select value={source} onChange={e => { setSource(e.target.value); setSelected('') }}><option value="all">All sources</option><option value="past">Past papers</option><option value="original">Original practice</option><option value="slot1">Slot 1 exam pattern</option></select></label>
      <label className="check-label"><input type="checkbox" checked={mistakes} onChange={e => setMistakes(e.target.checked)}/>Only mistakes</label>
    </div></details>
    {!question ? <section className="panel empty-state"><h2>No matching questions</h2><p>{source === 'slot1' ? 'Slot 1 practice will appear here automatically when its manifest entry is available. You can practise the matching core topics now.' : 'Change a filter, or browse all questions.'}</p><button type="button" className="button primary" onClick={() => { setTopic('all'); setPriority('all'); setSource('all'); setType('all'); setMistakes(false) }}>Browse all questions</button></section> : <div className="practice-layout dm-practice-layout">
      <aside className="question-nav panel"><details className="question-picker"><summary>Topics and progress · {groups.length} topics</summary>{picker}</details></aside>
      <div className="question-workspace"><div className="question-bar"><button type="button" className="question-bar-step" aria-label="Previous question" disabled={index <= 0} onClick={() => choose(pool[index - 1].id)}>‹</button><button type="button" className="question-bar-position" aria-haspopup="dialog" onClick={() => setPickerOpen(true)}><strong>Question {index + 1} of {pool.length}</strong><span className="small muted">Topics and progress ▾</span></button><button type="button" className="question-bar-step" aria-label="Next question" disabled={index >= pool.length - 1} onClick={() => choose(pool[index + 1].id)}>›</button></div>
        <Sheet title="DM topics and questions" open={pickerOpen} onClose={() => setPickerOpen(false)}>{picker}</Sheet>
        <PracticeQuestion key={question.id} question={question} attempts={attempts} record={record} onLearn={onLearn}/>
      </div>
    </div>}
  </>
}
