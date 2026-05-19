import { ChevronRight, Heart } from 'lucide-react'
import { AppIcon } from '../ui/AppIcon'

const DEALS = [
  {
    name: 'The Orion Suites',
    place: 'New Delhi',
    rating: '4.3',
    reviews: 512,
    discount: '20% off',
    price: '2,599',
    tone: 'a' as const,
  },
  {
    name: 'Azure Bay Resort',
    place: 'Goa',
    rating: '4.6',
    reviews: 328,
    discount: '25% off',
    price: '3,899',
    tone: 'b' as const,
  },
  {
    name: 'Cityline Hotel',
    place: 'Bengaluru',
    rating: '4.1',
    reviews: 890,
    discount: '15% off',
    price: '1,999',
    tone: 'c' as const,
  },
  {
    name: 'Harbour View Inn',
    place: 'Mumbai',
    rating: '4.5',
    reviews: 204,
    discount: '20% off',
    price: '4,200',
    tone: 'd' as const,
  },
]

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

      <div className="pt-home__dealsTrack">
        <div className="pt-home__dealsCards" role="list">
          {DEALS.map((d) => (
            <article
              key={d.name}
              className={`pt-home__dealCard pt-home__dealCard--${d.tone}`}
              role="listitem"
            >
              <div className="pt-home__dealMedia">
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
        <button type="button" className="pt-home__dealsScrollBtn" aria-label="More deals">
          <AppIcon icon={ChevronRight} size={22} className="pt-icon" />
        </button>
      </div>
    </section>
  )
}

