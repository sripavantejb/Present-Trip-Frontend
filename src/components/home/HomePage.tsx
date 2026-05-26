import { useEffect, useState, type CSSProperties } from 'react'
import '../../pages/darshan/darshan.css'
import '../../pages/darshan/pilgrimage-sections.css'
import '../../styles/pilgrimage-theme.css'
import type { CategoryId } from '../../config/categoryThemes'
import { CATEGORY_THEMES } from '../../config/categoryThemes'
import { DarshanPostHeroContent } from '../../pages/darshan/DarshanPostHeroContent'
import { SiteLayout } from '../layout/SiteLayout'
import { HeroBackdrop } from './HeroBackdrop'
import { HeroCategoryVisual } from './HeroCategoryVisual'
import { SearchCard } from './SearchCard'
import { SecondaryNav } from './SecondaryNav'
import { OffersSection } from './OffersSection'
import { TrustBar } from './TrustBar'
import { HomeContentSections } from './sections/HomeContentSections'
import { PilgrimageSectionsBlock } from './sections/PilgrimageSectionsBlock'

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('flights')
  const isDarshan = activeCategory === 'darshan'
  const heroTheme = CATEGORY_THEMES[activeCategory]

  const heroVars = {
    '--hero-accent': heroTheme.accentColor,
    '--hero-glow': heroTheme.glowColor,
  } as CSSProperties

  useEffect(() => {
    if (!isDarshan) return
    const root = document.querySelector('.darshan--home-posthero')
    if (!root) return
    const sections = root.querySelectorAll('.darshan__section, .pil-section')
    sections.forEach((s) => {
      s.classList.add('darshan__reveal', 'darshan__reveal--visible')
    })
  }, [isDarshan])

  return (
    <SiteLayout className="pt-home">
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
      {!isDarshan ? <PilgrimageSectionsBlock /> : null}
      {isDarshan ? (
        <div className="darshan darshan--home-posthero">
          <main id="darshan-main">
            <DarshanPostHeroContent showTrustStrip={false} />
          </main>
        </div>
      ) : (
        <>
          <div id="tracker" className="pt-home__offersStrip">
            <div className="pt-home__offersStripInner">
              <OffersSection />
              <TrustBar />
              <div id="gifts" className="pt-home__scrollAnchor" aria-hidden="true" />
            </div>
          </div>
          <HomeContentSections />
        </>
      )}
    </SiteLayout>
  )
}
