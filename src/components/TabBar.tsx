import { StudyLink } from './StudyLink'

export type TabPage = 'home' | 'learn' | 'practice' | 'exam' | 'scratch'
const tabs: { id: TabPage; label: string; symbol: string }[] = [
  { id: 'home', label: 'Home', symbol: '◈' },
  { id: 'learn', label: 'Learn', symbol: '▤' },
  { id: 'practice', label: 'Practice', symbol: '✎' },
  { id: 'exam', label: 'Mock', symbol: '◷' },
]

// Phone-only primary navigation: four peer destinations, always visible, in thumb reach.
// Real links (so long-press and "open in new tab" work); the active tab carries aria-current.
export function TabBar({ page, examLive, onNavigate }: { page: TabPage; examLive: boolean; onNavigate: (id: TabPage) => void }) {
  return <nav className="tab-bar" aria-label="Primary">{tabs.map(tab => <StudyLink key={tab.id} view={tab.id} className={`tab${page === tab.id ? ' active' : ''}`} current={page === tab.id} onNavigate={() => onNavigate(tab.id)}>
    <span className="tab-symbol nav-symbol" data-nav={tab.id} aria-hidden="true">{tab.symbol}</span>
    <span className="tab-label">{tab.label}</span>
    {tab.id === 'exam' && examLive && <><span className="tab-live" aria-hidden="true"/><span className="sr-only"> (in progress)</span></>}
  </StudyLink>)}</nav>
}
