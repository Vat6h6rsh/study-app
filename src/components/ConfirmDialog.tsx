import { useEffect, useId, useRef } from 'react'
import type { ReactNode } from 'react'

// The native modal supplies the focus trap, Escape key and inert background.
export function ConfirmDialog({ title, children, action, onConfirm, onClose }: {
  title: string; children: ReactNode; action: string; onConfirm: () => void; onClose: () => void
}) {
  const dialog = useRef<HTMLDialogElement>(null)
  const cancel = useRef<HTMLButtonElement>(null)
  const id = useId()
  useEffect(() => {
    const trigger = document.activeElement as HTMLElement | null
    const element = dialog.current!
    element.showModal()
    cancel.current?.focus()
    return () => { element.close(); if (trigger?.isConnected) trigger.focus() }
  }, [])
  return <dialog ref={dialog} className="confirm-dialog" aria-labelledby={`${id}-title`} aria-describedby={`${id}-description`} onCancel={event => { event.preventDefault(); onClose() }}>
    <h2 id={`${id}-title`}>{title}</h2>
    <div id={`${id}-description`}>{children}</div>
    <div className="dialog-actions"><button type="button" ref={cancel} className="button secondary" onClick={onClose}>Keep working</button><button type="button" className="button secondary" onClick={onConfirm}>{action}</button></div>
  </dialog>
}
