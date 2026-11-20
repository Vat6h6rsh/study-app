import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { ConfirmDialog } from './components/ConfirmDialog'
import { StudyLink } from './components/StudyLink'
import { Sidebar } from './components/Sidebar'
import { QuestionBrief } from './components/QuestionBrief'
import { Confetti, ExamScoreRing } from './components/Delight'
import { loadStreak, storeStreak, STREAK_KEY } from './streak'
import { topicTone } from './topicColors'
import { LessonBoundary } from './components/LessonBoundary'
import type { CodeQuestion as Question, Subject } from './data/types'
import { mockPapers, codeQuestionById as questionById, codeQuestions as questions, subjects, questions as allQuestions, practiceQuestions as allPracticeQuestions } from './data'
import { CodeQuestion } from './components/CodeQuestion'
import { Report } from './components/Report'
import { Scratchpad, defaultDraft, scratchDraft } from './components/Scratchpad'
import type { ScratchDraft } from './components/Scratchpad'
import { mark } from './lib/grading'
import { accuracy, EXAM_KEY, latestMistakes, loadProgress, PROGRESS_KEY, readSaved, remove, save } from './lib/storage'
import type { Attempt } from './lib/storage'

import { WPPractice } from './components/WPQuestion'
import { WPExams } from './components/WPExams'
import { SUBJECT_KEY, WP_EXAM_KEY, wpDraftKey } from './lib/wp'

const Learn = lazy(() => import('./components/Learn').then(module => ({ default: module.Learn })))

const formatCount = new Intl.NumberFormat().format

