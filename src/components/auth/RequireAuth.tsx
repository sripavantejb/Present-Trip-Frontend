import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { buildAuthRedirectUrl, useAuth } from '../../context/AuthContext'

type Props = {
  children: ReactNode
}

/** Redirects guests to login, preserving the intended destination. */
export function RequireAuth({ children }: Props) {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    const redirect = location.pathname + location.search
    return <Navigate to={buildAuthRedirectUrl('/login', redirect)} replace />
  }

  return children
}
