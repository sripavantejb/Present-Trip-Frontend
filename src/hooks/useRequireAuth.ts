import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { buildAuthRedirectUrl, useAuth } from '../context/AuthContext'

/**
 * Returns true when the user may proceed; otherwise sends them to login
 * with a redirect back to `targetPath` (or the current page).
 */
export function useRequireAuth() {
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  return useCallback(
    (targetPath?: string): boolean => {
      if (isAuthenticated) return true
      const redirect = targetPath ?? location.pathname + location.search
      navigate(buildAuthRedirectUrl('/login', redirect))
      return false
    },
    [isAuthenticated, navigate, location.pathname, location.search],
  )
}
