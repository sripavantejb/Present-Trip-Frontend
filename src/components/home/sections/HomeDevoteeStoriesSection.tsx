import { PILGRIM_REVIEWS } from '../../../pages/darshan/postHeroData'
import { HomeSectionHeader } from './HomeSectionHeader'

export function HomeDevoteeStoriesSection() {
  const stories = PILGRIM_REVIEWS.slice(0, 4)

  return (
    <section className="pt-home-section pt-home-section--muted" aria-labelledby="home-stories-heading">
      <div className="pt-home-section__inner">
        <HomeSectionHeader
          title="Devotee Stories"
          subtitle="Real experiences from pilgrims who travelled with Present Trip"
        />
        <div className="pt-home-hScroll pt-home-hScroll--fade" id="home-stories-heading">
          {stories.map((r) => (
            <article key={r.id} className="pt-home-card pt-home-storyCard">
              <p className="pt-home-storyCard__quote">&ldquo;{r.quote}&rdquo;</p>
              <p className="pt-home-miniCard__title">{r.name}</p>
              <p className="pt-home-miniCard__sub">
                {r.packageUsed} · ★ {r.rating}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
