export type CrowdLevel = 'low' | 'moderate' | 'high' | 'very-high'

export type TempleSearchItem = {
  id: string
  name: string
  shortName: string
  alias: string[]
  location: string
  waitTime: string
  opens: string
  visitors: string
  crowdLevel: CrowdLevel
  entryFee: string
  image: string
  rating: number
  reviewCount: string
  badge?: string
}

export type DarshanTypeId = 'free' | 'sed' | 'vip' | 'vvip'

export type DarshanOption = {
  id: DarshanTypeId
  icon: string
  name: string
  wait: string
  pricePerPerson: number
  note: string
  badge?: string
}

export type SevaItem = {
  id: string
  name: string
  price: number
  time: string
}

export type AddOnId = 'laddoo' | 'tonsure' | 'cottage' | 'transport' | 'ladduBooking'

export type AddOnConfig = {
  id: AddOnId
  icon: string
  name: string
  priceLabel: string
  price: number
  type: 'counter' | 'toggle' | 'add'
}

export type NearbyTemple = {
  id: string
  name: string
  distance: string
  tag?: string
  image: string
}

export type QueueSlot = {
  time: string
  level: 'low' | 'moderate' | 'high'
}

export type KeyInfoItem = {
  label: string
  value: string
}

export type ReviewItem = {
  name: string
  location: string
  rating: number
  text: string
}

export type PracticalSection = {
  id: string
  title: string
  content: string
}

export type DevoteeCounts = {
  adults: number
  children: number
  infants: number
}

export type TravellerDetails = {
  fullName: string
  age: string
  gender: 'Male' | 'Female' | 'Other' | ''
  idType: string
  idNumber: string
}

export type DarshanBookingState = {
  templeId: string | null
  visitDate: string
  devotees: DevoteeCounts
  selectedDarshanId: DarshanTypeId | null
  selectedSevas: string[]
  addOns: {
    laddooQty: number
    tonsure: boolean
    cottage: boolean
    transport: boolean
    ladduBooking: boolean
  }
  timeSlot: string
  couponCode: string
  couponApplied: boolean
  travellers: TravellerDetails[]
  contact: {
    mobile: string
    email: string
    whatsappUpdates: boolean
  }
  specialRequests: string
  bookingRef: string | null
}
