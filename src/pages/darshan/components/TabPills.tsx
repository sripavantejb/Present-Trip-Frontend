type Tab = { id: string; label: string }

type Props = {
  tabs: Tab[]
  active: string
  onChange: (id: string) => void
  ariaLabel: string
}

export function TabPills({ tabs, active, onChange, ariaLabel }: Props) {
  return (
    <div className="darshan__tab-pills" role="tablist" aria-label={ariaLabel}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={active === tab.id}
          className={`darshan__tab-pill${active === tab.id ? ' darshan__tab-pill--active' : ''}`}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
