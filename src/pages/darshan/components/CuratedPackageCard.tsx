import type { ComponentType } from 'react'
import type { CuratedPackage, PackageInclusionKey } from '../postHeroData'
import { PACKAGE_ADD_ONS } from '../postHeroData'
import {
  IconBed,
  IconCar,
  IconChevronRight,
  IconSparkle,
  IconTicket,
  IconUser,
  IconUsers,
} from '../DarshanIcons'

const TIER_ICONS: Record<string, ComponentType<{ className?: string }>> = {
  saver: IconTicket,
  family: IconUsers,
  vip: IconSparkle,
}

const INCLUSION_ICONS: Record<PackageInclusionKey, ComponentType<{ className?: string }>> = {
  darshan: IconSparkle,
  stay: IconBed,
  transport: IconCar,
  coordinator: IconUser,
}

type Props = {
  pkg: CuratedPackage
  addOns: Record<string, boolean>
  onToggleAddOn: (id: string) => void
}

export function CuratedPackageCard({ pkg, addOns, onToggleAddOn }: Props) {
  const TierIcon = TIER_ICONS[pkg.id] ?? IconTicket

  return (
    <article className={`darshan__pkg-tier${pkg.popular ? ' darshan__pkg-tier--popular' : ''}`}>
      {pkg.popular ? <span className="darshan__pkg-tier-badge">Most popular</span> : null}
      <div className="darshan__pkg-tier-head">
        <span className="darshan__pkg-tier-icon-wrap" aria-hidden>
          <TierIcon className="darshan__pkg-tier-icon" />
        </span>
      </div>
      <p className="darshan__pkg-tier-price-display">{pkg.priceFrom}</p>
      <h3 className="darshan__pkg-tier-name">{pkg.name}</h3>
      <p className="darshan__pkg-tier-ideal">
        <span>Ideal for</span> {pkg.idealFor}
      </p>
      <hr className="darshan__pkg-tier-divider" />
      <ul className="darshan__pkg-tier-list">
        {pkg.inclusions.map((inc) => {
          const IncIcon = INCLUSION_ICONS[inc.key]
          return (
            <li key={inc.label}>
              <span className="darshan__pkg-inc-icon-wrap" aria-hidden>
                <IncIcon className="darshan__pkg-inc-icon" />
              </span>
              <span className="darshan__pkg-inc-label">{inc.label}</span>
            </li>
          )
        })}
      </ul>
      <hr className="darshan__pkg-tier-divider darshan__pkg-tier-divider--addons" />
      <div className="darshan__pkg-addons">
        <p className="darshan__pkg-addons-label">Add-ons</p>
        <div className="darshan__pkg-addon-pills">
          {PACKAGE_ADD_ONS.map((addon) => {
            const checked = Boolean(addOns[addon.id])
            return (
              <button
                key={addon.id}
                type="button"
                role="checkbox"
                aria-checked={checked}
                className={`darshan__pkg-addon-pill${checked ? ' darshan__pkg-addon-pill--checked' : ''}`}
                onClick={() => onToggleAddOn(addon.id)}
              >
                {addon.label}
              </button>
            )
          })}
        </div>
      </div>
      <button type="button" className="darshan__btn darshan__pkg-cta darshan__btn--block">
        <span>Customise &amp; Book</span>
        <IconChevronRight className="darshan__pkg-cta-arrow" aria-hidden />
      </button>
    </article>
  )
}
