import { useMemo, useState } from 'react'
import { SERVICES } from './darshanData'
import { ServiceCard } from './ServiceCard'

const SERVICE_CATEGORIES = ['All', ...Array.from(new Set(SERVICES.map((s) => s.category)))]

export function ServicesGridSection() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filteredServices = useMemo(
    () =>
      activeCategory === 'All'
        ? SERVICES
        : SERVICES.filter((s) => s.category === activeCategory),
    [activeCategory],
  )

  return (
    <section className="darshan__section darshan__section--muted" aria-labelledby="services-heading" id="sevas">
      <div className="darshan__container">
        <div className="darshan__section-head darshan__section-head--with-actions">
          <div>
            <h2 id="services-heading" className="darshan__h2">
              Quick pilgrim services
            </h2>
            <p className="darshan__lead">Book darshan, stay, transport, and seva in a few taps.</p>
          </div>
          <div className="darshan__service-filters" role="tablist" aria-label="Filter services by category">
            {SERVICE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat}
                className={`darshan__filter-chip${activeCategory === cat ? ' darshan__filter-chip--active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="darshan__services-grid">
          {filteredServices.map((s) => (
            <ServiceCard key={s.id} service={s} />
          ))}
        </div>
      </div>
    </section>
  )
}
