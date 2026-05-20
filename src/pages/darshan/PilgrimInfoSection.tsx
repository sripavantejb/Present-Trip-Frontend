import {
  Accessibility,
  Clock,
  FileText,
  Scissors,
  Shirt,
  UtensilsCrossed,
} from 'lucide-react'
import { PILGRIM_INFO_TOPICS } from './postHeroData'
import { Accordion } from './components/Accordion'
import { SectionShell } from './components/SectionShell'

const TOPIC_ICONS = {
  documents: FileText,
  dress: Shirt,
  timing: Clock,
  food: UtensilsCrossed,
  tonsure: Scissors,
  accessibility: Accessibility,
}

export function PilgrimInfoSection() {
  const items = PILGRIM_INFO_TOPICS.map((topic) => {
    const Ico = TOPIC_ICONS[topic.iconKey]
    return {
      id: topic.id,
      title: topic.title,
      content: (
        <>
          <Ico className="darshan__info-topic-icon" size={22} aria-hidden />
          <ul className="darshan__info-list">
            {topic.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </>
      ),
    }
  })

  return (
    <SectionShell
      id="pilgrim-info"
      headingId="pilgrim-info-heading"
      title="Important pilgrim information"
      lead="Documents, dress code, timing, and on-site guidance — plan with confidence."
    >
      <Accordion items={items} allowMultiple />
    </SectionShell>
  )
}
