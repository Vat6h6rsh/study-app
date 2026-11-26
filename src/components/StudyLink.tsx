import type { MouseEvent, ReactNode } from 'react'
import { createContext, useContext } from 'react'

export const StudySubject = createContext('itp')

export function StudyLink({ view, topic, onNavigate, children, className, current, title, 'aria-label': ariaLabel, 'data-tone': tone }: {
  view: string; topic?: string; onNavigate: () => void; children: ReactNode; className?: string; current?: boolean; title?: string; 'aria-label'?: string; 'data-tone'?: string
}) {
  const subject = useContext(StudySubject)
  const params = new URLSearchParams({ view, ...(topic ? { topic } : {}), ...(subject !== 'itp' ? { subject } : {}) })
  function follow(event: MouseEvent<HTMLAnchorElement>) {
    if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    onNavigate()
  }
  return <a href={`?${params}`} className={className} data-tone={tone} title={title} aria-label={ariaLabel} aria-current={current ? 'page' : undefined} onClick={follow}>{children}</a>
}
