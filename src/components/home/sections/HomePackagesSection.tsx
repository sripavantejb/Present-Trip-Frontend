import { Link } from 'react-router-dom'
import { TOUR_PACKAGES } from '../../../pages/tourPackagesData'
import { HomeSectionHeader } from './HomeSectionHeader'

export function HomePackagesSection() {
  const preview = TOUR_PACKAGES.filter((p) => !p.featured).slice(0, 3)

  return (
    <section className="pt-home-section pt-home-section--white" aria-labelledby="home-packages-heading">
      <div className="pt-home-section__inner">
        <HomeSectionHeader
          title="Tour Packages"
          subtitle="Curated pilgrimage circuits with stays & transport"
          seeAllHref="/packages"
          seeAllLabel="See all"
        />
        <div className="pt-home-hScroll pt-home-hScroll--fade" id="home-packages-heading">
          {preview.map((p) => (
            <Link key={p.id} to="/packages" className="pt-home-miniCard">
              <img src={p.imageUrl} alt="" loading="lazy" />
              <div className="pt-home-miniCard__body">
                <p className="pt-home-miniCard__title">{p.title}</p>
                <p className="pt-home-miniCard__sub">
                  {p.days}D / {p.nights}N · from ₹{p.pricePerPerson.toLocaleString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
