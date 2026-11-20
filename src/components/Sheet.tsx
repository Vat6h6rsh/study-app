import { useEffect, useId, useRef } from 'react'
import type { ReactNode } from 'react'

// A phone bottom sheet built on the native modal <dialog>: focus trap, Escape and inert
// background come for free. It has a visible Close button and never relies on a grab handle.
export function Sheet({ title, open, onClose, children }: { title: string; open: boolean; onClose: () => void; children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const id = useId()
  useEffect(() => {
    const element = dialog.current
    if (!element) return
    if (open && !element.open) element.showModal()
    if (!open && element.open) element.close()
  }, [open])
  return <dialog ref={dialog} className="sheet" aria-labelledby={`${id}-title`} onClose={onClose} onClick={event => { if (event.target === event.currentTarget) onClose() }}>
    <div className="sheet-head"><h2 id={`${id}-title`}>{title}</h2><button type="button" className="button secondary" onClick={onClose}>Close</button></div>
    <div className="sheet-body">{open && children}</div>
  </dialog>
}
