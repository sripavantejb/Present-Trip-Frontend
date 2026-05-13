import { PACKAGES } from './darshanData'

type Props = { skeleton: boolean }

export function PackagesSection({ skeleton }: Props) {
  return (
    <section className="darshan__section darshan__section--packages" id="packages" aria-labelledby="packages-heading">
      <span id="temple-tours" className="darshan__anchor" tabIndex={-1} aria-hidden />
      <div className="darshan__container">
        <div className="darshan__section-head">
          <h2 id="packages-heading" className="darshan__h2">
            Featured darshan packages
          </h2>
          <p className="darshan__lead">Curated like luxury travel — swipe to explore on your phone.</p>
        </div>
        <div className={`darshan__packages-rail${skeleton ? ' darshan__packages-rail--skeleton' : ''}`}>
          {skeleton
            ? [...Array(4)].map((_, i) => (
                <div key={`sk-${i}`} className="darshan__pkg-lux darshan__pkg-lux--sk">
                  <div className="darshan-skeleton darshan-skeleton--h220" />
                  <div className="darshan-skeleton darshan-skeleton--text" />
                </div>
              ))
            : PACKAGES.map((p) => (
                <article key={p.id} className="darshan__pkg-lux">
                  <div className="darshan__pkg-lux-visual">
                    {p.imageUrl ? (
                      <img className="darshan__pkg-lux-img" src={p.imageUrl} alt={p.imageAlt ?? ''} loading="lazy" />
                    ) : (
                      <div className="darshan__pkg-lux-fallback" style={{ background: p.imageGradient }} aria-hidden />
                    )}
                    <div className="darshan__pkg-lux-scrim" />
                    <div className="darshan__pkg-lux-float">
                      <span className="darshan__pkg-lux-price">{p.priceDisplay}</span>
                      <span className="darshan__pkg-lux-stars">★ {p.rating.toFixed(2)}</span>
                    </div>
                    <div className="darshan__pkg-lux-bottom">
                      <h3 className="darshan__pkg-lux-title">{p.title}</h3>
                      <p className="darshan__pkg-lux-meta">{p.duration} · {p.reviews} reviews</p>
                    </div>
                  </div>
                  <div className="darshan__pkg-lux-body">
                    <ul className="darshan__pkg-lux-tags">
                      {p.inclusions.slice(0, 3).map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                    <div className="darshan__pkg-lux-actions">
                      <button type="button" className="darshan__btn darshan__btn--ghost darshan__btn--sm">
                        View itinerary
                      </button>
                      <button type="button" className="darshan__btn darshan__btn--primary darshan__btn--sm">
                        Reserve
                      </button>
                    </div>
                  </div>
                </article>
              ))}
        </div>
      </div>
    </section>
  )
}
