import { useEffect, useState } from 'react'

// Phone layout: the page itself scrolls (so browser chrome, scroll restoration and the
// on-screen keyboard behave natively). From 48rem the sidebar layout scrolls .workspace.
export const MOBILE_QUERY = '(max-width: 47.99rem)'
const hasMedia = () => typeof window !== 'undefined' && typeof window.matchMedia === 'function'
export const isMobileLayout = () => hasMedia() && window.matchMedia(MOBILE_QUERY).matches
const scroller = () => isMobileLayout() ? null : document.querySelector<HTMLElement>('.workspace')
export const readScroll = () => scroller()?.scrollTop ?? window.scrollY
export function scrollToY(top: number) { const el = scroller(); if (el) el.scrollTo({ top }); else window.scrollTo({ top }) }
export const prefersReducedMotion = () => hasMedia() && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function useMedia(query: string, initial = false) {
  const [matches, setMatches] = useState(() => hasMedia() ? window.matchMedia(query).matches : initial)
  useEffect(() => {
    const media = window.matchMedia(query)
    const update = () => setMatches(media.matches)
    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [query])
  return matches
}
export const useIsMobile = () => useMedia(MOBILE_QUERY)
