import { useEffect, useState } from 'react'
import type { PrivateVehicleOption } from '../postHeroData'
import { IconCar, IconChevronRight } from '../DarshanIcons'

type Props = {
  vehicle: PrivateVehicleOption
  onBook: () => void
}

export function VehicleCard({ vehicle, onBook }: Props) {
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    setImgError(false)
  }, [vehicle.id, vehicle.imageUrl])

  return (
    <article className="darshan__vehicle-card">
      <div className="darshan__vehicle-visual">
        {imgError ? (
          <div className="darshan__vehicle-img-fallback" role="img" aria-label={vehicle.imageAlt}>
            <IconCar className="darshan__vehicle-img-fallback-icon" />
          </div>
        ) : (
          <img
            src={vehicle.imageUrl}
            alt={vehicle.imageAlt}
            loading="lazy"
            decoding="async"
            className="darshan__vehicle-img"
            onError={() => setImgError(true)}
          />
        )}
        <span className="darshan__vehicle-visual-shade" aria-hidden />
        <span className="darshan__vehicle-ac-badge">{vehicle.ac ? 'AC' : 'Non-AC'}</span>
      </div>
      <div className="darshan__vehicle-body">
        <h3 className="darshan__vehicle-name">{vehicle.name}</h3>
        <p className="darshan__vehicle-meta">{vehicle.capacity}</p>
        <p className="darshan__vehicle-price-display">{vehicle.priceRange}</p>
        <p className="darshan__vehicle-ideal">
          <span>Ideal for</span> {vehicle.idealFor}
        </p>
        <button type="button" className="darshan__btn darshan__vehicle-cta darshan__btn--block" onClick={onBook}>
          <span>Get Quote &amp; Book</span>
          <IconChevronRight className="darshan__vehicle-cta-arrow" aria-hidden />
        </button>
      </div>
    </article>
  )
}