type Page = 'home' | 'learn' | 'practice' | 'exam' | 'scratch'
interface ExamSession { paperId: string; startedAt: number; deadline: number; index: number; answers: Record<string, Record<string, string>>; submitted: boolean; attemptIds: string[] }
const newId = () => globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`
const makeAttempt = (q: Question, answers: Record<string, string>, mode: 'practice' | 'exam'): Attempt => ({ id: newId(), questionId: q.id, subject: q.subject, topic: q.topic, at: new Date().toISOString(), mode, answers: { ...answers }, results: mark(q, answers), overrides: [] })
function loadExam(): ExamSession | null {
  const s = readSaved<ExamSession>(EXAM_KEY)
  if (!s || !mockPapers.some(p => p.id === s.paperId && p.subject === 'itp') || !Number.isFinite(s.startedAt) || !Number.isFinite(s.deadline) || typeof s.submitted !== 'boolean' || !Number.isInteger(s.index) || s.index < 0 || s.index > 4 || !s.answers || !Array.isArray(s.attemptIds)) return null
  if (Object.values(s.answers).some(a => !a || typeof a !== 'object' || Object.values(a).some(v => typeof v !== 'string'))) return null
  return s
}
function locationState() {
  const params = new URLSearchParams(typeof window === 'undefined' ? '' : window.location.search)
  const value = params.get('view')
  return { page: (['home', 'learn', 'practice', 'exam', 'scratch'].includes(value || '') ? value : 'home') as Page, topic: params.get('topic') }
}
function focusQuestion() {
  requestAnimationFrame(() => [...document.querySelectorAll<HTMLElement>('#main .question-heading, #main .exam-summary')].find(element => !element.closest('[hidden]'))?.focus())
}
function App() {
  const [page, setPageState] = useState<Page>(() => locationState().page)
  const [lesson, setLesson] = useState(() => locationState().topic || 'strategy')
  const [practiceOpened, setPracticeOpened] = useState(() => locationState().page === 'practice')
  const main = useRef<HTMLElement>(null)
  const previousPage = useRef(page)
  const [announcement, setAnnouncement] = useState('')
  function setPage(next: Page, topic?: string) {
    const url = new URL(window.location.href)
    url.search = new URLSearchParams({ view: next, ...(topic ? { topic } : {}) }).toString()
    url.hash = ''
    if (url.href !== window.location.href) window.history.pushState(null, '', url)
    setPageState(next)
  }
  useEffect(() => {
    document.title = `${({ home: 'Overview', learn: 'Learn', practice: 'Practice', exam: 'Mock exams', scratch: 'C scratchpad' })[page]} · Examdesk`
    if (previousPage.current === page) return
    previousPage.current = page
    main.current?.focus()
    main.current?.scrollIntoView({ block: 'start' })
  }, [page])
  const [subjectId, setSubjectId] = useState(() => { const saved = readSaved<string>(SUBJECT_KEY); return subjects.some(s => s.id === saved && s.active) ? saved! : 'itp' })
  const subject = subjects.find(s => s.id === subjectId)!
  const [progress, setProgress] = useState(loadProgress)
  const [storageFailed, setStorageFailed] = useState(false)
  const [exam, setExam] = useState<ExamSession | null>(loadExam)
  const [filter, setFilter] = useState(() => locationState().page === 'practice' ? locationState().topic || 'all' : 'all')
  const [practiceKey, setPracticeKey] = useState(0)
  const [draft, setDraft] = useState<ScratchDraft>(defaultDraft)
  const [resetPrompt, setResetPrompt] = useState(false)
  const [examFeedback, setExamFeedback] = useState<{ id: number; celebrate: boolean } | null>(null)
  useEffect(() => { if (!examFeedback) return; const timer = window.setTimeout(() => setExamFeedback(null), 1400); return () => clearTimeout(timer) }, [examFeedback])
  const submittedExams = useRef(new Set<number>())
  useEffect(() => {
    const back = () => {
      const next = locationState()
      if (next.page === 'practice') { setPracticeOpened(true); setFilter(next.topic || 'all') }
      if (next.page === 'learn' && next.topic) setLesson(next.topic)
      setPageState(next.page)
    }
    window.addEventListener('popstate', back)
    return () => window.removeEventListener('popstate', back)
  }, [])
  useEffect(() => { if (!save(PROGRESS_KEY, progress)) setStorageFailed(true) }, [progress])
  useEffect(() => { if (exam && !save(EXAM_KEY, exam)) setStorageFailed(true) }, [exam])
  useEffect(() => { if (!save(SUBJECT_KEY, subjectId)) setStorageFailed(true); if (subjectId === 'wp' && page === 'scratch') setPage('home') }, [subjectId, page])
  const attempts = progress.attempts.filter(a => a.subject === subjectId)
  const mistakes = latestMistakes(attempts)
  function openPractice(topic = 'all') { setFilter(topic); setPracticeOpened(true); setPage('practice', topic) }
  function openLearn(topic = 'strategy') { setLesson(topic); setPage('learn', topic) }
  function record(attempt: Attempt) { setProgress(p => ({ ...p, attempts: p.attempts.some(a => a.id === attempt.id) ? p.attempts.map(a => a.id === attempt.id ? attempt : a) : [...p.attempts, attempt] })) }
  function override(attemptId: string, blankId: string) {
    setProgress(p => ({ ...p, attempts: p.attempts.map(a => a.id === attemptId ? { ...a, results: { ...a.results, [blankId]: true }, overrides: [...new Set([...a.overrides, blankId])] } : a) }))
  }
  function runAnswers(q: Question, answers: Record<string, string>) { setDraft(scratchDraft(q, answers)); setPage('scratch') }
  function finishExam(session: ExamSession) {
    if (session.submitted || submittedExams.current.has(session.startedAt)) return
    submittedExams.current.add(session.startedAt)
    const paper = mockPapers.find(p => p.id === session.paperId)!
    const results = paper.questionIds.map(id => makeAttempt(questionById.get(id)!, session.answers[id] || {}, 'exam'))
    setProgress(p => ({ ...p, attempts: [...p.attempts, ...results] }))
    setExam({ ...session, submitted: true, attemptIds: results.map(a => a.id) })
    const score = accuracy(results)
    setExamFeedback({ id: session.startedAt, celebrate: score.total > 0 && score.correct / score.total >= .8 })
    setAnnouncement(Date.now() >= session.deadline ? 'Time is up. Your mock exam was submitted and the report is ready.' : 'Mock exam submitted. Your marked report is ready.')
  }
  // A wall-clock deadline survives reloads, background tabs and navigation away from the exam.
  useEffect(() => {
    if (!exam || exam.submitted) return
    const check = () => { if (Date.now() >= exam.deadline) finishExam(exam) }
    const interval = window.setInterval(check, 1000)
    check()
    return () => window.clearInterval(interval)
  }, [exam])
  function resetProgress() {
    setProgress({ version: 1, attempts: [] }); setExam(null); setResetPrompt(false)
    remove(STREAK_KEY); remove(WP_EXAM_KEY); allQuestions.filter(q => q.subject === 'wp').forEach(q => remove(wpDraftKey(q.id))); setExamFeedback(null); setStorageFailed(!remove(EXAM_KEY)); setPracticeKey(k => k + 1); setAnnouncement('Saved progress cleared.')
  }
  return <div className="app-shell">
    {examFeedback?.celebrate && <Confetti key={examFeedback.id} burst={String(examFeedback.id)}/>}
    <a className="skip-link" href="#main">Skip to content</a>
    <Sidebar onHome={() => setPage('home')} onReset={() => setResetPrompt(true)}>
      <div className="sidebar-section-label">Workspace</div>
      <nav aria-label="Main navigation">{([['home', 'Overview'], ['learn', 'Learn'], ['practice', 'Practice'], ['exam', 'Mock exams'], ['scratch', 'C scratchpad']] as [Page, string][]).filter(([id]) => id !== 'scratch' || subjectId === 'itp').map(([id, title]) => <StudyLink key={id} view={id} title={`${title}${id === 'exam' && exam && !exam.submitted ? ' — In progress' : ''}`} className={`nav-item ${page === id ? 'active' : ''}`} current={page === id} onNavigate={() => { if (id === 'practice') setPracticeOpened(true); setPage(id) }}><span className="rail-symbol nav-symbol" data-nav={id} aria-hidden="true">{({ home: '\u25c8', learn: '\u25a4', practice: '\u270e', exam: '\u25f7', scratch: '\u2318' })[id]}</span><span className="nav-copy">{title}{id === 'exam' && exam && !exam.submitted && <span className="exam-live-label">In progress</span>}</span></StudyLink>)}</nav>
      <div className="sidebar-section-label subject-label">Subjects</div>
      <div className="subject-menu">{subjects.map(s => <button type="button" key={s.id} disabled={!s.active} aria-pressed={subjectId === s.id} className={`subject-option ${s.id === subjectId ? 'selected' : ''}`} onClick={() => { setSubjectId(s.id); setLesson('strategy'); setFilter('all'); setPage('home') }}><span className="subject-initial">{s.shortName}</span><span>{s.shortName === 'ITP' ? 'C Programming' : s.name}<small>{s.active ? 'Your active subject' : 'Coming soon'}</small></span>{s.active && <span className="subject-check">✓</span>}</button>)}</div>
    </Sidebar>
    {resetPrompt && <ConfirmDialog title="Clear saved progress?" action="Clear progress" onConfirm={resetProgress} onClose={() => setResetPrompt(false)}><p>This clears all attempts and the saved exam in this browser. This cannot be undone.</p></ConfirmDialog>}
    <div className="workspace"><header className="topbar"><span>{subject.code} <span className="topbar-divider">/</span> <strong>{subject.name}</strong></span><span className="local-badge"><span/> Local workspace</span></header>
    <main id="main" ref={main} tabIndex={-1}>
      <div className="sr-only" role="status">{announcement}</div>
      {exam?.submitted && page !== 'exam' && announcement.includes('exam') && <div className="notice">{announcement} <StudyLink view="exam" onNavigate={() => setPage('exam')}>View report</StudyLink></div>}
      {storageFailed && <div className="notice error" role="status">Browser storage is unavailable or full. You can keep practising, but changes may not survive a reload.</div>}
      {page === 'home' && <Home subject={subject} attempts={attempts} onPractice={openPractice} onExam={() => setPage('exam')} onLearn={() => openLearn()} />}
      {page === 'learn' && <LessonBoundary><Suspense fallback={<div className="notes-loading" aria-busy="true"><p role="status">Opening your study notes…</p></div>}><Learn key={subjectId} subject={subjectId} selected={lesson} onSelect={id => { setLesson(id); setPage('learn', id) }} onPractice={openPractice} onRun={(code, title) => { setDraft({ code, stdin: '', title }); setPage('scratch') }} /></Suspense></LessonBoundary>}
      {practiceOpened && <div hidden={page !== 'practice'}>{subjectId === 'wp' ? <WPPractice key={`wp-${practiceKey}`} topic={filter} attempts={attempts} record={record} onLearn={openLearn}/> : <Practice key={`${subjectId}-${practiceKey}`} subject={subject} initialFilter={filter} attempts={attempts} mistakes={mistakes.map(a => a.questionId)} record={record} override={override} runAnswers={runAnswers} onLearn={openLearn} />}</div>}
      {page === 'exam' && subjectId === 'itp' && <Exams freshResult={examFeedback?.id === exam?.startedAt && !!examFeedback} subject={subject} session={exam} update={setExam} finish={finishExam} attempts={attempts} override={override} onLearn={openLearn} />}
      <WPExams visible={page === 'exam' && subjectId === 'wp'} record={record} onLearn={openLearn} resetKey={practiceKey}/>
      <div hidden={page !== 'scratch' || subjectId !== 'itp'}><Scratchpad draft={draft} onChange={setDraft} /></div>
      <footer className="page-footer"><span>{subjectId === 'wp' ? 'One clear sentence at a time.' : 'One blank at a time.'}</span><span>BITS · Exam practice</span></footer>
    </main></div>
  </div>
}

function Home({ subject, attempts, onPractice, onExam, onLearn }: { subject: Subject; attempts: Attempt[]; onPractice: (topic?: string) => void; onExam: () => void; onLearn: () => void }) {
  const pool = allPracticeQuestions.filter(q => q.subject === subject.id)
  const wp = subject.id === 'wp'
  const stats = accuracy(attempts)
  const covered = new Set(attempts.map(a => a.questionId)).size
  const mistakes = latestMistakes(attempts)
  const topicStats = subject.topics.map(topic => ({ ...topic, ...accuracy(attempts.filter(a => a.topic === topic.id)), count: pool.filter(q => q.topic === topic.id).length }))
  const weakest = topicStats.filter(t => t.total > 0).sort((a, b) => a.percent! - b.percent!).slice(0, 3)
  return <>
    <div className="page-heading"><div><h1>Overview</h1><p className="muted">Choose a topic to practise, or continue your study route.</p></div><span className="tag subject-tag">{wp ? 'WP / Writing Practice' : 'ITP / C programming'}</span></div>
    <section className="study-start"><div><h2>{wp ? 'Practise writing for the exam' : 'Practise C programming'}</h2><p>Past papers, targeted practice and timed mock exams.</p><div className="hero-actions"><StudyLink view="practice" className="button primary" onNavigate={() => onPractice()}>Start practising</StudyLink><StudyLink view="exam" className="text-button" onNavigate={onExam}>Take a mock exam</StudyLink></div></div><p className="exam-format">{wp ? 'Upcoming format: 5 questions · 9 typed parts · 50 marks. Assumed duration: 2 hours 30 minutes.' : 'Mock format: 5 programs · 50 blanks · 2 hours 30 minutes. One mark per blank.'}</p></section>
    <section className="learn-entry panel"><div><h2>{wp ? 'Prepare in exam question order.' : 'New to C? Start with Learn.'}</h2><p className="muted">{wp ? 'Task methods, templates, worked models and a phrase bank. Start with the new exam strategy.' : 'A two-day route from the basics to exam patterns, with clues, traps and worked blanks.'}</p></div><StudyLink view="learn" className="button secondary" onNavigate={onLearn}>Learn from zero</StudyLink></section>
    <div className="stat-grid"><Stat value={formatCount(covered)} label="Questions attempted" detail={`${pool.length} in your practice bank; submitted mocks also count`}/><Stat value={stats.percent === null ? 'Not started' : `${stats.percent}%`} label="Overall accuracy" detail={wp ? `${stats.correct.toFixed(1)} of ${stats.total} available marks (self / automatic)` : `${formatCount(stats.correct)} of ${formatCount(stats.total)} answers correct`}/><Stat value={formatCount(mistakes.length)} label="Questions to revisit" detail="Based on your latest attempts"/></div>
    <div className="dashboard-columns"><section><div className="section-heading"><div><h2>Your topics</h2><p className="muted small">Choose a topic and work through the patterns.</p></div><span className="small muted">{subject.topics.length} topics</span></div><div className="topics-grid">{topicStats.map(topic => <StudyLink view="practice" topic={topic.id} className="topic-card" data-tone={topicTone(topic.id)} key={topic.id} onNavigate={() => onPractice(topic.id)}><div className="topic-card-top"><span className={`topic-symbol ${topic.id}`} aria-hidden="true">{({ structs: '{ }', memory: 'mem', arrays: '[ ]', matrices: '2D', strings: '" "', files: 'file', pointers: '*p', loops: 'for', functions: 'f(x)', operators: '++', scope: 'var', essay: '1A', paraphrase: '1B', email: '2A', questionnaire: '2B', graph: '3A', summary: '3B', report: '4', abstracts: '5A', grammar: '5B', style: 'Aa' } as Record<string, string>)[topic.id]}</span><span className={`priority ${topic.priority === 'High' ? 'high' : ''}`}>{topic.priority} priority</span></div><h3>{topic.name}</h3><div className="topic-meta"><span>{topic.count} questions</span><span>{topic.percent === null ? 'Not started' : `${topic.percent}% accuracy`}</span></div><div className="progress-track"><span style={{ width: `${topic.percent ?? 0}%` }}/></div></StudyLink>)}</div></section>
    <aside className="dashboard-aside"><section className="panel weak-panel"><div className="section-heading"><h3>Where to focus</h3></div><p className="muted small">Your weakest topics rise to the top.</p>{weakest.length ? <div className="weak-list">{weakest.map((topic, i) => <StudyLink view="practice" topic={topic.id} data-tone={topicTone(topic.id)} key={topic.id} onNavigate={() => onPractice(topic.id)}><span className="weak-rank">{i + 1}</span><span>{topic.name}<small>{topic.total} answers marked</small></span><strong>{topic.percent}%</strong></StudyLink>)}</div> : <div className="empty-focus"><h4>Find your starting point</h4><p>Try a few questions. Your topic accuracy will appear here.</p></div>}<StudyLink view="practice" topic={weakest.length ? 'mistakes' : 'all'} className="button secondary full" onNavigate={() => onPractice(weakest.length ? 'mistakes' : 'all')}>{weakest.length ? <>Review my mistakes <span className="count-pill">{mistakes.length}</span></> : 'Start practising'}</StudyLink></section><section className="study-tip">{wp ? <><span className="eyebrow">Exam habit</span><h3>Read the task verb first.</h3><p>Write what is asked. Q2B needs exactly 4 open + 4 closed questions. Q3B needs a title and marked keywords. Q5A needs the sentence text.</p></> : <><span className="eyebrow">Exam habit</span><h3>Read the blank’s job first.</h3><p>Is it a type, an address, a condition, or a statement? Then check the surrounding punctuation.</p><div className="tip-code"><span>scanf</span>("%d", <b>&</b>value);</div></>}</section><section className="bank-note"><strong>Grounded in your papers</strong><p>{wp ? '38 tasks from five papers, with original wording and source charts. New practice covers all nine parts; drills build accuracy.' : '69 source sections, including answer notes and labelled repairs. 25 new completion programs and 10 output drills build fluency.'}</p><span>{wp ? '3 exclusive mocks · 50 marks each' : '3 exclusive mock papers · 150 blanks'}</span></section></aside></div>
  </>
}
function Stat({ value, label, detail }: { value: string; label: string; detail: string }) { return <div className="stat-card"><div><strong>{value}</strong><h3>{label}</h3><p>{detail}</p></div></div> }

interface PracticeProps { subject: Subject; initialFilter: string; attempts: Attempt[]; mistakes: string[]; record: (a: Attempt) => void; override: (a: string, b: string) => void; runAnswers: (q: Question, a: Record<string, string>) => void; onLearn: (topic: string) => void }
function Practice({ subject, initialFilter, attempts, mistakes, record, override, runAnswers, onLearn }: PracticeProps) {
  const [topic, setTopic] = useState(initialFilter)
  const [type, setType] = useState('all')
  const [source, setSource] = useState('all')
  const [selected, setSelected] = useState('')
  const [drafts, setDrafts] = useState<Record<string, { answers: Record<string, string>; attemptId: string | null }>>({})
  useEffect(() => { setTopic(initialFilter); setSelected('') }, [initialFilter])
  // Submitted mock questions can be reviewed, with their mock source clearly labelled.
  const available = questions.filter(q => q.pool !== 'mock' || attempts.some(a => a.questionId === q.id && a.mode === 'exam'))
  const pool = available.filter(q => q.subject === subject.id && (topic === 'all' || topic === 'mistakes' ? topic === 'all' || mistakes.includes(q.id) : q.topic === topic) && (type === 'all' || q.type === type) && (source === 'all' || q.pool === source))
  const question = pool.find(q => q.id === selected) || (selected && drafts[selected]?.attemptId ? questionById.get(selected) : null) || pool[0]
  const saved = drafts[question?.id] || { answers: {}, attemptId: null }
  const answers = saved.answers
  const attempt = attempts.find(a => a.id === saved.attemptId)
  const [notice, setNotice] = useState('')
  const [streak, setStreak] = useState(loadStreak)
  const [freshAttempt, setFreshAttempt] = useState<{ id: string; complete: boolean } | null>(null)
  useEffect(() => { if (!freshAttempt) return; const timer = window.setTimeout(() => setFreshAttempt(null), 1400); return () => clearTimeout(timer) }, [freshAttempt])
  const report = useRef<HTMLDivElement>(null)
  const previousAttempt = useRef<string | undefined>(undefined)
  useEffect(() => {
    if (attempt?.id && attempt.id !== previousAttempt.current) report.current?.focus()
    previousAttempt.current = attempt?.id
  }, [attempt?.id])
  function setAnswers(value: Record<string, string>) {
    if (question) setDrafts(d => ({ ...d, [question.id]: { answers: value, attemptId: saved.attemptId } }))
  }
  const currentIndex = pool.findIndex(q => q.id === question?.id)
  function choose(id: string) { setSelected(id); setNotice(''); focusQuestion() }
  function changeFilter(setter: (value: string) => void, value: string) { setter(value); setSelected(''); setNotice('') }
  function submit() { if (!question || attempt) return; const result = makeAttempt(question, answers, 'practice'); record(result);
    const values = Object.values(result.results)
    const correct = values.filter(Boolean).length
    const complete = values.length > 0 && correct === values.length
    const nextStreak = complete ? Math.min(Number.MAX_SAFE_INTEGER, streak + 1) : 0
    setStreak(nextStreak); storeStreak(nextStreak); setFreshAttempt({ id: result.id, complete })
    setSelected(question.id); setDrafts(d => ({ ...d, [question.id]: { answers: { ...answers }, attemptId: result.id } })); setNotice(`${complete ? `All ${values.length} correct! ${nextStreak} fully correct in a row.` : `${correct}/${values.length} correct. Fix the red ones.`} Review each answer below.`) }
  return <>
    <div className="page-heading"><div><h1>Practice</h1><p className="muted">Try the code, check each blank, and learn from the trace.</p></div><div className="practice-meta"><span className="streak-badge"><span aria-hidden="true">&#10022; </span>{streak} fully correct in a row</span><span className="tag" role="status">{pool.length} matching questions</span></div></div>
    <div className="filter-bar"><label>Topic<select value={topic} onChange={e => changeFilter(setTopic, e.target.value)}><option value="all">All topics</option><option value="mistakes">Only my mistakes</option>{subject.topics.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}</select></label><label>Question type<select value={type} onChange={e => changeFilter(setType, e.target.value)}><option value="all">All question types</option><option value="blanks">Fill in the blanks</option><option value="output">Predict the output</option></select></label><label>Question bank<select value={source} onChange={e => changeFilter(setSource, e.target.value)}><option value="all">All available questions</option><option value="past">Past papers</option><option value="original">Original practice</option><option value="mock">Submitted mock review</option></select></label></div>
    {!question ? <section className="panel empty-state"><h2>{topic === 'mistakes' ? 'A clean slate.' : 'No matching questions.'}</h2><p>{topic === 'mistakes' ? 'Questions with mistakes on your latest attempt appear here. Start practising to build your review list.' : 'Try a different topic or question type.'}</p><button type="button" className="button primary" onClick={() => { setTopic('all'); setType('all'); setSource('all'); choose('') }}>Browse all questions</button></section> : <div className="practice-layout"><aside className="question-nav panel"><details className="question-picker"><summary>Choose a question · {pool.length} available</summary><div className="section-heading"><h3>Question bank</h3><span className="small muted">{pool.length}</span></div><div className="question-list">{pool.map((q, i) => <button type="button" key={q.id} className={q.id === question.id ? 'selected' : ''} onClick={() => choose(q.id)} aria-current={q.id === question.id ? 'true' : undefined}><span>{String(i + 1).padStart(2, '0')}</span><span className="question-list-copy">{q.title}<small>{q.source} · {q.type === 'blanks' ? `${q.blanks.length} blanks` : 'Output'}</small></span>{mistakes.includes(q.id) && <span className="mistake-label">Revisit</span>}</button>)}</div></details></aside><section className="question-workspace" data-tone={topicTone(question.topic)}>
      <div className="question-heading" tabIndex={-1}><div className="question-tags"><span className="tag topic-chip">{subject.topics.find(t => t.id === question.topic)?.name}</span><span className="tag">{question.difficulty}</span><span className="tag">{question.source}</span>{question.verified && <span className="tag verified">GCC checked</span>}</div><h2>{question.title}</h2>{!attempt && <a className="text-button" href="#practice-submit">Go to check answers</a>}</div>
      <QuestionBrief question={question}/>
      <p className="question-lesson"><StudyLink view="learn" topic={question.topic} className="text-button" onNavigate={() => onLearn(question.topic)}>Learn this topic: concepts, clues and common traps</StudyLink><span className="small muted">Your answers stay here while you read. Return using Practice.</span></p>
      {question.stdin && <details className="sample-input"><summary>Sample standard input</summary><pre>{question.stdin}</pre></details>}
      {question.fixtures && <details className="sample-input"><summary>Input files (included when running)</summary>{Object.entries(question.fixtures).map(([name, contents]) => <div key={name}><h4>{name}</h4><pre>{contents}</pre></div>)}</details>}
      <CodeQuestion question={question} answers={answers} locked={!!attempt} results={attempt?.results} feedback={!!attempt && freshAttempt?.id === attempt.id} onChange={(id, value) => setAnswers({ ...answers, [id]: value })}/>
      {question.type === 'output' && <label className="output-answer">Your predicted output<textarea aria-describedby="output-help" autoCapitalize="off" autoComplete="off" rows={5} spellCheck={false} readOnly={!!attempt} value={answers.output || ''} onChange={e => setAnswers({ output: e.target.value })} placeholder="Type exactly what the program prints…"/><span id="output-help" className="small muted">Trailing spaces on each line are ignored. Leading spaces and final newlines matter.</span></label>}
      <div className="question-actions"><div>{!attempt ? <button type="button" id="practice-submit" className="button primary" onClick={submit}>Check {question.type === 'blanks' ? 'answers' : 'output'}</button> : <button type="button" className="button secondary" onClick={() => { setDrafts(d => ({ ...d, [question.id]: { answers: {}, attemptId: null } })); setNotice('New attempt ready.'); requestAnimationFrame(() => document.querySelector<HTMLInputElement>('#main .inline-blank input, #main .output-answer textarea')?.focus()) }}>Try again</button>}{question.runnable && <button type="button" className="button secondary" onClick={() => runAnswers(question, answers)}>Run with my answers</button>}</div><span className="question-step"><span className="small muted">{currentIndex >= 0 ? `Question ${currentIndex + 1} of ${pool.length}` : 'Marked question'}</span>{currentIndex < pool.length - 1 && <button type="button" className="text-button" onClick={() => choose(pool[currentIndex + 1].id)}>Next question</button>}{currentIndex === pool.length - 1 && <span className="small muted">Last matching question</span>}</span></div>
      {!attempt && <p className="small muted marking-note">One mark per blank · Whitespace and trailing semicolons ignored · Equivalent answers can be self-marked after submission.</p>}
      <p className="sr-only" role="status">{notice}</p><div ref={report} tabIndex={-1} role="group" aria-label="Marked answers and score">{attempt && <Report question={question} attempt={attempt} onOverride={override} onLearn={onLearn} celebrate={freshAttempt?.id === attempt.id && freshAttempt.complete} animate={freshAttempt?.id === attempt.id}/>}</div>
    </section></div>}
  </>
}

const clockText = (seconds: number) => { const n = Math.max(0, Math.floor(seconds)); return `${String(Math.floor(n / 3600)).padStart(2,'0')}:${String(Math.floor(n % 3600 / 60)).padStart(2,'0')}:${String(n % 60).padStart(2,'0')}` }
function Exams({ subject, session, update, finish, attempts, override, onLearn, freshResult = false }: { freshResult?: boolean; subject: Subject; session: ExamSession | null; update: (s: ExamSession | null) => void; finish: (s: ExamSession) => void; attempts: Attempt[]; override: (a: string, b: string) => void; onLearn: (topic: string) => void }) {
  const [now, setNow] = useState(() => Date.now())
  const [confirmSubmit, setConfirmSubmit] = useState(false)
  useEffect(() => { const interval = window.setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(interval) }, [])
  const paperId = session?.paperId, questionIndex = session?.index, submitted = session?.submitted
  useEffect(() => { if (paperId) focusQuestion() }, [paperId, questionIndex, submitted])
  function start(paperId: string) { const startedAt = Date.now(); setNow(startedAt); update({ paperId, startedAt, deadline: startedAt + 150 * 60000, index: 0, answers: {}, submitted: false, attemptIds: [] }); setConfirmSubmit(false) }
  if (!session) return <>
    <div className="page-heading"><div><h1>Mock exams</h1><p className="muted">Three distinct papers with questions reserved for mock exams.</p></div></div>
    <div className="mock-intro"><div><h3>5 programs · 50 blanks · 2 hours 30 minutes</h3><p>No feedback until you submit. Answers and the deadline are saved in this browser; the timer continues if you leave or reload. At zero, the exam submits automatically.</p></div></div>
    <div className="paper-grid">{mockPapers.filter(p => p.subject === subject.id).map((paper, i) => <section className="paper-card" key={paper.id}><span className="paper-number">Mock paper {i + 1}</span><h2>{paper.title}</h2><p>{paper.description}</p><div className="paper-meta"><span>5 questions</span><span>10 blanks each</span></div><button type="button" className="button secondary full" onClick={() => start(paper.id)}>Start paper {i + 1}</button></section>)}</div><p className="small muted">Each correct blank earns 1 mark. There is no partial credit within a blank.</p>
  </>
  const paper = mockPapers.find(p => p.id === session.paperId)!
  const paperQuestions = paper.questionIds.map(id => questionById.get(id)!)
  const q = paperQuestions[session.index]
  const answers = session.answers[q.id] || {}
  const examAttempts = session.attemptIds.map(id => attempts.find(a => a.id === id)).filter((a): a is Attempt => !!a)
  if (session.submitted) {
    const stats = accuracy(examAttempts)
    return <><div className="page-heading"><div><h1>Mock exam report</h1><p className="muted">{paper.title} · Your answers are marked below, one blank at a time.</p></div><button type="button" className="button secondary" onClick={() => { update(null); remove(EXAM_KEY) }}>Back to papers</button></div><div className="exam-summary" tabIndex={-1} role="group" aria-label="Mock exam score"><>{stats.total ? <ExamScoreRing percent={stats.percent ?? 0}><span className="exam-score">{stats.correct}<small> / 50</small></span></ExamScoreRing> : <span className="exam-score">Unavailable</span>}</><div><h2>{stats.percent === null ? 'Report unavailable' : `${stats.percent}% accuracy`}</h2><p>{stats.total ? 'Every marked answer is saved to your topic progress.' : 'This report is no longer in saved progress.'}</p><p className="small">Self-mark equivalent answers below.</p>{stats.percent !== null && <p className="exam-result-badge">{stats.correct / stats.total >= .8 ? 'Strong finish! You scored at least 80%.' : 'Every correction builds confidence for the next paper.'}</p>}</div></div><div className="exam-reports">{paperQuestions.map((question, i) => { const attempt = examAttempts.find(a => a.questionId === question.id); return <section className="panel exam-question-report" data-tone={topicTone(question.topic)} key={question.id}><span className="eyebrow">Question {i+1} · {subject.topics.find(t => t.id === question.topic)?.name}</span><h2>{question.title}</h2><QuestionBrief question={question}/><CodeQuestion question={question} answers={session.answers[question.id] || {}} locked results={attempt?.results} feedback={freshResult} onChange={() => {}}/>{attempt ? <Report question={question} attempt={attempt} onOverride={override} onLearn={onLearn} animate={freshResult}/> : <p className="notice">This marked result is no longer in saved progress. Your submitted answers are shown above.</p>}</section> })}</div></>
  }
  const remaining = Math.max(0, Math.ceil((session.deadline - now) / 1000))
  const elapsed = Math.max(0, (now - session.startedAt) / 1000)
  const suggested = Math.min(5, Math.floor(elapsed / 1800) + 1)
  const paceRemaining = Math.max(0, (session.startedAt + (session.index + 1) * 1800000 - now) / 1000)
  const filledCount = paperQuestions.reduce((sum, question) => sum + question.blanks.filter(b => session.answers[question.id]?.[b.id]?.trim()).length, 0)
  return <>
    <div className="page-heading"><div><p className="eyebrow">{paper.title}</p><h1>Mock exam in progress</h1><p className="muted">No feedback until submission. Each blank is worth one mark.</p></div><div className={`timer ${remaining < 900 ? 'time-low' : ''}`} role="timer" aria-label={`${remaining} seconds remaining`}><span>{remaining < 900 ? 'Less than 15 minutes remaining' : 'Time remaining'}</span><strong>{clockText(remaining)}</strong></div></div>
    <div className="exam-toolbar"><nav className="exam-tabs" aria-label="Exam questions">{paperQuestions.map((question, i) => <button type="button" key={question.id} className={session.index === i ? 'selected' : ''} aria-current={session.index === i ? 'step' : undefined} onClick={() => { update({ ...session, index: i }); setConfirmSubmit(false) }} aria-label={`Question ${i+1}, ${question.blanks.filter(b => session.answers[question.id]?.[b.id]?.trim()).length} of 10 filled`}><span>{i+1}</span><small>{question.blanks.filter(b => session.answers[question.id]?.[b.id]?.trim()).length}/10</small></button>)}</nav><span className="small muted">{filledCount}/50 blanks filled</span></div>
    <div className="pace-note"><span>30-minute pace · Suggested question: <strong>{suggested} of 5</strong></span><span>{paceRemaining > 0 ? `${clockText(paceRemaining)} until Q${session.index+1}’s pace checkpoint` : `Q${session.index+1}’s pace checkpoint has passed`}</span></div>
    <p className="sr-only" role="status">{remaining <= 60 ? 'One minute or less remains. Your exam will submit automatically.' : remaining <= 300 ? 'Five minutes or less remain.' : remaining <= 900 ? 'Fifteen minutes or less remain.' : ''}</p><section className="exam-active" data-tone={topicTone(q.topic)}><div className="question-heading" tabIndex={-1}><span className="tag topic-chip">Question {session.index+1} / 5 · {q.blanks.length} blanks</span><h2>{q.title}</h2><a className="text-button" href="#exam-submit">Go to submit exam</a></div><QuestionBrief question={q}/>{q.stdin && <details className="sample-input"><summary>Sample standard input</summary><pre>{q.stdin}</pre></details>}{q.fixtures && <details className="sample-input"><summary>Input file contents</summary>{Object.entries(q.fixtures).map(([name, contents]) => <div key={name}><h4>{name}</h4><pre>{contents}</pre></div>)}</details>}
    <CodeQuestion question={q} answers={answers} submitId="exam-submit" onChange={(id, value) => { if (Date.now() >= session.deadline) { finish(session); return } update({ ...session, answers: { ...session.answers, [q.id]: { ...answers, [id]: value } } }) }}/></section>
    <div className="question-actions"><div><button type="button" className="button secondary" aria-disabled={session.index === 0} onClick={() => { if (session.index > 0) update({ ...session, index: session.index - 1 }) }}>Previous question</button><button type="button" className="button secondary" aria-disabled={session.index === 4} onClick={() => { if (session.index < 4) update({ ...session, index: session.index + 1 }) }}>Next question</button></div><button type="button" className="button primary" id="exam-submit" onClick={() => setConfirmSubmit(true)}>Submit exam</button></div>
    {confirmSubmit && <ConfirmDialog title="Submit this exam?" action="Submit and see report" onConfirm={() => { setConfirmSubmit(false); finish(session) }} onClose={() => setConfirmSubmit(false)}><p>{50 - filledCount} unanswered blanks. Submission locks your answers and opens the marked report.</p></ConfirmDialog>}
  </>
}
export default App
