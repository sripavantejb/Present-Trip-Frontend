import { ArrowUpDown, CalendarDays, ChevronDown, MapPin, Users } from 'lucide-react'
import { useState } from 'react'
import type { CategoryId } from '../../config/categoryThemes'
import { CATEGORY_THEMES } from '../../config/categoryThemes'
import { AppIcon } from '../ui/AppIcon'
import { ServiceLineIcon } from './ServiceTabLineIcons'

type AirportLeg = { city: string; code: string; detail: string }

const SERVICES: CategoryId[] = ['flights', 'trains', 'buses', 'hotels', 'darshan']

type SearchCardProps = {
  activeCategory: CategoryId
  onCategoryChange: (id: CategoryId) => void
}

export function SearchCard({ activeCategory, onCategoryChange }: SearchCardProps) {
  const activeTheme = CATEGORY_THEMES[activeCategory]

  const [from, setFrom] = useState<AirportLeg>({
    city: 'Delhi',
    code: 'DEL',
    detail: 'Delhi Airport India',
  })
  const [to, setTo] = useState<AirportLeg>({
    city: 'Bengaluru',
    code: 'BLR',
    detail: 'Bengaluru International Airport',
  })
  const [addReturn, setAddReturn] = useState(false)

  function swapRoute() {
    setFrom(to)
    setTo(from)
  }

  return (
    <div id="card" className="pt-home__cardWrap searchCardWrapper">
      <section className="pt-home__card" aria-labelledby="search-card-title">
        <h2 id="search-card-title" className="visually-hidden">
          {activeTheme.title}. {activeTheme.subtitle}
        </h2>

        <div className="pt-home__services" role="tablist" aria-label="Travel services">
          {SERVICES.map((id) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={activeCategory === id}
              className={
                activeCategory === id
                  ? 'pt-home__service pt-home__service--active'
                  : 'pt-home__service'
              }
              onClick={() => onCategoryChange(id)}
            >
              <span className="pt-home__serviceIconWrap" aria-hidden>
                <ServiceLineIcon id={id} />
              </span>
              <span className="pt-home__serviceLabel">{CATEGORY_THEMES[id].label}</span>
            </button>
          ))}
        </div>

        <div className="pt-home__grid pt-home__grid--mock">
          <div className="pt-home__routeRow">
            <button type="button" className="pt-home__cell pt-home__cell--from pt-home__cell--withIcon">
              <span className="pt-home__cellIconBadge">
                <AppIcon icon={MapPin} size={18} className="pt-icon pt-icon--field" />
              </span>
              <div className="pt-home__cellStack">
                <span className="pt-home__cellLabel">From</span>
                <span className="pt-home__cellMain">{from.city}</span>
                <span className="pt-home__cellSub">
                  {from.code}, {from.detail}
                </span>
              </div>
            </button>
            <button
              type="button"
              className="pt-home__swap"
              onClick={swapRoute}
              aria-label="Swap from and to cities"
            >
              <AppIcon icon={ArrowUpDown} size={18} className="pt-icon pt-icon--swap" />
            </button>
            <button type="button" className="pt-home__cell pt-home__cell--to pt-home__cell--withIcon">
              <span className="pt-home__cellIconBadge">
                <AppIcon icon={MapPin} size={18} className="pt-icon pt-icon--field" />
              </span>
              <div className="pt-home__cellStack">
                <span className="pt-home__cellLabel">To</span>
                <span className="pt-home__cellMain">{to.city}</span>
                <span className="pt-home__cellSub">
                  {to.code}, {to.detail}
                </span>
              </div>
            </button>
          </div>

          <div className="pt-home__metaRow pt-home__metaRow--mock">
            <button type="button" className="pt-home__cell pt-home__cell--withIcon">
              <span className="pt-home__cellIconBadge">
                <AppIcon icon={CalendarDays} size={18} className="pt-icon pt-icon--field" />
              </span>
              <div className="pt-home__cellStack">
                <span className="pt-home__cellLabel">Dates</span>
                <span className="pt-home__cellMain pt-home__cellMain--dates">
                  Thu 15 May – Fri 16 May
                </span>
              </div>
            </button>
            <button type="button" className="pt-home__cell pt-home__cell--withIcon pt-home__cell--travellers">
              <span className="pt-home__cellIconBadge">
                <AppIcon icon={Users} size={18} className="pt-icon pt-icon--field" />
              </span>
              <div className="pt-home__cellStack">
                <span className="pt-home__cellLabel">Travellers &amp; Class</span>
                <span className="pt-home__cellMain">1 Traveller, Economy</span>
              </div>
              <AppIcon icon={ChevronDown} size={20} className="pt-home__cellChevron pt-icon" />
            </button>
          </div>
        </div>

        <label className="pt-home__returnCheck">
          <input
            type="checkbox"
            checked={addReturn}
            onChange={(e) => setAddReturn(e.target.checked)}
          />
          <span>Add a return date for bigger discounts</span>
        </label>
      </section>

      <div className="pt-home__searchCtaWrap">
        <button type="button" className="pt-home__searchBtn">
          {activeTheme.cta}
        </button>
      </div>
    </div>
  )
}
