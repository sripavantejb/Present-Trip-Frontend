import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createPaymentOrder, verifyPayment } from '../../api/paymentApi'
import { SiteLayout } from '../../components/layout/SiteLayout'
import { useFlightBooking } from '../../context/FlightBookingContext'
import './flight-booking.css'

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void }
  }
}

function loadRazorpayScript() {
  return new Promise<boolean>((resolve) => {
    if (window.Razorpay) {
      resolve(true)
      return
    }

    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export default function FlightPaymentPage() {
  const navigate = useNavigate()
  const { booking, selectedFlight, setBooking } = useFlightBooking()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (!booking || !selectedFlight) {
    return (
      <SiteLayout>
        <div className="flight-page">
          <div className="flight-alert flight-alert--info">
            Booking not ready. <Link to="/flights/book">Go back</Link>
          </div>
        </div>
      </SiteLayout>
    )
  }

  async function handlePayNow() {
    if (!booking || !selectedFlight) return
    const currentBooking = booking
    setLoading(true)
    setError('')

    try {
      const orderResponse = await createPaymentOrder(currentBooking._id)

      if (orderResponse.requiresReconfirmation) {
        setError('Fare changed before payment. Please recreate the booking draft.')
        setLoading(false)
        return
      }

      if (!orderResponse.keyId || !orderResponse.order) {
        setError('Payment gateway is not configured on the backend yet.')
        setLoading(false)
        return
      }

      const scriptLoaded = await loadRazorpayScript()
      if (!scriptLoaded || !window.Razorpay) {
        setError('Unable to load Razorpay checkout.')
        setLoading(false)
        return
      }

      const razorpay = new window.Razorpay({
        key: orderResponse.keyId,
        amount: orderResponse.order.amount,
        currency: orderResponse.order.currency,
        order_id: orderResponse.order.id,
        name: 'Present Trip',
        description: `Flight booking ${currentBooking.localBookingRef}`,
        handler: async (response: { razorpay_order_id: string; razorpay_payment_id: string; razorpay_signature: string }) => {
          try {
            const verified = await verifyPayment({
              bookingId: currentBooking._id,
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            })
            setBooking(verified.booking)
            navigate(`/flights/confirmation/${verified.booking._id}`)
          } catch (verifyError) {
            setError(verifyError instanceof Error ? verifyError.message : 'Payment verification failed')
          }
        },
        prefill: {
          email: currentBooking.passengers?.[0]?.Email,
          contact: currentBooking.passengers?.[0]?.ContactNo,
        },
        theme: { color: '#ff385c' },
      })

      razorpay.open()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to start payment')
    } finally {
      setLoading(false)
    }
  }

  return (
    <SiteLayout>
      <div className="flight-page">
        <div className="flight-page__header">
          <h1 className="flight-page__title">Payment</h1>
          <p className="flight-page__lead">Booking ref {booking.localBookingRef}</p>
        </div>

        <div className="flight-summary">
          <div className="flight-card__row">
            <div>
              <div className="flight-card__airline">{selectedFlight.airlineName}</div>
              <div className="flight-card__meta">
                {selectedFlight.fromCode} → {selectedFlight.toCode}
              </div>
            </div>
            <div className="flight-card__price">
              ₹{(booking.fare?.finalPayable || booking.fare?.publishedFare || selectedFlight.publishedFare).toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        {error ? <div className="flight-alert flight-alert--error">{error}</div> : null}

        <button type="button" className="flight-btn flight-btn--primary" disabled={loading} onClick={() => void handlePayNow()}>
          {loading ? 'Preparing checkout…' : 'Pay now'}
        </button>
      </div>
    </SiteLayout>
  )
}
