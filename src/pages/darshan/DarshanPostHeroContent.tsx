import { AccommodationSection } from './AccommodationSection'
import { CuratedPackagesSection } from './CuratedPackagesSection'
import { DarshanAppBanner } from './DarshanAppBanner'
import { DarshanTypesSection } from './DarshanTypesSection'
import { FaqSection } from './FaqSection'
import { HeroTrustStrip } from './HeroTrustStrip'
import { PilgrimInfoSection } from './PilgrimInfoSection'
import { SevaBookingSection } from './SevaBookingSection'
import { TransportSection } from './TransportSection'
import { WhyBookSection } from './WhyBookSection'

type Props = {
  showTrustStrip?: boolean
}

/** Booking-focused sections below the hero — discovery lives in header/footer/home block */
export function DarshanPostHeroContent({ showTrustStrip = true }: Props) {
  return (
    <>
      {showTrustStrip ? <HeroTrustStrip /> : null}
      <DarshanTypesSection />
      <CuratedPackagesSection />
      <AccommodationSection />
      <TransportSection />
      <PilgrimInfoSection />
      <SevaBookingSection />
      <WhyBookSection />
      <DarshanAppBanner />
      <FaqSection />
    </>
  )
}
