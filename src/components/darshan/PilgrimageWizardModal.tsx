import { useEffect, useMemo, useState } from 'react'
import { HUB_IMAGES } from '../../features/darshan/data/images'
import './pilgrimage-wizard.css'

const STEPS = ['Choose Hub', 'Select Temples', 'Plan Schedule', 'Summary'] as const

const HUBS = [
  { id: 'tirupati', name: 'Tirupati', state: 'Andhra Pradesh', temples: 12, image: HUB_IMAGES.tirupati },
  { id: 'shirdi', name: 'Shirdi', state: 'Maharashtra', temples: 6, image: HUB_IMAGES.shirdi },
  { id: 'varanasi', name: 'Varanasi', state: 'Uttar Pradesh', temples: 18, image: HUB_IMAGES.varanasi },
  { id: 'puri', name: 'Puri', state: 'Odisha', temples: 8, image: HUB_IMAGES.puri },
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

const DEFAULT_ITINERARY = [
  { time: '5:00 AM', label: 'Depart stay — Alipiri / Tirumala route' },
  { time: '6:30 AM', label: 'Sarva Darshan queue entry (mock slot)' },
  { time: '11:00 AM', label: 'Prasadam & rest break' },
  { time: '2:00 PM', label: 'Padmavathi Ammavari (if selected)' },
  { time: '6:00 PM', label: 'Return to Tirupati town' },
] as const

type Props = {
  onClose: () => void
  /** Full-page flow inside SiteLayout (keeps site header / mobile nav) */
  embedded?: boolean
  /** @deprecated Use `embedded` — kept for any legacy callers */
  fullscreen?: boolean
}

export function PilgrimageWizardModal({ onClose, embedded, fullscreen }: Props) {
  const isEmbedded = embedded ?? fullscreen ?? false
  const [step, setStep] = useState(0)
  const [hubId, setHubId] = useState<string | null>('tirupati')
  const [selected, setSelected] = useState<Set<string>>(() => new Set(['wt1', 'sd1']))

  useEffect(() => {
    if (isEmbedded) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [isEmbedded])

  const hub = HUBS.find((h) => h.id === hubId)
  const selectedNames = useMemo(() => {
    const names: string[] = []
    for (const group of TEMPLE_GROUPS) {
      for (const t of group.temples) {
        if (selected.has(t.id)) names.push(t.name)
      }
    }
    return names
  }, [selected])

  const toggleTemple = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const canNext =
    step === 0 ? Boolean(hubId) : step === 1 ? selected.size > 0 : true

  const goNext = () => {
    if (step < STEPS.length - 1 && canNext) setStep((s) => s + 1)
  }

  const goBack = () => {
    if (step > 0) setStep((s) => s - 1)
  }

  const wizardClass = `pil-wizard${isEmbedded ? ' pil-wizard--embedded' : ''}`

  return (
    <>
      {!isEmbedded ? (
        <button type="button" className="pil-wizard__scrim" aria-label="Close wizard" onClick={onClose} />
      ) : null}
      <div
        className={wizardClass}
        role={isEmbedded ? undefined : 'dialog'}
        aria-modal={isEmbedded ? undefined : true}
        aria-labelledby="pil-wizard-title"
      >
        <header className="pil-wizard__head">
          <div className="pil-wizard__head-inner">
            <h2 id="pil-wizard-title" className="pil-wizard__title">
              Plan My Pilgrimage
            </h2>
            <button type="button" className="pil-wizard__close" onClick={onClose} aria-label="Close">
              ×
            </button>
          </div>
        </header>

        <nav className="pil-wizard__stepper" aria-label="Wizard steps">
          <div className="pil-wizard__stepper-inner">
            <ol className="pil-wizard__stepper-list">
              {STEPS.map((label, i) => (
                <li
                  key={label}
                  className={`pil-wizard__step-item${i === step ? ' pil-wizard__step-item--active' : ''}${i < step ? ' pil-wizard__step-item--done' : ''}`}
                  aria-current={i === step ? 'step' : undefined}
                >
                  <span className="pil-wizard__step-index">{i + 1}</span>
                  <span className="pil-wizard__step-label">{label}</span>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <div className="pil-wizard__body">
          <div className="pil-wizard__content">
            {step === 0 ? (
              <>
                <p className="pil-wizard__step-intro">Choose a pilgrimage hub to plan temples, schedule, and travel.</p>
                <div className="pil-wizard__hub-grid">
                  {HUBS.map((h) => (
                    <button
                      key={h.id}
                      type="button"
                      className={`pil-wizard__hub-card${hubId === h.id ? ' pil-wizard__hub-card--selected' : ''}`}
                      onClick={() => setHubId(h.id)}
                      aria-pressed={hubId === h.id}
                    >
                      <img src={h.image} alt="" className="pil-wizard__hub-img" loading="lazy" decoding="async" />
                      <div className="pil-wizard__hub-info">
                        <p className="pil-wizard__hub-name">{h.name}</p>
                        <p className="pil-wizard__hub-meta">
                          {h.state} · {h.temples} temples
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            ) : null}

            {step === 1 ? (
              <>
                <p className="pil-wizard__step-intro">
                  Select temples near {hub?.name ?? 'your hub'} for your itinerary.
                </p>
                {TEMPLE_GROUPS.map((group) => (
                  <div key={group.label} className="pil-wizard__group">
                    <h3 className="pil-wizard__group-title">{group.label}</h3>
                    <div className="pil-wizard__temple-list">
                      {group.temples.map((t) => (
                        <label key={t.id} className="pil-wizard__temple-row">
                          <input
                            type="checkbox"
                            checked={selected.has(t.id)}
                            onChange={() => toggleTemple(t.id)}
                          />
                          <span>
                            <span className="pil-wizard__temple-name">
                              {t.name}
                              {'mustVisit' in t && t.mustVisit ? ' · Must visit' : ''}
                            </span>
                            <span className="pil-wizard__hub-meta">{t.desc}</span>
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="pil-wizard__selection-bar">{selected.size} temples selected</div>
              </>
            ) : null}

            {step === 2 ? (
              <>
                <p className="pil-wizard__step-intro">
                  Suggested day plan for {hub?.name ?? 'your hub'} (illustrative).
                </p>
                <div className="pil-wizard__itinerary">
                  {DEFAULT_ITINERARY.map((item) => (
                    <div key={item.time} className="pil-wizard__itinerary-item">
                      <span className="pil-wizard__itinerary-time">{item.time}</span>
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
                <div className="pil-wizard__extend-chips">
                  {['+ Half day buffer', '+ Annadanam slot', '+ Tonsure booking'].map((chip) => (
                    <span key={chip} className="pil-wizard__chip">
                      {chip}
                    </span>
                  ))}
                </div>
                <div className="pil-wizard__tips">
                  <h4>Pilgrim tips</h4>
                  <ul>
                    <li>Carry valid ID and darshan token if pre-booked.</li>
                    <li>Plan hill route timing around crowd forecasts.</li>
                    <li>Keep phones on silent inside the temple complex.</li>
                  </ul>
                </div>
              </>
            ) : null}

            {step === 3 ? (
              <div className="pil-wizard__summary">
                <p className="pil-wizard__step-intro">Review your pilgrimage plan before booking.</p>
                <p>
                  <strong>Hub:</strong> {hub?.name}, {hub?.state}
                </p>
                <p>
                  <strong>Temples ({selectedNames.length}):</strong> {selectedNames.join(' · ')}
                </p>
                <p className="pil-wizard__hub-meta">
                  This is a planning preview. Book darshan slots from the temple detail pages when you are ready.
                </p>
                <div className="pil-wizard__tips">
                  <h4>Next steps</h4>
                  <ul>
                    <li>Search dates on the Darshan tab and pick a temple.</li>
                    <li>Add stays and transport from package sections.</li>
                    <li>Share this itinerary with your group coordinator.</li>
                  </ul>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <footer className="pil-wizard__foot">
          <div className="pil-wizard__foot-inner">
            {step > 0 ? (
              <button type="button" className="ds-btn ds-btn--secondary" onClick={goBack}>
                Back
              </button>
            ) : (
              <span aria-hidden />
            )}
            <div className="pil-wizard__foot-end">
              {step < STEPS.length - 1 ? (
                <button type="button" className="ds-btn ds-btn--primary" disabled={!canNext} onClick={goNext}>
                  Continue
                </button>
              ) : (
                <button type="button" className="ds-btn ds-btn--primary" onClick={onClose}>
                  Done
                </button>
              )}
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
