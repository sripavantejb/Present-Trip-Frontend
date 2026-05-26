import { useEffect, useMemo, useState } from 'react'
import './pilgrimage-wizard.css'

const STEPS = ['Choose Hub', 'Select Temples', 'Plan Schedule', 'Summary'] as const

const HUBS = [
  { id: 'tirupati', name: 'Tirupati', state: 'Andhra Pradesh', temples: 12, image: 'https://images.unsplash.com/photo-1582510003544-4a00b9bd4d81?w=280&h=160&fit=crop' },
  { id: 'shirdi', name: 'Shirdi', state: 'Maharashtra', temples: 6, image: 'https://images.unsplash.com/photo-1605647540924-852290f6b0a5?w=280&h=160&fit=crop' },
  { id: 'varanasi', name: 'Varanasi', state: 'Uttar Pradesh', temples: 18, image: 'https://images.unsplash.com/photo-1548013146-7249f0bb9e9f?w=280&h=160&fit=crop' },
  { id: 'puri', name: 'Puri', state: 'Odisha', temples: 8, image: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b4?w=280&h=160&fit=crop' },
] as const

const TEMPLE_GROUPS = [
  {
    label: 'Walking distance',
    temples: [
      { id: 'wt1', name: 'Sri Venkateswara Temple', desc: 'Main hill shrine — allow 3–4 hrs', mustVisit: true },
      { id: 'wt2', name: 'Sri Bhu Varaha Swamy Temple', desc: 'North of main temple — 15 min walk' },
    ],
  },
  {
    label: 'Short drive',
    temples: [
      { id: 'sd1', name: 'Sri Padmavathi Ammavari Temple', desc: 'Tiruchanur — 20 min drive', mustVisit: true },
      { id: 'sd2', name: 'Sri Kapileswara Swamy Temple', desc: 'Tirupati town — 30 min' },
    ],
  },
  {
    label: 'Day trip',
    temples: [{ id: 'dt1', name: 'Sri Kalahasti Temple', desc: '45 km — half-day excursion' }],
  },
] as const

const EXTEND_CITIES = [
  { name: 'Chennai', km: 135 },
  { name: 'Bangalore', km: 250 },
  { name: 'Hyderabad', km: 550 },
]

type Props = {
  onClose: () => void
  /** Full-screen page mode — no scrim overlay */
  fullscreen?: boolean
}

export function PilgrimageWizardModal({ onClose, fullscreen = false }: Props) {
  const [step, setStep] = useState(0)
  const [hubId, setHubId] = useState<string | null>(null)
  const [selectedTemples, setSelectedTemples] = useState<Set<string>>(new Set(['wt1', 'sd1']))

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const templeCount = selectedTemples.size
  const estDays = Math.max(1, Math.ceil(templeCount / 2))

  const itinerary = useMemo(
    () => [
      { time: '5:00 AM', title: 'Depart hotel', detail: 'Light breakfast recommended' },
      { time: '6:30 AM', title: 'Special Entry Darshan', detail: 'Pre-booked slot at Tirumala' },
      { time: '10:00 AM', title: 'Prasadam & Laddu counter', detail: 'Collect at specified counter' },
      { time: '2:00 PM', title: 'Padmavathi Temple', detail: 'Tiruchanur — separate queue' },
      { time: '6:00 PM', title: 'Return to hotel', detail: 'Rest before evening aarti' },
    ],
    [],
  )

  const toggleTemple = (id: string) => {
    setSelectedTemples((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const canNext = step === 0 ? hubId !== null : step === 1 ? templeCount > 0 : true

  return (
    <>
      {!fullscreen ? (
        <button type="button" className="pil-wizard__scrim" aria-label="Close wizard" onClick={onClose} />
      ) : null}
      <div
        className={`pil-wizard${fullscreen ? ' pil-wizard--fullscreen' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="wizard-title"
      >
        <header className="pil-wizard__head">
          <h2 id="wizard-title" className="pil-section__title" style={{ margin: 0, fontSize: '1.25rem' }}>
            Plan My Pilgrimage
          </h2>
          <button type="button" className="pil-wizard__close" onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>

        <div className="pil-wizard__stepper" aria-label="Progress">
          {STEPS.map((label, i) => (
            <div
              key={label}
              className={`pil-wizard__step${i === step ? ' pil-wizard__step--active' : ''}${i < step ? ' pil-wizard__step--done' : ''}`}
            >
              {i + 1}. {label}
            </div>
          ))}
        </div>

        <div className="pil-wizard__body">
          {step === 0 && (
            <div className="pil-wizard__hub-grid">
              {HUBS.map((h) => (
                <button
                  key={h.id}
                  type="button"
                  className={`pil-wizard__hub-card pil-card${hubId === h.id ? ' pil-wizard__hub-card--selected' : ''}`}
                  onClick={() => setHubId(h.id)}
                >
                  <img className="pil-wizard__hub-img" src={h.image} alt="" />
                  <div className="pil-wizard__hub-info">
                    <p className="pil-wizard__hub-name">{h.name}</p>
                    <p className="pil-wizard__hub-meta">
                      {h.state} · {h.temples} temples
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {step === 1 && (
            <>
              {TEMPLE_GROUPS.map((g) => (
                <div key={g.label} className="pil-wizard__group">
                  <h3 className="pil-wizard__group-title">{g.label}</h3>
                  {g.temples.map((t) => (
                    <label key={t.id} className="pil-wizard__temple-row">
                      <input
                        type="checkbox"
                        checked={selectedTemples.has(t.id)}
                        onChange={() => toggleTemple(t.id)}
                      />
                      <div>
                        <strong>
                          {t.name}
                          {'mustVisit' in t && t.mustVisit ? (
                            <span className="pil-badge pil-badge--brand" style={{ marginLeft: 8 }}>
                              Must Visit
                            </span>
                          ) : null}
                        </strong>
                        <p className="pil-wizard__hub-meta" style={{ margin: '4px 0 0' }}>
                          {t.desc}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              ))}
              <div className="pil-wizard__sticky-bar">
                {templeCount} temples · ~{estDays} days
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <p className="pil-wizard__hub-meta" style={{ marginTop: 0 }}>
                Auto-generated itinerary for your selection
              </p>
              {itinerary.map((item) => (
                <div key={item.time} className="pil-wizard__itinerary-item">
                  <span className="pil-wizard__itinerary-time">{item.time}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <p className="pil-wizard__hub-meta" style={{ margin: '4px 0 0' }}>
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
              <aside className="pil-wizard__tips">
                <h4>Smart Tips</h4>
                <ul>
                  <li>Carry original ID matching your darshan booking</li>
                  <li>Mobile phones are not allowed inside the main temple</li>
                  <li>Book hill transport in advance on peak festival days</li>
                </ul>
              </aside>
            </>
          )}

          {step === 3 && (
            <>
              <h3 className="pil-section__title" style={{ fontSize: 'var(--text-display-md)', marginTop: 0 }}>
                Your pilgrimage overview
              </h3>
              <p>
                <strong>{HUBS.find((h) => h.id === hubId)?.name ?? 'Tirupati'}</strong> · {templeCount} temples · ~{estDays}{' '}
                days
              </p>
              <ul className="pil-wizard__hub-meta" style={{ paddingLeft: '1.25rem' }}>
                {Array.from(selectedTemples).map((id) => {
                  const allTemples = TEMPLE_GROUPS.flatMap((g) => [...g.temples])
                  const t = allTemples.find((x) => x.id === id)
                  return t ? <li key={id}>{t.name}</li> : null
                })}
              </ul>
              <h4 style={{ marginTop: 'var(--space-lg)', fontWeight: 'var(--weight-semibold)' }}>Extend Your Trip?</h4>
              <div className="pil-wizard__extend-chips">
                {EXTEND_CITIES.map((c) => (
                  <span key={c.name} className="pil-wizard__chip">
                    {c.name} · {c.km} km
                  </span>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)', marginTop: 'var(--space-lg)' }}>
                <button type="button" className="pil-btn pil-btn--outline">
                  Save &amp; Share Itinerary
                </button>
                <button type="button" className="pil-btn pil-btn--gold">
                  Book This Pilgrimage
                </button>
              </div>
            </>
          )}
        </div>

        <footer className="pil-wizard__foot">
          {step > 0 ? (
            <button type="button" className="pil-btn pil-btn--outline" onClick={() => setStep((s) => s - 1)}>
              Back
            </button>
          ) : (
            <span />
          )}
          {step < 3 ? (
            <button
              type="button"
              className="pil-btn pil-btn--gold"
              style={{ marginLeft: 'auto' }}
              disabled={!canNext}
              onClick={() => setStep((s) => s + 1)}
            >
              Continue
            </button>
          ) : (
            <button type="button" className="pil-btn pil-btn--gold" style={{ marginLeft: 'auto' }} onClick={onClose}>
              Done
            </button>
          )}
        </footer>
      </div>
    </>
  )
}
