import { MEMBER_OFFERS } from '../../../config/homePageContent'
import { HomeSectionHeader } from './HomeSectionHeader'

export function ExclusiveOffersSection() {
  return (
    <section className="pt-home-section pt-home-section--offers" aria-labelledby="offers-heading">
      <div className="pt-home-section__inner">
        <HomeSectionHeader
          title="Exclusive Offers for You"
          subtitle="Limited time deals — don't miss out"
        />
        <div className="pt-home-offersGrid">
          {MEMBER_OFFERS.map((offer) => (
            <article key={offer.id} className="pt-home-card pt-home-offerCard">
              <div className="pt-home-offerMedia">
                <img
                  className="pt-home-offerImg"
                  src={offer.image}
                  alt={offer.imageAlt}
                  loading="lazy"
                />
                <span
                  className={`pt-home-offerAccent pt-home-offerAccent--${offer.accent}`}
                  aria-hidden
                />
              </div>
              <div className="pt-home-offerBody">
                <h3 className="pt-home-offerHeadline">{offer.headline}</h3>
                <p className="pt-home-offerDesc">{offer.description}</p>
                <div className="pt-home-offerActions">
                  <span className="pt-home-offerExpiry">{offer.expiry}</span>
                  <button type="button" className="pt-home-btn pt-home-btn--primary">
                    Claim Offer
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
