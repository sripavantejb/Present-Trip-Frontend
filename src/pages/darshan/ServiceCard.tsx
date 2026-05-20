import type { ComponentType } from 'react'
import type { ServiceItem } from './darshanData'
import {
  IconBed,
  IconCalendar,
  IconCar,
  IconChat,
  IconShield,
  IconSparkle,
  IconTemple,
  IconTicket,
  IconUsers,
} from './DarshanIcons'

type CategoryTone =
  | 'darshan'
  | 'vip'
  | 'seva'
  | 'stay'
  | 'transport'
  | 'care'
  | 'ritual'
  | 'guide'
  | 'packages'
  | 'default'

const CATEGORY_META: Record<
  string,
  { Icon: ComponentType<{ className?: string }>; tone: CategoryTone }
> = {
  Darshan: { Icon: IconTemple, tone: 'darshan' },
  VIP: { Icon: IconShield, tone: 'vip' },
  Seva: { Icon: IconSparkle, tone: 'seva' },
  Stay: { Icon: IconBed, tone: 'stay' },
  Transport: { Icon: IconCar, tone: 'transport' },
  Care: { Icon: IconUsers, tone: 'care' },
  Ritual: { Icon: IconTicket, tone: 'ritual' },
  Guide: { Icon: IconChat, tone: 'guide' },
  Packages: { Icon: IconCalendar, tone: 'packages' },
}

type Props = { service: ServiceItem }

export function ServiceCard({ service }: Props) {
  const meta = CATEGORY_META[service.category] ?? { Icon: IconSparkle, tone: 'default' as const }
  const Ico = meta.Icon

  return (
    <article className={`darshan__service-card darshan__service-card--${meta.tone}`}>
      <header className="darshan__service-head">
        <div className="darshan__service-icon-tile" aria-hidden>
          <Ico className="darshan__service-icon" />
        </div>
        <span className="darshan__service-category">{service.category}</span>
      </header>
      <h3 className="darshan__service-title">{service.title}</h3>
      <p className="darshan__service-blurb">{service.blurb}</p>
      <div className="darshan__service-actions">
        <button type="button" className="darshan__link-btn darshan__service-details">
          Details
        </button>
        <button type="button" className="darshan__btn darshan__btn--sm darshan__btn--primary darshan__service-book">
          Book
        </button>
      </div>
    </article>
  )
}
