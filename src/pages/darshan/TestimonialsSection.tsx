import { TESTIMONIALS } from './darshanData'
import { IconChevronLeft, IconChevronRight } from './DarshanIcons'

type Props = {
  index: number
  setIndex: (n: number) => void
}

export function TestimonialsSection({ index, setIndex }: Props) {
  const t = TESTIMONIALS[index]
  const len = TESTIMONIALS.length

  const prev = () => setIndex((index - 1 + len) % len)
  const next = () => setIndex((index + 1) % len)

  return (
    <section className="darshan__section" aria-labelledby="test-heading">
      <div className="darshan__container">
        <div className="darshan__section-head">
          <h2 id="test-heading" className="darshan__h2">
            Pilgrim stories
          </h2>
          <p className="darshan__lead">Authentic voices — emotional, calm, and travel-grade clarity.</p>
        </div>
        <div className="darshan__carousel">
          <figure className="darshan__testimonial">
            <div className="darshan__test-avatar" aria-hidden>
              {t.name
                .split(' ')
                .map((p) => p[0])
                .join('')
                .slice(0, 2)}
            </div>
            <blockquote className="darshan__test-quote">&ldquo;{t.quote}&rdquo;</blockquote>
            <figcaption className="darshan__test-meta">
              <span className="darshan__test-name">{t.name}</span>
              <span className="darshan__test-place">{t.place}</span>
              <span className="darshan__rating" aria-label={`${t.rating} out of 5`}>
                {'★'.repeat(t.rating)}
                {t.rating < 5 ? '☆'.repeat(5 - t.rating) : null}
              </span>
            </figcaption>
          </figure>
          <div className="darshan__carousel-nav">
            <button type="button" className="darshan__carousel-btn" onClick={prev} aria-label="Previous testimonial">
              <IconChevronLeft />
            </button>
            <div className="darshan__dots">
              {TESTIMONIALS.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  className={`darshan__dot${i === index ? ' darshan__dot--on' : ''}`}
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-pressed={i === index}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
            <button type="button" className="darshan__carousel-btn" onClick={next} aria-label="Next testimonial">
              <IconChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
