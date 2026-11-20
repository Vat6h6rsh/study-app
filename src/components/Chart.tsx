import { useId } from 'react'
import type { ChartSpec } from '../data/types'
const colours = ['var(--hue-indigo)', 'var(--hue-teal)', 'var(--hue-amber)', 'var(--hue-pink)', 'var(--hue-sky)']
export function Chart({ chart }: { chart: ChartSpec }) {
  const id = useId()
  const table = <div className="learn-table-wrap" tabIndex={0} role="region" aria-label={`${chart.title}: data`}><table><caption>{chart.title} · {chart.yLabel}</caption><thead><tr><th scope="col">{chart.xLabel}</th>{chart.series.map(s => <th key={s.name} scope="col">{s.name}</th>)}</tr></thead><tbody>{chart.labels.map((label, i) => <tr key={label}><th scope="row">{label}</th>{chart.series.map(s => <td key={s.name}>{s.values[i]}</td>)}</tr>)}</tbody></table></div>
  if (chart.kind === 'table') return <figure className="wp-chart">{table}{chart.note && <figcaption>{chart.note}</figcaption>}</figure>
  const max = Math.max(1, ...chart.series.flatMap(s => s.values)), top = Math.ceil(max / 5) * 5
  const x = (i: number) => 70 + (i + .5) * 610 / chart.labels.length
  const y = (v: number) => 300 - v / top * 240
  const sum = chart.series[0].values.reduce((a, b) => a + b, 0) || 1
  let angle = -Math.PI / 2
  return <figure className="wp-chart"><h3>{chart.title}</h3><div className="wp-plot" tabIndex={0} role="region" aria-label={`${chart.title}: scrollable chart`}><svg viewBox="0 0 720 410" role="img" aria-labelledby={`${id}-title ${id}-desc`}><title id={`${id}-title`}>{chart.title}</title><desc id={`${id}-desc`}>{chart.yLabel}. {chart.labels.map((l, i) => `${l}: ${chart.series.map(s => `${s.name} ${s.values[i]}`).join(', ')}`).join('; ')}. Data table follows.</desc>
    {chart.kind === 'pie' ? chart.labels.map((l, i) => {
      const next = angle + chart.series[0].values[i] / sum * Math.PI * 2, start = [280 + 120 * Math.cos(angle), 185 + 120 * Math.sin(angle)], end = [280 + 120 * Math.cos(next), 185 + 120 * Math.sin(next)]
      const d = `M 280 185 L ${start.join(' ')} A 120 120 0 ${next - angle > Math.PI ? 1 : 0} 1 ${end.join(' ')} Z`
      angle = next
      return <g key={l}><path d={d} fill={colours[i % colours.length]} stroke="var(--surface)" strokeWidth="3"><title>{`${l}: ${chart.series[0].values[i]} (${(chart.series[0].values[i] / sum * 100).toFixed(1)}%)`}</title></path><text x="430" y={100 + i * 32} fill="var(--text)">{i + 1}. {l}: {chart.series[0].values[i]}</text><text x={280 + 85 * Math.cos((next + (next - chart.series[0].values[i] / sum * Math.PI * 2)) / 2)} y={185 + 85 * Math.sin((next + (next - chart.series[0].values[i] / sum * Math.PI * 2)) / 2)} fill="var(--surface)" textAnchor="middle">{i+1}</text></g>
    }) : <>
      <text x="70" y="30" fill="var(--text)">{chart.yLabel}</text>
      {[0,1,2,3,4,5].map(n => <g key={n}><line x1="70" x2="680" y1={y(top*n/5)} y2={y(top*n/5)} stroke="var(--control-border)" strokeDasharray="2 5"/><text x="60" y={y(top*n/5)+5} textAnchor="end" fill="var(--muted)">{+(top*n/5).toFixed(2)}</text></g>)}
      {chart.series.map((s,j) => <g key={s.name} fill={colours[j % colours.length]}>{chart.kind === 'line' ? <><polyline points={s.values.map((v,i) => `${x(i)},${y(v)}`).join(' ')} fill="none" stroke={colours[j % colours.length]} strokeWidth="3" strokeDasharray={j ? '8 4' : undefined}/>{s.values.map((v,i) => <circle key={i} cx={x(i)} cy={y(v)} r="5"><title>{`${chart.labels[i]}, ${s.name}: ${v}`}</title></circle>)}</> : s.values.map((v,i) => {
        const w = Math.min(48, 480 / chart.labels.length / chart.series.length), bx = x(i) + (j - chart.series.length/2)*w
        return <rect key={i} x={bx} y={y(v)} width={w-3} height={300-y(v)}><title>{`${chart.labels[i]}, ${s.name}: ${v}`}</title></rect>
      })}</g>)}
      {chart.labels.map((l,i) => <text key={l} x={x(i)} y="324" textAnchor="end" transform={`rotate(-28 ${x(i)} 324)`} fill="var(--text)">{l}</text>)}
    </>}
  </svg></div><div className="wp-chart-legend">{chart.series.map((s,i) => <span key={s.name} style={{ color: colours[i % colours.length] }}>{i+1}. {s.name}</span>)}</div>{chart.note && <figcaption className="small muted">{chart.note}</figcaption>}<details><summary>Show accessible data table</summary>{table}</details></figure>
}
