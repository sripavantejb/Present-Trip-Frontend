import {
  CalendarDays,
  CreditCard,
  Gift,
  Landmark,
  MapPin,
  Plane,
  Route,
  ShoppingBag,
  Sparkles,
  Users,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { AppIcon } from '../ui/AppIcon'

type SecondaryLink = {
  href: string
  label: string
  icon: LucideIcon
  tag?: string
}

const TRAVEL_LINKS: SecondaryLink[] = [
  { href: '#tracker', label: 'Flight Tracker', icon: Plane },
  { href: '#dutyfree', label: 'Shop Duty Free', icon: ShoppingBag, tag: '10% off' },
  { href: '#card', label: 'Present Trip Partner Card', icon: CreditCard },
  { href: '#mice', label: 'MICE', icon: Users },
  { href: '#gifts', label: 'Gift Cards', icon: Gift },
]

const DARSHAN_LINKS: SecondaryLink[] = [
  { href: '/plan', label: 'Plan Pilgrimage', icon: Route },
  { href: '/temples', label: 'Explore Temples', icon: Landmark },
  { href: '/packages', label: 'Packages', icon: Sparkles },
  { href: '/trips', label: 'My Trips', icon: CalendarDays },
  { href: '#darshan-search', label: 'Book Darshan', icon: MapPin },
]

type Props = {
  variant?: 'travel' | 'darshan'
}

export function SecondaryNav({ variant = 'travel' }: Props) {
  const links = variant === 'darshan' ? DARSHAN_LINKS : TRAVEL_LINKS
  const navClass =
    variant === 'darshan'
      ? 'pt-home__secondaryNav pt-home__secondaryNav--darshan'
      : 'pt-home__secondaryNav'

  return (
    <nav className={navClass} aria-label="Quick links">
      {links.map(({ href, label, icon, tag }) => (
        <a key={`${variant}-${href}-${label}`} href={href} className="pt-home__secondaryLink">
          <span className="pt-home__secondaryIconWrap">
            <AppIcon icon={icon} size={18} className="pt-icon pt-icon--secondary" />
          </span>
          <span className="pt-home__secondaryLinkText">{label}</span>
          {tag ? <span className="pt-home__tag pt-home__tag--pink">{tag}</span> : null}
        </a>
      ))}
    </nav>
  )
}
