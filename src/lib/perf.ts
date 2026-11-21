// Render counters for the browser performance check. They cost nothing unless a test sets
// `window.__renders = {}` first.
export function countRender(name: string) {
  const bag = (globalThis as { __renders?: Record<string, number> }).__renders
  if (bag) bag[name] = (bag[name] || 0) + 1
}
