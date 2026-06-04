export type RoomGuest = {
  NoOfAdults: string
  NoOfChild: string
  ChildAge: number[]
}

export type HotelSearchRequest = {
  CheckInDate: string
  CheckOutDate: string
  CountryCode?: string
  CityId: string
  ResultCount?: string
  PreferredCurrency?: string
  GuestNationality?: string
  RequestType?: string
  /** SRDV Hotels-v2 docs label; mapped to RequestType on the backend for v8 REST */
  PropertyType?: string
  NoOfRooms: string
  RoomGuests: RoomGuest[]
  PreferredHotel?: string
  MaxRating?: string
  MinRating?: string
  ReviewScore?: null
  IsNearbySearchAllowed?: boolean
}

export type HotelSearchResultItem = {
  srdvIndex: string
  resultIndex: string
  hotelCode: string
  hotelName: string
  starRating: number
  hotelPicture: string
  hotelAddress: string
  city: string
  displayPrice: number
  pricePolicy: 'NET' | 'PUBLISHED'
  facilities: { facilitiesName: string[]; roomPrice: number }[]
  rooms: { category: string }[]
  price: {
    currencyCode: string
    offeredPriceRoundedOff: number
    publishedPriceRoundedOff: number
  }
}

export type HotelSearchResponse = {
  traceId: string
  srdvType: string
  cityId: string
  checkInDate: string
  checkOutDate: string
  preferredCurrency: string
  count: number
  hotels: HotelSearchResultItem[]
}

export type HotelInfoRequest = {
  TraceId: string
  SrdvType: string
  SrdvIndex: string
  ResultIndex: string
  HotelCode: string
}

export type HotelDescriptionSection = {
  Name: string
  Detail: string[]
}

export type HotelFacility = {
  Name: string
  FontAwesome?: string
  IcoFont?: string
}

export type HotelAttraction = {
  key?: string
  value?: string
  Name?: string
  Detail?: string[]
}

export type HotelDetail = {
  hotelCode: string
  hotelName: string
  starRating: number
  hotelURL: string
  mainImage: string
  gallery: string[]
  description: HotelDescriptionSection[]
  otherDetails: string
  attractions: HotelAttraction[]
  facilities: HotelFacility[]
  policy: string
  specialInstructions: string
  address: {
    full: string
    city: string
    state: string
    pinCode: string
    country: string
  }
  contact: {
    phone: string
    email: string
    fax: string
  }
  coordinates: {
    lat: string
    lng: string
  }
}

export type HotelInfoResponse = {
  traceId: string
  srdvType: string
  srdvIndex: string
  resultIndex: string
  hotel: HotelDetail
}

export type HotelRoomsRequest = HotelInfoRequest

export type HotelRoomCancellationPolicy = {
  Charge: number
  ChargeType: number
  Currency: string
  FromDate: string
  ToDate: string
}

export type HotelRoomAmenity = {
  Name: string
  FontAwesome?: string
  IcoFont?: string
}

export type HotelRoomPrice = {
  currencyCode: string
  roomPrice: number
  tax: number
  offeredPrice: number
  offeredPriceRoundedOff: number
  publishedPrice: number
  publishedPriceRoundedOff: number
}

export type HotelRoomItem = {
  categoryName: string
  roomIndex: string
  roomId: string
  roomTypeName: string
  roomTypeCode: string
  roomTypeCategory: string
  roomStatus: string
  ratePlanCode: string
  ratePlan: string
  mealPlan: string
  description: string
  displayPrice: number
  price: HotelRoomPrice
  amenities: HotelRoomAmenity[]
  images: string[]
  cancellationPolicies: HotelRoomCancellationPolicy[]
  lastCancellationDate: string
  fullRefundAllowed: boolean
  isPanMandatory: boolean
  childCount: number
  dayRates: { Date: string; Amount: number }[]
}

export type HotelRoomCategory = {
  categoryName: string
  rooms: HotelRoomItem[]
}

export type HotelRoomsResponse = {
  traceId: string
  srdvType: string
  srdvIndex: string
  resultIndex: string
  isPolicyPerStay: boolean
  isUnderCancellationAllowed: boolean
  categories: HotelRoomCategory[]
  count: number
}

export type SelectedHotelRoom = {
  hotelCode: string
  traceId: string
  srdvType: string
  srdvIndex: string
  resultIndex: string
  room: HotelRoomItem
}

export type ApiSuccess<T> = {
  success: true
  message: string
  data: T
}

export type ApiError = {
  success: false
  error: string
  message: string
  details?: { field: string; message: string }[]
}

export type HotelSearchSession = {
  traceId: string
  srdvType: string
  cityName: string
  checkInDate: string
  checkOutDate: string
  searchResult: HotelSearchResponse
}
