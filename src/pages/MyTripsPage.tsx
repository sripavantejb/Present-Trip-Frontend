import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { SiteLayout } from '../components/layout/SiteLayout'
import '../styles/pilgrimage-theme.css'
import './my-trips.css'

type TripStatus = 'ongoing' | 'upcoming' | 'completed' | 'cancelled' | 'confirmed' | 'pending'
type TripFilter = 'all' | 'ongoing' | 'upcoming' | 'completed' | 'cancelled'
type DateGroup = 'today' | 'this-week' | 'this-month' | 'earlier'

type Booking = {
  id: string
  service: 'flight' | 'hotel' | 'cab' | 'darshan'
  destination: string
  date: string
  dateGroup: DateGroup
  people: number
  time: string
  ref: string
  status: TripStatus
  price: number
  refund?: number
}

const BOOKINGS: Booking[] = [
  {
    id: 'b1',
    service: 'darshan',
    destination: 'Tirumala — Special Entry Darshan',
    date: 'Sat 14 Jun 2026',
    dateGroup: 'today',
    people: 2,
    time: '6:00 AM slot',
    ref: 'PT-DAR-88421',
    status: 'upcoming',
    price: 1200,
  },
  {
    id: 'b2',
    service: 'hotel',
    destination: 'Hotel Bliss, Tirupati',
    date: 'Fri 13 – Sun 15 Jun 2026',
    dateGroup: 'this-week',
    people: 2,
    time: 'Check-in 2:00 PM',
    ref: 'PT-HTL-55201',
    status: 'confirmed',
    price: 4800,
  },
  {
    id: 'b3',
    service: 'flight',
    destination: 'Bangalore → Tirupati',
    date: 'Fri 13 Jun 2026',
    dateGroup: 'this-week',
    people: 2,
    time: '7:45 AM departure',
    ref: 'PT-FLT-99102',
    status: 'ongoing',
    price: 6200,
  },
  {
    id: 'b4',
    service: 'cab',
    destination: 'Airport pickup — Tirupati',
    date: 'Fri 13 Jun 2026',
    dateGroup: 'this-month',
    people: 2,
    time: '9:30 AM',
    ref: 'PT-CAB-33108',
    status: 'completed',
    price: 850,
  },
  {
    id: 'b5',
    service: 'darshan',
    destination: 'Shirdi — Sai Baba Darshan',
    date: 'Mon 3 Mar 2026',
    dateGroup: 'earlier',
    people: 4,
    time: '10:00 AM',
    ref: 'PT-DAR-77219',
    status: 'cancelled',
    price: 0,
    refund: 2400,
  },
  {
    id: 'b6',
    service: 'darshan',
    destination: 'Padmavathi Temple — Tiruchanur',
    date: 'Wed 18 Jun 2026',
    dateGroup: 'this-month',
    people: 2,
    time: '8:00 AM',
    ref: 'PT-DAR-99201',
    status: 'pending',
    price: 600,
  },
]

const FILTERS: { id: TripFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'ongoing', label: 'Ongoing' },
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'completed', label: 'Completed' },
  { id: 'cancelled', label: 'Cancelled' },
]

const DATE_GROUP_LABELS: Record<DateGroup, string> = {
  today: 'Today',
  'this-week': 'This Week',
  'this-month': 'This Month',
  earlier: 'Earlier',
}

const DATE_GROUP_ORDER: DateGroup[] = ['today', 'this-week', 'this-month', 'earlier']

const SERVICE_ICONS: Record<Booking['service'], string> = {
  flight: '✈',
  hotel: '🏨',
  cab: '🚗',
  darshan: '🛕',
}

const STATUS_BADGE: Record<string, string> = {
  ongoing: 'orange',
  upcoming: 'gold',
  completed: 'grey',
  cancelled: 'red',
  confirmed: 'green',
  pending: 'orange',
}

function matchesFilter(status: TripStatus, filter: TripFilter): boolean {
  if (filter === 'all') return true
  if (filter === 'upcoming') return status === 'upcoming' || status === 'confirmed' || status === 'pending'
  return status === filter
}

function EmptyState() {
  return (
    <div className="pil-trips__empty">
      <svg className="pil-trips__empty-svg" viewBox="0 0 120 100" aria-hidden>
        <rect x="20" y="30" width="80" height="50" rx="8" fill="var(--color-surface-soft)" stroke="var(--color-hairline)" />
        <circle cx="60" cy="55" r="12" fill="var(--color-primary)" opacity="0.2" />
        <path d="M35 75 L60 50 L85 75" stroke="var(--color-primary)" fill="none" strokeWidth="2" />
      </svg>
      <h2>No trips in this category</h2>
      <p>Start planning your next pilgrimage with darshan, stays, and transport in one place.</p>
      <Link to="/plan" className="ds-btn ds-btn--primary">
        Plan My Pilgrimage
      </Link>
    </div>
  )
}

