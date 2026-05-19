import { AppDownloadSection } from './AppDownloadSection'
import { ExclusiveOffersSection } from './ExclusiveOffersSection'
import { PopularFlightRoutesSection } from './PopularFlightRoutesSection'
import { TopDestinationsSection } from './TopDestinationsSection'
import { TravelBlogSection } from './TravelBlogSection'
import { TravelerReviewsSection } from './TravelerReviewsSection'
import { TrendingHotelsSection } from './TrendingHotelsSection'
import { WhyPresentTripSection } from './WhyPresentTripSection'

export function HomeContentSections() {
  return (
    <div className="pt-home-content">
      <PopularFlightRoutesSection />
      <TopDestinationsSection />
      <ExclusiveOffersSection />
      <TrendingHotelsSection />
      <WhyPresentTripSection />
      <TravelBlogSection />
      <AppDownloadSection />
      <TravelerReviewsSection />
    </div>
  )
}
