import { PILGRIM_REVIEWS } from './postHeroData'
import { SectionShell } from './components/SectionShell'

export function ReviewsSection() {
  const stories = PILGRIM_REVIEWS.slice(0, 8)

  return (
    <SectionShell
      id="reviews"
      headingId="reviews-heading"
      title="Devotee Stories"
      lead="Real experiences from pilgrims who travelled with us."
      className="pil-section pil-section--muted"
    >
      <div className="pil-scroll-x">
        {stories.map((r) => (
          <article key={r.id} className="pil-stories__card pil-card">
            <div className="pil-stories__avatar" aria-hidden>
              {r.name
                .split(' ')
                .map((p) => p[0])
                .join('')
                .slice(0, 2)}
            </div>
            <p className="pil-stories__meta" style={{ margin: '0 0 var(--space-xs)', fontSize: 'var(--text-body-sm)' }}>
              <strong>{r.name}</strong>
              <span style={{ color: 'var(--color-muted)' }}> · {r.city}</span>
            </p>
            <div className="pil-stories__stars" aria-label={`${r.rating} out of 5 stars`}>
              {'★'.repeat(r.rating)}
              {r.rating < 5 ? '☆'.repeat(5 - r.rating) : ''}
            </div>
            <p className="pil-stories__quote">&ldquo;{r.quote.slice(0, 120)}{r.quote.length > 120 ? '…' : ''}&rdquo;</p>
            <p className="pil-stories__tag">{r.packageUsed}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  )
}
