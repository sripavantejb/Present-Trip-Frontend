export type HotelCity = {
  id: string
  name: string
  cityId: string
  countryCode?: string
}

/** SRDV hotel destination CityIds (ClientId 180214 / production catalog) */
export const HOTEL_CITIES: HotelCity[] = [
  { id: 'new-delhi', name: 'New Delhi', cityId: '130443', countryCode: 'IN' },
  { id: 'hyderabad', name: 'Hyderabad', cityId: '145710', countryCode: 'IN' },
  { id: 'tirupati', name: 'Tirupati', cityId: '140311', countryCode: 'IN' },
  { id: 'mumbai', name: 'Mumbai', cityId: '144306', countryCode: 'IN' },
  { id: 'chennai', name: 'Chennai', cityId: '127343', countryCode: 'IN' },
  { id: 'navi-mumbai', name: 'Navi Mumbai', cityId: '128734', countryCode: 'IN' },
]
