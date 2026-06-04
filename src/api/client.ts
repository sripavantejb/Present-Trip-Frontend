import { env } from '../config/env'
import type { ApiError } from './types/hotels'

export class ApiClientError extends Error {
  status: number
  details?: ApiError['details']

  constructor(status: number, message: string, details?: ApiError['details']) {
    super(message)
    this.name = 'ApiClientError'
    this.status = status
    this.details = details
  }
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${env.apiBaseUrl}${path}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Api-Token': env.apiToken,
    },
    body: JSON.stringify(body),
  })

  const json = await res.json()

  if (!res.ok || json.success === false) {
    throw new ApiClientError(
      res.status,
      json.message || json.error || 'Request failed',
      json.details,
    )
  }

  return json.data as T
}
