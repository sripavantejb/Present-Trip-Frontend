import { Link } from 'react-router-dom'

export function PlanPilgrimageCTABlock() {
  return (
    <section className="pt-home-section pt-home-section--navy" aria-labelledby="home-plan-cta-heading">
      <div className="pt-home-section__inner">
        <div className="pt-home-planCta">
          <h2 id="home-plan-cta-heading" className="pt-home-sectionTitle">
            Plan Your Complete Pilgrimage
          </h2>
          <p className="pt-home-sectionSub">
            Choose your hub, select temples, and get a day-by-day itinerary — darshan, stays & transport in one flow.
          </p>
          <Link to="/plan" className="pt-home-btn pt-home-btn--primary">
            Plan My Pilgrimage
          </Link>
        </div>
      </div>
    </section>
  )
}
