import { useMemo, useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { SiteLayout } from '../components/layout/SiteLayout'
import { DEALS, DEAL_CATEGORY_FILTERS, type Deal, type DealCategory } from '../data/deals'
import '../styles/pilgrimage-theme.css'
import './deals.css'

function DealCard({ deal }: { deal: Deal }) {
  const [copied, setCopied] = useState(false)

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(deal.couponCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <article className="pil-deal-card pil-card--pro">
      <p className="pil-deal-card__discount">{deal.discount}</p>
      <h3 className="pil-deal-card__title">{deal.title}</h3>
      <p className="pil-deal-card__desc">{deal.description}</p>
      <button type="button" className="pil-deal-card__coupon" onClick={copyCode}>
        <span>{deal.couponCode}</span>
        {copied ? <Check size={16} aria-hidden /> : <Copy size={16} aria-hidden />}
      </button>
      <p className="pil-deal-card__valid">Valid till {deal.validTill}</p>
      <div className="pil-deal-card__tags">
        {deal.tags.map((tag) => (
          <span key={tag} className="pil-deal-card__tag">
            {tag}
          </span>
        ))}
      </div>
      <button type="button" className="pil-btn pil-btn--gold pil-deal-card__claim">
        Claim Now →
      </button>
    </article>
  )
}

export default function DealsPage() {
  const [filter, setFilter] = useState<DealCategory>('all')

  const filtered = useMemo(() => {
    if (filter === 'all') return DEALS
    return DEALS.filter((d) => d.category === filter)
  }, [filter])

  return (
    <SiteLayout>
      <div className="pil-page pil-deals">
        <div className="pil-page__inner">
        <header className="pil-page-hero">
          <span className="pil-eyebrow">Savings</span>
          <h1 className="pil-page-hero__title">Offers &amp; Deals</h1>
          <p className="pil-page-hero__lead">Exclusive coupons for darshan, stays, packages &amp; transport</p>
        </header>

        <div className="pil-deals__tabs pil-tabs pil-tabs--pro">
          {DEAL_CATEGORY_FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              className={`pil-tab${filter === f.id ? ' pil-tab--active' : ''}`}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="pil-deals__grid">
          {filtered.map((d) => (
            <DealCard key={d.id} deal={d} />
          ))}
        </div>
        </div>
      </div>
    </SiteLayout>
  )
}
