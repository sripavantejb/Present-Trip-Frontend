import { FAQ_ITEMS } from './postHeroData'
import { Accordion } from './components/Accordion'
import { SectionShell } from './components/SectionShell'

export function FaqSection() {
  const items = FAQ_ITEMS.map((faq) => ({
    id: faq.id,
    title: faq.question,
    content: <p className="darshan__faq-answer">{faq.answer}</p>,
  }))

  return (
    <SectionShell id="faq" headingId="faq-heading" title="Frequently asked questions" lead="Quick answers before you travel.">
      <Accordion items={items} />
    </SectionShell>
  )
}
