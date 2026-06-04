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

export type HotelDetail = {
  hotelCode: string
  hotelName: string
  starRating: number
  hotelURL: string
  mainImage: string
  gallery: string[]
  description: HotelDescriptionSection[]
  otherDetails: string
  attractions: unknown[]
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
