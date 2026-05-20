import type { ComponentType } from 'react'
import type { DarshanTypeCard as DarshanTypeCardData } from '../postHeroData'
import {
  IconChevronRight,
  IconClock,
  IconSparkle,
  IconTemple,
  IconTicket,
  IconUsers,
} from '../DarshanIcons'
import { StatusPill } from './StatusPill'
import { WaitBadge } from './WaitBadge'

const TYPE_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  sarva: IconUsers,
  slotted: IconClock,
  special300: IconTicket,
  vip: IconSparkle,
  seva: IconTemple,
}

type Props = {
  card: DarshanTypeCardData
}

export function DarshanTypeCard({ card }: Props) {
  const Icon = TYPE_ICONS[card.id] ?? IconTemple

  return (
    <article className={`darshan__type-card${card.featured ? ' darshan__type-card--featured' : ''}`}>
      {card.featured ? <span className="darshan__type-featured-badge">Most popular</span> : null}
      <div className="darshan__type-card-head">
        <span className="darshan__type-icon-wrap" aria-hidden>
          <Icon className="darshan__type-icon" />
        </span>
        <StatusPill status={card.slotStatus} />
      </div>
      <p className="darshan__type-price-display">{card.price}</p>
      <h3 className="darshan__type-name">{card.name}</h3>
      <div className="darshan__type-meta">
        <span className="darshan__type-meta-label">Est. wait</span>
        <WaitBadge waitTime={card.waitTime} level={card.waitLevel} />
      </div>
      <hr className="darshan__type-divider" />
      <p className="darshan__type-desc">{card.description}</p>
      <p className="darshan__type-audience">
        <span>For</span> {card.audience}
      </p>
      <button type="button" className="darshan__btn darshan__type-cta darshan__btn--block">
        <span>Book now</span>
        <IconChevronRight className="darshan__type-cta-arrow" aria-hidden />
      </button>
    </article>
  )
}
