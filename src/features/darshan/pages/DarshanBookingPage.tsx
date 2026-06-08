import { ArrowLeft, Check, ChevronDown, Lock } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SiteLayout } from '../../../components/layout/SiteLayout'
import { useDarshanBooking } from '../context/DarshanBookingContext'
import { getDarshanOptionsForTemple } from '../data/templeDetails'
import { getTempleById } from '../data/temples'
import { calculateBookingTotal, formatINR, formatVisitDate } from '../utils/pricing'
import '../styles/darshan-v2.css'
import '../styles/dv2-booking-layout.css'

const STEPS = ['Review', 'Details', 'Payment'] as const

export default function DarshanBookingPage() {
  const navigate = useNavigate()
  const {
    state,
    setDevotees,
    applyCoupon,
    updateTraveller,
    setContact,
    setSpecialRequests,
    confirmBooking,
    syncTravellerCount,
  } = useDarshanBooking()

  const [step, setStep] = useState(0)
  const [couponOpen, setCouponOpen] = useState(false)
  const [couponInput, setCouponInput] = useState('')
  const [couponMsg, setCouponMsg] = useState('')
  const [activeTraveller, setActiveTraveller] = useState(0)
  const [errors, setErrors] = useState<string[]>([])
  const [summaryOpen, setSummaryOpen] = useState(false)
  const [saveCard, setSaveCard] = useState(false)

  const temple = getTempleById(state.templeId ?? '')
  const options = getDarshanOptionsForTemple(state.templeId ?? 'tirupati-balaji')
  const selected = options.find((o) => o.id === state.selectedDarshanId)

  const totals = useMemo(() => {
    const t = calculateBookingTotal(state)
    if (state.couponApplied) return { ...t, total: Math.round(t.total * 0.9) }
    return t
  }, [state])

  useEffect(() => {
    if (!state.templeId || !state.selectedDarshanId) navigate('/darshan')
  }, [state.templeId, state.selectedDarshanId, navigate])

  useEffect(() => {
    syncTravellerCount()
  }, [syncTravellerCount])

  const validateTravellers = (): boolean => {
    const errs: string[] = []
    state.travellers.forEach((t, i) => {
      if (!t.fullName.trim()) errs.push(`Devotee ${i + 1}: Full name required`)
      if (!t.age.trim()) errs.push(`Devotee ${i + 1}: Age required`)
      if (!t.gender) errs.push(`Devotee ${i + 1}: Gender required`)
      if (!t.idNumber.trim()) errs.push(`Devotee ${i + 1}: ID number required`)
    })
    if (!state.contact.mobile.trim()) errs.push('Mobile number required')
    if (!state.contact.email.trim()) errs.push('Email required')
    setErrors(errs)
    return errs.length === 0
  }

  const handlePay = () => {
    const ref = confirmBooking()
    navigate(`/darshan/confirmation/${ref}`)
  }

  if (!temple || !selected) return null

  return (
    <SiteLayout>
      <div className="dv2 dv2-flow">
        <div className="ds-page-shell ds-page-shell--reading dv2-flow__shell">
          <div className="dv2-flow__top">
            <button
              type="button"
              className="dv2-back-btn"
              onClick={() => (step > 0 ? setStep(step - 1) : navigate(-1))}
              aria-label="Back"
            >
              <ArrowLeft size={20} />
            </button>
            <ProgressBar step={step} />
          </div>

          <div className="dv2-flow__body">
      {step === 0 && (
        <>
          <h1 className="dv2__section-title dv2-flow__title">Review & Confirm</h1>
          <div className="dv2-summary-card">
            <p className="dv2-summary-card__temple">{temple.name}</p>
            <p className="dv2-summary-card__loc">{temple.location}</p>
            <hr className="dv2-summary-card__divider" />
            <SummaryRow label="Darshan Type" value={selected.name} />
            <SummaryRow label="Date" value={formatVisitDate(state.visitDate)} />
            <SummaryRow label="Time Slot" value={state.timeSlot} />
            <SummaryRow
              label="Devotees"
              value={`${state.devotees.adults} Adult${state.devotees.adults !== 1 ? 's' : ''}${state.devotees.children ? `, ${state.devotees.children} Child` : ''}`}
            />
            <hr className="dv2-summary-card__divider" />
            {totals.breakdown.map((b) => (
              <SummaryRow key={b.label} label={b.label.split(':')[0]} value={formatINR(b.amount)} />
            ))}
            <hr className="dv2-summary-card__divider" />
            <SummaryRow label="Total" value={formatINR(totals.total)} bold />
          </div>

          <div className="dv2-card">
            <p className="dv2-field__label">Devotees</p>
            <div className="dv2-stepper-row">
              <span>Adults</span>
              <div className="dv2-stepper__ctrl">
                <button
                  type="button"
                  className="dv2-stepper__btn"
                  onClick={() =>
                    setDevotees({
                      ...state.devotees,
                      adults: Math.max(1, state.devotees.adults - 1),
                    })
                  }
                >
                  −
                </button>
                <span>{state.devotees.adults}</span>
                <button
                  type="button"
                  className="dv2-stepper__btn"
                  onClick={() =>
                    setDevotees({ ...state.devotees, adults: Math.min(10, state.devotees.adults + 1) })
                  }
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="dv2-accordion__btn"
            onClick={() => setCouponOpen((o) => !o)}
          >
            Have a coupon code?
            <ChevronDown size={18} style={{ transform: couponOpen ? 'rotate(180deg)' : undefined }} />
          </button>
          {couponOpen && (
            <div className="dv2-coupon-row">
              <input
                className="dv2-coupon-input"
                placeholder="Enter code"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
              />
              <button
                type="button"
                className="ds-btn ds-btn--secondary ds-btn--sm"
                onClick={() => {
                  const ok = applyCoupon(couponInput)
                  setCouponMsg(ok ? 'Coupon applied! 10% off' : 'Invalid coupon')
                }}
              >
                Apply
              </button>
            </div>
          )}
          {couponMsg ? (
            <p
              className="ds-caption"
              style={{ color: state.couponApplied ? 'var(--color-ink)' : 'var(--color-primary-error)' }}
            >
              {couponMsg}
            </p>
          ) : null}

          <div className="dv2-flow__actions">
            <button type="button" className="ds-btn ds-btn--primary ds-btn--block" onClick={() => setStep(1)}>
              Continue to traveller details
            </button>
          </div>
        </>
      )}

      {step === 1 && (
        <>
          <h1 className="dv2__section-title dv2-flow__title">Traveller Details</h1>
          <div className="dv2-tabs">
            {state.travellers.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`dv2-tab${activeTraveller === i ? ' dv2-tab--active' : ''}`}
                onClick={() => setActiveTraveller(i)}
              >
                Devotee {i + 1}
              </button>
            ))}
          </div>

          {state.travellers[activeTraveller] && (
            <div className="dv2-card">
              <Field label="Full Name" required>
                <input
                  className="dv2-field__input"
                  value={state.travellers[activeTraveller].fullName}
                  onChange={(e) => updateTraveller(activeTraveller, { fullName: e.target.value })}
                />
              </Field>
              <Field label="Age" required>
                <input
                  className="dv2-field__input"
                  type="number"
                  min={1}
                  max={120}
                  value={state.travellers[activeTraveller].age}
                  onChange={(e) => updateTraveller(activeTraveller, { age: e.target.value })}
                />
              </Field>
              <Field label="Gender" required>
                <div className="dv2-pill-group">
                  {(['Male', 'Female', 'Other'] as const).map((g) => (
                    <button
                      key={g}
                      type="button"
                      className={`dv2-pill${state.travellers[activeTraveller].gender === g ? ' dv2-pill--active' : ''}`}
                      onClick={() => updateTraveller(activeTraveller, { gender: g })}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </Field>
              <Field label="ID Proof Type" required>
                <select
                  className="dv2-field__input"
                  value={state.travellers[activeTraveller].idType}
                  onChange={(e) => updateTraveller(activeTraveller, { idType: e.target.value })}
                >
                  {['Aadhaar', 'PAN', 'Passport', 'Voter ID', 'Driving Licence'].map((id) => (
                    <option key={id} value={id}>
                      {id}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="ID Proof Number" required>
                <input
                  className="dv2-field__input"
                  value={state.travellers[activeTraveller].idNumber}
                  onChange={(e) => updateTraveller(activeTraveller, { idNumber: e.target.value })}
                />
              </Field>
            </div>
          )}

          <div className="dv2-card">
            <h3 className="dv2-card__title">Primary Contact</h3>
            <Field label="Mobile Number" required>
              <div className="dv2-contact-row">
                <input
                  className="dv2-field__input"
                  value={state.contact.mobile}
                  onChange={(e) => setContact({ mobile: e.target.value })}
                />
                <button type="button" className="ds-btn ds-btn--secondary ds-btn--sm">
                  Verify OTP
                </button>
              </div>
            </Field>
            <Field label="Email Address" required>
              <input
                className="dv2-field__input"
                type="email"
                value={state.contact.email}
                onChange={(e) => setContact({ email: e.target.value })}
              />
            </Field>
            <label className="dv2-check-row">
              <input
                type="checkbox"
                checked={state.contact.whatsappUpdates}
                onChange={(e) => setContact({ whatsappUpdates: e.target.checked })}
              />
              WhatsApp updates
            </label>
            <Field label="Special requests (optional)">
              <textarea
                className="dv2-field__input"
                rows={3}
                value={state.specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
              />
            </Field>
          </div>

          {errors.length > 0 && (
            <ul className="dv2-error-list">
              {errors.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          )}

          <div className="dv2-flow__actions">
            <button
              type="button"
              className="ds-btn ds-btn--primary ds-btn--block"
              onClick={() => {
                if (validateTravellers()) setStep(2)
              }}
            >
              Continue to payment
            </button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <h1 className="dv2__section-title dv2-flow__title">Payment</h1>
          <button
            type="button"
            className="dv2-pay-toggle"
            onClick={() => setSummaryOpen((o) => !o)}
          >
            Total: {formatINR(totals.total)} · View Breakdown {summaryOpen ? '↑' : '↓'}
          </button>
          {summaryOpen && (
            <div className="dv2-summary-card">
              {totals.breakdown.map((b) => (
                <SummaryRow key={b.label} label={b.label} value={formatINR(b.amount)} />
              ))}
            </div>
          )}

          <div className="dv2-card">
            <h3 className="dv2-card__title">Pay via UPI</h3>
            <div className="dv2-chips">
              {['G Pay', 'PhonePe', 'Paytm'].map((app) => (
                <button key={app} type="button" className="dv2-chip">
                  {app}
                </button>
              ))}
            </div>
            <div className="dv2-coupon-row">
              <input className="dv2-coupon-input" placeholder="yourname@upi" />
              <button type="button" className="ds-btn ds-btn--primary ds-btn--sm">
                Verify &amp; pay
              </button>
            </div>
          </div>

          <div className="dv2-card">
            <h3 className="dv2-card__title">Card</h3>
            <Field label="Card Number">
              <input className="dv2-field__input" placeholder="4111 1111 1111 1111" />
            </Field>
            <div className="dv2-payment-grid">
              <Field label="Expiry">
                <input className="dv2-field__input" placeholder="MM/YY" />
              </Field>
              <Field label="CVV">
                <input className="dv2-field__input" placeholder="***" />
              </Field>
            </div>
            <label className="dv2-check-row">
              <input type="checkbox" checked={saveCard} onChange={(e) => setSaveCard(e.target.checked)} />
              Save card for future
            </label>
          </div>

          <div className="dv2-card">
            <h3 className="dv2-card__title">Net Banking</h3>
            <select className="dv2-field__input">
              <option>SBI</option>
              <option>HDFC</option>
              <option>ICICI</option>
              <option>Axis</option>
              <option>Kotak</option>
              <option>More banks…</option>
            </select>
          </div>

          {totals.total > 5000 && (
            <div className="dv2-disclaimer">0% EMI available on select cards — 3 / 6 / 12 months</div>
          )}

          <p className="dv2-secure-note">
            <Lock size={14} style={{ verticalAlign: 'middle' }} /> 100% Secure Payment · SSL Encrypted
          </p>
          <p className="dv2-secure-note ds-caption">Razorpay · Visa · Mastercard · UPI</p>

          <div className="dv2-flow__actions">
            <button type="button" className="ds-btn ds-btn--primary ds-btn--block" onClick={handlePay}>
              Pay {formatINR(totals.total)}
            </button>
          </div>
        </>
      )}
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}

function ProgressBar({ step }: { step: number }) {
  return (
    <div className="dv2-progress" role="progressbar" aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={3}>
      {STEPS.map((label, i) => (
        <div key={label} style={{ display: 'contents' }}>
          <div className="dv2-progress__step">
            <div
              className={`dv2-progress__dot${i < step ? ' dv2-progress__dot--done' : ''}${i === step ? ' dv2-progress__dot--current' : ''}`}
            >
              {i < step ? <Check size={14} /> : i + 1}
            </div>
            <span className="dv2-progress__label">{label}</span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`dv2-progress__line${i < step ? ' dv2-progress__line--done' : ''}`} />
          )}
        </div>
      ))}
    </div>
  )
}

function SummaryRow({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`dv2-summary-card__row${bold ? ' dv2-summary-card__row--total' : ''}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  )
}

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="dv2-field">
      <label className="dv2-field__label">
        {label}
        {required ? <span className="dv2-field__required"> *</span> : null}
      </label>
      <div className="dv2-field__input-wrap">{children}</div>
    </div>
  )
}
