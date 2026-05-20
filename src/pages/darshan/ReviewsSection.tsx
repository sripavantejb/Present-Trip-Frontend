import { useState } from 'react'
import { PILGRIM_REVIEWS } from './postHeroData'
import { SectionShell } from './components/SectionShell'

const INITIAL = 6

export function ReviewsSection() {
  const [visible, setVisible] = useState(INITIAL)
  const shown = PILGRIM_REVIEWS.slice(0, visible)

  return (
    <SectionShell
      id="reviews"
      headingId="reviews-heading"
      title="Pilgrim reviews"
      lead="Real experiences from devotees who travelled with us."
    >
      <div className="darshan__reviews-grid">
        {shown.map((r) => (
          <article key={r.id} className="darshan__review-card">
            <div className="darshan__review-avatar" aria-hidden>
              {r.name
                .split(' ')
                .map((p) => p[0])
                .join('')
                .slice(0, 2)}
            </div>
            <div className="darshan__review-meta">
              <span className="darshan__review-name">
                {r.name} · {r.city}
              </span>
              <span className="darshan__review-rating" aria-label={`${r.rating} out of 5 stars`}>
                {'★'.repeat(r.rating)}
                {r.rating < 5 ? '☆'.repeat(5 - r.rating) : ''}
              </span>
            </div>
            <p className="darshan__review-package">{r.packageUsed}</p>
            <blockquote className="darshan__review-quote">&ldquo;{r.quote}&rdquo;</blockquote>
            <p className="darshan__review-date">Visited: {r.visitDate}</p>
          </article>
        ))}
      </div>
      {visible < PILGRIM_REVIEWS.length ? (
        <div className="darshan__load-more-wrap">
          <button type="button" className="darshan__btn darshan__btn--ghost" onClick={() => setVisible((n) => n + 6)}>
            Load More Reviews
          </button>
        </div>
      ) : null}
    </SectionShell>
  )
}