export default function MyTripsPage() {
  const [filter, setFilter] = useState<TripFilter>('all')

  const counts = useMemo(() => {
    const map: Record<TripFilter, number> = {
      all: BOOKINGS.length,
      ongoing: 0,
      upcoming: 0,
      completed: 0,
      cancelled: 0,
    }
    for (const b of BOOKINGS) {
      for (const f of FILTERS) {
        if (f.id !== 'all' && matchesFilter(b.status, f.id)) map[f.id]++
      }
    }
    return map
  }, [])

  const filtered = useMemo(() => {
    if (filter === 'all') return BOOKINGS
    return BOOKINGS.filter((b) => matchesFilter(b.status, filter))
  }, [filter])

  const grouped = useMemo(() => {
    const map = new Map<DateGroup, Booking[]>()
    for (const b of filtered) {
      const list = map.get(b.dateGroup) ?? []
      list.push(b)
      map.set(b.dateGroup, list)
    }
    return DATE_GROUP_ORDER.filter((g) => map.has(g)).map((g) => [g, map.get(g)!] as const)
  }, [filtered])

  return (
    <SiteLayout>
      <div className="pil-page pil-trips">
        <header className="pil-page-hero pil-trips__hero">
          <div className="pil-page__inner">
            <span className="pil-eyebrow">Your account</span>
            <h1 className="pil-page-hero__title">My Trips</h1>
            <p className="pil-page-hero__lead">All your bookings — flights, stays, transport &amp; darshan</p>
          </div>
        </header>

        <div className="pil-trips__content pil-page__inner">
          <div className="pil-trips__tabs pil-tabs pil-tabs--pro">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`pil-tab${filter === f.id ? ' pil-tab--active' : ''}`}
                onClick={() => setFilter(f.id)}
              >
                {f.label} ({counts[f.id]})
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <EmptyState />
          ) : (
            grouped.map(([group, bookings]) => (
              <section key={group} className="pil-trips__group">
                <h2 className="pil-trips__group-title">{DATE_GROUP_LABELS[group]}</h2>
                {bookings.map((b) => {
                  const badgeKey = STATUS_BADGE[b.status] ?? 'grey'
                  const statusLabel =
                    b.status === 'confirmed'
                      ? 'Confirmed'
                      : b.status.charAt(0).toUpperCase() + b.status.slice(1)
                  return (
                    <article key={b.id} className="pil-booking-card pil-card pil-card--pro">
                      <div className="pil-booking-card__icon" aria-hidden>
                        {SERVICE_ICONS[b.service]}
                      </div>
                      <div>
                        <h3 className="pil-booking-card__title">{b.destination}</h3>
                        <p className="pil-booking-card__meta">
                          {b.date} · {b.people} {b.people === 1 ? 'person' : 'people'} · {b.time}
                        </p>
                        <p className="pil-booking-card__ref">Ref: {b.ref}</p>
                        <span className={`pil-badge pil-badge--${badgeKey}`} style={{ marginTop: 'var(--space-sm)' }}>
                          {statusLabel}
                        </span>
                        {b.refund ? (
                          <p className="pil-booking-card__refund">Refund: ₹{b.refund.toLocaleString()}</p>
                        ) : null}
                        <div className="pil-booking-card__actions">
                          {b.status === 'completed' ? (
                            <button type="button" className="pil-btn pil-btn--outline pil-btn--sm">
                              ⭐ Rate
                            </button>
                          ) : null}
                          {b.status === 'pending' ? (
                            <button type="button" className="pil-btn pil-btn--gold pil-btn--sm">
                              Complete Payment
                            </button>
                          ) : null}
                        </div>
                      </div>
                      <div className="pil-booking-card__right">
                        {b.price > 0 ? <p className="pil-booking-card__price">₹{b.price.toLocaleString()}</p> : null}
                        <a href={`#booking-${b.id}`} className="pil-booking-card__details">
                          Details &gt;
                        </a>
                      </div>
                    </article>
                  )
                })}
              </section>
            ))
          )}

          <Link to="/support" className="pil-btn pil-btn--outline" style={{ marginTop: 'var(--space-lg)' }}>
            Need help with a trip?
          </Link>
        </div>
      </div>
    </SiteLayout>
  )
}
