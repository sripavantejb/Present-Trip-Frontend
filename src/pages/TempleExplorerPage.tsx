import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Clock, MapPin, Package, Star, Building2, Sparkles } from 'lucide-react'
import { SiteLayout } from '../components/layout/SiteLayout'
import { PilgrimageWizardModal } from '../components/darshan/PilgrimageWizardModal'
import '../styles/pilgrimage-theme.css'
import './temple-explorer.css'
import {
  BADGE_LABELS,
  CROWD_LABELS,
  REGION_FILTERS,
  filterTemplesByRegion,
  groupTemplesByRegion,
  type RegionFilterId,
  type TempleListing,
} from './templeExplorerData'

function TempleCard({
  temple,
  onPlan,
}: {
  temple: TempleListing
  onPlan: () => void
}) {
  const navigate = useNavigate()

  return (
    <article
      className="pil-temple-card pil-card pil-card--pro pil-temple-card--enhanced"
      role="button"
      tabIndex={0}
      onClick={() => navigate('/temples')}
      onKeyDown={(e) => {
        if (e.key === 'Enter') navigate('/temples')
      }}
    >
      <div className="pil-temple-card__img-wrap pil-temple-card__img-wrap--wide">
        <img className="pil-temple-card__img" src={temple.imageUrl} alt={temple.imageAlt} loading="lazy" />
        {temple.badge ? (
          <span className={`pil-temple-card__badge pil-temple-card__badge--${temple.badge}`}>
            {BADGE_LABELS[temple.badge]}
          </span>
        ) : null}
        <span className="pil-temple-card__rating">
          <Star size={14} fill="currentColor" aria-hidden />
          {temple.rating}
        </span>
        <span className={`pil-temple-card__crowd-pill pil-temple-card__crowd-pill--${temple.crowd}`}>
          {CROWD_LABELS[temple.crowd]}
        </span>
      </div>
      <div className="pil-temple-card__body">
        <h3 className="pil-temple-card__name">{temple.name}</h3>
        <p className="pil-temple-card__loc">
          {temple.city}, {temple.state}
        </p>
        <p className="pil-temple-card__dist">{temple.distanceLabel}</p>
        <div className="pil-temple-card__tags">
          {temple.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="pil-temple-card__tag">
              {tag}
            </span>
          ))}
        </div>
        <div className="pil-temple-card__icons" onClick={(e) => e.stopPropagation()}>
          <button type="button" className="ds-btn ds-btn--tertiary ds-btn--sm" title="Timings" aria-label="Timings">
            <Clock size={16} />
          </button>
          <button type="button" className="ds-btn ds-btn--tertiary ds-btn--sm" title="Facilities" aria-label="Facilities">
            <Building2 size={16} />
          </button>
          <button type="button" className="ds-btn ds-btn--tertiary ds-btn--sm" title="Location" aria-label="Location">
            <MapPin size={16} />
          </button>
          <button type="button" className="ds-btn ds-btn--tertiary ds-btn--sm" title="Packages" aria-label="Packages">
            <Package size={16} />
          </button>
          <button type="button" className="ds-btn ds-btn--tertiary ds-btn--sm" title="Darshan booking" aria-label="Darshan booking">
            <Sparkles size={16} />
          </button>
        </div>
        <button
          type="button"
          className="ds-btn ds-btn--primary ds-btn--block pil-temple-card__cta"
          onClick={(e) => {
            e.stopPropagation()
            onPlan()
          }}
        >
          Plan My Pilgrimage
        </button>
      </div>
    </article>
  )
}

function PlanStrip({ onPlan }: { onPlan: () => void }) {
  return (
    <div className="pil-explorer__plan-strip">
      <p>Ready to plan your temple circuit?</p>
      <button type="button" className="ds-btn ds-btn--primary" onClick={onPlan}>
        Plan My Pilgrimage
      </button>
    </div>
  )
}

export default function TempleExplorerPage() {
  const [filter, setFilter] = useState<RegionFilterId>('all')
  const [wizardOpen, setWizardOpen] = useState(false)

  const filtered = useMemo(() => filterTemplesByRegion(filter), [filter])
  const regionGroups = useMemo(() => Array.from(groupTemplesByRegion(filtered).entries()), [filtered])

  return (
    <SiteLayout className="pil-explorer-layout">
      <div className="pil-page pil-explorer">
        <header className="pil-page-hero pil-explorer__hero">
          <div className="pil-page__inner">
            <div className="pil-explorer__title-row">
              <div>
                <span className="pil-eyebrow">Temple explorer</span>
                <h1 className="pil-page-hero__title">Explore Temples</h1>
              </div>
              <span className="pil-explorer__count-badge">{filtered.length} temples</span>
            </div>
            <p className="pil-page-hero__lead">
              Discover temples across India — filter by region, circuit, and pilgrimage hub
            </p>
          </div>
        </header>

        <div className="pil-explorer__sticky-tabs">
          <div className="pil-explorer__sticky-inner pil-tabs pil-tabs--pro" role="tablist">
            {REGION_FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={filter === f.id}
                className={`pil-tab${filter === f.id ? ' pil-tab--active' : ''}`}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="pil-explorer__content">
          {regionGroups.map(([region, temples], groupIndex) => (
            <div key={region}>
              <section className="pil-explorer__region-block">
                <h2 className="pil-explorer__region-title">{region}</h2>
                <div className="pil-explorer__grid">
                  {temples.map((t) => (
                    <TempleCard key={t.id} temple={t} onPlan={() => setWizardOpen(true)} />
                  ))}
                </div>
              </section>
              {(groupIndex + 1) % 2 === 0 && groupIndex < regionGroups.length - 1 ? (
                <PlanStrip onPlan={() => setWizardOpen(true)} />
              ) : null}
            </div>
          ))}
        </div>
      </div>

      {wizardOpen ? <PilgrimageWizardModal onClose={() => setWizardOpen(false)} /> : null}
    </SiteLayout>
  )
}
