import { Link } from 'react-router-dom'
import { Calendar, MapPin, Package, Sparkles } from 'lucide-react'
import { AppIcon } from '../../ui/AppIcon'

const SUGGESTIONS = [
  { label: 'Book Darshan', to: '/darshan', icon: Sparkles },
  { label: 'Weekend Packages', to: '/packages', icon: Package },
  { label: 'Nearby Temples', to: '/nearby', icon: MapPin },
  { label: 'Upcoming Events', to: '/events', icon: Calendar },
] as const

export function SmartSuggestionsBar() {
  return (
    <section className="pt-home-section pt-home-section--white pt-home-quickLinks" aria-label="Quick links">
      <div className="pt-home-section__inner">
        <p className="pt-home-quickLinks__label">Quick links</p>
        <div className="pt-home-hScroll pt-home-hScroll--fade">
          {SUGGESTIONS.map((s) => (
            <Link key={s.to} to={s.to} className="pt-home-suggestPill">
              <AppIcon icon={s.icon} size={18} />
              {s.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
