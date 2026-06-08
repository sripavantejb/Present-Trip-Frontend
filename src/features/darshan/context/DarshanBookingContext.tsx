import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { DarshanBookingState, DarshanTypeId, DevoteeCounts, TravellerDetails } from '../types'
import { generateBookingRef } from '../utils/pricing'

const defaultDevotees: DevoteeCounts = { adults: 2, children: 0, infants: 0 }

const emptyTraveller = (): TravellerDetails => ({
  fullName: '',
  age: '',
  gender: '',
  idType: 'Aadhaar',
  idNumber: '',
})

const initialState: DarshanBookingState = {
  templeId: null,
  visitDate: '',
  devotees: defaultDevotees,
  selectedDarshanId: null,
  selectedSevas: [],
  addOns: {
    laddooQty: 0,
    tonsure: false,
    cottage: false,
    transport: false,
    ladduBooking: false,
  },
  timeSlot: '7:30 AM',
  couponCode: '',
  couponApplied: false,
  travellers: [emptyTraveller(), emptyTraveller()],
  contact: { mobile: '', email: '', whatsappUpdates: true },
  specialRequests: '',
  bookingRef: null,
}

type DarshanBookingContextValue = {
  state: DarshanBookingState
  setTempleId: (id: string | null) => void
  setVisitDate: (date: string) => void
  setDevotees: (d: DevoteeCounts) => void
  setSelectedDarshan: (id: DarshanTypeId | null) => void
  toggleSeva: (id: string) => void
  updateAddOns: (patch: Partial<DarshanBookingState['addOns']>) => void
  setTravellers: (t: TravellerDetails[]) => void
  updateTraveller: (index: number, patch: Partial<TravellerDetails>) => void
  setContact: (patch: Partial<DarshanBookingState['contact']>) => void
  setSpecialRequests: (text: string) => void
  applyCoupon: (code: string) => boolean
  resetBooking: () => void
  confirmBooking: () => string
  syncTravellerCount: () => void
  loadFromSearch: (params: {
    templeId: string
    visitDate: string
    devotees: DevoteeCounts
  }) => void
}

const DarshanBookingContext = createContext<DarshanBookingContextValue | null>(null)

export function DarshanBookingProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DarshanBookingState>(initialState)

  const syncTravellerCount = useCallback(() => {
    setState((prev) => {
      const count = prev.devotees.adults + prev.devotees.children
      const existing = [...prev.travellers]
      while (existing.length < count) existing.push(emptyTraveller())
      while (existing.length > count) existing.pop()
      return { ...prev, travellers: existing }
    })
  }, [])

  const setDevotees = useCallback((devotees: DevoteeCounts) => {
    setState((prev) => {
      const count = devotees.adults + devotees.children
      const existing = [...prev.travellers]
      while (existing.length < count) existing.push(emptyTraveller())
      while (existing.length > count) existing.pop()
      return { ...prev, devotees, travellers: existing }
    })
  }, [])

  const value = useMemo<DarshanBookingContextValue>(
    () => ({
      state,
      setTempleId: (templeId) => setState((p) => ({ ...p, templeId })),
      setVisitDate: (visitDate) => setState((p) => ({ ...p, visitDate })),
      setDevotees,
      setSelectedDarshan: (selectedDarshanId) => setState((p) => ({ ...p, selectedDarshanId })),
      toggleSeva: (id) =>
        setState((p) => ({
          ...p,
          selectedSevas: p.selectedSevas.includes(id)
            ? p.selectedSevas.filter((s) => s !== id)
            : [...p.selectedSevas, id],
        })),
      updateAddOns: (patch) => setState((p) => ({ ...p, addOns: { ...p.addOns, ...patch } })),
      setTravellers: (travellers) => setState((p) => ({ ...p, travellers })),
      updateTraveller: (index, patch) =>
        setState((p) => ({
          ...p,
          travellers: p.travellers.map((t, i) => (i === index ? { ...t, ...patch } : t)),
        })),
      setContact: (patch) => setState((p) => ({ ...p, contact: { ...p.contact, ...patch } })),
      setSpecialRequests: (specialRequests) => setState((p) => ({ ...p, specialRequests })),
      applyCoupon: (code) => {
        const ok = code.trim().toUpperCase() === 'DARSHAN10'
        setState((p) => ({ ...p, couponCode: code, couponApplied: ok }))
        return ok
      },
      resetBooking: () => setState(initialState),
      confirmBooking: () => {
        const ref = generateBookingRef()
        setState((p) => ({ ...p, bookingRef: ref }))
        return ref
      },
      syncTravellerCount,
      loadFromSearch: ({ templeId, visitDate, devotees }) =>
        setState((p) => ({
          ...p,
          templeId,
          visitDate,
          devotees,
          travellers: Array.from({ length: devotees.adults + devotees.children }, () => emptyTraveller()),
        })),
    }),
    [state, setDevotees, syncTravellerCount],
  )

  return (
    <DarshanBookingContext.Provider value={value}>{children}</DarshanBookingContext.Provider>
  )
}

export function useDarshanBooking() {
  const ctx = useContext(DarshanBookingContext)
  if (!ctx) throw new Error('useDarshanBooking must be used within DarshanBookingProvider')
  return ctx
}
