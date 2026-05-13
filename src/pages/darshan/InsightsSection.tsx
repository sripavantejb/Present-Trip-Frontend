import { INSIGHTS } from './darshanData'

type Props = { skeleton: boolean }

export function InsightsSection({ skeleton }: Props) {
  return (
    <section className="darshan__section" aria-labelledby="insights-heading">
      <div className="darshan__container">
        <div className="darshan__section-head">
          <h2 id="insights-heading" className="darshan__h2">
            Real-time crowd &amp; slot insights
          </h2>
          <p className="darshan__lead">Travel-style dashboard — mock metrics to demonstrate the product vision.</p>
        </div>
        <div className="darshan__insights-grid">
          {skeleton
            ? [...Array(6)].map((_, i) => (
                <div key={`insk-${i}`} className="darshan__insight-card">
                  <div className="darshan-skeleton darshan-skeleton--text" />
                  <div className="darshan-skeleton darshan-skeleton--h60" />
                </div>
              ))
            : INSIGHTS.map((card) => (
                <article key={card.id} className="darshan__insight-card">
                  <h3 className="darshan__insight-title">{card.title}</h3>
                  <p className="darshan__insight-value">{card.value}</p>
                  <p className="darshan__insight-hint">{card.hint}</p>
                  {card.level ? (
                    <div className={`darshan__meter darshan__meter--${card.level}`} role="presentation">
                      <span />
                    </div>
                  ) : null}
                </article>
              ))}
        </div>
      </div>
    </section>
  )
}
