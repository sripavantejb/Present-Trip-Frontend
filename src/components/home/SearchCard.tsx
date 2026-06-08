import { ArrowUpDown, CalendarDays, ChevronDown, MapPin, Users } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { CategoryId } from '../../config/categoryThemes'
import { CATEGORY_THEMES } from '../../config/categoryThemes'
import { useFlightBooking } from '../../context/FlightBookingContext'
import { AppIcon } from '../ui/AppIcon'
import { HomeDarshanSearchPanel } from './HomeDarshanSearchPanel'
import { ServiceLineIcon } from './ServiceTabLineIcons'

type AirportLeg = { city: string; code: string; detail: string }

const SERVICES: CategoryId[] = ['flights', 'trains', 'buses', 'hotels', 'darshan']

type SearchCardProps = {
  activeCategory: CategoryId
  onCategoryChange: (id: CategoryId) => void
}

export function SearchCard({ activeCategory, onCategoryChange }: SearchCardProps) {
  const navigate = useNavigate()
  const { setSearchInput } = useFlightBooking()
  const activeTheme = CATEGORY_THEMES[activeCategory]
  const isDarshan = activeCategory === 'darshan'
  const isFlights = activeCategory === 'flights'

  const [from, setFrom] = useState<AirportLeg>({
    city: 'Hyderabad',
    code: 'HYD',
    detail: 'Rajiv Gandhi International',
  })
  const [to, setTo] = useState<AirportLeg>({
    city: 'Delhi',
    code: 'DEL',
    detail: 'Indira Gandhi International',
  })
  const [departureDate, setDepartureDate] = useState('2026-06-10')
  const [returnDate, setReturnDate] = useState('2026-06-15')
  const [adults, setAdults] = useState(1)
  const [addReturn, setAddReturn] = useState(false)

  function swapRoute() {
    setFrom(to)
    setTo(from)
  }

  function handleSearch() {
    if (!isFlights) return

    setSearchInput({
      from: from.code,
      to: to.code,
      departureDate,
      returnDate: addReturn ? returnDate : null,
      adults,
      children: 0,
      infants: 0,
      journeyType: addReturn ? 2 : 1,
      cabinClass: 1,
      directFlight: false,
      oneStopFlight: false,
      fareType: 1,
    })
    navigate('/flights/results')
  }

  return (
    <div
      id={isDarshan ? 'darshan-search' : 'card'}
      className="pt-home__cardWrap searchCardWrapper"
    >
      <section
        className={`pt-home__card${isDarshan ? ' pt-home__card--darshan' : ''}`}
        aria-labelledby="search-card-title"
      >
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

        {isDarshan ? (
          <HomeDarshanSearchPanel />
        ) : (
          <>
            <div className="pt-home__fieldsWrap">
              <div className="pt-home__grid pt-home__grid--mock">
                <label className="pt-home__cell pt-home__cell--from pt-home__cell--withIcon">
                  <span className="pt-home__cellIconBadge">
                    <AppIcon icon={MapPin} size={18} className="pt-icon pt-icon--field" />
                  </span>
                  <div className="pt-home__cellStack">
                    <span className="pt-home__cellLabel">From</span>
                    {isFlights ? (
                      <input
                        className="pt-home__fieldInput"
                        value={from.code}
                        onChange={(event) =>
                          setFrom({ ...from, code: event.target.value.toUpperCase(), city: event.target.value.toUpperCase() })
                        }
                        aria-label="From airport code"
                        placeholder="City or airport"
                        autoComplete="off"
                      />
                    ) : (
                      <>
                        <span className="pt-home__cellMain">{from.city}</span>
                        <span className="pt-home__cellSub">
                          {from.code}, {from.detail}
                        </span>
                      </>
                    )}
                  </div>
                </label>
                <label className="pt-home__cell pt-home__cell--to pt-home__cell--withIcon">
                  <span className="pt-home__cellIconBadge">
                    <AppIcon icon={MapPin} size={18} className="pt-icon pt-icon--field" />
                  </span>
                  <div className="pt-home__cellStack">
                    <span className="pt-home__cellLabel">To</span>
                    {isFlights ? (
                      <input
                        className="pt-home__fieldInput"
                        value={to.code}
                        onChange={(event) =>
                          setTo({ ...to, code: event.target.value.toUpperCase(), city: event.target.value.toUpperCase() })
                        }
                        aria-label="To airport code"
                        placeholder="City or airport"
                        autoComplete="off"
                      />
                    ) : (
                      <>
                        <span className="pt-home__cellMain">{to.city}</span>
                        <span className="pt-home__cellSub">
                          {to.code}, {to.detail}
                        </span>
                      </>
                    )}
                  </div>
                </label>
                <label className="pt-home__cell pt-home__cell--dates pt-home__cell--withIcon">
                  <span className="pt-home__cellIconBadge">
                    <AppIcon icon={CalendarDays} size={18} className="pt-icon pt-icon--field" />
                  </span>
                  <div className="pt-home__cellStack">
                    <span className="pt-home__cellLabel">Dates</span>
                    {isFlights ? (
                      <input
                        type="date"
                        className="pt-home__fieldInput pt-home__fieldInput--date"
                        value={departureDate}
                        onChange={(event) => setDepartureDate(event.target.value)}
                        aria-label="Departure date"
                      />
                    ) : (
                      <span className="pt-home__cellMain pt-home__cellMain--dates">
                        Thu 15 May – Fri 16 May
                      </span>
                    )}
                  </div>
                </label>
                <label className="pt-home__cell pt-home__cell--travellers pt-home__cell--withIcon">
                  <span className="pt-home__cellIconBadge">
                    <AppIcon icon={Users} size={18} className="pt-icon pt-icon--field" />
                  </span>
                  <div className="pt-home__cellStack">
                    <span className="pt-home__cellLabel">Travellers &amp; Class</span>
                    {isFlights ? (
                      <input
                        type="number"
                        min={1}
                        max={9}
                        className="pt-home__fieldInput pt-home__fieldInput--number"
                        value={adults}
                        onChange={(event) => setAdults(Number(event.target.value))}
                        aria-label="Number of travellers"
                      />
                    ) : (
                      <span className="pt-home__cellMain">1 Traveller, Economy</span>
                    )}
                  </div>
                  <AppIcon icon={ChevronDown} size={20} className="pt-home__cellChevron pt-icon" />
                </label>
              </div>
              <button
                type="button"
                className="pt-home__swap"
                onClick={swapRoute}
                aria-label="Swap from and to cities"
              >
                <AppIcon icon={ArrowUpDown} size={18} className="pt-icon pt-icon--swap" />
              </button>
            </div>

            <label className="pt-home__returnCheck">
              <input
                type="checkbox"
                checked={addReturn}
                onChange={(e) => setAddReturn(e.target.checked)}
              />
              <span>Add a return date for bigger discounts</span>
            </label>

            {isFlights && addReturn ? (
              <label className="pt-home__returnCheck pt-home__returnCheck--date">
                <span>Return date</span>
                <input
                  type="date"
                  className="pt-home__fieldInput pt-home__fieldInput--date"
                  value={returnDate}
                  onChange={(event) => setReturnDate(event.target.value)}
                />
              </label>
            ) : null}

            <div className="pt-home__searchCtaInner">
              <button type="button" className="pt-home__searchBtn" onClick={handleSearch}>
                {activeTheme.cta}
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  )
}
