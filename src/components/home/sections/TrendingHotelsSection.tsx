import { Heart } from 'lucide-react'
import { TRENDING_HOTELS } from '../../../config/homePageContent'
import { AppIcon } from '../../ui/AppIcon'
import { HomeSectionHeader } from './HomeSectionHeader'

export function TrendingHotelsSection() {
  return (
    <section className="pt-home-section pt-home-section--white" aria-labelledby="hotels-heading">
      <div className="pt-home-section__inner">
        <HomeSectionHeader
          title="Trending Hotels in India"
          subtitle="Handpicked stays with the best ratings and deals"
          seeAllHref="#hotels"
          seeAllLabel="See all hotels"
        />
        <div className="pt-home-hotelsGrid" role="list">
          {TRENDING_HOTELS.map((hotel) => (
            <article
              key={hotel.id}
              className="pt-home-card pt-home-hotelCard"
              role="listitem"
            >
              <div className="pt-home-hotelMedia">
                <img
                  className="pt-home-hotelImg"
                  src={hotel.image}
                  alt={hotel.imageAlt}
                  loading="lazy"
                />
                <button type="button" className="pt-home-hotelHeart" aria-label="Save hotel">
                  <AppIcon icon={Heart} size={18} />
                </button>
              </div>
              <div className="pt-home-hotelBody">
                <h3 className="pt-home-hotelName">{hotel.name}</h3>
                <p className="pt-home-hotelCity">{hotel.city}</p>
                <div className="pt-home-hotelRating">
                  <span className="pt-home-hotelDot" aria-hidden />
                  <span>
                    {hotel.rating} ({hotel.reviews.toLocaleString('en-IN')} reviews)
                  </span>
                </div>
                <span className="pt-home-hotelTag">{hotel.discount}</span>
                <p className="pt-home-hotelPrice">
                  From <strong>₹{hotel.price}</strong> / night
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
