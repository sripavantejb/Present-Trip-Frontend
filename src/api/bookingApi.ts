import { apiRequest } from './apiClient'
import type { NormalizedFlight } from './flightApi'

export type PassengerInput = {
  Title: string
  FirstName: string
  LastName: string
  PaxType: number
  DateOfBirth?: string
  Gender: number
  PassportNo?: string
  PassportExpiry?: string
  AddressLine1?: string
  City?: string
  CountryCode?: string
  CellCountryCode?: string
  ContactNo?: string
  Email?: string
  IsLeadPax?: boolean
}

export type CreateDraftInput = {
  traceId: string
  srdvType: string
  srdvIndex: string
  resultIndex: string
  isLCC?: boolean
  passengers: PassengerInput[]
  segments?: unknown
  selectedBaggage?: unknown[]
  selectedMeals?: unknown[]
  selectedSeats?: unknown[]
  gstDetails?: Record<string, unknown>
  fare?: Partial<NormalizedFlight>
}

export type BookingRecord = {
  _id: string
  localBookingRef: string
  traceId: string
  pnr?: string
  bookingId?: string
  bookingStatus: string
  paymentStatus: string
  ticketStatus?: string
  fare?: Record<string, number>
  passengers?: PassengerInput[]
  testMode?: boolean
}

export function createBookingDraft(body: CreateDraftInput) {
  return apiRequest<{ booking: BookingRecord; fareQuote: Record<string, unknown>; requiresReconfirmation: boolean }>(
    '/bookings/create-draft',
    { method: 'POST', body: JSON.stringify(body) }
  )
}

export function confirmAfterPayment(bookingId: string) {
  return apiRequest<BookingRecord>('/bookings/confirm-after-payment', {
    method: 'POST',
    body: JSON.stringify({ bookingId }),
  })
}

export function getMyBookings() {
  return apiRequest<BookingRecord[]>('/bookings/my-bookings')
}

export function getBookingById(bookingId: string) {
  return apiRequest<BookingRecord>(`/bookings/${bookingId}`)
}
