import { WHY_US } from './darshanData'
import { IconShield, IconUsers, IconClock, IconSparkle } from './DarshanIcons'

const icons = [IconShield, IconUsers, IconClock, IconSparkle, IconShield, IconUsers, IconSparkle] as const

export function WhyUsSection() {
  return (
    <section className="darshan__section darshan__section--muted" aria-labelledby="why-heading">
      <div className="darshan__container">
        <div className="darshan__section-head">
          <h2 id="why-heading" className="darshan__h2">
            Why choose us
          </h2>
          <p className="darshan__lead">Trust built like a premium OTA — with reverence for the pilgrimage.</p>
        </div>
        <div className="darshan__why-grid">
          {WHY_US.map((w, i) => {
            const Ico = icons[i % icons.length]
            return (
              <article key={w.id} className="darshan__why-card">
                <Ico className="darshan__why-icon" />
                <h3 className="darshan__h3">{w.title}</h3>
                <p className="darshan__muted">{w.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
