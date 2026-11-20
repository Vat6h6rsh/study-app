import { Component } from 'react'
import type { ReactNode } from 'react'

export class LessonBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  render() {
    return this.state.failed ? <section className="notice error" role="alert"><h1>Study notes could not open</h1><p>Reload to try again. Marked progress is saved when browser storage is available; copy any unsubmitted answers before reloading.</p><button type="button" className="button secondary" onClick={() => window.location.reload()}>Reload study notes</button></section> : this.props.children
  }
}
