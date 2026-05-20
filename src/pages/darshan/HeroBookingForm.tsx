import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { HeroBookingTab } from './darshanData'
import {
  HERO_BOOKING_TABS,
  HERO_BOOKING_TAB_LABELS,
  HERO_CITY_SUGGESTIONS,
  HERO_DARSHAN_TYPES,
  HERO_TRANSPORT_TYPES,
} from './darshanData'
import { HeroNumberStepper } from './components/HeroNumberStepper'
import { HeroTempleField } from './components/HeroTempleField'
import {
  IconBed,
  IconCalendar,
  IconCar,
  IconChevronRight,
  IconMapPin,
  IconTemple,
  IconTicket,
  IconUsers,
} from './DarshanIcons'

type NavigateMode = 'hash' | 'route'

type Props = {
  tab: HeroBookingTab
  onTabChange: (tab: HeroBookingTab) => void
  navigateMode?: NavigateMode
}

function todayIso(): string {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function addDaysIso(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function scrollToHash(hash: string) {
  const id = hash.replace(/^#/, '')
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.replaceState(null, '', `#${id}`)
  }
}

const TAB_ICONS: Record<HeroBookingTab, typeof IconTemple> = {
  darshan: IconTemple,
  stay: IconBed,
  transport: IconCar,
}

type FieldErrors = Record<string, string>

export function HeroBookingForm({ tab, onTabChange, navigateMode = 'hash' }: Props) {
  const navigate = useNavigate()
  const today = todayIso()
  const maxDarshanDate = addDaysIso(30)

  const [darshanTemple, setDarshanTemple] = useState('')
  const [darshanType, setDarshanType] = useState<string>(HERO_DARSHAN_TYPES[0])
  const [darshanDate, setDarshanDate] = useState('')
  const [devotees, setDevotees] = useState(2)

  const [stayTemple, setStayTemple] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(2)

  const [fromCity, setFromCity] = useState('')
  const [toTemple, setToTemple] = useState('')
  const [travelDate, setTravelDate] = useState('')
  const [transportType, setTransportType] = useState<string>(HERO_TRANSPORT_TYPES[0])

  const [errors, setErrors] = useState<FieldErrors>({})

  const clearErrors = useCallback(() => setErrors({}), [])

  const handleTabChange = (next: HeroBookingTab) => {
    clearErrors()
    onTabChange(next)
  }

  const validateDarshan = (): boolean => {
    const next: FieldErrors = {}
    if (!darshanTemple.trim()) next.temple = 'Please select a temple'
    if (!darshanDate) next.date = 'Please select a date'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const validateStay = (): boolean => {
    const next: FieldErrors = {}
    if (!stayTemple.trim()) next.temple = 'Please select a temple'
    if (!checkIn) next.checkIn = 'Please select a date'
    if (!checkOut) next.checkOut = 'Please select a date'
    if (checkIn && checkOut && checkOut <= checkIn) {
      next.checkOut = 'Check-out must be after check-in'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const validateTransport = (): boolean => {
    const next: FieldErrors = {}
    if (!fromCity.trim()) next.fromCity = 'Please enter your city'
    if (!travelDate) next.travelDate = 'Please select a date'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const goToSection = (hash: string) => {
    if (navigateMode === 'route') {
      navigate(`/darshan${hash}`)
      return
    }
    scrollToHash(hash)
  }

  const ctaDarshan = () => {
    if (!validateDarshan()) return
    goToSection('#packages')
  }

  const ctaStay = () => {
    if (!validateStay()) return
    goToSection('#accommodation')
  }

  const ctaTransport = () => {
    if (!validateTransport()) return
    goToSection('#transport')
  }

  return (
    <>
      <div
        className="darshan__search-tabs-lite darshan__search-tabs-lite--hero3"
        role="tablist"
        aria-label="Booking type"
      >
        {HERO_BOOKING_TABS.map((t) => {
          const Icon = TAB_ICONS[t]
          return (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              className={`darshan__search-tab-lite darshan__search-tab-lite--brand${
                tab === t ? ' darshan__search-tab-lite--brand-active' : ''
              }`}
              onClick={() => handleTabChange(t)}
            >
              <Icon className="darshan__search-tab-ic" aria-hidden />
              <span>{HERO_BOOKING_TAB_LABELS[t]}</span>
            </button>
          )
        })}
      </div>
      <div className="darshan__search-tabs-divider" aria-hidden />

      {tab === 'darshan' && (
        <div
          className="darshan__search-grid darshan__search-grid--lite darshan__search-grid--hero-inline"
          role="tabpanel"
          id="hero-panel-darshan"
          aria-labelledby="hero-tab-darshan"
        >
          <HeroTempleField
            id="hero-darshan-temple"
            value={darshanTemple}
            onChange={setDarshanTemple}
            error={errors.temple}
          />

          <div className="darshan__field darshan__field--lite">
            <label className="darshan__field-label darshan__field-label--lite" htmlFor="hero-darshan-type">
              Darshan Type
            </label>
            <span className="darshan__field-input-wrap darshan__field-input-wrap--lite">
              <IconTicket className="darshan__field-icon darshan__field-icon--lite" aria-hidden />
              <select
                id="hero-darshan-type"
                className="darshan__input darshan__input--lite"
                value={darshanType}
                onChange={(e) => setDarshanType(e.target.value)}
              >
                {HERO_DARSHAN_TYPES.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </span>
          </div>

          <div className="darshan__field darshan__field--lite">
            <label className="darshan__field-label darshan__field-label--lite" htmlFor="hero-darshan-date">
              Darshan Date
            </label>
            <span className="darshan__field-input-wrap darshan__field-input-wrap--lite">
              <IconCalendar className="darshan__field-icon darshan__field-icon--lite" aria-hidden />
              <input
                id="hero-darshan-date"
                className="darshan__input darshan__input--lite"
                type="date"
                min={today}
                max={maxDarshanDate}
                value={darshanDate}
                onChange={(e) => setDarshanDate(e.target.value)}
              />
            </span>
            <p className="darshan__field-hint darshan__field-hint--lite">Slots open up to 30 days in advance</p>
            {errors.date ? (
              <p className="darshan__field-error" role="alert">
                {errors.date}
              </p>
            ) : null}
          </div>

          <div className="darshan__field darshan__field--lite">
            <span className="darshan__field-label darshan__field-label--lite">Devotees</span>
            <span className="darshan__field-input-wrap darshan__field-input-wrap--lite darshan__field-input-wrap--stepper">
              <IconUsers className="darshan__field-icon darshan__field-icon--lite" aria-hidden />
              <HeroNumberStepper
                id="hero-darshan-devotees"
                value={devotees}
                min={1}
                max={10}
                onChange={setDevotees}
                ariaLabel="Number of devotees"
              />
            </span>
            <p className="darshan__field-hint darshan__field-hint--lite">Children under 12 don&apos;t need a ticket</p>
          </div>

          <div className="darshan__field darshan__field--lite darshan__field--hero-cta">
            <button type="button" className="darshan__btn darshan__btn-hero-lite darshan__btn-hero-lite--brand" onClick={ctaDarshan}>
              <span>Check Availability</span>
              <IconChevronRight className="darshan__btn-hero-lite-arrow" aria-hidden />
            </button>
            <p className="darshan__hero-form-trust">Secure checkout · Verified temple partners</p>
          </div>
        </div>
      )}

      {tab === 'stay' && (
        <div
          className="darshan__search-grid darshan__search-grid--lite darshan__search-grid--hero-inline"
          role="tabpanel"
          id="hero-panel-stay"
        >
          <HeroTempleField
            id="hero-stay-temple"
            value={stayTemple}
            onChange={setStayTemple}
            error={errors.temple}
          />

          <div className="darshan__field darshan__field--lite">
            <label className="darshan__field-label darshan__field-label--lite" htmlFor="hero-stay-checkin">
              Check-in
            </label>
            <span className="darshan__field-input-wrap darshan__field-input-wrap--lite">
              <IconCalendar className="darshan__field-icon darshan__field-icon--lite" aria-hidden />
              <input
                id="hero-stay-checkin"
                className="darshan__input darshan__input--lite"
                type="date"
                min={today}
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </span>
            {errors.checkIn ? (
              <p className="darshan__field-error" role="alert">
                {errors.checkIn}
              </p>
            ) : null}
          </div>

          <div className="darshan__field darshan__field--lite">
            <label className="darshan__field-label darshan__field-label--lite" htmlFor="hero-stay-checkout">
              Check-out
            </label>
            <span className="darshan__field-input-wrap darshan__field-input-wrap--lite">
              <IconCalendar className="darshan__field-icon darshan__field-icon--lite" aria-hidden />
              <input
                id="hero-stay-checkout"
                className="darshan__input darshan__input--lite"
                type="date"
                min={checkIn || today}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </span>
            {errors.checkOut ? (
              <p className="darshan__field-error" role="alert">
                {errors.checkOut}
              </p>
            ) : null}
          </div>

          <div className="darshan__field darshan__field--lite">
            <span className="darshan__field-label darshan__field-label--lite">Guests</span>
            <span className="darshan__field-input-wrap darshan__field-input-wrap--lite darshan__field-input-wrap--stepper">
              <IconUsers className="darshan__field-icon darshan__field-icon--lite" aria-hidden />
              <HeroNumberStepper
                id="hero-stay-guests"
                value={guests}
                min={1}
                max={20}
                onChange={setGuests}
                ariaLabel="Number of guests"
              />
            </span>
          </div>

          <div className="darshan__field darshan__field--lite darshan__field--hero-cta">
            <button type="button" className="darshan__btn darshan__btn-hero-lite darshan__btn-hero-lite--brand" onClick={ctaStay}>
              <span>Search Rooms</span>
              <IconChevronRight className="darshan__btn-hero-lite-arrow" aria-hidden />
            </button>
            <p className="darshan__hero-form-trust">Secure checkout · Verified temple partners</p>
          </div>
        </div>
      )}

      {tab === 'transport' && (
        <div
          className="darshan__search-grid darshan__search-grid--lite darshan__search-grid--hero-inline"
          role="tabpanel"
          id="hero-panel-transport"
        >
          <div className="darshan__field darshan__field--lite">
            <label className="darshan__field-label darshan__field-label--lite" htmlFor="hero-transport-from">
              Travelling From
            </label>
            <span className="darshan__field-input-wrap darshan__field-input-wrap--lite">
              <IconMapPin className="darshan__field-icon darshan__field-icon--lite" aria-hidden />
              <input
                id="hero-transport-from"
                className="darshan__input darshan__input--lite"
                type="text"
                list="hero-city-suggestions"
                placeholder="Enter your city"
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)}
              />
            </span>
            <datalist id="hero-city-suggestions">
              {HERO_CITY_SUGGESTIONS.map((city) => (
                <option key={city} value={city} />
              ))}
            </datalist>
            {errors.fromCity ? (
              <p className="darshan__field-error" role="alert">
                {errors.fromCity}
              </p>
            ) : null}
          </div>

          <HeroTempleField
            id="hero-transport-temple"
            label="To Temple"
            value={toTemple}
            onChange={setToTemple}
            placeholder="Select temple / destination"
          />

          <div className="darshan__field darshan__field--lite">
            <label className="darshan__field-label darshan__field-label--lite" htmlFor="hero-transport-date">
              Travel Date
            </label>
            <span className="darshan__field-input-wrap darshan__field-input-wrap--lite">
              <IconCalendar className="darshan__field-icon darshan__field-icon--lite" aria-hidden />
              <input
                id="hero-transport-date"
                className="darshan__input darshan__input--lite"
                type="date"
                min={today}
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
              />
            </span>
            {errors.travelDate ? (
              <p className="darshan__field-error" role="alert">
                {errors.travelDate}
              </p>
            ) : null}
          </div>

          <div className="darshan__field darshan__field--lite">
            <label className="darshan__field-label darshan__field-label--lite" htmlFor="hero-transport-type">
              Transport Type
            </label>
            <span className="darshan__field-input-wrap darshan__field-input-wrap--lite">
              <IconCar className="darshan__field-icon darshan__field-icon--lite" aria-hidden />
              <select
                id="hero-transport-type"
                className="darshan__input darshan__input--lite"
                value={transportType}
                onChange={(e) => setTransportType(e.target.value)}
              >
                {HERO_TRANSPORT_TYPES.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </span>
          </div>

          <div className="darshan__field darshan__field--lite darshan__field--hero-cta">
            <button
              type="button"
              className="darshan__btn darshan__btn-hero-lite darshan__btn-hero-lite--brand"
              onClick={ctaTransport}
            >
              <span>Search Transport</span>
              <IconChevronRight className="darshan__btn-hero-lite-arrow" aria-hidden />
            </button>
            <p className="darshan__hero-form-trust">Secure checkout · Verified temple partners</p>
          </div>
        </div>
      )}
    </>
  )
}
