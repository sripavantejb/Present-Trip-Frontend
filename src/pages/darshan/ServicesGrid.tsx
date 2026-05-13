import { SERVICES } from './darshanData'
import { IconSparkle } from './DarshanIcons'

export function ServicesGridSection() {
  return (
    <section className="darshan__section darshan__section--muted" aria-labelledby="services-heading" id="sevas">
      <div className="darshan__container">
        <div className="darshan__section-head">
          <h2 id="services-heading" className="darshan__h2">
            Quick pilgrim services
          </h2>
          <p className="darshan__lead">Everything you might need — book or explore details in taps.</p>
        </div>
        <div className="darshan__services-grid">
          {SERVICES.map((s) => (
            <article key={s.id} className="darshan__service-card">
              <span className="darshan__pill">{s.category}</span>
              <IconSparkle className="darshan__service-icon" />
              <h3 className="darshan__h3">{s.title}</h3>
              <p className="darshan__muted">{s.blurb}</p>
              <div className="darshan__service-actions">
                <button type="button" className="darshan__btn darshan__btn--sm darshan__btn--ghost">
                  Details
                </button>
                <button type="button" className="darshan__btn darshan__btn--sm darshan__btn--accent">
                  Book
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
