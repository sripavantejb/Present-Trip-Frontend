import { Link } from 'react-router-dom'
import { SiteLayout } from '../components/layout/SiteLayout'

const TRIPS = [
  {
    id: '1',
    title: 'Delhi → Bengaluru',
    meta: 'Thu 15 May – Fri 16 May · 1 traveller · Economy',
    status: 'Confirmed',
  },
  {
    id: '2',
    title: 'Orion Suites, New Delhi',
    meta: 'Check-in 20 Jun · 2 nights',
    status: 'Upcoming',
  },
]

export default function MyTripsPage() {
  return (
    <SiteLayout>
      <div className="ds-pageHero">
        <h1 className="ds-display-xl">My Trips</h1>
        <p className="ds-body-md">Upcoming and past bookings in one place.</p>
      </div>
      <div className="ds-pageContent">
        {TRIPS.length === 0 ? (
          <p className="ds-body-md">
            No trips yet.{' '}
            <Link to="/">Search flights and stays</Link>
          </p>
        ) : (
          <div className="ds-tripsGrid">
            {TRIPS.map((trip) => (
              <article key={trip.id} className="ds-tripCard">
                <div className="ds-tripCard__media" aria-hidden />
                <div>
                  <h2 className="ds-title-md">{trip.title}</h2>
                  <p className="ds-body-sm" style={{ marginTop: 'var(--space-xs)' }}>
                    {trip.meta}
                  </p>
                  <p className="ds-caption" style={{ marginTop: 'var(--space-sm)' }}>
                    {trip.status}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
        <Link to="/support" className="ds-btn ds-btn--tertiary" style={{ marginTop: 'var(--space-lg)' }}>
          Need help with a trip?
        </Link>
      </div>
    </SiteLayout>
  )
}
