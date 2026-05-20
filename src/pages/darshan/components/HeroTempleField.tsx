import { useEffect, useId, useRef, useState } from 'react'
import { HERO_TEMPLE_DESTINATIONS } from '../darshanData'
import { IconTemple } from '../DarshanIcons'

type Props = {
  id?: string
  value: string
  onChange: (label: string) => void
  error?: string
  placeholder?: string
  label?: string
}

export function HeroTempleField({
  id: idProp,
  value,
  onChange,
  error,
  placeholder = 'Search or select a temple...',
  label = 'Temple / Destination',
}: Props) {
  const autoId = useId()
  const inputId = idProp ?? autoId
  const listId = `${inputId}-list`
  const wrapRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState(value)

  useEffect(() => {
    setQuery(value)
  }, [value])

  const filtered = HERO_TEMPLE_DESTINATIONS.filter((t) =>
    t.label.toLowerCase().includes(query.trim().toLowerCase()),
  )

  const select = (label: string) => {
    onChange(label)
    setQuery(label)
    setOpen(false)
  }

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  return (
    <div className="darshan__field darshan__field--lite" ref={wrapRef}>
      <label className="darshan__field-label darshan__field-label--lite" htmlFor={inputId}>
        {label}
      </label>
      <div className="darshan__combobox">
        <span className="darshan__field-input-wrap darshan__field-input-wrap--lite">
          <IconTemple className="darshan__field-icon darshan__field-icon--lite" aria-hidden />
          <input
            id={inputId}
            className="darshan__input darshan__input--lite"
            type="text"
            role="combobox"
            aria-expanded={open}
            aria-controls={listId}
            aria-autocomplete="list"
            placeholder={placeholder}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              onChange('')
              setOpen(true)
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={(e) => {
              if (e.key === 'Escape') {
                setOpen(false)
                return
              }
              if (e.key === 'Enter' && filtered[0]) {
                e.preventDefault()
                select(filtered[0].label)
              }
            }}
          />
        </span>
        {open && filtered.length > 0 && (
          <ul id={listId} className="darshan__combobox-list" role="listbox">
            {filtered.map((t) => (
              <li key={t.value} role="option" aria-selected={value === t.label}>
                <button type="button" className="darshan__combobox-option" onMouseDown={() => select(t.label)}>
                  {t.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      {error ? (
        <p className="darshan__field-error" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
