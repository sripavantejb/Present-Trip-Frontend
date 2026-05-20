type FilterGroup = {
  id: string
  label: string
  options: { value: string; label: string }[]
}

type Props = {
  groups: FilterGroup[]
  values: Record<string, string>
  onChange: (groupId: string, value: string) => void
}

export function FilterChips({ groups, values, onChange }: Props) {
  return (
    <div className="darshan__filter-bar">
      {groups.map((group) => (
        <div key={group.id} className="darshan__filter-group">
          <span className="darshan__filter-label">{group.label}</span>
          <div className="darshan__filter-chips" role="group" aria-label={group.label}>
            {group.options.map((opt) => (
              <button
                key={opt.value}
                type="button"
                className={`darshan__filter-chip${values[group.id] === opt.value ? ' darshan__filter-chip--active' : ''}`}
                aria-pressed={values[group.id] === opt.value}
                onClick={() => onChange(group.id, opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
