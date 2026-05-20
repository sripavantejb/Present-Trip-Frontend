import { TRAVELER_REVIEWS } from '../../../config/homePageContent'
import { HomeSectionHeader } from './HomeSectionHeader'

function StarRow({ count }: { count: number }) {
  const full = '★'.repeat(count)
  const empty = '☆'.repeat(5 - count)
  return (
    <p className="pt-home-reviewStars" aria-label={`${count} out of 5 stars`}>
      {full}
      {empty}
    </p>
  )
}

export function TravelerReviewsSection() {
  return (
    <section className="pt-home-section pt-home-section--muted" aria-labelledby="reviews-heading">
      <div className="pt-home-section__inner">
        <HomeSectionHeader
          title="What Our Travelers Say"
          subtitle="Real experiences from real travelers"
        />
        <div className="pt-home-reviewsGrid">
          {TRAVELER_REVIEWS.map((review) => (
            <article key={review.id} className="pt-home-card pt-home-reviewCard">
              <StarRow count={review.stars} />
              <blockquote className="pt-home-reviewQuote">&ldquo;{review.quote}&rdquo;</blockquote>
              <div className="pt-home-reviewFoot">
                <img
                  className="pt-home-reviewAvatar"
                  src={review.avatar}
                  alt={review.avatarAlt}
                  loading="lazy"
                />
                <div>
                  <p className="pt-home-reviewName">{review.name}</p>
                  <span className="pt-home-reviewTrip">{review.trip}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
