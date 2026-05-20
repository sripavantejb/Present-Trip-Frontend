import { SEVA_OFFERINGS } from './postHeroData'
import { SectionShell } from './components/SectionShell'

export function SevaBookingSection() {
  return (
    <SectionShell
      id="sevas"
      headingId="sevas-heading"
      title="Temple seva booking"
      lead="Pre-book arjitha sevas and ritual slots at Tirumala."
      muted
    >
      <div className="darshan__seva-grid">
        {SEVA_OFFERINGS.map((seva) => (
          <article key={seva.id} className="darshan__seva-card">
            <div className="darshan__seva-head">
              <h3 className="darshan__seva-name">{seva.name}</h3>
              <span className="darshan__seva-time">{seva.time}</span>
            </div>
            <p className="darshan__seva-desc">{seva.description}</p>
            <p className="darshan__seva-price">{seva.price}</p>
            <span className="darshan__seva-avail">{seva.availability}</span>
            <button type="button" className="darshan__btn darshan__btn--primary darshan__btn--sm darshan__btn--block">
              Book Seva
            </button>
          </article>
        ))}
      </div>
      <p className="darshan__seva-footnote">
        Seva slots open 1 month in advance and fill quickly. We notify you by email/SMS when your preferred slot
        becomes available.
      </p>
    </SectionShell>
  )
}
