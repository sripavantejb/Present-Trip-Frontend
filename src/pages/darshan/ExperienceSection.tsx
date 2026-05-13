import { EXPERIENCE_BLOCKS } from './darshanData'

export function ExperienceSection() {
  return (
    <section className="darshan__section darshan__section--experience" aria-labelledby="exp-heading">
      <div className="darshan__container">
        <div className="darshan__section-head darshan__section-head--center">
          <p className="darshan__kicker">Pilgrimage experience</p>
          <h2 id="exp-heading" className="darshan__h2">
            Sacred moments, world-class comfort
          </h2>
          <p className="darshan__lead">
            Calm logistics around devotion — editorial journeys through ritual, light, and mountain air.
          </p>
        </div>

        {EXPERIENCE_BLOCKS.map((b, i) => (
          <div
            key={b.id}
            className={`darshan__story${i % 2 === 1 ? ' darshan__story--reverse' : ''}`}
          >
            <div className="darshan__story-copy">
              <h3 className="darshan__h3">{b.title}</h3>
              <p className="darshan__muted">{b.body}</p>
            </div>
            <figure className="darshan__story-figure">
              <img className="darshan__story-img" src={b.imageUrl} alt={b.imageAlt} loading="lazy" />
            </figure>
          </div>
        ))}
      </div>
    </section>
  )
}
