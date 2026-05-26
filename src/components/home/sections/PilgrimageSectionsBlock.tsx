import { SmartSuggestionsBar } from './SmartSuggestionsBar'
import { HomeTrendingSection } from './HomeTrendingSection'
import { HomeOffersStrip } from './HomeOffersStrip'
import { HomePackagesSection } from './HomePackagesSection'
import { HomeEventsSection } from './HomeEventsSection'
import { HomeNearbySection } from './HomeNearbySection'
import { HomeDevoteeStoriesSection } from './HomeDevoteeStoriesSection'
import { PlanPilgrimageCTABlock } from './PlanPilgrimageCTABlock'

export function PilgrimageSectionsBlock() {
  return (
    <div className="pt-home-content">
      <SmartSuggestionsBar />
      <HomeTrendingSection />
      <HomeOffersStrip />
      <HomePackagesSection />
      <HomeEventsSection />
      <HomeNearbySection />
      <HomeDevoteeStoriesSection />
      <PlanPilgrimageCTABlock />
    </div>
  )
}
