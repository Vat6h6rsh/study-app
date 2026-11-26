import { useEffect, useRef, useState } from 'react'
import { dmMockPapers } from '../data/dm'
import type { DMAnswers } from '../lib/dm'
import { DM_EXAM_KEY, dmAttempt, dmScore } from '../lib/dm'
import type { Attempt } from '../lib/storage'
import { readSaved, remove, save } from '../lib/storage'
import { ConfirmDialog } from './ConfirmDialog'
import { Confetti, ExamScoreRing } from './Delight'
import { DMFeedback, DMFields, DMHeading, dmScoreText } from './DMQuestion'

export interface DMExamSession { paperId: string; startedAt: number; deadline: number; index: number; answers: Record<string, DMAnswers>; submitted: boolean; finishedAt?: number }
export function loadDMExam(): DMExamSession | null {
  const s = readSaved<DMExamSession>(DM_EXAM_KEY), paper = dmMockPapers.find(p => p.id === s?.paperId)
  return s && paper && Number.isFinite(s.startedAt) && Number.isFinite(s.deadline) && s.deadline > s.startedAt && Number.isInteger(s.index) && s.index >= 0 && s.index < paper.questions.length && typeof s.submitted === 'boolean' && s.answers && typeof s.answers === 'object' && !Array.isArray(s.answers) && Object.values(s.answers).every(a => a && typeof a === 'object' && !Array.isArray(a) && Object.values(a).every(v => typeof v === 'string')) && (s.finishedAt === undefined || Number.isFinite(s.finishedAt)) ? s : null
}
const timeText = (seconds: number) => `${Math.floor(seconds / 3600)}:${String(Math.floor(seconds / 60) % 60).padStart(2, '0')}:${String(Math.floor(seconds) % 60).padStart(2, '0')}`

