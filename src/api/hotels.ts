import { apiPost } from './client'
import type {
  HotelInfoRequest,
  HotelInfoResponse,
  HotelRoomsRequest,
  HotelRoomsResponse,
  HotelSearchRequest,
  HotelSearchResponse,
} from './types/hotels'

export function searchHotels(payload: HotelSearchRequest) {
  return apiPost<HotelSearchResponse>('/hotels/search', payload)
}

export function getHotelInfo(payload: HotelInfoRequest) {
  return apiPost<HotelInfoResponse>('/hotels/info', payload)
}

export function getHotelRooms(payload: HotelRoomsRequest) {
  return apiPost<HotelRoomsResponse>('/hotels/rooms', payload)
}
