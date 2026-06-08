import { apiRequest } from './apiClient'

export type AuthUser = {
  id: string
  name: string
  email: string
}

type AuthPayload = {
  user: AuthUser
  token: string
}

const TOKEN_KEY = 'pt-auth-token'

export function getStoredToken(): string | null {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

export function setStoredToken(token: string | null) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token)
    else localStorage.removeItem(TOKEN_KEY)
  } catch {
    /* ignore */
  }
}

export async function signupRequest(
  name: string,
  email: string,
  password: string,
): Promise<AuthPayload> {
  return apiRequest<AuthPayload>('/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ name, email, password }),
  })
}

export async function loginRequest(email: string, password: string): Promise<AuthPayload> {
  return apiRequest<AuthPayload>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

export async function fetchSession(): Promise<AuthPayload | null> {
  const token = getStoredToken()
  if (!token) return null

  const data = await apiRequest<{ user: AuthUser | null; token?: string }>('/auth/me', {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!data.user) {
    setStoredToken(null)
    return null
  }

  return { user: data.user, token }
}
