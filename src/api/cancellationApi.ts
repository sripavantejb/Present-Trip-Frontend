import { apiRequest } from './apiClient'

export function getCancellationCharges(body: Record<string, unknown>) {
  return apiRequest<unknown>('/cancellations/charges', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export function requestCancellation(body: Record<string, unknown>) {
  return apiRequest<unknown>('/cancellations/request', {
    method: 'POST',
    body: JSON.stringify(body),
  })
}

export function getCancellationStatus(changeRequestId: string) {
  return apiRequest<unknown>('/cancellations/status', {
    method: 'POST',
    body: JSON.stringify({ changeRequestId }),
  })
}
