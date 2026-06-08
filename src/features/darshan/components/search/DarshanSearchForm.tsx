import {
  CalendarDays,
  ChevronDown,
  ChevronRight,
  Info,
  MapPin,
  Users,
} from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppIcon } from '../../../../components/ui/AppIcon'
import { useDarshanBooking } from '../../context/DarshanBookingContext'
import { POPULAR_CHIPS, fuzzyMatchTemples } from '../../data/temples'
import { crowdLabel, getCrowdForDate, type DayCrowd } from '../../utils/crowdCalendar'
import '../../styles/darshan-v2.css'

function todayIso(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function addDaysIso(days: number): string {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

type Props = {
  showBanner?: boolean
  /** Match homepage search card (flights/hotels) */
  embedded?: boolean
}

export function DarshanSearchForm({ showBanner = true, embedded = false }: Props) {
  const navigate = useNavigate()
  const { loadFromSearch } = useDarshanBooking()
  const listId = useId()
  const wrapRef = useRef<HTMLDivElement>(null)

  const [templeQuery, setTempleQuery] = useState('')
  const [templeId, setTempleId] = useState<string | null>(null)
  const [visitDate, setVisitDate] = useState('')
  const [openList, setOpenList] = useState(false)
  const [openCalendar, setOpenCalendar] = useState(false)
  const [openDevotees, setOpenDevotees] = useState(false)
  const [adults, setAdults] = useState(2)
  const [children, setChildren] = useState(0)
  const [infants, setInfants] = useState(0)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const matches = fuzzyMatchTemples(templeQuery)

  const calMonth = visitDate ? new Date(visitDate + 'T12:00:00') : new Date()
  const [viewYear, setViewYear] = useState(calMonth.getFullYear())
  const [viewMonth, setViewMonth] = useState(calMonth.getMonth())

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpenList(false)
        setOpenDevotees(false)
        setOpenCalendar(false)
      }
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenList(false)
        setOpenDevotees(false)
        setOpenCalendar(false)
      }
    }
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
    }
  }, [])

  const popoverOpen = openCalendar || openDevotees || openList

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const firstDow = new Date(viewYear, viewMonth, 1).getDay()
  const minDate = todayIso()
  const maxDate = addDaysIso(60)

  const selectTemple = (id: string, label: string) => {
    setTempleId(id)
    setTempleQuery(label)
    setOpenList(false)
    setErrors((e) => ({ ...e, temple: '' }))
  }

  const handleSearch = () => {
    const next: Record<string, string> = {}
    if (!templeId) next.temple = 'Please select a temple'
    if (!visitDate) next.date = 'Please select a date'
    setErrors(next)
    if (Object.keys(next).length) return

    loadFromSearch({
      templeId: templeId!,
      visitDate,
      devotees: { adults, children, infants },
    })
    navigate(`/darshan/temple/${templeId}`)
  }

  const devoteeSummary = `${adults} adult${adults !== 1 ? 's' : ''}${children ? `, ${children} child` : ''}${infants ? `, ${infants} infant` : ''}`

  const dateLabel = visitDate
    ? new Date(visitDate + 'T12:00:00').toLocaleDateString('en-IN', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
      })
    : 'Add date'

  const banner = showBanner ? (
    <Link to="/plan" className="dv2-search__banner">
      <div>
        <p className="dv2-search__banner-text">Plan My Pilgrimage</p>
        <p className="dv2-search__banner-sub">Multi-temple itinerary with stays and transport</p>
      </div>
      <ChevronRight size={20} strokeWidth={2} aria-hidden />
    </Link>
  ) : null

  const homePromo = showBanner ? (
    <Link to="/plan" className="pt-home__darshanPromo">
      <span className="pt-home__darshanPromoText">
        <strong>Plan My Pilgrimage</strong>
        <span>Multi-temple itinerary · stays · transport</span>
      </span>
      <ChevronRight size={18} strokeWidth={2} className="pt-home__darshanPromoIcon" aria-hidden />
    </Link>
  ) : null

  const calendarPanel = openCalendar ? (
    <CalendarPanel
      viewYear={viewYear}
      viewMonth={viewMonth}
      setViewYear={setViewYear}
      setViewMonth={setViewMonth}
      daysInMonth={daysInMonth}
      firstDow={firstDow}
      minDate={minDate}
      maxDate={maxDate}
      visitDate={visitDate}
      onSelect={(iso) => {
        setVisitDate(iso)
        setOpenCalendar(false)
        setErrors((e) => ({ ...e, date: '' }))
      }}
    />
  ) : null

  const devoteesPanel = openDevotees ? (
    <div className="dv2-panel">
      <StepperRow label="Adults" sub="Ages 18+" value={adults} min={1} max={10} onChange={setAdults} />
      <StepperRow label="Children" sub="Ages 8–17" value={children} min={0} max={8} onChange={setChildren} />
      <StepperRow label="Infants" sub="Ages 0–7, free" value={infants} min={0} max={4} onChange={setInfants} />
      <button type="button" className="ds-btn ds-btn--primary ds-btn--block ds-btn--sm" onClick={() => setOpenDevotees(false)}>
        Done
      </button>
    </div>
  ) : null

  const footer = (
    <>
      <p className="dv2-search__disclaimer">
        <Info size={16} strokeWidth={2} aria-hidden />
        <span>
          We arrange darshan assistance on your behalf. Our team coordinates your slot and escort at the temple.
        </span>
      </p>
      <div className="dv2-search__chips" role="group" aria-label="Popular destinations">
        {POPULAR_CHIPS.map((chip) => (
          <button
            key={chip.label}
            type="button"
            className="ds-btn ds-btn--pill ds-btn--sm dv2-search__chip"
            onClick={() => {
              const t = fuzzyMatchTemples('').find((x) => x.id === chip.templeId)
              if (t) selectTemple(t.id, t.shortName)
            }}
          >
            {chip.label}
          </button>
        ))}
      </div>
    </>
  )

  if (embedded) {
    return (
      <div
        ref={wrapRef}
        className={`pt-home__darshanPanel${popoverOpen ? ' pt-home__darshanPanel--open' : ''}`}
      >
        {homePromo}

        <div className="pt-home__darshanSearchBody">
          <div className="pt-home__fieldsWrap pt-home__darshanFields">
            <div
              className="pt-home__grid pt-home__grid--mock pt-home__grid--darshan"
              role="group"
              aria-label="Darshan search"
            >
            <div
              className={`pt-home__cell pt-home__cell--withIcon pt-home__cell--darshan-temple dv2-cell--combobox${openList ? ' pt-home__cell--active' : ''}`}
            >
              <span className="pt-home__cellIconBadge">
                <AppIcon icon={MapPin} size={18} className="pt-icon pt-icon--field" />
              </span>
              <div className="pt-home__cellStack">
                <span className="pt-home__cellLabel">Temple / Destination</span>
                <input
                  id="dv2-temple-embed"
                  className="dv2-cell__input"
                  type="text"
                  role="combobox"
                  aria-expanded={openList}
                  aria-controls={listId}
                  aria-invalid={Boolean(errors.temple)}
                  placeholder="Search temples"
                  value={templeQuery}
                  onChange={(e) => {
                    setTempleQuery(e.target.value)
                    setTempleId(null)
                    setOpenList(true)
                  }}
                  onFocus={() => setOpenList(true)}
                />
              </div>
              {openList && matches.length > 0 ? (
                <ul
                  id={listId}
                  className="pt-home__darshanPopover pt-home__darshanPopover--list dv2-combobox__list"
                  role="listbox"
                >
                  {matches.map((t) => (
                    <li key={t.id} role="option" aria-selected={templeId === t.id}>
                      <button
                        type="button"
                        className="dv2-combobox__option"
                        onMouseDown={() => selectTemple(t.id, t.shortName)}
                      >
                        {t.shortName}
                        <span className="dv2-combobox__option-sub">{t.location}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            <button
              type="button"
              className={`pt-home__cell pt-home__cell--withIcon pt-home__cell--darshan-date${openCalendar ? ' pt-home__cell--active' : ''}`}
              aria-expanded={openCalendar}
              onClick={() => {
                setOpenCalendar((o) => !o)
                setOpenDevotees(false)
                setOpenList(false)
              }}
            >
              <span className="pt-home__cellIconBadge">
                <AppIcon icon={CalendarDays} size={18} className="pt-icon pt-icon--field" />
              </span>
              <div className="pt-home__cellStack">
                <span className="pt-home__cellLabel">Date of visit</span>
                <span
                  className={
                    visitDate ? 'pt-home__cellMain' : 'pt-home__cellMain pt-home__cellMain--placeholder'
                  }
                >
                  {dateLabel}
                </span>
              </div>
              <ChevronDown size={18} className="pt-home__cellChevron" aria-hidden />
              {openCalendar ? (
                <div className="pt-home__darshanPopover pt-home__darshanPopover--calendar" role="dialog" aria-label="Choose visit date">
                  {calendarPanel}
                </div>
              ) : null}
            </button>

            <button
              type="button"
              className={`pt-home__cell pt-home__cell--withIcon pt-home__cell--darshan-devotees${openDevotees ? ' pt-home__cell--active' : ''}`}
              aria-expanded={openDevotees}
              onClick={() => {
                setOpenDevotees((o) => !o)
                setOpenCalendar(false)
                setOpenList(false)
              }}
            >
              <span className="pt-home__cellIconBadge">
                <AppIcon icon={Users} size={18} className="pt-icon pt-icon--field" />
              </span>
              <div className="pt-home__cellStack">
                <span className="pt-home__cellLabel">Devotees</span>
                <span className="pt-home__cellMain">{devoteeSummary}</span>
              </div>
              <ChevronDown size={18} className="pt-home__cellChevron" aria-hidden />
              {openDevotees ? (
                <div className="pt-home__darshanPopover pt-home__darshanPopover--devotees" role="dialog" aria-label="Choose devotees">
                  {devoteesPanel}
                </div>
              ) : null}
            </button>
            </div>

            {errors.temple || errors.date ? (
              <div className="pt-home__darshanErrors" role="alert">
                {errors.temple ? <p>{errors.temple}</p> : null}
                {errors.date ? <p>{errors.date}</p> : null}
              </div>
            ) : null}
          </div>

          <div className="pt-home__darshanPopular">
            <span className="pt-home__darshanPopularLabel">Popular destinations</span>
            <div className="pt-home__darshanChips" role="group" aria-label="Popular destinations">
              {POPULAR_CHIPS.map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  className="pt-home__darshanChip"
                  onClick={() => {
                    const t = fuzzyMatchTemples('').find((x) => x.id === chip.templeId)
                    if (t) selectTemple(t.id, t.shortName)
                  }}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-home__searchCtaInner pt-home__darshanCta">
            <button type="button" className="pt-home__searchBtn" onClick={handleSearch}>
              Search darshan
            </button>
          </div>
        </div>

        <p className="pt-home__darshanNote">
          <Info size={15} strokeWidth={2} aria-hidden />
          <span>
            We arrange darshan assistance on your behalf. Our team coordinates your slot and escort at the temple.
          </span>
        </p>
      </div>
    )
  }

  return (
    <div className={`dv2-search${popoverOpen ? ' dv2-search--popover-open' : ''}`} ref={wrapRef}>
      {banner}
      <div className="dv2-field dv2-combobox">
        <label className="dv2-field__label" htmlFor="dv2-temple">
          Temple / Destination
        </label>
        <div className="dv2-field__input-wrap">
          <MapPin size={18} strokeWidth={2} aria-hidden />
          <input
            id="dv2-temple"
            className="dv2-field__input"
            type="text"
            role="combobox"
            aria-expanded={openList}
            aria-controls={listId}
            placeholder="Search temples"
            value={templeQuery}
            onChange={(e) => {
              setTempleQuery(e.target.value)
              setTempleId(null)
              setOpenList(true)
            }}
            onFocus={() => setOpenList(true)}
          />
        </div>
        {openList && matches.length > 0 && (
          <ul id={listId} className="dv2-combobox__list" role="listbox">
            {matches.map((t) => (
              <li key={t.id} role="option" aria-selected={templeId === t.id}>
                <button
                  type="button"
                  className="dv2-combobox__option"
                  onMouseDown={() => selectTemple(t.id, t.shortName)}
                >
                  {t.shortName}
                  <span className="dv2-combobox__option-sub">{t.location}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
        {errors.temple ? <p className="dv2-field__error">{errors.temple}</p> : null}
      </div>

      <div className="dv2-field dv2-field--popover">
        <span className="dv2-field__label">Date of visit</span>
        <button type="button" className="dv2-field__input-wrap dv2-field__trigger" onClick={() => setOpenCalendar((o) => !o)}>
          <CalendarDays size={18} strokeWidth={2} aria-hidden />
          <span className="dv2-field__input">{dateLabel}</span>
          <ChevronDown size={18} aria-hidden />
        </button>
        {calendarPanel}
        {errors.date ? <p className="dv2-field__error">{errors.date}</p> : null}
      </div>

      <div className="dv2-field dv2-field--popover">
        <span className="dv2-field__label">Devotees</span>
        <button type="button" className="dv2-field__input-wrap dv2-field__trigger" onClick={() => setOpenDevotees((o) => !o)}>
          <Users size={18} strokeWidth={2} aria-hidden />
          <span className="dv2-field__input">{devoteeSummary}</span>
          <ChevronDown size={18} aria-hidden />
        </button>
        {devoteesPanel}
      </div>

      <button type="button" className="ds-btn ds-btn--primary ds-btn--block" onClick={handleSearch}>
        Search darshan
      </button>
      {footer}
    </div>
  )
}

function CalendarPanel({
  viewYear,
  viewMonth,
  setViewYear,
  setViewMonth,
  daysInMonth,
  firstDow,
  minDate,
  maxDate,
  visitDate,
  onSelect,
}: {
  viewYear: number
  viewMonth: number
  setViewYear: (y: number | ((n: number) => number)) => void
  setViewMonth: (m: number | ((n: number) => number)) => void
  daysInMonth: number
  firstDow: number
  minDate: string
  maxDate: string
  visitDate: string
  onSelect: (iso: string) => void
}) {
  return (
    <div className="dv2-cal dv2-panel">
      <div className="dv2-cal__nav">
        <button
          type="button"
          className="dv2-cal__nav-btn"
          aria-label="Previous month"
          onClick={() => {
            if (viewMonth === 0) {
              setViewMonth(11)
              setViewYear((y) => y - 1)
            } else setViewMonth((m) => m - 1)
          }}
        >
          ‹
        </button>
        <span className="dv2-cal__month">
          {new Date(viewYear, viewMonth).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
        </span>
        <button
          type="button"
          className="dv2-cal__nav-btn"
          aria-label="Next month"
          onClick={() => {
            if (viewMonth === 11) {
              setViewMonth(0)
              setViewYear((y) => y + 1)
            } else setViewMonth((m) => m + 1)
          }}
        >
          ›
        </button>
      </div>
      <div className="dv2-cal__legend">
        <span><i className="dv2-cal__dot dv2-cal__dot--low" /> Lower crowd</span>
        <span><i className="dv2-cal__dot dv2-cal__dot--high" /> Higher crowd</span>
      </div>
      <div className="dv2-cal__grid">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
          <span key={d} className="dv2-cal__day-name">
            {d}
          </span>
        ))}
        {Array.from({ length: firstDow }).map((_, i) => (
          <span key={`e-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1
          const iso = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
          const crowd: DayCrowd = getCrowdForDate(new Date(iso + 'T12:00:00'))
          const disabled = iso < minDate || iso > maxDate
          const selected = visitDate === iso
          return (
            <button
              key={iso}
              type="button"
              disabled={disabled}
              className={`dv2-cal__cell${selected ? ' dv2-cal__cell--selected' : ''}`}
              onClick={() => onSelect(iso)}
            >
              <span className="dv2-cal__cell-num">{day}</span>
              <span className={`dv2-cal__dot dv2-cal__dot--${crowd === 'low' ? 'low' : crowd === 'high' ? 'high' : 'mod'}`} />
              <span className="visually-hidden">{crowdLabel(crowd)}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

function StepperRow({
  label,
  sub,
  value,
  min,
  max,
  onChange,
}: {
  label: string
  sub: string
  value: number
  min: number
  max: number
  onChange: (n: number) => void
}) {
  return (
    <div className="dv2-stepper-row">
      <div>
        <div className="dv2-stepper__label">{label}</div>
        <div className="dv2-stepper__sub">{sub}</div>
      </div>
      <div className="dv2-stepper__ctrl">
        <button
          type="button"
          className="dv2-stepper__btn"
          aria-label={`Decrease ${label}`}
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
        >
          −
        </button>
        <span className="dv2-stepper__val">{value}</span>
        <button
          type="button"
          className="dv2-stepper__btn"
          aria-label={`Increase ${label}`}
          disabled={value >= max}
          onClick={() => onChange(Math.min(max, value + 1))}
        >
          +
        </button>
      </div>
    </div>
  )
}
