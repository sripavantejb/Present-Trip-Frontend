import { Link } from 'react-router-dom'
import { DEALS } from '../../../data/deals'
import { HomeSectionHeader } from './HomeSectionHeader'

export function HomeOffersStrip() {
  const preview = DEALS.slice(0, 3)

  return (
    <section className="pt-home-section pt-home-section--offers" aria-labelledby="home-offers-heading">
      <div className="pt-home-section__inner">
        <HomeSectionHeader
          title="Offers & Deals"
          subtitle="Exclusive coupons for your next pilgrimage"
          seeAllHref="/deals"
          seeAllLabel="See all"
        />
        <div className="pt-home-hScroll pt-home-hScroll--fade" id="home-offers-heading">
          {preview.map((d) => (
            <Link key={d.id} to="/deals" className="pt-home-offerCard">
              <p className="pt-home-offerCard__discount">{d.discount}</p>
              <p className="pt-home-miniCard__title">{d.title}</p>
              <p className="pt-home-miniCard__sub">{d.description}</p>
              <span className="pt-home-miniCard__sub">Code: {d.couponCode}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
