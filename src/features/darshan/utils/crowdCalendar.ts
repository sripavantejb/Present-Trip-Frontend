export type DayCrowd = 'low' | 'moderate' | 'high'

export function getCrowdForDate(date: Date): DayCrowd {
  const day = date.getDay()
  const dom = date.getDate()
  if (day === 0 || day === 6) return 'high'
  if (dom >= 1 && dom <= 5) return 'low'
  if (dom >= 10 && dom <= 15) return 'moderate'
  if (dom >= 20 && dom <= 25) return 'high'
  return 'moderate'
}

export function crowdLabel(level: DayCrowd): string {
  if (level === 'low') return 'Low crowd'
  if (level === 'high') return 'High crowd'
  return 'Moderate'
}
