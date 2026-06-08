import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  fetchSession,
  getStoredToken,
  loginRequest,
  setStoredToken,
  signupRequest,
  type AuthUser,
} from '../api/authApi'

export type { AuthUser }

type AuthContextValue = {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ ok: true } | { ok: false; error: string }>
  signup: (
    name: string,
    email: string,
    password: string,
  ) => Promise<{ ok: true } | { ok: false; error: string }>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function errorMessage(err: unknown): string {
  if (err instanceof Error) return err.message
  return 'Something went wrong. Please try again.'
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function restore() {
      if (!getStoredToken()) {
        if (!cancelled) setIsLoading(false)
        return
      }
      try {
        const session = await fetchSession()
        if (!cancelled) setUser(session?.user ?? null)
      } catch {
        setStoredToken(null)
        if (!cancelled) setUser(null)
      } finally {
        if (!cancelled) setIsLoading(false)
      }
    }

    void restore()
    return () => {
      cancelled = true
    }
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    try {
      const data = await loginRequest(email, password)
      setStoredToken(data.token)
      setUser(data.user)
      return { ok: true as const }
    } catch (err) {
      return { ok: false as const, error: errorMessage(err) }
    }
  }, [])

  const signup = useCallback(async (name: string, email: string, password: string) => {
    try {
      const data = await signupRequest(name, email, password)
      setStoredToken(data.token)
      setUser(data.user)
      return { ok: true as const }
    } catch (err) {
      return { ok: false as const, error: errorMessage(err) }
    }
  }, [])

  const logout = useCallback(() => {
    setStoredToken(null)
    setUser(null)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isLoading,
      login,
      signup,
      logout,
    }),
    [user, isLoading, login, signup, logout],
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
