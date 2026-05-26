import { useMemo, useState } from 'react'
import { Bus, ChevronDown, ChevronRight, Filter, Hotel, User, Utensils } from 'lucide-react'
import { SiteLayout } from '../components/layout/SiteLayout'
import { AppIcon } from '../components/ui/AppIcon'
import '../styles/pilgrimage-theme.css'
import './tour-packages.css'
import {
  INCLUSION_LABELS,
  PACKAGE_FILTERS,
  TOUR_PACKAGES,
  sortPackages,
  type PackageCategory,
  type PackageSort,
  type TourPackage,
} from './tourPackagesData'

const INCLUSION_ICONS = {
  hotel: Hotel,
  meals: Utensils,
  transport: Bus,
  guide: User,
} as const satisfies Record<TourPackage['inclusions'][number], typeof Hotel>

export default function TourPackagesPage() {
  const [filter, setFilter] = useState<PackageCategory>('all')
  const [sort, setSort] = useState<PackageSort>('popularity')
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [budgetMax, setBudgetMax] = useState(50000)
  const [durationFilters, setDurationFilters] = useState<number[]>([])
  const [inclusionFilters, setInclusionFilters] = useState<TourPackage['inclusions'][number][]>([])

  const featured = TOUR_PACKAGES.find((p) => p.featured) ?? TOUR_PACKAGES[0]

  const list = useMemo(() => {
    let items = TOUR_PACKAGES.filter((p) => !p.featured)
    if (filter !== 'all') items = items.filter((p) => p.category === filter)
    if (durationFilters.length) items = items.filter((p) => durationFilters.includes(p.days))
    if (inclusionFilters.length) {
      items = items.filter((p) => inclusionFilters.every((inc) => p.inclusions.includes(inc)))
    }
    items = items.filter((p) => p.pricePerPerson <= budgetMax)
    return sortPackages(items, sort)
  }, [filter, sort, budgetMax, durationFilters, inclusionFilters])

  const discount = featured.originalPrice
    ? Math.round(((featured.originalPrice - featured.pricePerPerson) / featured.originalPrice) * 100)
    : 0

  const routeParts = featured.route.split('→').map((s) => s.trim())

  const toggleDuration = (days: number) => {
    setDurationFilters((prev) =>
      prev.includes(days) ? prev.filter((d) => d !== days) : [...prev, days],
    )
  }

  const toggleInclusion = (inc: TourPackage['inclusions'][number]) => {
    setInclusionFilters((prev) =>
      prev.includes(inc) ? prev.filter((i) => i !== inc) : [...prev, inc],
    )
  }

  const SORT_OPTIONS: { id: PackageSort; label: string }[] = [
    { id: 'price', label: 'Price' },
    { id: 'rating', label: 'Rating' },
    { id: 'duration', label: 'Duration' },
    { id: 'popularity', label: 'Popularity' },
  ]

  return (
    <SiteLayout>
      <div className="pil-page pil-packages">
        <div className="pil-packages__featured" style={{ backgroundImage: `url(${featured.imageUrl})` }}>
          <div className="pil-packages__featured-inner">
            {discount > 0 ? (
              <span className="pil-badge pil-badge--gold" style={{ marginBottom: 'var(--space-sm)' }}>
                {discount}% OFF
              </span>
            ) : null}
            <nav className="pil-packages__breadcrumb" aria-label="Route">
              {routeParts.map((part, i) => (
                <span key={part}>
                  {i > 0 ? <ChevronRight size={14} aria-hidden /> : null}
                  <span>{part}</span>
                </span>
              ))}
            </nav>
            <h1 className="pil-packages__featured-title">{featured.title}</h1>
            <div className="pil-packages__featured-meta">
              <span>
                {featured.days}D / {featured.nights}N
              </span>
              <span>★ {featured.rating} ({featured.reviews} reviews)</span>
              <span>Next: {featured.nextDeparture}</span>
            </div>
            <div className="pil-packages__thumbs" aria-label="Inclusions">
              {featured.inclusions.map((inc) => (
                <span key={inc} className="pil-packages__thumb-chip" title={INCLUSION_LABELS[inc]}>
                  <span className="pil-packages__thumb-icon" aria-hidden>
                    <AppIcon icon={INCLUSION_ICONS[inc]} size={16} />
                  </span>
                  {INCLUSION_LABELS[inc]}
                </span>
              ))}
            </div>
            <button type="button" className="pil-btn pil-btn--gold" style={{ marginTop: 'var(--space-md)' }}>
              Book Featured Package
            </button>
          </div>
        </div>

        <div className="pil-packages__toolbar">
          <div className="pil-packages__toolbar-head">
            <h2 className="pil-section__title" style={{ margin: 0 }}>
              All Packages
            </h2>
            <button
              type="button"
              className="pil-btn pil-btn--outline pil-packages__filter-btn"
              onClick={() => setDrawerOpen((o) => !o)}
              aria-expanded={drawerOpen}
            >
              <Filter size={16} aria-hidden />
              Filters
              <ChevronDown
                size={16}
                style={{ transform: drawerOpen ? 'rotate(180deg)' : undefined, transition: 'transform 0.2s' }}
              />
            </button>
          </div>

          {drawerOpen ? (
            <div className="pil-packages__drawer pil-card pil-card--pro">
              <label className="pil-packages__drawer-label">
                Budget (max ₹{budgetMax.toLocaleString()})
                <input
                  type="range"
                  min={3000}
                  max={50000}
                  step={1000}
                  value={budgetMax}
                  onChange={(e) => setBudgetMax(Number(e.target.value))}
                />
              </label>
              <fieldset className="pil-packages__drawer-field">
                <legend>Duration (days)</legend>
                {[1, 2, 3, 4, 5, 10].map((d) => (
                  <label key={d} className="pil-packages__check">
                    <input
                      type="checkbox"
                      checked={durationFilters.includes(d)}
                      onChange={() => toggleDuration(d)}
                    />
                    {d} day{d > 1 ? 's' : ''}
                  </label>
                ))}
              </fieldset>
              <fieldset className="pil-packages__drawer-field">
                <legend>Inclusions</legend>
                {(Object.keys(INCLUSION_LABELS) as TourPackage['inclusions'][number][]).map((inc) => (
                  <label key={inc} className="pil-packages__check">
                    <input
                      type="checkbox"
                      checked={inclusionFilters.includes(inc)}
                      onChange={() => toggleInclusion(inc)}
                    />
                    {INCLUSION_LABELS[inc]}
                  </label>
                ))}
              </fieldset>
            </div>
          ) : null}

          <div className="pil-packages__sort-row">
            <span className="pil-packages__sort-label">Sort by</span>
            <div className="pil-tabs pil-tabs--pro">
              {SORT_OPTIONS.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className={`pil-tab${sort === s.id ? ' pil-tab--active' : ''}`}
                  onClick={() => setSort(s.id)}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div className="pil-tabs pil-tabs--pro pil-packages__category-tabs">
            {PACKAGE_FILTERS.map((f) => (
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
        </div>

        <div className="pil-packages__list">
          {list.map((pkg) => {
            const off = pkg.originalPrice
              ? Math.round(((pkg.originalPrice - pkg.pricePerPerson) / pkg.originalPrice) * 100)
              : 0
            return (
              <article key={pkg.id} className="pil-pkg-card pil-card pil-card--pro">
                {off > 0 ? <span className="pil-badge pil-badge--gold pil-pkg-card__off">{off}% OFF</span> : null}
                <img className="pil-pkg-card__img" src={pkg.imageUrl} alt="" loading="lazy" />
                <div>
                  <p className="pil-pkg-card__route">{pkg.route}</p>
                  <h3 className="pil-pkg-card__title">{pkg.title}</h3>
                  <div className="pil-pkg-card__meta">
                    <span>
                      {pkg.days}D / {pkg.nights}N
                    </span>
                    <span>{pkg.groupSize}</span>
                    <span>★ {pkg.rating} ({pkg.reviews})</span>
                    <span>Departs {pkg.nextDeparture}</span>
                  </div>
                  <div className="pil-pkg-card__inclusions">
                    {pkg.inclusions.map((inc) => (
                      <span key={inc} className="pil-pkg-card__inc">
                        <AppIcon icon={INCLUSION_ICONS[inc]} size={14} aria-hidden />
                        {INCLUSION_LABELS[inc]}
                      </span>
                    ))}
                  </div>
                  <div className="pil-pkg-card__footer">
                    <span className="pil-pkg-card__price">
                      {pkg.originalPrice ? <s>₹{pkg.originalPrice.toLocaleString()}</s> : null}₹
                      {pkg.pricePerPerson.toLocaleString()}
                      <span style={{ fontSize: 'var(--text-caption-sm)', fontWeight: 400 }}> / person</span>
                    </span>
                    <button type="button" className="pil-btn pil-btn--gold">
                      Book Now
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </SiteLayout>
  )
}
