import { useState } from 'react'
import { templeCardImage } from '../../features/darshan/data/images'

type NearbyResult = {
  id: string
  name: string
  distance: string
  imageUrl: string
}

const MOCK_NEARBY: NearbyResult[] = [
  {
    id: 'n1',
    name: 'Sri Kapileswara Swamy Temple',
    distance: '12 km',
    imageUrl: templeCardImage('kapileswara'),
  },
  {
    id: 'n2',
    name: 'Sri Padmavathi Ammavari Temple',
    distance: '28 km',
    imageUrl: templeCardImage('padmavathi'),
  },
  {
    id: 'n3',
    name: 'Sri Govindaraja Swamy Temple',
    distance: '35 km',
    imageUrl: templeCardImage('govindaraja'),
  },
  {
    id: 'n4',
    name: 'ISKCON Tirupati',
    distance: '42 km',
    imageUrl: templeCardImage('iskcon-tirupati'),
  },
]

const RADIUS_OPTIONS = [50, 100, 200, 500] as const

export function NearbyTemplesSection() {
  const [city, setCity] = useState('')
  const [radius, setRadius] = useState<number>(100)
  const [results, setResults] = useState<NearbyResult[] | null>(null)
  const [locating, setLocating] = useState(false)

  const detectLocation = () => {
    if (!navigator.geolocation) return
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      () => {
        setCity('Tirupati (detected)')
        setLocating(false)
      },
      () => setLocating(false),
      { timeout: 8000 },
    )
  }

  const search = () => {
    setResults(MOCK_NEARBY)
  }

  return (
    <section id="nearby" className="pil-section pil-section--muted" aria-labelledby="nearby-heading">
      <div className="pil-section__inner">
        <div className="pil-section__head">
          <div>
            <h2 id="nearby-heading" className="pil-section__title">
              Nearby Temples
            </h2>
            <p className="pil-section__lead">Find temples within your chosen radius</p>
          </div>
        </div>

        <div className="pil-nearby__form">
          <div className="pil-nearby__field">
            <label className="pil-nearby__label" htmlFor="nearby-city">
              City or location
            </label>
            <input
              id="nearby-city"
              className="pil-nearby__input"
              type="text"
              placeholder="Enter city or use location"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button
              type="button"
              className="pil-btn pil-btn--outline"
              style={{ marginTop: 'var(--space-sm)' }}
              onClick={detectLocation}
              disabled={locating}
            >
              {locating ? 'Detecting…' : 'Use my location'}
            </button>
          </div>
          <div className="pil-nearby__field">
            <span className="pil-nearby__label">Radius</span>
            <div className="pil-nearby__pills">
              {RADIUS_OPTIONS.map((r) => (
                <button
                  key={r}
                  type="button"
                  className={`pil-pill${radius === r ? ' pil-pill--active' : ''}`}
                  onClick={() => setRadius(r)}
                >
                  {r} km
                </button>
              ))}
            </div>
          </div>
          <button type="button" className="pil-btn pil-btn--gold" onClick={search}>
            Find Nearby Temples
          </button>
        </div>

        {results ? (
          <div className="pil-nearby__grid">
            {results.map((t) => (
              <article key={t.id} className="pil-nearby__temple-card pil-card">
                <img className="pil-nearby__temple-img" src={t.imageUrl} alt={t.name} loading="lazy" decoding="async" />
                <h3 className="pil-nearby__temple-name">{t.name}</h3>
                <p className="pil-nearby__temple-dist">{t.distance} away</p>
              </article>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  )
}
