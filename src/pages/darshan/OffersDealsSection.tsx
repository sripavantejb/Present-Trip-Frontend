import { useState } from 'react'

const OFFERS = [
  { id: 'o1', discount: '25% OFF', title: 'Special Entry Darshan Bundle', code: 'DARSHAN25' },
  { id: 'o2', discount: '15% OFF', title: 'Weekend Pilgrimage Package', code: 'WEEKEND15' },
  { id: 'o3', discount: '30% OFF', title: 'First-Time Devotee Offer', code: 'FIRST30' },
] as const

export function OffersDealsSection() {
  const [copied, setCopied] = useState<string | null>(null)

  const copyCode = (code: string) => {
    void navigator.clipboard?.writeText(code)
    setCopied(code)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <section id="offers" className="pil-section pil-section--muted" aria-labelledby="offers-heading">
      <div className="pil-section__inner">
        <div className="pil-section__head">
          <div>
            <h2 id="offers-heading" className="pil-section__title">
              Offers &amp; Deals
            </h2>
            <p className="pil-section__lead">Exclusive coupons for darshan and pilgrimage packages</p>
          </div>
        </div>
        <div className="pil-scroll-x">
          {OFFERS.map((o) => (
            <article key={o.id} className="pil-offer-card pil-card">
              <p className="pil-offer-card__discount">{o.discount}</p>
              <h3 className="pil-offer-card__title">{o.title}</h3>
              <button
                type="button"
                className="pil-offer-card__code"
                onClick={() => copyCode(o.code)}
                aria-label={`Copy coupon code ${o.code}`}
              >
                {copied === o.code ? 'Copied!' : o.code}
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
