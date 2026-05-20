type Props = {
  id?: string
  value: number
  min: number
  max: number
  onChange: (value: number) => void
  ariaLabel?: string
}

export function HeroNumberStepper({ id, value, min, max, onChange, ariaLabel }: Props) {
  const dec = () => onChange(Math.max(min, value - 1))
  const inc = () => onChange(Math.min(max, value + 1))

  return (
    <div className="darshan__stepper">
      <button
        type="button"
        className="darshan__stepper-btn"
        onClick={dec}
        disabled={value <= min}
        aria-label={`Decrease ${ariaLabel ?? 'count'}`}
      >
        −
      </button>
      <input
        id={id}
        className="darshan__input darshan__input--lite darshan__stepper-input"
        type="number"
        min={min}
        max={max}
        value={value}
        onChange={(e) => {
          const n = Number.parseInt(e.target.value, 10)
          if (!Number.isNaN(n)) onChange(Math.min(max, Math.max(min, n)))
        }}
        aria-label={ariaLabel}
      />
      <button
        type="button"
        className="darshan__stepper-btn"
        onClick={inc}
        disabled={value >= max}
        aria-label={`Increase ${ariaLabel ?? 'count'}`}
      >
        +
      </button>
    </div>
  )
}
