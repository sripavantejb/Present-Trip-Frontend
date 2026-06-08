import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { Globe, Menu, UserCircle2 } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { buildAuthRedirectUrl, useAuth } from '../../context/AuthContext'
import { AppIcon } from '../ui/AppIcon'

const ACCOUNT_LINKS = [
  { to: '/trips', label: 'My trips' },
  { to: '/list-property', label: 'List your property' },
  { to: '/support', label: 'Help Centre' },
] as const

const LOCALE_OPTIONS = [
  { id: 'en-IN', label: 'English (India)', currency: 'INR ₹' },
  { id: 'hi-IN', label: 'हिन्दी (India)', currency: 'INR ₹' },
  { id: 'en-US', label: 'English (US)', currency: 'USD $' },
] as const

type LocaleId = (typeof LOCALE_OPTIONS)[number]['id']

const LOCALE_STORAGE_KEY = 'pt-locale'

const MAIN_NAV = [
  { to: '/temples', label: 'Explore' },
  { to: '/packages', label: 'Packages' },
  { to: '/trips', label: 'My Trips' },
] as const

function isNavActive(pathname: string, to: string): boolean {
  if (to === '/trips') return pathname === '/trips' || pathname.startsWith('/trips/')
  return pathname === to || pathname.startsWith(`${to}/`)
}

function readStoredLocale(): LocaleId {
  try {
    const v = localStorage.getItem(LOCALE_STORAGE_KEY)
    if (LOCALE_OPTIONS.some((o) => o.id === v)) return v as LocaleId
  } catch {
    /* ignore */
  }
  return 'en-IN'
}

