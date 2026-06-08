import { apiRequest } from './apiClient'
import type { BookingRecord } from './bookingApi'

export function createPaymentOrder(bookingId: string) {
  return apiRequest<{
    requiresReconfirmation: boolean
    keyId?: string
    order?: { id: string; amount: number; currency: string }
    booking?: BookingRecord
    fareQuote?: Record<string, unknown>
  }>('/payments/create-order', {
    method: 'POST',
    body: JSON.stringify({ bookingId }),
  })
}

export function verifyPayment(body: {
  bookingId: string
  orderId: string
  paymentId: string
  signature: string
}) {
  return apiRequest<{ booking: BookingRecord; payment: Record<string, unknown>; alreadyVerified?: boolean }>(
    '/payments/verify',
    { method: 'POST', body: JSON.stringify(body) }
  )
}
