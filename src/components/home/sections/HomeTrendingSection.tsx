import { Link } from 'react-router-dom'
import { TRENDING_TEMPLES } from '../../../pages/darshan/postHeroData'
import { HomeSectionHeader } from './HomeSectionHeader'

export function HomeTrendingSection() {
  return (
    <section className="pt-home-section pt-home-section--muted" aria-labelledby="home-trending-heading">
      <div className="pt-home-section__inner">
        <HomeSectionHeader
          title="Trending This Week"
          subtitle="Most booked temples by devotees across India"
          seeAllHref="/temples"
          seeAllLabel="See all"
        />
        <div className="pt-home-hScroll pt-home-hScroll--fade" id="home-trending-heading">
          {TRENDING_TEMPLES.map((t) => (
            <Link key={t.id} to="/temples" className="pt-home-trendRow">
              <span className="pt-home-trendRank">{t.rank}</span>
              <img src={t.imageUrl} alt={t.imageAlt} width={56} height={56} loading="lazy" />
              <div className="pt-home-trendRow__text">
                <p className="pt-home-miniCard__title">{t.name}</p>
                <p className="pt-home-miniCard__sub">{t.location}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
