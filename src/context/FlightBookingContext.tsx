import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import type { FlightSearchInput, FlightSearchResponse, NormalizedFlight } from '../api/flightApi'
import type { BookingRecord, PassengerInput } from '../api/bookingApi'

type FlightBookingContextValue = {
  searchInput: FlightSearchInput | null
  setSearchInput: (value: FlightSearchInput | null) => void
  searchResult: FlightSearchResponse | null
  setSearchResult: (value: FlightSearchResponse | null) => void
  selectedFlight: NormalizedFlight | null
  setSelectedFlight: (value: NormalizedFlight | null) => void
  fareQuote: Record<string, unknown> | null
  setFareQuote: (value: Record<string, unknown> | null) => void
  passengers: PassengerInput[]
  setPassengers: (value: PassengerInput[]) => void
  booking: BookingRecord | null
  setBooking: (value: BookingRecord | null) => void
}

const FlightBookingContext = createContext<FlightBookingContextValue | undefined>(undefined)

export function FlightBookingProvider({ children }: { children: ReactNode }) {
  const [searchInput, setSearchInput] = useState<FlightSearchInput | null>(null)
  const [searchResult, setSearchResult] = useState<FlightSearchResponse | null>(null)
  const [selectedFlight, setSelectedFlight] = useState<NormalizedFlight | null>(null)
  const [fareQuote, setFareQuote] = useState<Record<string, unknown> | null>(null)
  const [passengers, setPassengers] = useState<PassengerInput[]>([])
  const [booking, setBooking] = useState<BookingRecord | null>(null)

  const value = useMemo(
    () => ({
      searchInput,
      setSearchInput,
      searchResult,
      setSearchResult,
      selectedFlight,
      setSelectedFlight,
      fareQuote,
      setFareQuote,
      passengers,
      setPassengers,
      booking,
      setBooking,
    }),
    [searchInput, searchResult, selectedFlight, fareQuote, passengers, booking]
  )

  return <FlightBookingContext.Provider value={value}>{children}</FlightBookingContext.Provider>
}

export function useFlightBooking() {
  const context = useContext(FlightBookingContext)
  if (!context) {
    throw new Error('useFlightBooking must be used within FlightBookingProvider')
  }
  return context
}
