import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getBookingById, type BookingRecord } from '../../api/bookingApi'
import { SiteLayout } from '../../components/layout/SiteLayout'
import './flight-booking.css'

export default function FlightConfirmationPage() {
  const { bookingId = '' } = useParams()
  const [booking, setBooking] = useState<BookingRecord | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      try {
        const data = await getBookingById(bookingId)
        setBooking(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load booking')
      }
    }

    if (bookingId) void load()
  }, [bookingId])

  const statusLabel =
    booking?.bookingStatus === 'ticketed'
      ? 'Booking confirmed'
      : booking?.bookingStatus === 'booking_processing' || booking?.testMode
        ? 'Booking processing'
        : booking?.bookingStatus === 'booking_failed'
          ? 'Booking failed'
          : 'Payment received'

  return (
    <SiteLayout>
      <div className="flight-page">
        <div className="flight-page__header">
          <h1 className="flight-page__title">{statusLabel}</h1>
          <p className="flight-page__lead">Reference {booking?.localBookingRef || bookingId}</p>
        </div>

        {error ? <div className="flight-alert flight-alert--error">{error}</div> : null}

        {booking ? (
          <div className="flight-summary">
            <p>
              <strong>Status:</strong> {booking.bookingStatus}
            </p>
            <p>
              <strong>Payment:</strong> {booking.paymentStatus}
            </p>
            {booking.pnr ? (
              <p>
                <strong>PNR:</strong> {booking.pnr}
              </p>
            ) : null}
            {booking.bookingId ? (
              <p>
                <strong>Booking ID:</strong> {booking.bookingId}
              </p>
            ) : null}
            {booking.ticketStatus ? (
              <p>
                <strong>Ticket status:</strong> {booking.ticketStatus}
              </p>
            ) : null}
            {booking.testMode ? (
              <p>Live ticketing is disabled on the backend. This booking is in test/processing mode.</p>
            ) : null}
          </div>
        ) : null}

        <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
          <Link to="/trips" className="flight-btn flight-btn--primary">
            My bookings
          </Link>
          <Link to="/" className="flight-btn flight-btn--secondary">
            Home
          </Link>
        </div>
      </div>
    </SiteLayout>
  )
}
