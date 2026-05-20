import { Compass, Phone, RefreshCw, Ticket } from 'lucide-react'
import { WHY_BOOK_POINTS, type WhyBookPoint } from './postHeroData'
import { SectionShell } from './components/SectionShell'

const ICONS: Record<WhyBookPoint['iconKey'], typeof Ticket> = {
  ticket: Ticket,
  refresh: RefreshCw,
  phone: Phone,
  compass: Compass,
}

export function WhyBookSection() {
  return (
    <SectionShell
      id="why-us"
      headingId="why-us-heading"
      title="Why book with us"
      lead="Trusted coordination for darshan, stay, transport, and sevas."
      muted
    >
      <div className="darshan__why-book-grid">
        {WHY_BOOK_POINTS.map((point) => {
          const Ico = ICONS[point.iconKey]
          return (
            <article key={point.id} className="darshan__why-book-card">
              <span className="darshan__why-book-icon" aria-hidden>
                <Ico size={28} />
              </span>
              <h3 className="darshan__why-book-title">{point.title}</h3>
              <p className="darshan__muted">{point.description}</p>
            </article>
          )
        })}
      </div>
    </SectionShell>
  )
}
