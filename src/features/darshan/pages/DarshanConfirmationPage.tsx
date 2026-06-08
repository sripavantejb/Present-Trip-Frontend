import QRCode from 'qrcode'
import { CheckCircle2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { SiteLayout } from '../../../components/layout/SiteLayout'
import { useDarshanBooking } from '../context/DarshanBookingContext'
import { getDarshanOptionsForTemple } from '../data/templeDetails'
import { getTempleById } from '../data/temples'
import { calculateBookingTotal, formatINR, formatVisitDate } from '../utils/pricing'
import '../styles/darshan-v2.css'
import '../styles/dv2-booking-layout.css'

export default function DarshanConfirmationPage() {
  const { bookingRef } = useParams<{ bookingRef: string }>()
  const { state } = useDarshanBooking()
  const [qrUrl, setQrUrl] = useState('')
  const [showConfetti, setShowConfetti] = useState(true)

  const temple = getTempleById(state.templeId ?? '')
  const options = getDarshanOptionsForTemple(state.templeId ?? 'tirupati-balaji')
  const selected = options.find((o) => o.id === state.selectedDarshanId)
  const totals = calculateBookingTotal(state)
  const ref = bookingRef ?? state.bookingRef ?? 'PT2026061234'

  useEffect(() => {
    QRCode.toDataURL(ref, { width: 180, margin: 2, color: { dark: '#222222' } }).then(setQrUrl)
  }, [ref])

  useEffect(() => {
    const t = setTimeout(() => setShowConfetti(false), 4000)
    return () => clearTimeout(t)
  }, [])

  if (!temple || !selected) {
    return (
      <SiteLayout>
        <div className="dv2-flow">
          <div className="ds-page-shell ds-page-shell--reading dv2-flow__shell">
            <p className="ds-body-md">Booking not found.</p>
            <Link to="/trips" className="ds-btn ds-btn--tertiary">
              View my bookings
            </Link>
          </div>
        </div>
      </SiteLayout>
    )
  }

  const email = state.contact.email || 'priya@email.com'
  const mobile = state.contact.mobile || '+91 98765 43210'
  const amount = state.couponApplied ? Math.round(totals.total * 0.9) : totals.total

  return (
    <SiteLayout>
      <div className="dv2 dv2-flow dv2-flow--confirm">
        {showConfetti ? <Confetti /> : null}
        <div className="ds-page-shell ds-page-shell--reading dv2-flow__shell">
          <CheckCircle2 className="dv2-confirm__icon" size={56} strokeWidth={1.5} aria-hidden />
          <h1 className="ds-display-xl dv2-flow__title">Booking confirmed</h1>

          {qrUrl ? (
            <div className="dv2-confirm__qr">
              <img src={qrUrl} alt={`QR code for booking ${ref}`} width={180} height={180} />
            </div>
          ) : null}

          <p className="dv2-confirm__ref">Booking Ref: {ref}</p>

          <div className="dv2-summary-card">
            <SummaryLine label="Temple" value={temple.name} />
            <SummaryLine label="Darshan" value={selected.name} />
            <SummaryLine label="Date" value={`${formatVisitDate(state.visitDate)} · ${state.timeSlot}`} />
            <SummaryLine
              label="Devotees"
              value={`${state.devotees.adults} Adult${state.devotees.adults !== 1 ? 's' : ''}`}
            />
            <SummaryLine label="Amount" value={formatINR(amount)} />
          </div>

          <p className="dv2__body">E-ticket sent to: {email}</p>
          <p className="dv2__body">WhatsApp confirmation sent to: {mobile}</p>

          <div className="dv2-confirm__actions">
            <button type="button" className="ds-btn ds-btn--primary ds-btn--block">
              Download e-ticket
            </button>
            <button type="button" className="ds-btn ds-btn--secondary ds-btn--block">
              Add to calendar
            </button>
            <button type="button" className="ds-btn ds-btn--secondary ds-btn--block">
              Share with co-devotees
            </button>
            <Link to="/trips" className="ds-btn ds-btn--secondary ds-btn--block">
              View my bookings
            </Link>
            <Link to="/plan?hub=tirupati" className="ds-btn ds-btn--primary ds-btn--block">
              Plan nearby temples
            </Link>
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}

function SummaryLine({ label, value }: { label: string; value: string }) {
  return (
    <div className="dv2-summary-card__row">
      <span>{label}</span>
      <span>{value}</span>
    </div>
  )
}

function Confetti() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 2}s`,
    duration: `${2 + Math.random() * 2}s`,
    color: Math.random() > 0.5 ? 'var(--color-primary)' : '#ffffff',
    size: 6 + Math.random() * 6,
  }))

  return (
    <div className="dv2-confetti" aria-hidden>
      {particles.map((p) => (
        <span
          key={p.id}
          className="dv2-confetti__particle"
          style={{
            left: p.left,
            top: -10,
            width: p.size,
            height: p.size,
            background: p.color,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  )
}
