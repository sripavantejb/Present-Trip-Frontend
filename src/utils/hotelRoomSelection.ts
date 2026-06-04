import type { SelectedHotelRoom } from '../api/types/hotels'

const SELECTION_KEY = 'presentTrip.selectedHotelRoom'

export function saveSelectedHotelRoom(selection: SelectedHotelRoom) {
  sessionStorage.setItem(SELECTION_KEY, JSON.stringify(selection))
}

export function loadSelectedHotelRoom(hotelCode?: string): SelectedHotelRoom | null {
  const raw = sessionStorage.getItem(SELECTION_KEY)
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as SelectedHotelRoom
    if (hotelCode && parsed.hotelCode !== hotelCode) return null
    return parsed
  } catch {
    return null
  }
}

export function clearSelectedHotelRoom() {
  sessionStorage.removeItem(SELECTION_KEY)
}
