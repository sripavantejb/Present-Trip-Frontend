import { useCallback, useEffect, useState, type CSSProperties } from 'react'
import { useSearchParams } from 'react-router-dom'
import { categoryFromHomeTab, HOME_TAB_QUERY } from '../../config/homeSearchTab'
import '../../pages/darshan/darshan.css'
import '../../pages/darshan/darshan-post-hero.css'
import '../../pages/darshan/pilgrimage-sections.css'
import '../../styles/pilgrimage-theme.css'
import type { CategoryId } from '../../config/categoryThemes'
import { CATEGORY_THEMES } from '../../config/categoryThemes'
import '../../features/darshan/styles/darshan-v2.css'
import { SiteLayout } from '../layout/SiteLayout'
import { HeroBackdrop } from './HeroBackdrop'
import { HeroCategoryVisual } from './HeroCategoryVisual'
import { SearchCard } from './SearchCard'
import { SecondaryNav } from './SecondaryNav'
import { OffersSection } from './OffersSection'
import { TrustBar } from './TrustBar'
import { HomeContentSections } from './sections/HomeContentSections'
import { HomeDarshanSections } from './HomeDarshanSections'
import { PilgrimageSectionsBlock } from './sections/PilgrimageSectionsBlock'

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeCategory, setActiveCategory] = useState<CategoryId>(() =>
    categoryFromHomeTab(searchParams.get(HOME_TAB_QUERY)),
  )
  const isDarshan = activeCategory === 'darshan'
  const heroTheme = CATEGORY_THEMES[activeCategory]

  useEffect(() => {
    setActiveCategory(categoryFromHomeTab(searchParams.get(HOME_TAB_QUERY)))
  }, [searchParams])

  const handleCategoryChange = useCallback(
    (id: CategoryId) => {
      setActiveCategory(id)
      const next = new URLSearchParams(searchParams)
      if (id === 'flights') {
        next.delete(HOME_TAB_QUERY)
      } else {
        next.set(HOME_TAB_QUERY, id)
      }
      setSearchParams(next, { replace: true })
    },
    [searchParams, setSearchParams],
  )

  const heroVars = {
    '--hero-accent': heroTheme.accentColor,
    '--hero-glow': heroTheme.glowColor,
  } as CSSProperties

  return (
    <SiteLayout className={`pt-home${isDarshan ? ' pt-home--darshan-active' : ''}`}>
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
            onCategoryChange={handleCategoryChange}
          />
          <div className="featureStripWrapper pt-home__featureStripWrap">
            <SecondaryNav variant={isDarshan ? 'darshan' : 'travel'} />
          </div>
        </div>
      </div>
      {isDarshan ? <HomeDarshanSections /> : <PilgrimageSectionsBlock />}
      {!isDarshan ? (
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
      ) : null}
    </SiteLayout>
  )
}
