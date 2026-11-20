import type { MouseEvent, ReactNode } from 'react'

export function StudyLink({ view, topic, onNavigate, children, className, current, title, 'data-tone': tone }: {
  view: string; topic?: string; onNavigate: () => void; children: ReactNode; className?: string; current?: boolean; title?: string; 'data-tone'?: string
}) {
  const params = new URLSearchParams({ view, ...(topic ? { topic } : {}) })
  function follow(event: MouseEvent<HTMLAnchorElement>) {
    if (event.button || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    onNavigate()
  }
  return <a href={`?${params}`} className={className} data-tone={tone} title={title} aria-current={current ? 'page' : undefined} onClick={follow}>{children}</a>
}
