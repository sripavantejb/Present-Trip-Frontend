import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell, BellOff } from 'lucide-react'
import { SiteLayout } from '../components/layout/SiteLayout'
import { EVENTS, EVENT_TYPE_LABELS, MONTH_LABELS, type EventItem } from '../data/events'
import '../styles/pilgrimage-theme.css'
import './events.css'

function EventCard({ event }: { event: EventItem }) {
  const [reminded, setReminded] = useState(false)

  return (
    <article className="pil-event-card pil-card pil-card--pro">
      <div className="pil-event-card__img-wrap">
        <img className="pil-event-card__img" src={event.imageUrl} alt={event.imageAlt} loading="lazy" />
        <span className={`pil-event-card__badge pil-event-card__badge--${event.type}`}>
          {EVENT_TYPE_LABELS[event.type]}
        </span>
      </div>
      <div className="pil-event-card__body">
        <h3 className="pil-event-card__name">{event.name}</h3>
        <p className="pil-event-card__loc">{event.location}</p>
        <p className="pil-event-card__when">
          {event.date} · {event.time}
        </p>
        <p className="pil-event-card__attendees">{event.attendees}</p>
        <div className="pil-event-card__actions">
          <button
            type="button"
            className={`pil-btn pil-btn--outline pil-event-card__remind${reminded ? ' pil-event-card__remind--on' : ''}`}
            onClick={() => setReminded((v) => !v)}
          >
            {reminded ? <BellOff size={16} aria-hidden /> : <Bell size={16} aria-hidden />}
            {reminded ? 'Reminder set' : 'Remind Me'}
          </button>
          {event.hasSpecialEntry ? (
            <Link to="/darshan" className="pil-link pil-event-card__entry">
              Book Special Entry →
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  )
}

export default function EventsPage() {
  const [month, setMonth] = useState<number | 'all'>('all')

  const featured = useMemo(() => {
    const upcoming = EVENTS.filter((e) => e.type === 'upcoming' || e.type === 'special-puja')
    return upcoming[0] ?? EVENTS[0]
  }, [])

  const filtered = useMemo(() => {
    if (month === 'all') return EVENTS.filter((e) => e.id !== featured.id)
    return EVENTS.filter((e) => e.month === month && e.id !== featured.id)
  }, [month, featured.id])

  return (
    <SiteLayout>
      <div className="pil-page pil-events">
        <div className="pil-page__inner">
        <header className="pil-page-hero">
          <span className="pil-eyebrow">Discover</span>
          <h1 className="pil-page-hero__title">Upcoming Events</h1>
          <p className="pil-page-hero__lead">Festivals, special pujas, and live ceremonies across India</p>
        </header>

        <div className="pil-events__months pil-tabs pil-tabs--pro" role="tablist">
          <button
            type="button"
            role="tab"
            className={`pil-tab${month === 'all' ? ' pil-tab--active' : ''}`}
            onClick={() => setMonth('all')}
          >
            All
          </button>
          {MONTH_LABELS.map((label, i) => (
            <button
              key={label}
              type="button"
              role="tab"
              aria-selected={month === i}
              className={`pil-tab${month === i ? ' pil-tab--active' : ''}`}
              onClick={() => setMonth(i)}
            >
              {label}
            </button>
          ))}
        </div>

        <article className="pil-events__featured pil-card pil-card--pro">
          <img className="pil-events__featured-img" src={featured.imageUrl} alt={featured.imageAlt} />
          <div className="pil-events__featured-body">
            <span className={`pil-event-card__badge pil-event-card__badge--${featured.type}`}>
              {EVENT_TYPE_LABELS[featured.type]}
            </span>
            <h2>{featured.name}</h2>
            <p>{featured.location}</p>
            <p>
              {featured.date} · {featured.time}
            </p>
            <p className="pil-events__featured-att">{featured.attendees}</p>
            {featured.hasSpecialEntry ? (
              <Link to="/darshan" className="pil-btn pil-btn--gold">
                Book Special Entry
              </Link>
            ) : null}
          </div>
        </article>

        <div className="pil-events__grid">
          {filtered.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
        </div>
      </div>
    </SiteLayout>
  )
}