export function SiteHeader() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const localeMenuId = useId()
  const accountMenuId = useId()

  const [localeOpen, setLocaleOpen] = useState(false)
  const [accountOpen, setAccountOpen] = useState(false)
  const [locale, setLocale] = useState<LocaleId>(readStoredLocale)
  const { user, isAuthenticated, logout } = useAuth()

  const localeRef = useRef<HTMLDivElement>(null)
  const accountRef = useRef<HTMLDivElement>(null)

  const closeAll = useCallback(() => {
    setLocaleOpen(false)
    setAccountOpen(false)
  }, [])

  useEffect(() => {
    closeAll()
  }, [pathname, closeAll])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeAll()
    }
    const onPointer = (e: MouseEvent) => {
      const t = e.target as Node
      if (localeRef.current?.contains(t) || accountRef.current?.contains(t)) return
      closeAll()
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onPointer)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onPointer)
    }
  }, [closeAll])

  const selectLocale = (id: LocaleId) => {
    setLocale(id)
    try {
      localStorage.setItem(LOCALE_STORAGE_KEY, id)
    } catch {
      /* ignore */
    }
    setLocaleOpen(false)
  }

  const handleSignIn = () => {
    setAccountOpen(false)
    navigate(buildAuthRedirectUrl('/login', pathname))
  }

  const handleSignOut = () => {
    logout()
    setAccountOpen(false)
    navigate('/')
  }

  const activeLocale = LOCALE_OPTIONS.find((o) => o.id === locale) ?? LOCALE_OPTIONS[0]

  return (
    <header className="pt-site-header">
      <div className="pt-site-header__inner">
        <Link to="/" className="pt-home__logo" aria-label="Present Trip home">
          <span className="pt-home__logoText">Present</span>
          <span className="pt-home__logoMark">trip</span>
        </Link>

        <nav className="pt-site-header__nav" aria-label="Main">
          {MAIN_NAV.map((item) => {
            const active = isNavActive(pathname, item.to)
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`pt-site-header__navLink${active ? ' pt-site-header__navLink--active' : ''}`}
                aria-current={active ? 'page' : undefined}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="pt-site-header__actions">
          <Link to="/list-property" className="pt-site-header__hostLink">
            List your property
          </Link>

          {!isAuthenticated ? (
            <>
              <Link to={buildAuthRedirectUrl('/login', pathname)} className="pt-site-header__authLink">
                Log in
              </Link>
              <Link
                to={buildAuthRedirectUrl('/signup', pathname)}
                className="pt-site-header__authLink pt-site-header__authLink--primary"
              >
                Sign up
              </Link>
            </>
          ) : null}

          <div className="pt-site-header__menuWrap" ref={localeRef}>
            <button
              type="button"
              className={`pt-site-header__localeBtn${localeOpen ? ' pt-site-header__localeBtn--open' : ''}`}
              aria-label="Choose language and currency"
              aria-haspopup="menu"
              aria-expanded={localeOpen}
              aria-controls={localeMenuId}
              onClick={() => {
                setAccountOpen(false)
                setLocaleOpen((o) => !o)
              }}
            >
              <AppIcon icon={Globe} size={18} />
            </button>
            {localeOpen ? (
              <div
                id={localeMenuId}
                className="pt-site-header__dropdown"
                role="menu"
                aria-label="Language and currency"
              >
                <p className="pt-site-header__dropdownTitle">Language &amp; region</p>
                <ul className="pt-site-header__dropdownList">
                  {LOCALE_OPTIONS.map((opt) => (
                    <li key={opt.id} role="none">
                      <button
                        type="button"
                        role="menuitemradio"
                        aria-checked={locale === opt.id}
                        className={`pt-site-header__dropdownItem${locale === opt.id ? ' pt-site-header__dropdownItem--active' : ''}`}
                        onClick={() => selectLocale(opt.id)}
                      >
                        <span>{opt.label}</span>
                        <span className="pt-site-header__dropdownMeta">{opt.currency}</span>
                      </button>
                    </li>
                  ))}
                </ul>
                <p className="pt-site-header__dropdownFoot">
                  Showing prices in {activeLocale.currency}
                </p>
              </div>
            ) : null}
          </div>

          <div className="pt-site-header__menuWrap" ref={accountRef}>
            <button
              type="button"
              className={`pt-site-header__profileMenu${accountOpen ? ' pt-site-header__profileMenu--open' : ''}`}
              aria-label="Account menu"
              aria-haspopup="menu"
              aria-expanded={accountOpen}
              aria-controls={accountMenuId}
              onClick={() => {
                setLocaleOpen(false)
                setAccountOpen((o) => !o)
              }}
            >
              <AppIcon icon={Menu} size={18} className="pt-site-header__menuIcon" />
              <AppIcon icon={UserCircle2} size={30} className="pt-site-header__userIcon" />
            </button>
            {accountOpen ? (
              <div
                id={accountMenuId}
                className="pt-site-header__dropdown pt-site-header__dropdown--account"
                role="menu"
                aria-label="Account"
              >
                {isAuthenticated && user ? (
                  <p className="pt-site-header__dropdownTitle">
                    Hi, {user.name.split(' ')[0]}
                  </p>
                ) : (
                  <p className="pt-site-header__dropdownTitle">Welcome to Present Trip</p>
                )}
                <ul className="pt-site-header__dropdownList">
                  {isAuthenticated ? (
                    <li role="none">
                      <Link
                        role="menuitem"
                        to="/profile"
                        className="pt-site-header__dropdownItem pt-site-header__dropdownItem--link"
                        onClick={() => setAccountOpen(false)}
                      >
                        Profile
                      </Link>
                    </li>
                  ) : null}
                  {ACCOUNT_LINKS.map((item) => (
                    <li key={item.to + item.label} role="none">
                      <Link
                        role="menuitem"
                        to={item.to}
                        className="pt-site-header__dropdownItem pt-site-header__dropdownItem--link"
                        onClick={() => setAccountOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="pt-site-header__dropdownDivider" role="separator" />
                {isAuthenticated ? (
                  <button
                    type="button"
                    role="menuitem"
                    className="pt-site-header__dropdownItem pt-site-header__dropdownItem--cta"
                    onClick={handleSignOut}
                  >
                    Sign out
                  </button>
                ) : (
                  <>
                    <Link
                      role="menuitem"
                      to={buildAuthRedirectUrl('/signup', pathname)}
                      className="pt-site-header__dropdownItem pt-site-header__dropdownItem--link"
                      onClick={() => setAccountOpen(false)}
                    >
                      Sign up
                    </Link>
                    <button
                      type="button"
                      role="menuitem"
                      className="pt-site-header__dropdownItem pt-site-header__dropdownItem--cta"
                      onClick={handleSignIn}
                    >
                      Log in
                    </button>
                  </>
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  )
}