export function DMExams({ visible, record, onLearn, resetKey = 0, onLiveChange }: { visible: boolean; record: (a: Attempt) => void; onLearn: (topic: string) => void; resetKey?: number; onLiveChange?: (live: boolean) => void }) {
  const [session, setSession] = useState(loadDMExam), [now, setNow] = useState(Date.now), [confirm, setConfirm] = useState(false), [storageOk, setStorageOk] = useState(true), [status, setStatus] = useState(''), [fresh, setFresh] = useState(false)
  const previousReset = useRef(resetKey), finished = useRef(new Set<number>())
  useEffect(() => { if (previousReset.current !== resetKey) { setSession(null); remove(DM_EXAM_KEY); previousReset.current = resetKey; setFresh(false) } }, [resetKey])
  useEffect(() => { if (session) setStorageOk(save(DM_EXAM_KEY, session)) }, [session])
  useEffect(() => { onLiveChange?.(!!session && !session.submitted) }, [session?.submitted, session?.startedAt, onLiveChange])
  useEffect(() => { if (!fresh) return; const timer = setTimeout(() => setFresh(false), 1400); return () => clearTimeout(timer) }, [fresh])
  function finish(snapshot: DMExamSession) {
    if (snapshot.submitted || finished.current.has(snapshot.startedAt)) return
    finished.current.add(snapshot.startedAt)
    const next = { ...snapshot, submitted: true, finishedAt: Math.min(Date.now(), snapshot.deadline) }
    setSession(next); setConfirm(false); setFresh(true)
    dmMockPapers.find(p => p.id === snapshot.paperId)!.questions.forEach(q => record(dmAttempt(q, snapshot.answers[q.id] || {}, 'exam', `${snapshot.startedAt}-${q.id}`)))
    setStatus(Date.now() >= snapshot.deadline ? 'Time is up. Your paper was submitted automatically.' : 'Mock submitted. Auto-checked answers are scored; self-mark the written proofs below.')
    requestAnimationFrame(() => document.querySelector<HTMLElement>('.dm-exam-summary')?.focus())
  }
  useEffect(() => {
    if (!session || session.submitted) return
    const tick = () => { setNow(Date.now()); if (Date.now() >= session.deadline) finish(session) }
    const timer = setInterval(tick, 1000); tick(); return () => clearInterval(timer)
  }, [session])
  if (!visible) return null
  if (!session) return <>
    <div className="page-heading"><div><h1>DM mock exams</h1><p className="muted">50 marks · typed steps · answers and rubrics open after submission.</p></div></div>
    <div className="mock-intro"><div><h2>Rehearse the whole paper</h2><p>The timer uses the paper’s practice budget (150 minutes if unspecified). It continues across navigation and reloads. No reveal or live marking during the mock. At zero, your saved answers submit automatically.</p></div></div>
    <div className="paper-grid">{dmMockPapers.map((paper, i) => <section className="paper-card" key={paper.id} data-dm-paper={paper.id}><span className="paper-number">Mock {i + 1} · {paper.durationMinutes || 150} minutes · 50 marks</span><h2>{paper.title}</h2><ul className="small muted">{paper.instructions.map((line, j) => <li key={j}>{line}</li>)}</ul><button type="button" className="button primary full" onClick={() => {
      const startedAt = Date.now(); setNow(startedAt); setSession({ paperId: paper.id, startedAt, deadline: startedAt + (paper.durationMinutes || 150) * 60000, index: 0, answers: {}, submitted: false }); setStatus(''); setFresh(false)
    }}>Start mock {i + 1}</button></section>)}</div>
  </>
  const paper = dmMockPapers.find(p => p.id === session.paperId)!, qs = paper.questions, q = qs[session.index]
  const remaining = Math.max(0, Math.ceil((session.deadline - now) / 1000)), score = qs.reduce((sum, question) => sum + dmScore(question, session.answers[question.id] || {}), 0)
  const pending = qs.filter(question => question.type === 'steps' && session.answers[question.id]?.rubricReviewed !== 'true' && question.rubric.some(r => session.answers[question.id]?.[`rubric:${r.step}`] === undefined)).length
  const filled = qs.filter(question => Object.entries(session.answers[question.id] || {}).some(([key, value]) => key !== 'propertiesConfirmed' && value.trim())).length
  function answer(questionId: string, values: DMAnswers) {
    if (!session) return
    if (!session.submitted && Date.now() >= session.deadline) { finish(session); return }
    setSession({ ...session, answers: { ...session.answers, [questionId]: values } })
    if (session.submitted) { const question = qs.find(part => part.id === questionId)!; record(dmAttempt(question, values, 'exam', `${session.startedAt}-${question.id}`)) }
  }
  function go(index: number) { if (Date.now() >= session!.deadline) { finish(session!); return } setSession({ ...session!, index }); requestAnimationFrame(() => document.querySelector<HTMLElement>('.dm-exam-active .question-heading')?.focus()) }
  return <>
    <div className="page-heading"><div><p className="eyebrow">{paper.title}</p><h1>{session.submitted ? 'DM mock report' : 'DM mock in progress'}</h1><p className="muted">{session.submitted ? 'Auto-checked parts + self-assessed proof rubrics · total out of 50' : `${qs.length} parts · 50 marks · type every step`}</p></div>{!session.submitted && <div className={`timer${remaining < 900 ? ' time-low' : ''}`} role="timer" aria-label={`${remaining} seconds remaining`}><span>Time remaining</span><strong>{timeText(remaining)}</strong></div>}</div>
    {!storageOk && <p role="status" className="notice error">Browser storage is unavailable or full. Your current paper remains open, but may not survive a reload.</p>}
    <p role="status" className="dm-status">{status}</p>
    {session.submitted ? <>
      {fresh && score >= 40 && <Confetti burst={`dm-${session.startedAt}`}/>}
      <div className="exam-summary dm-exam-summary" tabIndex={-1} role="group" aria-label="DM mock score"><ExamScoreRing percent={score * 2}><span className="exam-score">{dmScoreText(score)}<small> / 50</small></span></ExamScoreRing><div><h2>{pending ? 'Provisional total' : 'Assessed total'} · {dmScoreText(score * 2)}%</h2><p>{pending ? `${pending} written parts still need rubric assessment. Unassessed steps currently earn zero.` : 'Proof marks are self-assessed using the practice rubric.'}</p><p>Time taken: {timeText(Math.max(0, ((session.finishedAt || session.deadline) - session.startedAt) / 1000))}.</p></div></div>
      <div className="question-actions"><button type="button" className="button secondary" onClick={() => { setSession(null); remove(DM_EXAM_KEY); setStatus('') }}>Back to papers</button></div>
      <div className="exam-reports">{qs.map((question, i) => <section className="panel exam-question-report" key={question.id}><p className="eyebrow">Part {i + 1} of {qs.length}</p><DMHeading question={question}/><DMFields question={question} answers={session.answers[question.id] || {}} locked checked onChange={() => {}}/><DMFeedback question={question} answers={session.answers[question.id] || {}} onAssess={values => answer(question.id, values)} onLearn={onLearn}/></section>)}</div>
    </> : <>
      <nav className="dm-exam-tabs" aria-label="DM exam parts">{qs.map((part, i) => <button type="button" key={part.id} className={`button ${session.index === i ? 'primary' : 'secondary'}`} aria-current={session.index === i ? 'step' : undefined} onClick={() => go(i)}>Part {i + 1} · {part.marks} marks</button>)}</nav>
      <p className="small muted">{filled}/{qs.length} parts contain an answer. Revisit incomplete parts before submitting.</p>
      <p role="status" className="sr-only">{remaining <= 60 ? 'One minute or less remains. Your paper will submit automatically.' : remaining <= 300 ? 'Five minutes or less remain.' : remaining <= 900 ? 'Fifteen minutes or less remain.' : ''}</p>
      <section className="exam-active dm-exam-active"><DMHeading question={q}/><DMFields key={q.id} question={q} answers={session.answers[q.id] || {}} onChange={values => answer(q.id, values)} exam/></section>
      <div className="question-actions"><div><button type="button" className="button secondary" disabled={session.index === 0} onClick={() => go(session.index - 1)}>Previous part</button><button type="button" className="button secondary" disabled={session.index >= qs.length - 1} onClick={() => go(session.index + 1)}>Next part</button></div><button type="button" className="button primary" onClick={() => setConfirm(true)}>Submit exam</button></div>
      {confirm && <ConfirmDialog title="Submit DM mock?" action="Submit and mark" onConfirm={() => finish(session)} onClose={() => setConfirm(false)}><p>{qs.length - filled} parts have no answer. Submission locks your answers and opens the model solutions and proof rubrics.</p></ConfirmDialog>}
    </>}
  </>
}
