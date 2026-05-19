import { BLOG_ARTICLES } from '../../../config/homePageContent'
import { HomeSectionHeader } from './HomeSectionHeader'

export function TravelBlogSection() {
  return (
    <section className="pt-home-section pt-home-section--muted" aria-labelledby="blog-heading">
      <div className="pt-home-section__inner">
        <HomeSectionHeader
          title="Travel Inspiration"
          subtitle="Stories, tips and guides from our travel community"
        />
        <div className="pt-home-blogGrid">
          {BLOG_ARTICLES.map((article) => (
            <article key={article.id} className="pt-home-card pt-home-blogCard">
              <img
                className="pt-home-blogImg"
                src={article.image}
                alt={article.imageAlt}
                loading="lazy"
              />
              <div className="pt-home-blogBody">
                <span className={`pt-home-blogTag pt-home-blogTag--${article.categoryTone}`}>
                  {article.category}
                </span>
                <h3 className="pt-home-blogTitle">{article.title}</h3>
                <p className="pt-home-blogExcerpt">{article.excerpt}</p>
                <p className="pt-home-blogMeta">
                  by {article.author} · {article.date}
                </p>
                <a href={`#blog-${article.id}`} className="pt-home-readMore">
                  Read More →
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
