import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HERO_DARSHAN_TYPES } from './darshanData'
import { HeroNumberStepper } from './components/HeroNumberStepper'
import { HeroTempleField } from './components/HeroTempleField'
import {
  IconCalendar,
  IconChevronRight,
  IconTicket,
  IconUsers,
} from './DarshanIcons'

type NavigateMode = 'hash' | 'route'

type Props = {
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

type FieldErrors = Record<string, string>

export function HeroBookingForm({ navigateMode = 'hash' }: Props) {
  const navigate = useNavigate()
  const today = todayIso()
  const maxDarshanDate = addDaysIso(30)

  const [darshanTemple, setDarshanTemple] = useState('')
  const [darshanType, setDarshanType] = useState<string>(HERO_DARSHAN_TYPES[0])
  const [darshanDate, setDarshanDate] = useState('')
  const [devotees, setDevotees] = useState(2)

  const [errors, setErrors] = useState<FieldErrors>({})

  const clearErrors = useCallback(() => setErrors({}), [])

  const validateDarshan = (): boolean => {
    const next: FieldErrors = {}
    if (!darshanTemple.trim()) next.temple = 'Please select a temple'
    if (!darshanDate) next.date = 'Please select a date'
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

  return (
    <div
      className="darshan__search-grid darshan__search-grid--lite darshan__search-grid--hero-inline"
      role="region"
      aria-label="Darshan booking"
    >
      <HeroTempleField
        id="hero-darshan-temple"
        value={darshanTemple}
        onChange={(v) => {
          clearErrors()
          setDarshanTemple(v)
        }}
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
  )
}
