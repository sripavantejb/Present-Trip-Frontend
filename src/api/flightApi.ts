import { apiRequest } from './apiClient'

export type FlightSearchInput = {
  from: string
  to: string
  departureDate: string
  returnDate?: string | null
  adults?: number
  children?: number
  infants?: number
  journeyType?: number
  cabinClass?: number
  directFlight?: boolean
  oneStopFlight?: boolean
  fareType?: number
}

export type NormalizedFlight = {
  id: string
  srdvIndex: string
  resultIndex: string
  isLCC: boolean
  isRefundable: boolean
  airlineName: string
  airlineCode: string
  flightNumber: string
  from: string
  to: string
  fromCode?: string
  toCode?: string
  departureTime?: string
  arrivalTime?: string
  duration?: string | number
  stops: number
  baggage?: unknown
  cabinClass?: string | number
  fare: number
  baseFare: number
  tax: number
  publishedFare: number
}

export type FlightSearchResponse = {
  traceId: string
  srdvType: string
  flights: NormalizedFlight[]
}

export type FlightSelection = {
  traceId: string
  srdvType: string
  srdvIndex: string
  resultIndex: string
}

export function searchFlights(body: FlightSearchInput) {
  return apiRequest<FlightSearchResponse>('/flights/search', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export function getFareRule(body: FlightSelection) {
  return apiRequest<unknown>('/flights/fare-rule', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export function getFareQuote(body: FlightSelection) {
  return apiRequest<{
    isSuccess?: boolean
    isPriceChanged?: boolean
    isTimeChanged?: boolean
    publishedFare?: number
    fare?: { PublishedFare?: number; BaseFare?: number; Tax?: number }
    seatSelectAllowed?: boolean
    holdAllowed?: boolean
    isLCC?: boolean
    gstMandatory?: boolean
    adultDobRequired?: boolean
    [key: string]: unknown
  }>('/flights/fare-quote', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export function getSsr(body: FlightSelection) {
  return apiRequest<unknown>('/flights/ssr', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export function getSeatMap(body: FlightSelection) {
  return apiRequest<unknown>('/flights/seat-map', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}
