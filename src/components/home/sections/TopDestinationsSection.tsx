import { TOP_DESTINATIONS } from '../../../config/homePageContent'
import { HomeSectionHeader } from './HomeSectionHeader'

function DestinationCard({ dest }: { dest: (typeof TOP_DESTINATIONS)[number] }) {
  return (
    <article className="pt-home-card pt-home-destCard">
      <img className="pt-home-destImg" src={dest.image} alt={dest.imageAlt} loading="lazy" />
      <div className="pt-home-destScrim" aria-hidden />
      <div className="pt-home-destContent">
        <h3 className="pt-home-destName">{dest.name}</h3>
        <p className="pt-home-destTagline">{dest.tagline}</p>
      </div>
      <button type="button" className="pt-home-btn pt-home-btn--pill pt-home-destExplore">
        Explore
      </button>
    </article>
  )
}

export function TopDestinationsSection() {
  return (
    <section className="pt-home-section pt-home-section--muted" aria-labelledby="dest-heading">
      <div className="pt-home-section__inner">
        <HomeSectionHeader
          title="Top Destinations This Season"
          subtitle="Where will your next adventure take you?"
        />
        <div className="pt-home-destGrid">
          {TOP_DESTINATIONS.map((dest) => (
            <DestinationCard key={dest.id} dest={dest} />
          ))}
        </div>
      </div>
    </section>
  )
}
