import { apiPost } from './client'
import type {
  HotelInfoRequest,
  HotelInfoResponse,
  HotelSearchRequest,
  HotelSearchResponse,
} from './types/hotels'

export function searchHotels(payload: HotelSearchRequest) {
  return apiPost<HotelSearchResponse>('/hotels/search', payload)
}

export function getHotelInfo(payload: HotelInfoRequest) {
  return apiPost<HotelInfoResponse>('/hotels/info', payload)
}
