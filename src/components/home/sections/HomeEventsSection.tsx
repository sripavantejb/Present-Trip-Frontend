import { Link } from 'react-router-dom'
import { EVENTS, EVENT_TYPE_LABELS } from '../../../data/events'
import { HomeSectionHeader } from './HomeSectionHeader'

export function HomeEventsSection() {
  const preview = EVENTS.slice(0, 3)

  return (
    <section className="pt-home-section pt-home-section--muted" aria-labelledby="home-events-heading">
      <div className="pt-home-section__inner">
        <HomeSectionHeader
          title="Upcoming Events"
          subtitle="Festivals, special pujas & live ceremonies"
          seeAllHref="/events"
          seeAllLabel="See all"
        />
        <div className="pt-home-hScroll pt-home-hScroll--fade" id="home-events-heading">
          {preview.map((e) => (
            <Link key={e.id} to="/events" className="pt-home-miniCard">
              <img src={e.imageUrl} alt={e.imageAlt} loading="lazy" />
              <div className="pt-home-miniCard__body">
                <p className="pt-home-miniCard__sub">{EVENT_TYPE_LABELS[e.type]}</p>
                <p className="pt-home-miniCard__title">{e.name}</p>
                <p className="pt-home-miniCard__sub">
                  {e.date} · {e.location}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
