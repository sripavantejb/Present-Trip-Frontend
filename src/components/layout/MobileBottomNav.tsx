import {
  Briefcase,
  Compass,
  Headphones,
  LayoutGrid,
  MapPin,
  Package,
  User,
} from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { HOME_DARSHAN_PATH, isHomeDarshanView } from '../../config/homeSearchTab'
import { AppIcon } from '../ui/AppIcon'
import './mobile-bottom-nav.css'

type NavItem = {
  to: string
  label: string
  icon: typeof LayoutGrid
  match: (pathname: string, search: string) => boolean
}

const NAV_ITEMS: NavItem[] = [
  {
    to: '/',
    label: 'Home',
    icon: LayoutGrid,
    match: (p, search) => p === '/' && !isHomeDarshanView(p, search),
  },
  {
    to: '/temples',
    label: 'Explore',
    icon: Compass,
    match: (p, _search) => p === '/temples' || p.startsWith('/temples/'),
  },
  {
    to: HOME_DARSHAN_PATH,
    label: 'Pilgrimage',
    icon: MapPin,
    match: (p, search) =>
      isHomeDarshanView(p, search) ||
      p === '/plan' ||
      p.startsWith('/plan/') ||
      p === '/darshan' ||
      p.startsWith('/darshan/'),
  },
  {
    to: '/packages',
    label: 'Packages',
    icon: Package,
    match: (p, _search) => p === '/packages' || p.startsWith('/packages/'),
  },
  {
    to: '/trips',
    label: 'My Trips',
    icon: Briefcase,
    match: (p, _search) => p === '/trips' || p.startsWith('/trips/'),
  },
  {
    to: '/profile',
    label: 'Profile',
    icon: User,
    match: (p, _search) => p === '/profile',
  },
]

export function MobileBottomNav() {
  const { pathname, search } = useLocation()

  return (
    <>
      <Link to="/support" className="pt-mobNav__fab" aria-label="Help and support">
        <AppIcon icon={Headphones} size={22} />
      </Link>

      <nav className="pt-mobNav" aria-label="Main">
        <ul className="pt-mobNav__list">
          {NAV_ITEMS.map(({ to, label, icon, match }) => {
            const active = match(pathname, search)
            return (
              <li key={to} className="pt-mobNav__item">
                <Link
                  to={to}
                  className={`pt-mobNav__link${active ? ' pt-mobNav__link--active' : ''}`}
                  aria-current={active ? 'page' : undefined}
                >
                  <span className="pt-mobNav__iconWrap" aria-hidden>
                    <AppIcon icon={icon} size={22} strokeWidth={active ? 2.25 : 1.75} />
                  </span>
                  <span className="pt-mobNav__label">{label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </>
  )
}
