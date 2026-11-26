import { subjects } from '../data'
import { dmCoreTopics, dmMockPapers, dmPracticeQuestions, isSlot1 } from '../data/dm'
import { questionProgress } from '../lib/practiceNavigation'
import type { Attempt } from '../lib/storage'
import { studyTopics } from './TopicPicker'
import { StudyLink } from './StudyLink'

export function DMHome({ attempts, onPractice, onExam, onLearn }: { attempts: Attempt[]; onPractice: (topic?: string) => void; onExam: () => void; onLearn: () => void }) {
  const subject = subjects.find(s => s.id === 'dm')!, topics = studyTopics(subject)
  const progress = questionProgress(dmPracticeQuestions, attempts)
  const slotCount = dmPracticeQuestions.filter(isSlot1).length, slotMocks = dmMockPapers.filter(p => /slot[ -]?1/i.test(`${p.title} ${p.id} ${p.instructions.join(' ')}`))
  return <>
    <div className="page-heading"><div><p className="eyebrow">BCS ZC219 · Exam 28 November 2026</p><h1>Discrete Mathematics</h1><p className="muted">50 marks. Practise typing complete, justified steps.</p></div><span className="tag">DM / Discrete Mathematics</span></div>
    <section className="study-start"><div><h2>Make every step count</h2><p>Start with the core topics, then rehearse the reported Slot 1 pattern under a timer.</p><div className="hero-actions"><StudyLink view="practice" topic="core" className="button primary" onNavigate={() => onPractice('core')}>Start Core practice</StudyLink><StudyLink view="learn" className="button secondary" onNavigate={onLearn}>Learn from zero</StudyLink></div></div></section>
    <section className="panel dm-slot-card" aria-labelledby="dm-slot-title"><p className="eyebrow">Reported pattern · 5 questions · 50 marks</p><h2 id="dm-slot-title">Slot 1 exam pattern</h2><p className="muted">Practise these patterns for 28 Nov. The actual paper may vary.</p><ol className="dm-slot-list">
      <li><strong>Q1 · Truth table (5) + divisibility induction (5)</strong><div><StudyLink view="practice" topic="logic" onNavigate={() => onPractice('logic')}>Implication truth tables</StudyLink><StudyLink view="practice" topic="induction" onNavigate={() => onPractice('induction')}>Divisibility induction</StudyLink></div></li>
      <li><strong>Q2 · Sets (2) + Hasse diagram (8)</strong><div><StudyLink view="practice" topic="sets" onNavigate={() => onPractice('sets')}>Sets</StudyLink><StudyLink view="practice" topic="posets" onNavigate={() => onPractice('posets')}>LUB / GLB / maximal / minimal</StudyLink></div></li>
      <li><strong>Q3 · Equivalence relations and classes</strong><div><StudyLink view="practice" topic="relations" onNavigate={() => onPractice('relations')}>Relations and equivalence classes</StudyLink></div></li>
      <li><strong>Q4 · Non-homogeneous recurrence</strong><div><StudyLink view="practice" topic="recurrences" onNavigate={() => onPractice('recurrences')}>Recurrence practice</StudyLink></div></li>
      <li><strong>Q5 · Kruskal MST</strong><div><StudyLink view="practice" topic="mst" onNavigate={() => onPractice('mst')}>Build an MST step by step</StudyLink></div></li>
    </ol><div className="hero-actions"><StudyLink view="practice" topic="slot1" className="button primary" onNavigate={() => onPractice('slot1')}>Slot 1 pattern practice{slotCount ? ` · ${slotCount}` : ''}</StudyLink><StudyLink view="exam" className="button secondary" onNavigate={() => { onExam(); requestAnimationFrame(() => document.querySelector(`[data-dm-paper="${slotMocks[0]?.id || ''}"]`)?.scrollIntoView({ block: 'start' })) }}>Slot 1 mocks{slotMocks.length ? ` · ${slotMocks.length}` : ''}</StudyLink></div>
      {!slotMocks.length && <p className="small muted">Slot 1 mocks appear automatically when available; existing DM mocks are ready now.</p>}
    </section>
    <div className="stat-grid"><div className="stat-card"><strong>{progress.done}/{dmPracticeQuestions.length}</strong><h3>Practice questions attempted</h3><p>{progress.correct} correct · {progress.revisit} to revisit</p></div><div className="stat-card"><strong>{progress.coreDone}/{progress.coreCount}</strong><h3>Core questions attempted</h3><p>Final answers checked; write the working too.</p></div><div className="stat-card"><strong>{dmMockPapers.length}</strong><h3>Timed 50-mark mocks</h3><p>Proofs use self-marking rubrics.</p></div></div>
    <section><div className="section-heading"><div><h2>The professor’s seven core topics</h2><p className="muted">At least 50% of the exam comes from these.</p></div></div><div className="topics-grid">{topics.filter(t => dmCoreTopics.has(t.id)).map(t => {
      const qs = dmPracticeQuestions.filter(q => q.topic === t.id), p = questionProgress(qs, attempts)
      return <StudyLink key={t.id} view="practice" topic={t.id} className="topic-card" onNavigate={() => onPractice(t.id)}><h3>{t.name}</h3><p className="small muted">Core · {qs.length} questions</p><span className="topic-meta">{p.done} done · {p.correct} correct · {p.revisit} revisit</span><div className="progress-track" aria-hidden="true"><span style={{ width: `${p.done / qs.length * 100}%` }}/></div></StudyLink>
    })}</div></section>
    <section className="dm-extra-topics"><div className="section-heading"><h2>Past-paper topics and extras</h2></div><div className="topics-grid">{topics.filter(t => !dmCoreTopics.has(t.id)).map(t => <StudyLink key={t.id} view="practice" topic={t.id} className="topic-card" onNavigate={() => onPractice(t.id)}><h3>{t.name}</h3><p className="small muted">{questionProgress(dmPracticeQuestions.filter(q => q.topic === t.id), attempts).done} attempted · practise this topic</p></StudyLink>)}</div></section>
    <section className="learn-entry"><div><h2>Plan the final revision</h2><p className="muted">The DM Learn notes include a 22–28 November plan, a two-day catch-up route and an exam-morning checklist.</p></div><StudyLink view="learn" className="button secondary" onNavigate={onLearn}>Open DM notes</StudyLink></section>
  </>
}
