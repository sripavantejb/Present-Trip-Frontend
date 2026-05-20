import { useEffect, useState } from 'react'
import type { AccommodationListing } from '../postHeroData'
import { IconBed, IconChevronRight, IconMapPin } from '../DarshanIcons'

type Props = {
  stay: AccommodationListing
}

export function StayCard({ stay }: Props) {
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    setImgError(false)
  }, [stay.id, stay.imageUrl])

  return (
    <article className="darshan__stay-card">
      <div className="darshan__stay-visual">
        {imgError ? (
          <div className="darshan__stay-img-fallback" role="img" aria-label={stay.imageAlt}>
            <IconBed className="darshan__stay-img-fallback-icon" />
          </div>
        ) : (
          <img
            src={stay.imageUrl}
            alt={stay.imageAlt}
            loading="lazy"
            decoding="async"
            className="darshan__stay-img"
            onError={() => setImgError(true)}
          />
        )}
        <span className="darshan__stay-visual-shade" aria-hidden />
        <span className="darshan__stay-type">{stay.type}</span>
      </div>
      <div className="darshan__stay-body">
        <h3 className="darshan__stay-name">{stay.name}</h3>
        <p className="darshan__stay-distance">
          <IconMapPin className="darshan__stay-pin" aria-hidden />
          {stay.distance}
        </p>
        <p className="darshan__stay-rating-chip">
          <span className="darshan__stay-rating-star" aria-hidden>
            ★
          </span>
          {stay.rating.toFixed(1)}
          <span className="darshan__stay-rating-sep">·</span>
          {stay.reviews} reviews
        </p>
        <ul className="darshan__stay-amenities">
          {stay.amenities.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
        <hr className="darshan__stay-divider" />
        <div className="darshan__stay-foot">
          <p className="darshan__stay-price-display">
            {stay.pricePerNight}
            <span className="darshan__stay-price-suffix">/night</span>
          </p>
          <span className="darshan__stay-avail-chip">{stay.availability}</span>
        </div>
        <button type="button" className="darshan__btn darshan__stay-cta darshan__btn--block">
          <span>Book Room</span>
          <IconChevronRight className="darshan__stay-cta-arrow" aria-hidden />
        </button>
      </div>
    </article>
  )
}
