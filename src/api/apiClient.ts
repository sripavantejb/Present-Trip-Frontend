const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

export class ApiClientError extends Error {
  status: number
  details?: unknown
  srdvErrorCode?: number

  constructor(message: string, status: number, details?: unknown, srdvErrorCode?: number) {
    super(message)
    this.name = 'ApiClientError'
    this.status = status
    this.details = details
    this.srdvErrorCode = srdvErrorCode
  }
}

type ApiEnvelope<T> = {
  success: boolean
  message: string
  data: T
  details?: unknown
  srdvErrorCode?: number
}

export async function apiRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  const payload = (await response.json()) as ApiEnvelope<T> & {
    details?: unknown
    srdvErrorCode?: number
  }

  if (!response.ok || !payload.success) {
    throw new ApiClientError(
      payload.message || 'Request failed',
      response.status,
      payload.details,
      payload.srdvErrorCode
    )
  }

  return payload.data
}

export { API_BASE_URL }
