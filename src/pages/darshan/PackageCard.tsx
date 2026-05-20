import { useState } from 'react'
import type { PackageItem } from './darshanData'

type Props = {
  pkg: PackageItem
  skeleton?: boolean
}

export function PackageCard({ pkg, skeleton }: Props) {
  const [imageFailed, setImageFailed] = useState(false)

  if (skeleton) {
    return (
      <article className="darshan__pkg-lux darshan__pkg-lux--sk" aria-hidden>
        <div className="darshan-skeleton darshan-skeleton--h220" />
        <div className="darshan-skeleton darshan-skeleton--text" />
      </article>
    )
  }

  const showImage = Boolean(pkg.imageUrl) && !imageFailed

  return (
    <article className="darshan__pkg-lux">
      <div className="darshan__pkg-lux-visual">
        {showImage ? (
          <img
            className="darshan__pkg-lux-img"
            src={pkg.imageUrl}
            alt=""
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div
            className="darshan__pkg-lux-fallback"
            style={{ background: pkg.imageGradient }}
            role="img"
            aria-label={pkg.imageAlt ?? pkg.title}
          />
        )}
        <div className="darshan__pkg-lux-scrim" aria-hidden />
        <div className="darshan__pkg-lux-float">
          <span className="darshan__pkg-lux-badge darshan__pkg-lux-price">{pkg.priceDisplay}</span>
          <span className="darshan__pkg-lux-badge darshan__pkg-lux-stars">★ {pkg.rating.toFixed(2)}</span>
        </div>
        <div className="darshan__pkg-lux-bottom">
          <h3 className="darshan__pkg-lux-title">{pkg.title}</h3>
          <p className="darshan__pkg-lux-meta">
            {pkg.duration} · {pkg.reviews} reviews
          </p>
        </div>
      </div>
      <div className="darshan__pkg-lux-body">
        <ul className="darshan__pkg-lux-tags">
          {pkg.inclusions.slice(0, 3).map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
        <div className="darshan__pkg-lux-actions">
          <button type="button" className="darshan__btn darshan__btn--ghost darshan__btn--sm darshan__pkg-lux-details">
            View itinerary
          </button>
          <button type="button" className="darshan__btn darshan__btn--primary darshan__btn--sm darshan__pkg-lux-reserve">
            Reserve
          </button>
        </div>
      </div>
    </article>
  )
}
