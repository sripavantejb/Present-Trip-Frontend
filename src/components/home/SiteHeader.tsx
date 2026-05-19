import { Briefcase, Building2, ChevronDown, CircleHelp, User } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { AppIcon } from '../ui/AppIcon'

const PRODUCTS = [
  { to: '/', label: 'Travel', end: true },
  { to: '/darshan', label: 'Darshan', badge: 'New' as const },
] as const

export function SiteHeader() {
  const { pathname } = useLocation()

  return (
    <header className="pt-home__header pt-site-header">
      <div className="pt-home__headerInner pt-site-header__inner">
        <Link to="/" className="pt-home__logo" aria-label="Present Trip home">
          <span className="pt-home__logoText">Present</span>
          <span className="pt-home__logoMark">trip</span>
        </Link>

        <nav className="pt-site__productNav" aria-label="Products">
          {PRODUCTS.map(({ to, label, ...rest }) => {
            const end = 'end' in rest && rest.end
            const active = end ? pathname === '/' : pathname.startsWith(to)
            return (
              <Link
                key={to}
                to={to}
                className={`pt-site__productTab${active ? ' pt-site__productTab--active' : ''}`}
              >
                {label}
                {'badge' in rest && rest.badge ? (
                  <span className="pt-site__productTabBadge">{rest.badge}</span>
                ) : null}
              </Link>
            )
          })}
        </nav>

        <nav className="pt-home__headerNav" aria-label="Account and tools">
          <button type="button" className="pt-home__localeBtn">
            <span className="pt-home__localeFlag" aria-hidden>
              IN
            </span>
            <span>INR | English</span>
            <AppIcon icon={ChevronDown} size={16} className="pt-home__chevron pt-icon" />
          </button>
          <Link to="/list-property" className="pt-home__navLink">
            <AppIcon icon={Building2} size={18} className="pt-home__navIcon pt-icon" />
            <span>List Your Property</span>
          </Link>
          <Link to="/support" className="pt-home__navLink">
            <AppIcon icon={CircleHelp} size={18} className="pt-home__navIcon pt-icon" />
            <span>Support</span>
          </Link>
          <Link to="/trips" className="pt-home__navLink">
            <AppIcon icon={Briefcase} size={18} className="pt-home__navIcon pt-icon" />
            <span>My Trips</span>
          </Link>
          <button type="button" className="pt-home__signInBtn">
            <AppIcon icon={User} size={18} className="pt-icon" />
            <span>Sign in</span>
          </button>
        </nav>
      </div>
    </header>
  )
}
