import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createBookingDraft } from '../../api/bookingApi'
import { getFareRule } from '../../api/flightApi'
import { SiteLayout } from '../../components/layout/SiteLayout'
import { useFlightBooking } from '../../context/FlightBookingContext'
import './flight-booking.css'

export default function FlightBookPage() {
  const navigate = useNavigate()
  const { selectedFlight, searchResult, fareQuote, passengers, setPassengers, setBooking } = useFlightBooking()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [fareRules, setFareRules] = useState<unknown>(null)

  const defaultPassenger = useMemo(
    () => ({
      Title: 'Mr',
      FirstName: '',
      LastName: '',
      PaxType: 1,
      Gender: 1,
      Email: '',
      ContactNo: '',
      IsLeadPax: true,
    }),
    []
  )

  if (!selectedFlight || !searchResult) {
    return (
      <SiteLayout>
        <div className="flight-page">
          <div className="flight-alert flight-alert--info">
            Select a flight first. <Link to="/flights/results">Back to results</Link>
          </div>
        </div>
      </SiteLayout>
    )
  }

  async function loadFareRules() {
    if (!searchResult || !selectedFlight) return
    const rules = await getFareRule({
      traceId: searchResult.traceId,
      srdvType: searchResult.srdvType,
      srdvIndex: selectedFlight.srdvIndex,
      resultIndex: selectedFlight.resultIndex,
    })
    setFareRules(rules)
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (!searchResult || !selectedFlight) return
    setError('')
    setLoading(true)

    try {
      const pax = passengers.length ? passengers : [defaultPassenger]
      const draft = await createBookingDraft({
        traceId: searchResult.traceId,
        srdvType: searchResult.srdvType,
        srdvIndex: selectedFlight.srdvIndex,
        resultIndex: selectedFlight.resultIndex,
        isLCC: selectedFlight.isLCC,
        passengers: pax,
        fare: selectedFlight,
      })

      if (draft.requiresReconfirmation) {
        setError('Fare changed again. Please review the updated price before payment.')
        setLoading(false)
        return
      }

      setBooking(draft.booking)
      navigate('/flights/payment')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to create booking draft')
    } finally {
      setLoading(false)
    }
  }

  return (
    <SiteLayout>
      <div className="flight-page">
        <div className="flight-steps">
          <span className="flight-step flight-step--active">Passengers</span>
          <span className="flight-step">Review</span>
          <span className="flight-step">Payment</span>
        </div>

        <div className="flight-page__header">
          <h1 className="flight-page__title">Passenger details</h1>
          <p className="flight-page__lead">
            {selectedFlight.airlineName} · ₹{selectedFlight.publishedFare.toLocaleString('en-IN')}
          </p>
        </div>

        {error ? <div className="flight-alert flight-alert--error">{error}</div> : null}

        <div className="flight-summary" style={{ marginBottom: 16 }}>
          <strong>Fare quote flags</strong>
          <div className="flight-card__meta">
            Seat selection: {fareQuote?.seatSelectAllowed ? 'Allowed' : 'Not available'} · Hold:{' '}
            {fareQuote?.holdAllowed ? 'Allowed' : 'Not available'}
          </div>
          <button type="button" className="flight-btn flight-btn--secondary" onClick={() => void loadFareRules()}>
            View fare rules
          </button>
          {fareRules ? <pre style={{ whiteSpace: 'pre-wrap', fontSize: 12 }}>{JSON.stringify(fareRules, null, 2)}</pre> : null}
        </div>

        <form className="flight-form" onSubmit={(event) => void handleSubmit(event)}>
          <div className="flight-form__grid">
            <div className="flight-field">
              <label htmlFor="firstName">First name</label>
              <input
                id="firstName"
                required
                value={passengers[0]?.FirstName || ''}
                onChange={(event) =>
                  setPassengers([{ ...(passengers[0] || defaultPassenger), FirstName: event.target.value }])
                }
              />
            </div>
            <div className="flight-field">
              <label htmlFor="lastName">Last name</label>
              <input
                id="lastName"
                required
                value={passengers[0]?.LastName || ''}
                onChange={(event) =>
                  setPassengers([{ ...(passengers[0] || defaultPassenger), LastName: event.target.value }])
                }
              />
            </div>
            <div className="flight-field">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                required
                value={passengers[0]?.Email || ''}
                onChange={(event) =>
                  setPassengers([{ ...(passengers[0] || defaultPassenger), Email: event.target.value }])
                }
              />
            </div>
            <div className="flight-field">
              <label htmlFor="phone">Mobile</label>
              <input
                id="phone"
                required
                value={passengers[0]?.ContactNo || ''}
                onChange={(event) =>
                  setPassengers([{ ...(passengers[0] || defaultPassenger), ContactNo: event.target.value }])
                }
              />
            </div>
          </div>

          <button type="submit" className="flight-btn flight-btn--primary" disabled={loading}>
            {loading ? 'Creating booking…' : 'Continue to payment'}
          </button>
        </form>
      </div>
    </SiteLayout>
  )
}
