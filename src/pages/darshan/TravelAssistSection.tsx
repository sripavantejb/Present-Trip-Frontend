import { TRAVEL_FACILITIES } from './darshanData'

export function TravelAssistSection() {
  return (
    <section className="darshan__section darshan__section--muted" aria-labelledby="travel-heading" id="transport">
      <div className="darshan__container">
        <div className="darshan__section-head">
          <h2 id="travel-heading" className="darshan__h2">
            Complete travel assistance
          </h2>
          <p className="darshan__lead">Airport to annadanam — availability and pricing snapshots (illustrative).</p>
        </div>
        <div className="darshan__travel-grid">
          {TRAVEL_FACILITIES.map((f) => (
            <article key={f.id} className="darshan__travel-card" id={f.id === 't6' ? 'accommodation' : undefined}>
              <div className="darshan__travel-top">
                <h3 className="darshan__h3">{f.title}</h3>
                <span className="darshan__live-pill">{f.availabilityMock}</span>
              </div>
              <p className="darshan__muted">{f.description}</p>
              <div className="darshan__travel-foot">
                <span className="darshan__price-tag">{f.priceSnippet}</span>
                <span className="darshan__rating">★ {f.rating.toFixed(2)}</span>
              </div>
              <div className="darshan__travel-actions">
                <a href="tel:+911800000000" className="darshan__link-btn">
                  Call desk
                </a>
                <button type="button" className="darshan__link-btn darshan__link-btn--wa">
                  WhatsApp
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
