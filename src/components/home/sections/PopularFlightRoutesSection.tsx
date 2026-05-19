import { ArrowRight, Plane } from 'lucide-react'
import { POPULAR_FLIGHT_ROUTES } from '../../../config/homePageContent'
import { AppIcon } from '../../ui/AppIcon'
import { HomeSectionHeader } from './HomeSectionHeader'

export function PopularFlightRoutesSection() {
  return (
    <section className="pt-home-section pt-home-section--white" aria-labelledby="routes-heading">
      <div className="pt-home-section__inner">
        <HomeSectionHeader
          title="Popular Flight Routes"
          subtitle="Handpicked deals on top routes across India"
        />
        <div className="pt-home-routesGrid" role="list">
          {POPULAR_FLIGHT_ROUTES.map((route) => (
            <article key={route.id} className="pt-home-card pt-home-routeCard" role="listitem">
              <div className="pt-home-routeTop">
                <AppIcon icon={Plane} size={18} aria-hidden />
                <span className="pt-home-routeCities">
                  {route.from}{' '}
                  <ArrowRight size={14} strokeWidth={2.5} aria-hidden style={{ display: 'inline', verticalAlign: 'middle' }} />{' '}
                  {route.to}
                </span>
              </div>
              <div className="pt-home-routeMeta">
                <span className="pt-home-routeDuration">{route.duration}</span>
                <span className="pt-home-routePrice">From ₹{route.price}</span>
              </div>
              <button type="button" className="pt-home-btn pt-home-btn--outline pt-home-routeBook">
                Book
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
