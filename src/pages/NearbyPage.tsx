import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Search } from 'lucide-react'
import { SiteLayout } from '../components/layout/SiteLayout'
import { TEMPLE_LISTINGS, type TempleListing } from './templeExplorerData'
import '../styles/pilgrimage-theme.css'
import './nearby.css'

const RADIUS_OPTIONS = [50, 100, 200, 500] as const

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

/** Approximate hub coordinates for demo distance sorting */
const CITY_COORDS: Record<string, { lat: number; lon: number }> = {
  tirupati: { lat: 13.6288, lon: 79.4192 },
  shirdi: { lat: 19.7645, lon: 74.477 },
  varanasi: { lat: 25.3176, lon: 82.9739 },
  hyderabad: { lat: 17.385, lon: 78.4867 },
  bangalore: { lat: 12.9716, lon: 77.5946 },
}

type ViewMode = 'list' | 'map'

export default function NearbyPage() {
  const [city, setCity] = useState('Tirupati')
  const [cityQuery, setCityQuery] = useState('')
  const [radius, setRadius] = useState<(typeof RADIUS_OPTIONS)[number]>(100)
  const [view, setView] = useState<ViewMode>('list')
  const [searched, setSearched] = useState(false)
  const [coords, setCoords] = useState(CITY_COORDS.tirupati)

  const detectLocation = () => {
    if (!navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lon: pos.coords.longitude })
        setCity('Your location')
        setSearched(true)
      },
      () => {
        setCity('Tirupati')
        setCoords(CITY_COORDS.tirupati)
        setSearched(true)
      },
    )
  }

  const handleSearch = () => {
    const key = cityQuery.trim().toLowerCase()
    const match = Object.entries(CITY_COORDS).find(([k]) => key.includes(k) || k.includes(key))
    if (match) {
      setCoords(match[1])
      setCity(match[0].charAt(0).toUpperCase() + match[0].slice(1))
    } else if (cityQuery.trim()) {
      setCity(cityQuery.trim())
    }
    setSearched(true)
  }

  const results = useMemo(() => {
    if (!searched) return [] as (TempleListing & { computedKm: number })[]
    return TEMPLE_LISTINGS.map((t) => {
      const seed = parseInt(t.id.replace(/\D/g, ''), 10) || 1
      const lat = coords.lat + (seed % 10) * 0.08 - 0.4
      const lon = coords.lon + (seed % 7) * 0.06 - 0.2
      const computedKm = Math.round(haversineKm(coords.lat, coords.lon, lat, lon))
      return { ...t, computedKm }
    })
      .filter((t) => t.computedKm <= radius)
      .sort((a, b) => a.computedKm - b.computedKm)
  }, [searched, coords, radius])

  return (
    <SiteLayout>
      <div className="pil-page pil-nearby">
        <div className="pil-page__inner">
        <header className="pil-page-hero">
          <span className="pil-eyebrow">Discover</span>
          <h1 className="pil-page-hero__title">Nearby Temples</h1>
          <p className="pil-page-hero__lead">Find temples within your chosen radius</p>
        </header>

        <div className="pil-nearby__controls">
          <button type="button" className="pil-btn pil-btn--outline pil-nearby__geo" onClick={detectLocation}>
            <MapPin size={18} aria-hidden />
            Use my location
          </button>
          <div className="pil-nearby__search">
            <Search size={18} className="pil-nearby__search-icon" aria-hidden />
            <input
              type="search"
              className="pil-nearby__input"
              placeholder="Search city (e.g. Tirupati, Shirdi)"
              value={cityQuery}
              onChange={(e) => setCityQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <div className="pil-nearby__radius pil-tabs pil-tabs--pro">
            {RADIUS_OPTIONS.map((r) => (
              <button
                key={r}
                type="button"
                className={`pil-tab${radius === r ? ' pil-tab--active' : ''}`}
                onClick={() => setRadius(r)}
              >
                {r} km
              </button>
            ))}
          </div>
          <button type="button" className="pil-btn pil-btn--gold" onClick={handleSearch}>
            Find Nearby Temples
          </button>
        </div>

        {searched ? (
          <>
            <p className="pil-nearby__count">
              <strong>{results.length}</strong> temples found within <strong>{radius} km</strong> of {city}
            </p>
            <div className="pil-nearby__view-tabs pil-tabs pil-tabs--pro">
              <button
                type="button"
                className={`pil-tab${view === 'list' ? ' pil-tab--active' : ''}`}
                onClick={() => setView('list')}
              >
                List View
              </button>
              <button
                type="button"
                className={`pil-tab${view === 'map' ? ' pil-tab--active' : ''}`}
                onClick={() => setView('map')}
              >
                Map View
              </button>
            </div>
            {view === 'map' ? (
              <div className="pil-nearby__map-placeholder pil-card pil-card--pro">
                <p>Map view coming soon</p>
                <button type="button" className="pil-btn pil-btn--outline" onClick={() => setView('list')}>
                  Switch to list
                </button>
              </div>
            ) : (
              <ul className="pil-nearby__list">
                {results.map((t) => (
                  <li key={t.id}>
                    <Link to="/temples" className="pil-nearby__row pil-card pil-card--pro">
                      <img src={t.imageUrl} alt={t.imageAlt} width={80} height={56} loading="lazy" />
                      <div>
                        <strong>{t.name}</strong>
                        <p>
                          {t.city}, {t.state}
                        </p>
                      </div>
                      <span className="pil-nearby__km">{t.computedKm} km</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : null}
        </div>
      </div>
    </SiteLayout>
  )
}
