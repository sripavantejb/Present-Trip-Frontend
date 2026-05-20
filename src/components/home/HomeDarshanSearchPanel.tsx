import { useState } from 'react'
import type { HeroBookingTab } from '../../pages/darshan/darshanData'
import { HeroBookingForm } from '../../pages/darshan/HeroBookingForm'

export function HomeDarshanSearchPanel() {
  const [bookingTab, setBookingTab] = useState<HeroBookingTab>('darshan')

  return (
    <div className="darshan darshan--embed pt-home__darshanEmbed">
      <div className="darshan__search-card darshan__search-card--lite darshan__search-card--pro pt-home__darshanCard">
        <div className="darshan__search-card-head darshan__search-card-head--lite">
          <p className="darshan__search-card-eyebrow">Secure booking · Tirumala &amp; surrounds</p>
          <h2 className="darshan__search-card-heading darshan__search-card-heading--lite">
            Book darshan &amp; travel
          </h2>
        </div>
        <HeroBookingForm tab={bookingTab} onTabChange={setBookingTab} navigateMode="route" />
      </div>
    </div>
  )
}
