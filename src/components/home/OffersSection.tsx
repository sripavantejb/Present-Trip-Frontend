import { Heart } from 'lucide-react'
import { WEEKEND_DEALS } from '../../config/homePageContent'
import { AppIcon } from '../ui/AppIcon'

export function OffersSection() {
  return (
    <section id="dutyfree" className="pt-home__deals" aria-labelledby="deals-heading">
      <div className="pt-home__dealsHead">
        <div>
          <h2 id="deals-heading" className="pt-home__dealsTitle">
            Last-minute weekend deals
          </h2>
          <p className="pt-home__dealsSub">
            Minimum 20% off deals for your next weekend getaway!
          </p>
        </div>
        <a href="#deals" className="pt-home__dealsSeeAll">
          See all deals
        </a>
      </div>

      <div className="pt-home__dealsGrid" role="list">
        {WEEKEND_DEALS.map((d) => (
          <article key={d.name} className="pt-home__dealCard" role="listitem">
            <div className="pt-home__dealMedia">
              <img className="pt-home__dealImg" src={d.image} alt={d.imageAlt} loading="lazy" />
              <button type="button" className="pt-home__dealHeart" aria-label="Save deal">
                <AppIcon icon={Heart} size={18} className="pt-icon" />
              </button>
            </div>
            <div className="pt-home__dealBody">
              <h3 className="pt-home__dealName">{d.name}</h3>
              <p className="pt-home__dealPlace">{d.place}</p>
              <div className="pt-home__dealRating">
                <span className="pt-home__dealDot" aria-hidden />
                <span>
                  {d.rating} ({d.reviews} reviews)
                </span>
              </div>
              <div className="pt-home__dealRow">
                <span className="pt-home__dealTag">{d.discount}</span>
              </div>
              <p className="pt-home__dealPrice">
                From <strong>₹{d.price}</strong> / night
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
