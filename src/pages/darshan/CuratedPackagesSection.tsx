import { useState } from 'react'
import { CURATED_PACKAGES } from './postHeroData'
import { CuratedPackageCard } from './components/CuratedPackageCard'
import { SectionShell } from './components/SectionShell'

export function CuratedPackagesSection() {
  const [addOns, setAddOns] = useState<Record<string, boolean>>({})

  const toggleAddOn = (id: string) => {
    setAddOns((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <SectionShell
      id="packages"
      headingId="packages-heading"
      title="Darshan packages"
      lead="Curated bundles — darshan, stay, and transport in one booking."
      muted
      className="darshan__section--packages"
    >
      <div className="darshan__pkg-tier-grid">
        {CURATED_PACKAGES.map((pkg) => (
          <CuratedPackageCard key={pkg.id} pkg={pkg} addOns={addOns} onToggleAddOn={toggleAddOn} />
        ))}
      </div>
      <p className="darshan__pkg-custom-link">
        <a href="/support">Need a custom package? Tell us your requirements →</a>
      </p>
    </SectionShell>
  )
}
