import type { HotelSearchSession } from '../api/types/hotels'

const SESSION_KEY = 'presentTrip.hotelSearch'

export function saveHotelSearchSession(session: HotelSearchSession) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session))
}

export function loadHotelSearchSession(): HotelSearchSession | null {
  const raw = sessionStorage.getItem(SESSION_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as HotelSearchSession
  } catch {
    return null
  }
}
