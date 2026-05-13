import { useState, type CSSProperties } from 'react'
import type { CategoryId } from '../../config/categoryThemes'
import { CATEGORY_THEMES } from '../../config/categoryThemes'
import { HeroBackdrop } from './HeroBackdrop'
import { HeroCategoryVisual } from './HeroCategoryVisual'
import { SiteHeader } from './SiteHeader'
import { SearchCard } from './SearchCard'
import { SecondaryNav } from './SecondaryNav'
import { OffersSection } from './OffersSection'
import { TrustBar } from './TrustBar'

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('flights')
  const heroTheme = CATEGORY_THEMES[activeCategory]

  const heroVars = {
    '--hero-accent': heroTheme.accentColor,
    '--hero-glow': heroTheme.glowColor,
  } as CSSProperties

  return (
    <div className="pt-home">
      <SiteHeader />
      <div
        className="pt-home__hero heroSection"
        style={heroVars}
        data-hero-category={activeCategory}
      >
        <HeroBackdrop category={activeCategory} />
        <HeroCategoryVisual category={activeCategory} />
        <div className="pt-home__heroInner">
          <SearchCard
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
          <div className="featureStripWrapper pt-home__featureStripWrap">
            <SecondaryNav />
          </div>
        </div>
      </div>
      <div id="tracker" className="pt-home__offersStrip">
        <div className="pt-home__offersStripInner">
          <OffersSection />
          <TrustBar />
          <div id="gifts" className="pt-home__scrollAnchor" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}
