import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { SiteLayout } from '../../components/layout/SiteLayout'
import { useAuth } from '../../context/AuthContext'
import '../../styles/auth-pages.css'

function safeRedirect(value: string | null): string {
  if (!value || !value.startsWith('/') || value.startsWith('//')) return '/'
  if (value.startsWith('/login') || value.startsWith('/signup')) return '/'
  return value
}

export default function LoginPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { login, isAuthenticated } = useAuth()
  const redirect = safeRedirect(searchParams.get('redirect'))

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (isAuthenticated) navigate(redirect, { replace: true })
  }, [isAuthenticated, navigate, redirect])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    const result = login(email, password)
    setSubmitting(false)
    if (!result.ok) {
      setError(result.error)
      return
    }
    navigate(redirect, { replace: true })
  }

  return (
    <SiteLayout>
      <div className="pt-auth">
        <div className="pt-auth__shell">
          <div className="pt-auth__card">
            <h1 className="pt-auth__brand">Welcome back</h1>
            <p className="pt-auth__lead">
              Log in to book flights, darshan, packages, and manage your trips.
            </p>

            <form className="pt-auth__form" onSubmit={handleSubmit} noValidate>
              {error ? (
                <p className="pt-auth__error" role="alert">
                  {error}
                </p>
              ) : null}

              <label className="pt-auth__field">
                <span className="pt-auth__label">Email</span>
                <input
                  className="pt-auth__input"
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </label>

              <label className="pt-auth__field">
                <span className="pt-auth__label">Password</span>
                <input
                  className="pt-auth__input"
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                />
              </label>

              <button
                type="submit"
                className="ds-btn ds-btn--primary ds-btn--block pt-auth__submit"
                disabled={submitting}
              >
                {submitting ? 'Signing in…' : 'Log in'}
              </button>
            </form>

            <div className="pt-auth__divider" aria-hidden>
              or
            </div>

            <p className="pt-auth__footer">
              New to Present Trip?{' '}
              <Link to={`/signup${redirect !== '/' ? `?redirect=${encodeURIComponent(redirect)}` : ''}`}>
                Create an account
              </Link>
            </p>

            <p className="pt-auth__hint">
              Booking, payments, and My Trips require a signed-in account. Your session is saved on this device.
            </p>
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}
