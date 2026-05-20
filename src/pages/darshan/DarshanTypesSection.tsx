import { DARSHAN_TYPE_CARDS } from './postHeroData'
import { DarshanTypeCard } from './components/DarshanTypeCard'
import { SectionShell } from './components/SectionShell'

export function DarshanTypesSection() {
  return (
    <SectionShell
      id="darshan-types"
      headingId="darshan-types-heading"
      title="Choose your darshan type"
      lead="Compare wait times, pricing, and slot availability before you book."
      className="darshan__section--types"
    >
      <div className="darshan__type-scroll">
        <div className="darshan__type-grid">
          {DARSHAN_TYPE_CARDS.map((card) => (
            <DarshanTypeCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </SectionShell>
  )
}
