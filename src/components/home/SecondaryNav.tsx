import { CreditCard, Gift, Plane, ShoppingBag, Users } from 'lucide-react'
import { AppIcon } from '../ui/AppIcon'

type SecondaryLink = {
  href: string
  label: string
  icon: typeof Plane
  tag?: string
}

const LINKS: SecondaryLink[] = [
  { href: '#tracker', label: 'Flight Tracker', icon: Plane },
  { href: '#dutyfree', label: 'Shop Duty Free', icon: ShoppingBag, tag: '10% off' },
  { href: '#card', label: 'Present Trip Partner Card', icon: CreditCard },
  { href: '#mice', label: 'MICE', icon: Users },
  { href: '#gifts', label: 'Gift Cards', icon: Gift },
]

export function SecondaryNav() {
  return (
    <nav className="pt-home__secondaryNav" aria-label="Quick links">
      {LINKS.map(({ href, label, icon, tag }) => (
        <a key={href} href={href} className="pt-home__secondaryLink">
          <span className="pt-home__secondaryIconWrap">
            <AppIcon icon={icon} size={18} className="pt-icon pt-icon--secondary" />
          </span>
          {label}
          {tag ? <span className="pt-home__tag pt-home__tag--pink">{tag}</span> : null}
        </a>
      ))}
    </nav>
  )
}
