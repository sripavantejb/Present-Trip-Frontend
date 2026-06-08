import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type AuthUser = {
  id: string
  name: string
  email: string
}

type StoredUser = AuthUser & { password: string }

const SESSION_KEY = 'pt-auth-session'
const USERS_KEY = 'pt-auth-users'

function readSession(): AuthUser | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as AuthUser
    if (parsed?.id && parsed?.email) return parsed
  } catch {
    /* ignore */
  }
  return null
}

function readUsers(): StoredUser[] {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as StoredUser[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeSession(user: AuthUser | null) {
  try {
    if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user))
    else localStorage.removeItem(SESSION_KEY)
  } catch {
    /* ignore */
  }
}

function writeUsers(users: StoredUser[]) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
  } catch {
    /* ignore */
  }
}

function toPublicUser(user: StoredUser): AuthUser {
  return { id: user.id, name: user.name, email: user.email }
}

type AuthContextValue = {
  user: AuthUser | null
  isAuthenticated: boolean
  login: (email: string, password: string) => { ok: true } | { ok: false; error: string }
  signup: (
    name: string,
    email: string,
    password: string,
  ) => { ok: true } | { ok: false; error: string }
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => readSession())

  const login = useCallback((email: string, password: string) => {
    const normalized = email.trim().toLowerCase()
    if (!normalized || !password) {
      return { ok: false as const, error: 'Enter your email and password.' }
    }

    const match = readUsers().find((u) => u.email === normalized && u.password === password)
    if (!match) {
      return { ok: false as const, error: 'Invalid email or password. Try again or sign up.' }
    }

    const session = toPublicUser(match)
    writeSession(session)
    setUser(session)
    return { ok: true as const }
  }, [])

  const signup = useCallback((name: string, email: string, password: string) => {
    const trimmedName = name.trim()
    const normalized = email.trim().toLowerCase()

    if (!trimmedName) return { ok: false as const, error: 'Enter your full name.' }
    if (!normalized || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
      return { ok: false as const, error: 'Enter a valid email address.' }
    }
    if (password.length < 6) {
      return { ok: false as const, error: 'Password must be at least 6 characters.' }
    }

    const users = readUsers()
    if (users.some((u) => u.email === normalized)) {
      return { ok: false as const, error: 'An account with this email already exists. Log in instead.' }
    }

    const stored: StoredUser = {
      id: `u-${Date.now()}`,
      name: trimmedName,
      email: normalized,
      password,
    }
    writeUsers([...users, stored])
    const session = toPublicUser(stored)
    writeSession(session)
    setUser(session)
    return { ok: true as const }
  }, [])

  const logout = useCallback(() => {
    writeSession(null)
    setUser(null)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      signup,
      logout,
    }),
    [user, login, signup, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export function buildAuthRedirectUrl(path: string, redirectTo: string): string {
  const base = path.startsWith('/') ? path : `/${path}`
  return `${base}?redirect=${encodeURIComponent(redirectTo)}`
}
