import { Clock, Lock, Plane, Trophy } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { WHY_PRESENT_TRIP } from '../../../config/homePageContent'
import type { WhyUsItem } from '../../../config/homePageContent'
import { AppIcon } from '../../ui/AppIcon'
import { HomeSectionHeader } from './HomeSectionHeader'

const ICONS: Record<WhyUsItem['icon'], LucideIcon> = {
  trophy: Trophy,
  lock: Lock,
  clock: Clock,
  plane: Plane,
}

export function WhyPresentTripSection() {
  return (
    <section className="pt-home-section pt-home-section--navy" aria-labelledby="why-heading">
      <div className="pt-home-section__inner">
        <HomeSectionHeader
          title="Why Travel with Present Trip"
          subtitle="Everything you need for confident, stress-free journeys"
        />
        <div className="pt-home-whyGrid">
          {WHY_PRESENT_TRIP.map((item) => (
            <div key={item.id} className="pt-home-whyItem">
              <div className="pt-home-whyIcon" aria-hidden>
                <AppIcon icon={ICONS[item.icon]} size={28} />
              </div>
              <h3 className="pt-home-whyHeadline">{item.headline}</h3>
              <p className="pt-home-whyDesc">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
