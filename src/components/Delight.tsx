import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'

export function Confetti({ burst }: { burst: string }) {
  const canvas = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const element = canvas.current
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!element || media.matches) return
    const context = element.getContext('2d')
    if (!context) return
    const width = window.innerWidth, height = window.innerHeight
    const ratio = Math.min(window.devicePixelRatio || 1, 2)
    element.width = width * ratio; element.height = height * ratio
    context.scale(ratio, ratio)
    const styles = getComputedStyle(document.documentElement)
    const colours = ['indigo', 'teal', 'amber', 'pink', 'sky', 'violet', 'cyan', 'orange'].map(tone => styles.getPropertyValue(`--hue-${tone}`).trim())
    const particles = Array.from({ length: 100 }, (_, i) => ({
      x: width * .5, y: height * .36, vx: (Math.random() - .5) * width * .85,
      vy: -120 - Math.random() * 370, size: 4 + Math.random() * 5,
      angle: Math.random() * Math.PI, spin: (Math.random() - .5) * 12, colour: colours[i % colours.length],
    }))
    let frame = 0, started: number | undefined
    const clear = () => { cancelAnimationFrame(frame); context.clearRect(0, 0, width, height) }
    const stopForMotion = () => { if (media.matches) clear() }
    const draw = (now: number) => {
      started ??= now
      const t = (now - started) / 1000
      context.clearRect(0, 0, width, height)
      if (t >= 1.2) return
      context.globalAlpha = Math.min(1, (1.2 - t) * 4)
      for (const p of particles) {
        context.save(); context.translate(p.x + p.vx * t, p.y + p.vy * t + 420 * t * t)
        context.rotate(p.angle + p.spin * t); context.fillStyle = p.colour
        context.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * .55); context.restore()
      }
      frame = requestAnimationFrame(draw)
    }
    frame = requestAnimationFrame(draw)
    media.addEventListener('change', stopForMotion)
    return () => { clear(); media.removeEventListener('change', stopForMotion) }
  }, [burst])
  return <canvas ref={canvas} className="confetti" aria-hidden="true"/>
}

export function AnswerFeedback({ correct, total, burst, celebrate = true, revealed = 0 }: { correct: number; total: number; burst: string; celebrate?: boolean; revealed?: number }) {
  const complete = total > 0 && correct === total
  return <div className={`answer-feedback ${complete ? 'complete' : 'partial'}`}>
    {complete && celebrate && <Confetti burst={burst}/>}
    <span className="feedback-symbol" aria-hidden="true">{complete ? '✦' : '✧'}</span>
    <div><strong>{complete ? `All ${total} correct!` : `${correct}/${total} — ${correct ? 'good progress!' : 'A fresh starting point.'}`}</strong><p>{complete ? 'Beautiful work. Keep your momentum going.' : revealed ? 'Review the revealed keys and any red answers, then try again for a fresh attempt.' : 'Fix the red ones — each correction is a step forward.'}</p></div>
  </div>
}

export function ExamScoreRing({ percent, children }: { percent: number; children: ReactNode }) {
  const [drawn, setDrawn] = useState(false)
  useEffect(() => { const frame = requestAnimationFrame(() => setDrawn(true)); return () => cancelAnimationFrame(frame) }, [])
  return <div className={`score-ring${drawn ? ' is-drawn' : ''}`} style={{ '--score-offset': 100 - percent } as CSSProperties}>
    <svg viewBox="0 0 120 120" aria-hidden="true"><circle className="ring-track" cx="60" cy="60" r="52"/><circle className="ring-value" cx="60" cy="60" r="52" pathLength="100" strokeDasharray="100" style={{ strokeDashoffset: drawn ? 100 - percent : 100 }}/></svg>
    <div>{children}</div>
  </div>
}
