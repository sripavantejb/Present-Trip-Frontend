import { Link } from 'react-router-dom'
import { TRENDING_TEMPLES } from './postHeroData'

export function TrendingTemplesSection() {
  return (
    <section id="trending" className="pil-section pil-section--muted" aria-labelledby="trending-heading">
      <div className="pil-section__inner">
        <div className="pil-section__head">
          <div>
            <h2 id="trending-heading" className="pil-section__title">
              Trending This Week
            </h2>
            <p className="pil-section__lead">Most booked temples by devotees across India</p>
          </div>
          <Link to="/temples" className="pil-link">
            See All →
          </Link>
        </div>
        <div className="pil-trending__list">
          {TRENDING_TEMPLES.map((t) => (
            <article key={t.id} className="pil-trending__row pil-card">
              <span className="pil-trending__rank" aria-hidden>
                {t.rank}
              </span>
              <img className="pil-trending__thumb" src={t.imageUrl} alt={t.imageAlt} width={56} height={56} loading="lazy" />
              <div className="pil-trending__info">
                <h3 className="pil-trending__name">{t.name}</h3>
                <p className="pil-trending__location">{t.location}</p>
              </div>
              <div className="pil-trending__meta">
                <span className="pil-trending__bookings">{t.bookings.toLocaleString()} bookings</span>
                <span
                  className={`pil-trending__change pil-trending__change--${t.changePercent >= 0 ? 'up' : 'down'}`}
                >
                  {t.changePercent >= 0 ? '↑' : '↓'} {Math.abs(t.changePercent)}%
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
