import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { searchFlights, getFareQuote, type NormalizedFlight } from '../../api/flightApi'
import { SiteLayout } from '../../components/layout/SiteLayout'
import { useFlightBooking } from '../../context/FlightBookingContext'
import { useRequireAuth } from '../../hooks/useRequireAuth'
import './flight-booking.css'

function formatTime(value?: string) {
  if (!value) return '—'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString()
}

export default function FlightResultsPage() {
  const navigate = useNavigate()
  const requireAuth = useRequireAuth()
  const { searchInput, searchResult, setSearchResult, setSelectedFlight, setFareQuote } = useFlightBooking()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [priceModal, setPriceModal] = useState<{ flight: NormalizedFlight; quote: Record<string, unknown> } | null>(null)

  useEffect(() => {
    async function load() {
      if (!searchInput) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError('')
        const data = await searchFlights(searchInput)
        setSearchResult(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to search flights')
      } finally {
        setLoading(false)
      }
    }

    void load()
  }, [searchInput, setSearchResult])

  async function handleSelect(flight: NormalizedFlight) {
    if (!searchResult) return

    try {
      const quote = await getFareQuote({
        traceId: searchResult.traceId,
        srdvType: searchResult.srdvType,
        srdvIndex: flight.srdvIndex,
        resultIndex: flight.resultIndex,
      })

      if (quote.isPriceChanged || quote.isTimeChanged) {
        setPriceModal({ flight, quote })
        return
      }

      setSelectedFlight(flight)
      setFareQuote(quote)
      if (!requireAuth('/flights/book')) return
      navigate('/flights/book')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to fetch fare quote')
    }
  }

  return (
    <SiteLayout>
      <div className="flight-page">
        <div className="flight-page__header">
          <h1 className="flight-page__title">Flight results</h1>
          <p className="flight-page__lead">
            {searchInput
              ? `${searchInput.from} → ${searchInput.to} · ${searchInput.departureDate}`
              : 'Start a new search from the home page.'}
          </p>
        </div>

        {!searchInput ? (
          <div className="flight-alert flight-alert--info">
            No search details found. <Link to="/">Search flights</Link>
          </div>
        ) : null}

        {loading ? <p>Searching flights…</p> : null}
        {error ? <div className="flight-alert flight-alert--error">{error}</div> : null}

        {!loading && searchResult?.flights.length === 0 ? (
          <div className="flight-alert flight-alert--info">No flights found for this route.</div>
        ) : null}

        {searchResult?.flights.map((flight) => (
          <article key={flight.id} className="flight-card">
            <div className="flight-card__row">
              <div>
                <div className="flight-card__airline">
                  {flight.airlineName || flight.airlineCode} {flight.flightNumber}
                </div>
                <div className="flight-card__meta">
                  {flight.fromCode || flight.from} → {flight.toCode || flight.to} · {flight.stops} stop
                  {flight.stops === 1 ? '' : 's'}
                </div>
                <div className="flight-card__meta">
                  Departs {formatTime(flight.departureTime)} · Arrives {formatTime(flight.arrivalTime)}
                </div>
              </div>
              <div>
                <div className="flight-card__price">₹{flight.publishedFare.toLocaleString('en-IN')}</div>
                <button type="button" className="flight-btn flight-btn--primary" onClick={() => void handleSelect(flight)}>
                  Book now
                </button>
              </div>
            </div>
          </article>
        ))}

        {priceModal ? (
          <div className="flight-alert flight-alert--info">
            Price or schedule changed. Continue with updated fare of ₹
            {Number(
              priceModal.quote.publishedFare ??
                (priceModal.quote.fare as { PublishedFare?: number })?.PublishedFare ??
                priceModal.flight.publishedFare
            ).toLocaleString('en-IN')}
            ?
            <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
              <button
                type="button"
                className="flight-btn flight-btn--primary"
                onClick={() => {
                  setSelectedFlight(priceModal.flight)
                  setFareQuote(priceModal.quote)
                  if (!requireAuth('/flights/book')) return
                  navigate('/flights/book')
                }}
              >
                Continue
              </button>
              <button type="button" className="flight-btn flight-btn--secondary" onClick={() => setPriceModal(null)}>
                Cancel
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </SiteLayout>
  )
}
