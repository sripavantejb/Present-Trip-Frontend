import {
  ArrowLeft,
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  Crown,
  MapPin,
  Sparkles,
  Star,
  Ticket,
  Timer,
  Users,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { SiteLayout } from '../../../components/layout/SiteLayout'
import { useDarshanBooking } from '../context/DarshanBookingContext'
import { useRequireAuth } from '../../../hooks/useRequireAuth'
import {
  RATING_BREAKDOWN,
  TIRUPATI_ABOUT,
  TIRUPATI_ADDONS,
  TIRUPATI_KEY_INFO,
  TIRUPATI_NEARBY,
  TIRUPATI_PRACTICAL,
  TIRUPATI_REVIEWS,
  TIRUPATI_SEVAS,
  getDarshanOptionsForTemple,
  getQueueForTemple,
} from '../data/templeDetails'
import { getTempleById } from '../data/temples'
import type { DarshanTypeId } from '../types'
import { calculateBookingTotal, formatINR, payingDevotees } from '../utils/pricing'
import '../styles/darshan-v2.css'
import '../styles/dv2-temple-layout.css'

const DARSHAN_TYPE_ICONS = {
  free: Ticket,
  sed: Star,
  vip: Crown,
  vvip: Sparkles,
} as const

export default function TempleDetailPage() {
  const { templeId } = useParams<{ templeId: string }>()
  const navigate = useNavigate()
  const requireAuth = useRequireAuth()
  const { state, setSelectedDarshan, toggleSeva, updateAddOns, setTempleId } = useDarshanBooking()
  const [aboutExpanded, setAboutExpanded] = useState(false)
  const [openAccordion, setOpenAccordion] = useState<string | null>('reach')

  const temple = getTempleById(templeId ?? '')
  const options = getDarshanOptionsForTemple(templeId ?? 'tirupati-balaji')
  const queue = getQueueForTemple(templeId ?? 'tirupati-balaji')

  useEffect(() => {
    if (templeId) setTempleId(templeId)
  }, [templeId, setTempleId])

  const totals = useMemo(() => calculateBookingTotal(state), [state])
  const payCount = payingDevotees(state.devotees)
  const selectedOption = options.find((o) => o.id === state.selectedDarshanId)

  if (!temple) {
    return (
      <SiteLayout>
        <div className="dv2-page">
          <p className="ds-body-md">Temple not found.</p>
          <Link to="/" className="ds-btn ds-btn--tertiary">
            Back to home
          </Link>
        </div>
      </SiteLayout>
    )
  }

  const aboutParas = templeId === 'tirupati-balaji' ? TIRUPATI_ABOUT : [
    `${temple.name} is one of India's most revered pilgrimage destinations, drawing devotees from across the world.`,
    `Located in ${temple.location}, the temple welcomes ${temple.visitors} visitors daily with darshan from ${temple.opens}.`,
    'Present Trip coordinates darshan assistance, transport, and prasadam to make your visit seamless and spiritually fulfilling.',
  ]

  const keyInfo = templeId === 'tirupati-balaji' ? TIRUPATI_KEY_INFO : [
    { label: 'Entry Fee', value: temple.entryFee },
    { label: 'Wait Time', value: temple.waitTime },
    { label: 'Opens At', value: temple.opens },
    { label: 'Daily Visitors', value: temple.visitors },
  ]

  const handleBook = () => {
    if (!state.selectedDarshanId) return
    if (!requireAuth('/darshan/book')) return
    navigate('/darshan/book')
  }

  const currentCrowd = queue.find((q) => q.level === 'moderate') ? 'Moderate' : 'Moderate'

  return (
    <SiteLayout>
      <div className="dv2 dv2-page dv2-page--detail">
        <div className="ds-page-shell ds-page-shell--temple">
          <nav className="dv2-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden> / </span>
            <Link to="/darshan">Darshan</Link>
            <span aria-hidden> / </span>
            <span>{temple.shortName}</span>
          </nav>

          <article className="dv2-temple">
            <header className="dv2-hero dv2-hero--detail">
          <img
            src={temple.image}
            alt={temple.name}
            className="dv2-hero__img"
            fetchPriority="high"
            decoding="async"
          />
          <div className="dv2-hero__overlay" aria-hidden />
          <button type="button" className="dv2-hero__back" onClick={() => navigate(-1)} aria-label="Go back">
            <ArrowLeft size={20} />
          </button>
          {temple.badge ? <span className="dv2-hero__badge">{temple.badge}</span> : null}
          <div className="dv2-hero__content">
            <h1 className="dv2-hero__title">{temple.name}</h1>
            <p className="dv2-hero__loc">
              <MapPin size={14} strokeWidth={2} aria-hidden /> {temple.location}
            </p>
            <p className="dv2-hero__rating">
              <Star size={14} fill="currentColor" aria-hidden /> {temple.rating} · {temple.reviewCount} reviews
            </p>
          </div>
            </header>

            <div className="dv2-temple__content">
              <div className="dv2-glance dv2-glance--detail">
          <div className="dv2-glance__item">
            <div className="dv2-glance__icon">
              <Clock size={20} strokeWidth={2} aria-hidden />
            </div>
            <div className="dv2-glance__val">{temple.waitTime}</div>
            <div className="dv2-glance__label">Wait Time</div>
          </div>
          <div className="dv2-glance__item">
            <div className="dv2-glance__icon">
              <Users size={20} strokeWidth={2} aria-hidden />
            </div>
            <div className="dv2-glance__val">{temple.visitors}</div>
            <div className="dv2-glance__label">Daily Visitors</div>
          </div>
          <div className="dv2-glance__item">
            <div className="dv2-glance__icon">
              <Timer size={20} strokeWidth={2} aria-hidden />
            </div>
            <div className="dv2-glance__val">{temple.opens}</div>
            <div className="dv2-glance__label">Opens At</div>
          </div>
              </div>

              <div className="dv2-temple__sections">
                <section className="dv2-section dv2-section--detail">
                  <div className="ds-section-head">
                    <h2 className="dv2__section-title">Live queue status</h2>
                    <span className="dv2-queue__live">
                      <span className="dv2-queue__live-dot" aria-hidden />
                      Updated 2 min ago
                    </span>
                  </div>
                  <div className="dv2-card">
                    <div className="dv2-queue__chart">
                      <div className="dv2-queue__bars">
                        {queue.map((slot) => {
                          const h = slot.level === 'high' ? 90 : slot.level === 'moderate' ? 55 : 30
                          return (
                            <div key={slot.time} className="dv2-queue__bar-wrap">
                              <div
                                className={`dv2-queue__bar dv2-queue__bar--${slot.level}`}
                                style={{ height: `${h}%` }}
                              />
                              <span className="dv2-queue__time">{slot.time}</span>
                            </div>
                          )
                        })}
                      </div>
                      <p className="dv2-queue__current-pill">
                        Current: <strong>{currentCrowd}</strong>
                      </p>
                    </div>
                    <div className="dv2-queue__legend">
              <span className="dv2-queue__legend-item">
                <i className="dv2-queue__legend-dot dv2-queue__legend-dot--low" /> Low
              </span>
              <span className="dv2-queue__legend-item">
                <i className="dv2-queue__legend-dot dv2-queue__legend-dot--moderate" /> Moderate
              </span>
              <span className="dv2-queue__legend-item">
                <i className="dv2-queue__legend-dot dv2-queue__legend-dot--high" /> High
              </span>
                    </div>
                  </div>
                </section>

                <section className="dv2-section dv2-section--detail">
          <h2 className="dv2__section-title">About & Significance</h2>
          <div className="dv2__body">
            {(aboutExpanded ? aboutParas : aboutParas.slice(0, 1)).map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
          <button
            type="button"
            className="dv2-link-btn"
            onClick={() => setAboutExpanded((e) => !e)}
          >
            {aboutExpanded ? 'Read Less' : 'Read More'}
            {aboutExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
                </section>

                <section className="dv2-section dv2-section--detail">
                  <h2 className="dv2__section-title">Key Info</h2>
                  <div className="dv2-info-grid dv2-info-grid--detail">
            {keyInfo.map((item) => (
              <div key={item.label} className="dv2-info-card">
                <div className="dv2-info-card__label">{item.label}</div>
                <div className="dv2-info-card__val">{item.value}</div>
              </div>
            ))}
          </div>
                </section>

                <section className="dv2-section dv2-section--detail">
                  <h2 className="dv2__section-title">Choose Your Darshan</h2>
                  <div className="dv2-darshan-list">
                    {options.map((opt) => {
            const selected = state.selectedDarshanId === opt.id
            return (
              <button
                key={opt.id}
                type="button"
                className={`dv2-darshan-card${selected ? ' dv2-darshan-card--selected' : ''}`}
                onClick={() => setSelectedDarshan(opt.id as DarshanTypeId)}
              >
                {opt.badge && !selected ? <span className="dv2-darshan-card__badge">{opt.badge}</span> : null}
                {selected ? <Check className="dv2-darshan-card__check" size={20} /> : null}
                <span className="dv2-darshan-card__icon" aria-hidden>
                  {(() => {
                    const Icon = DARSHAN_TYPE_ICONS[opt.id as keyof typeof DARSHAN_TYPE_ICONS] ?? Ticket
                    return <Icon size={22} strokeWidth={2} />
                  })()}
                </span>
                <div className="dv2-darshan-card__body">
                  <p className="dv2-darshan-card__name">{opt.name}</p>
                  <p className="dv2-darshan-card__meta">
                    Wait: {opt.wait} · {opt.pricePerPerson === 0 ? '₹0' : `${formatINR(opt.pricePerPerson)}/person`} ·{' '}
                    {opt.note}
                  </p>
                </div>
                <span className="dv2-darshan-card__select">{selected ? 'Selected' : 'Select'}</span>
              </button>
                    )
                    })}
                  </div>
                  {selectedOption && payCount > 0 ? (
                    <p className="dv2-total-line">
                      {selectedOption.pricePerPerson === 0
                        ? 'Free darshan · token at counter'
                        : `${formatINR(selectedOption.pricePerPerson)} × ${payCount} devotees = ${formatINR(selectedOption.pricePerPerson * payCount)}`}
                    </p>
                  ) : null}
                </section>

                {templeId === 'tirupati-balaji' ? (
                  <>
                    <section className="dv2-section dv2-section--detail">
                      <div className="ds-section-head">
                        <h2 className="dv2__section-title">Special Sevas & Poojas</h2>
                        <span className="ds-caption">Optional</span>
                      </div>
                      <div className="dv2-scroll-x dv2-scroll-x--detail">
                {TIRUPATI_SEVAS.map((seva) => {
                  const added = state.selectedSevas.includes(seva.id)
                  return (
                    <div key={seva.id} className="dv2-seva-card">
                      <p className="dv2-seva-card__title">{seva.name}</p>
                      <p className="dv2-seva-card__time">{seva.time}</p>
                      <p className="dv2-seva-card__price">{formatINR(seva.price)}</p>
                      <button
                        type="button"
                        className={`dv2-btn dv2-seva-card__btn${added ? ' dv2-btn--added' : ''}`}
                        onClick={() => toggleSeva(seva.id)}
                      >
                        {added ? 'Added' : 'Add'}
                      </button>
                    </div>
                  )
                })}
              </div>
                    </section>

                    <section className="dv2-section dv2-section--detail">
                      <h2 className="dv2__section-title">Enhance Your Visit</h2>
              <div className="dv2-card">
                {TIRUPATI_ADDONS.map((addon) => (
                  <AddonRow key={addon.id} addon={addon} state={state} updateAddOns={updateAddOns} />
                ))}
              </div>
                    </section>

                    <section className="dv2-section dv2-section--detail">
                      <h2 className="dv2__section-title">Devotees Also Visit</h2>
                      <div className="dv2-scroll-x dv2-scroll-x--detail">
                {TIRUPATI_NEARBY.map((n) => (
                  <div key={n.id} className="dv2-nearby-card">
                    <img src={n.image} alt={n.name} className="dv2-nearby-card__img" loading="lazy" decoding="async" />
                    <div className="dv2-nearby-card__body">
                      <p className="dv2-nearby-card__title">{n.name}</p>
                      <span className="dv2-nearby-card__distance">{n.distance}</span>
                      <p className="dv2-nearby-card__tag">{n.tag ?? ''}</p>
                      <Link
                        to={`/plan?hub=tirupati&temple=${n.id}`}
                        className="ds-btn ds-btn--secondary ds-btn--sm ds-btn--block dv2-nearby-card__cta"
                      >
                        Add to plan
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
                    </section>
                  </>
                ) : null}

                <section className="dv2-section dv2-section--detail">
                  <h2 className="dv2__section-title">Practical Info</h2>
                  <div className="dv2-card dv2-card--accordion">
            {(templeId === 'tirupati-balaji' ? TIRUPATI_PRACTICAL : [
              { id: 'reach', title: 'How to Reach', content: `Visit ${temple.location}. Contact Present Trip for transport assistance.` },
              { id: 'carry', title: 'What to Carry', content: 'Valid government ID proof. Traditional attire recommended.' },
            ]).map((sec) => (
              <div key={sec.id}>
                <button
                  type="button"
                  className="dv2-accordion__btn"
                  onClick={() => setOpenAccordion(openAccordion === sec.id ? null : sec.id)}
                >
                  {sec.title}
                  {openAccordion === sec.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {openAccordion === sec.id ? <div className="dv2-accordion__panel">{sec.content}</div> : null}
              </div>
            ))}
          </div>
                </section>

                <section className="dv2-section dv2-section--detail">
                  <h2 className="dv2__section-title">What Devotees Say</h2>
                  <div className="dv2-reviews-summary">
                    <span className="dv2-rating-big">{temple.rating}</span>
                    <div className="dv2-rating-bars">
                      {RATING_BREAKDOWN.map((r) => (
                        <div key={r.stars} className="dv2-rating-bar-row">
                          <span>{r.stars}★</span>
                          <div className="dv2-rating-bar-row__track">
                            <div className="dv2-rating-bar-row__fill" style={{ width: `${r.pct}%` }} />
                          </div>
                          <span>{r.pct}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="dv2-reviews-list">
                    {(templeId === 'tirupati-balaji' ? TIRUPATI_REVIEWS : TIRUPATI_REVIEWS.slice(0, 2)).map(
                      (rev) => (
                        <div key={rev.name} className="dv2-review-card">
                          <p className="dv2-review-card__head">
                            {rev.name}, {rev.location}
                            <span className="dv2-review-stars" aria-label={`${rev.rating} out of 5`}>
                              {Array.from({ length: rev.rating }).map((_, i) => (
                                <Star key={i} size={14} fill="currentColor" aria-hidden />
                              ))}
                            </span>
                          </p>
                          <p className="dv2__body dv2-review-card__text">{rev.text}</p>
                        </div>
                      ),
                    )}
                  </div>
                </section>
              </div>
            </div>
          </article>
        </div>

        <footer className="dv2-sticky-bar dv2-sticky-bar--detail">
          <div className="dv2-sticky-bar__inner">
            <div>
              <p className="dv2-sticky-bar__label">Total Amount</p>
              <p className="dv2-sticky-bar__price">{formatINR(totals.total)}</p>
              <p className="dv2-sticky-bar__sub">
                for {state.devotees.adults + state.devotees.children} devotees
              </p>
            </div>
            <button
              type="button"
              className={`ds-btn ds-btn--primary dv2-sticky-bar__cta${!state.selectedDarshanId ? ' dv2-sticky-bar__cta--disabled' : ''}`}
              disabled={!state.selectedDarshanId}
              onClick={handleBook}
            >
              {state.selectedDarshanId ? 'Book darshan' : 'Select darshan type'}
            </button>
          </div>
        </footer>
      </div>
    </SiteLayout>
  )
}

function AddonRow({
  addon,
  state,
  updateAddOns,
}: {
  addon: (typeof TIRUPATI_ADDONS)[0]
  state: ReturnType<typeof useDarshanBooking>['state']
  updateAddOns: ReturnType<typeof useDarshanBooking>['updateAddOns']
}) {
  if (addon.type === 'counter') {
    const qty = state.addOns.laddooQty
    return (
      <div className="dv2-addon-row">
        <span className="dv2-addon-row__icon" aria-hidden>
          {addon.icon}
        </span>
        <div className="dv2-addon-row__info">
          <p className="dv2-addon-row__name">{addon.name}</p>
          <p className="dv2-addon-row__price">{addon.priceLabel}</p>
        </div>
        <div className="dv2-addon-row__action">
          <div className="dv2-stepper__ctrl">
            <button type="button" className="dv2-stepper__btn" onClick={() => updateAddOns({ laddooQty: Math.max(0, qty - 1) })}>
              −
            </button>
            <span className="dv2-stepper__val">{qty}</span>
            <button type="button" className="dv2-stepper__btn" onClick={() => updateAddOns({ laddooQty: qty + 1 })}>
              +
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (addon.type === 'toggle') {
    const on = state.addOns.tonsure
    return (
      <div className="dv2-addon-row">
        <span className="dv2-addon-row__icon" aria-hidden>
          {addon.icon}
        </span>
        <div className="dv2-addon-row__info">
          <p className="dv2-addon-row__name">{addon.name}</p>
          <p className="dv2-addon-row__price">{addon.priceLabel}</p>
        </div>
        <div className="dv2-addon-row__action">
          <button
            type="button"
            className={`dv2-toggle${on ? ' dv2-toggle--on' : ''}`}
            aria-pressed={on}
            onClick={() => updateAddOns({ tonsure: !on })}
          >
            <span className="dv2-toggle__knob" />
          </button>
        </div>
      </div>
    )
  }

  const key = addon.id === 'cottage' ? 'cottage' : addon.id === 'transport' ? 'transport' : 'ladduBooking'
  const on = state.addOns[key]
  return (
    <div className="dv2-addon-row">
      <span className="dv2-addon-row__icon" aria-hidden>
        {addon.icon}
      </span>
      <div className="dv2-addon-row__info">
        <p className="dv2-addon-row__name">{addon.name}</p>
        <p className="dv2-addon-row__price">{addon.priceLabel}</p>
      </div>
      <div className="dv2-addon-row__action">
        <button
          type="button"
          className={`dv2-btn dv2-addon-row__btn${on ? ' dv2-btn--added' : ''}`}
          onClick={() => updateAddOns({ [key]: !on })}
        >
          {on ? 'Added' : 'Add'}
        </button>
      </div>
    </div>
  )
}
