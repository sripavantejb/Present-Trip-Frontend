import { useState } from 'react'
import type { CategoryId } from '../../config/categoryThemes'
import { CATEGORY_THEMES } from '../../config/categoryThemes'
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
              <IconPin className="pt-home__cellLeadIcon" />
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
              <IconSwap />
            </button>
            <button type="button" className="pt-home__cell pt-home__cell--to pt-home__cell--withIcon">
              <IconPin className="pt-home__cellLeadIcon" />
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
              <IconCalendar className="pt-home__cellLeadIcon" />
              <div className="pt-home__cellStack">
                <span className="pt-home__cellLabel">Dates</span>
                <span className="pt-home__cellMain pt-home__cellMain--dates">
                  Thu 15 May – Fri 16 May
                </span>
              </div>
            </button>
            <button type="button" className="pt-home__cell pt-home__cell--withIcon pt-home__cell--travellers">
              <IconPerson className="pt-home__cellLeadIcon" />
              <div className="pt-home__cellStack">
                <span className="pt-home__cellLabel">Travellers &amp; Class</span>
                <span className="pt-home__cellMain">1 Traveller, Economy</span>
              </div>
              <IconChevronDown className="pt-home__cellChevron" />
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

function IconPin({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21s7-4.35 7-10a7 7 0 10-14 0c0 5.65 7 10 7 10zM12 11a2 2 0 100-4 2 2 0 000 4z"
      />
    </svg>
  )
}

function IconCalendar({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 7V5M16 7V5M5 11h14M7 7h10a2 2 0 012 2v9H5V9a2 2 0 012-2z"
      />
    </svg>
  )
}

function IconPerson({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        d="M12 11a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM5 20a7 7 0 0114 0"
      />
    </svg>
  )
}

function IconChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 9l6 6 6-6"
      />
    </svg>
  )
}

function IconSwap() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7 16V4M7 4L4 7M7 4l3 3M17 8v12M17 20l3-3M17 20l-3-3"
      />
    </svg>
  )
}
