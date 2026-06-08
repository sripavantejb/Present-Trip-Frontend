import { getDarshanOptionsForTemple, TIRUPATI_SEVAS } from '../data/templeDetails'
import type { DarshanBookingState } from '../types'

export function totalDevotees(d: { adults: number; children: number; infants: number }): number {
  return d.adults + d.children + d.infants
}

export function payingDevotees(d: { adults: number; children: number }): number {
  return d.adults + d.children
}

export function calculateBookingTotal(state: DarshanBookingState): {
  darshanFee: number
  sevaFee: number
  addOnFee: number
  total: number
  breakdown: { label: string; amount: number }[]
} {
  const templeId = state.templeId ?? 'tirupati-balaji'
  const options = getDarshanOptionsForTemple(templeId)
  const selected = options.find((o) => o.id === state.selectedDarshanId)
  const payCount = payingDevotees(state.devotees)

  const darshanFee = selected ? selected.pricePerPerson * payCount : 0

  let sevaFee = 0
  if (state.templeId === 'tirupati-balaji') {
    sevaFee = TIRUPATI_SEVAS.filter((s) => state.selectedSevas.includes(s.id)).reduce((sum, s) => sum + s.price, 0)
  }

  let addOnFee = 0
  const breakdown: { label: string; amount: number }[] = []

  if (selected && darshanFee > 0) {
    breakdown.push({
      label: `Darshan Fee: ₹${selected.pricePerPerson.toLocaleString('en-IN')} × ${payCount}`,
      amount: darshanFee,
    })
  } else if (selected) {
    breakdown.push({ label: 'Darshan Fee: Free', amount: 0 })
  }

  addOnFee += state.addOns.laddooQty * 50
  if (state.addOns.laddooQty > 0) {
    breakdown.push({ label: `Laddoo (×${state.addOns.laddooQty})`, amount: state.addOns.laddooQty * 50 })
  }
  if (state.addOns.tonsure) {
    const t = 150 * payCount
    addOnFee += t
    breakdown.push({ label: 'Head Tonsure', amount: t })
  }
  if (state.addOns.cottage) {
    addOnFee += 1200
    breakdown.push({ label: 'TTD Cottage (1 night)', amount: 1200 })
  }
  if (state.addOns.transport) {
    addOnFee += 800
    breakdown.push({ label: 'Local Temple Transport', amount: 800 })
  }
  if (state.addOns.ladduBooking) {
    addOnFee += 200
    breakdown.push({ label: 'Laddu Booking (4 pcs)', amount: 200 })
  }

  const total = darshanFee + sevaFee + addOnFee
  if (sevaFee > 0) breakdown.push({ label: 'Special Sevas', amount: sevaFee })

  return { darshanFee, sevaFee, addOnFee, total, breakdown }
}

export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`
}

export function formatVisitDate(iso: string): string {
  if (!iso) return '—'
  const d = new Date(iso + 'T12:00:00')
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function generateBookingRef(): string {
  const n = Math.floor(1000000 + Math.random() * 9000000)
  const y = new Date().getFullYear()
  const m = String(new Date().getMonth() + 1).padStart(2, '0')
  return `PT${y}${m}${n}`
}
