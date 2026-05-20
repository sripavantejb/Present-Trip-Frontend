import { useMemo, useState } from 'react'
import { ACCOMMODATION_LISTINGS, type AccommodationListing, type BudgetBand, type StayLocation } from './postHeroData'
import { FilterChips } from './components/FilterChips'
import { SectionShell } from './components/SectionShell'
import { StayCard } from './components/StayCard'
import { IconInfo } from './DarshanIcons'

const INITIAL_VISIBLE = 6

const FILTER_GROUPS = [
  {
    id: 'location',
    label: 'Location',
    options: [
      { value: 'all', label: 'All' },
      { value: 'Tirupati town', label: 'Tirupati town' },
      { value: 'Tirumala Hills', label: 'Tirumala Hills' },
    ],
  },
  {
    id: 'budget',
    label: 'Budget',
    options: [
      { value: 'all', label: 'All' },
      { value: 'under500', label: 'Under ₹500' },
      { value: 'mid', label: '₹500–₹2000' },
      { value: 'premium', label: '₹2000+' },
    ],
  },
  {
    id: 'type',
    label: 'Type',
    options: [
      { value: 'all', label: 'All' },
      { value: 'TTD Guest House', label: 'TTD Guest House' },
      { value: 'Hotel', label: 'Hotel' },
      { value: 'Dharamshala', label: 'Dharamshala' },
      { value: 'Resort', label: 'Resort' },
    ],
  },
  {
    id: 'guests',
    label: 'Guests',
    options: [
      { value: 'all', label: 'All' },
      { value: '1', label: '1' },
      { value: '2', label: '2' },
      { value: '3', label: '3–4' },
      { value: '5', label: '5+' },
    ],
  },
]

function matchesFilters(listing: AccommodationListing, filters: Record<string, string>): boolean {
  if (filters.location !== 'all' && listing.location !== (filters.location as StayLocation)) return false
  if (filters.budget !== 'all' && listing.budget !== (filters.budget as BudgetBand)) return false
  if (filters.type !== 'all' && listing.type !== filters.type) return false
  if (filters.guests !== 'all') {
    const g = Number(filters.guests)
    if (g === 5 && !listing.guests.some((x) => x >= 5)) return false
    if (g === 3 && !listing.guests.some((x) => x >= 3 && x <= 4)) return false
    if (g < 5 && !listing.guests.includes(g)) return false
  }
  return true
}

export function AccommodationSection() {
  const [filters, setFilters] = useState({
    location: 'all',
    budget: 'all',
    type: 'all',
    guests: 'all',
  })
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE)

  const filtered = useMemo(
    () => ACCOMMODATION_LISTINGS.filter((l) => matchesFilters(l, filters)),
    [filters],
  )
  const visible = filtered.slice(0, visibleCount)

  return (
    <SectionShell
      id="accommodation"
      headingId="accommodation-heading"
      title="Book your stay"
      lead="Hotels, guest houses, and dharamshalas near Tirupati and Tirumala."
      className="darshan__section--stay"
    >
      <div className="darshan__info-banner darshan__info-banner--stay">
        <IconInfo className="darshan__info-banner-icon" aria-hidden />
        <p>
          TTD also offers free dormitories and subsidised rooms at Tirumala Hills. These can be booked via the
          official TTD website. We help you book all other private and hotel accommodations.
        </p>
      </div>
      <FilterChips
        groups={FILTER_GROUPS}
        values={filters}
        onChange={(groupId, value) => {
          setFilters((prev) => ({ ...prev, [groupId]: value }))
          setVisibleCount(INITIAL_VISIBLE)
        }}
      />
      <div className="darshan__stay-grid">
        {visible.map((stay) => (
          <StayCard key={stay.id} stay={stay} />
        ))}
      </div>
      {visibleCount < filtered.length ? (
        <div className="darshan__load-more-wrap darshan__load-more-wrap--stay">
          <button
            type="button"
            className="darshan__btn darshan__stay-load-more"
            onClick={() => setVisibleCount((n) => n + 6)}
          >
            Load More
          </button>
        </div>
      ) : null}
    </SectionShell>
  )
}
