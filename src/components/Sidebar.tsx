import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { StudyLink } from './StudyLink'
import { persistPreference, preference, resolvedTheme, savedTheme, SIDEBAR_KEY, THEME_KEY, themeChoices } from '../preferences'
import type { ThemeChoice } from '../preferences'

export function Sidebar({ children, onHome, onReset, menuOpen, setMenuOpen, barTitle }: { children: ReactNode; onHome: () => void; onReset: () => void; menuOpen: boolean; setMenuOpen: (open: boolean) => void; barTitle: string }) {
  const [theme, setTheme] = useState(savedTheme)
  const [collapsed, setCollapsed] = useState(() => preference(SIDEBAR_KEY) === 'true')
  const menuToggle = useRef<HTMLButtonElement>(null)
  const collapseToggle = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const apply = () => { document.documentElement.dataset.theme = resolvedTheme(theme, media.matches) }
    apply()
    media.addEventListener('change', apply)
    return () => media.removeEventListener('change', apply)
  }, [theme])
  useEffect(() => {
    const media = window.matchMedia('(min-width: 768px)')
    const close = () => {
      setMenuOpen(false)
      // A breakpoint must not strand focus in newly hidden navigation.
      if (!media.matches && document.activeElement?.closest('#sidebar-menu')) menuToggle.current?.focus()
      if (!media.matches && document.activeElement === collapseToggle.current) menuToggle.current?.focus()
      if (media.matches && document.activeElement === menuToggle.current) collapseToggle.current?.focus()
    }
    media.addEventListener('change', close)
    return () => media.removeEventListener('change', close)
  }, [setMenuOpen])
  // The phone menu is a full-height sheet: stop the page behind it from scrolling.
  useEffect(() => {
    document.documentElement.classList.toggle('menu-locked', menuOpen)
    return () => document.documentElement.classList.remove('menu-locked')
  }, [menuOpen])
  return <aside className={`sidebar${collapsed ? ' is-collapsed' : ''}${menuOpen ? ' menu-open' : ''}`} onKeyDown={event => {
    if (event.key === 'Escape' && menuOpen) { setMenuOpen(false); menuToggle.current?.focus() }
  }}>
    <div className="sidebar-header">
      <StudyLink view="home" className="brand" title="Examdesk overview" onNavigate={() => { setMenuOpen(false); onHome() }}><span className="brand-mark" aria-hidden="true">{'{ }'}</span><span className="brand-copy">exam<span className="brand-light">desk</span><small>BITS exam practice</small></span><span className="sr-only"> overview</span></StudyLink>
      <span className="bar-title" aria-hidden="true">{barTitle}</span>
      <button type="button" ref={collapseToggle} className="sidebar-toggle collapse-toggle" aria-expanded={!collapsed} aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} aria-controls="sidebar-menu" title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} onClick={() => {
        setCollapsed(!collapsed); persistPreference(SIDEBAR_KEY, String(!collapsed))
      }}><span aria-hidden="true">{collapsed ? '»' : '«'}</span></button>
      <button type="button" ref={menuToggle} className="sidebar-toggle menu-toggle" aria-expanded={menuOpen} aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-controls="sidebar-menu" onClick={() => setMenuOpen(!menuOpen)}><span aria-hidden="true">{menuOpen ? '×' : '☰'}</span><span>{menuOpen ? 'Close' : 'Menu'}</span></button>
    </div>
    <div id="sidebar-menu" className="sidebar-menu">
      <div className="sidebar-content" onClick={event => {
        if (event.defaultPrevented && (event.target as HTMLElement).closest('a')) {
          setMenuOpen(false)
          // Also handles activating the current destination from the mobile menu.
          requestAnimationFrame(() => document.getElementById('main')?.focus())
        }
      }}>{children}</div>
      <div className="sidebar-bottom">
        <div className="sidebar-section-label mobile-section">Saved progress</div>
        <div className="offline-note"><strong>Saved in this browser</strong><p>Progress stays in this browser when storage is available.</p></div>
        <button type="button" className="reset-button" title="Reset saved progress" onClick={onReset}><span className="rail-symbol" aria-hidden="true">↺</span><span className="reset-copy">Reset saved progress</span></button>
        <div className="sidebar-section-label mobile-section">Appearance</div>
        <div className="theme-control"><label htmlFor="theme-choice"><span className="theme-swatch" aria-hidden="true"/>Theme</label><select id="theme-choice" title={`Theme: ${theme[0].toUpperCase() + theme.slice(1)}`} value={theme} onChange={event => {
          const choice = event.target.value as ThemeChoice
          // Update immediately, before React's effect and next paint.
          document.documentElement.dataset.theme = resolvedTheme(choice, window.matchMedia('(prefers-color-scheme: dark)').matches)
          setTheme(choice); persistPreference(THEME_KEY, choice)
        }}>{themeChoices.map(choice => <option key={choice} value={choice}>{choice[0].toUpperCase() + choice.slice(1)}</option>)}</select><span className="theme-rail-symbol" aria-hidden="true">◐</span></div>
      </div>
    </div>
  </aside>
}
