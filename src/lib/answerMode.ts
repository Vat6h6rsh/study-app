import { useSyncExternalStore } from 'react'
import { useMedia } from './viewport.ts'

// Where ITP blanks are answered: "side" = answer panel beside the program (keyboard-friendly desktop
// default), "inline" = inputs placed in the code itself. Phones and tablets always use inline.
export type AnswerMode = 'side' | 'inline'
export const ANSWER_MODE_KEY = 'exam-desk.answer-mode.v1'
// The side panel needs room for a readable code column beside it.
export const INLINE_ONLY_QUERY = '(max-width: 74.99rem)'
// An on-screen keyboard is likely: phones and any coarse pointer.
export const KEYBOARD_QUERY = '(max-width: 47.99rem), (pointer: coarse)'

let current: AnswerMode | null = null
const listeners = new Set<() => void>()
function read(): AnswerMode {
  try { return localStorage.getItem(ANSWER_MODE_KEY) === 'inline' ? 'inline' : 'side' } catch { return 'side' }
}
export const readAnswerMode = () => (current ??= read())
export function storeAnswerMode(value: AnswerMode) {
  current = value
  try { localStorage.setItem(ANSWER_MODE_KEY, value) } catch { /* The preference is optional. */ }
  listeners.forEach(listener => listener())
}
const subscribe = (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener) } }

export function useAnswerMode() {
  const preferred = useSyncExternalStore(subscribe, readAnswerMode, () => 'side' as AnswerMode)
  const narrow = useMedia(INLINE_ONLY_QUERY)
  const keyboard = useMedia(KEYBOARD_QUERY)
  return { mode: (narrow ? 'inline' : preferred) as AnswerMode, preferred, narrow, keyboard }
}
