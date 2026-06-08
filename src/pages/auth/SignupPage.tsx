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

export default function SignupPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { signup, isAuthenticated } = useAuth()
  const redirect = safeRedirect(searchParams.get('redirect'))

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (isAuthenticated) navigate(redirect, { replace: true })
  }, [isAuthenticated, navigate, redirect])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')

    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }

    setSubmitting(true)
    const result = signup(name, email, password)
    setSubmitting(false)
    if (!result.ok) {
      setError(result.error)
      return
    }
    navigate(redirect, { replace: true })
  }

  const loginHref =
    redirect !== '/'
      ? `/login?redirect=${encodeURIComponent(redirect)}`
      : '/login'

  return (
    <SiteLayout>
      <div className="pt-auth">
        <div className="pt-auth__shell">
          <div className="pt-auth__card">
            <h1 className="pt-auth__brand">Create your account</h1>
            <p className="pt-auth__lead">
              Sign up once to book darshan, flights, stays, and track every trip in one place.
            </p>

            <form className="pt-auth__form" onSubmit={handleSubmit} noValidate>
              {error ? (
                <p className="pt-auth__error" role="alert">
                  {error}
                </p>
              ) : null}

              <label className="pt-auth__field">
                <span className="pt-auth__label">Full name</span>
                <input
                  className="pt-auth__input"
                  type="text"
                  name="name"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                />
              </label>

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
                  autoComplete="new-password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                />
              </label>

              <label className="pt-auth__field">
                <span className="pt-auth__label">Confirm password</span>
                <input
                  className={`pt-auth__input${confirm && password !== confirm ? ' pt-auth__input--error' : ''}`}
                  type="password"
                  name="confirmPassword"
                  autoComplete="new-password"
                  required
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Repeat password"
                />
              </label>

              <button
                type="submit"
                className="ds-btn ds-btn--primary ds-btn--block pt-auth__submit"
                disabled={submitting}
              >
                {submitting ? 'Creating account…' : 'Sign up'}
              </button>
            </form>

            <div className="pt-auth__divider" aria-hidden>
              or
            </div>

            <p className="pt-auth__footer">
              Already have an account? <Link to={loginHref}>Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}
