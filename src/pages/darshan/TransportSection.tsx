import { useState } from 'react'
import { PRIVATE_VEHICLES, PUBLIC_ROUTES } from './postHeroData'
import { IconInfo } from './DarshanIcons'
import { SectionShell } from './components/SectionShell'
import { TabPills } from './components/TabPills'
import { VehicleCard } from './components/VehicleCard'

const TABS = [
  { id: 'private', label: 'Private Transport' },
  { id: 'public', label: 'Public Transport' },
]

export function TransportSection() {
  const [tab, setTab] = useState('private')
  const [quoteOpen, setQuoteOpen] = useState<string | null>(null)
  const [pickup, setPickup] = useState('')
  const [travelDate, setTravelDate] = useState('')
  const [tripType, setTripType] = useState('oneway')
  const [passengers, setPassengers] = useState('2')

  return (
    <SectionShell
      id="transport"
      headingId="transport-heading"
      title="Transport booking"
      lead="Private cabs and tempo travellers, or public buses and trains to Tirupati."
      muted
      className="darshan__section--transport"
    >
      <TabPills tabs={TABS} active={tab} onChange={setTab} ariaLabel="Transport mode" />

      {tab === 'private' ? (
        <>
          <div className="darshan__transport-trust">
            <p>
              All private vehicles are GPS-tracked, insured, and driven by drivers familiar with temple routes and
              darshan timing windows.
            </p>
          </div>
          <div className="darshan__vehicle-grid">
            {PRIVATE_VEHICLES.map((v) => (
              <VehicleCard key={v.id} vehicle={v} onBook={() => setQuoteOpen(v.id)} />
            ))}
          </div>
          {quoteOpen ? (
            <form
              className="darshan__quote-form darshan__quote-form--transport"
              onSubmit={(e) => {
                e.preventDefault()
                setQuoteOpen(null)
              }}
            >
              <h3 className="darshan__quote-title">Request a quote</h3>
              <label className="darshan__field">
                <span>Pickup city</span>
                <input type="text" value={pickup} onChange={(e) => setPickup(e.target.value)} placeholder="Hyderabad" />
              </label>
              <label className="darshan__field">
                <span>Travel date</span>
                <input type="date" value={travelDate} onChange={(e) => setTravelDate(e.target.value)} />
              </label>
              <label className="darshan__field">
                <span>Trip type</span>
                <select value={tripType} onChange={(e) => setTripType(e.target.value)}>
                  <option value="oneway">One-way</option>
                  <option value="round">Round-trip</option>
                </select>
              </label>
              <label className="darshan__field">
                <span>Passengers</span>
                <input
                  type="number"
                  min={1}
                  max={30}
                  value={passengers}
                  onChange={(e) => setPassengers(e.target.value)}
                />
              </label>
              <div className="darshan__quote-actions">
                <button type="button" className="darshan__btn darshan__quote-cancel" onClick={() => setQuoteOpen(null)}>
                  Cancel
                </button>
                <button type="submit" className="darshan__btn darshan__quote-submit">
                  Submit request
                </button>
              </div>
            </form>
          ) : null}
        </>
      ) : (
        <>
          <div className="darshan__info-banner darshan__info-banner--transport">
            <IconInfo className="darshan__info-banner-icon" aria-hidden />
            <p>
              TSRTC Special Darshan buses include bundled TTD darshan tokens (approx. 1,000 tokens/day). These are
              highly in demand — book early.
            </p>
          </div>
          <div className="darshan__route-table-wrap darshan__route-table-wrap--transport">
            <table className="darshan__route-table">
              <thead>
                <tr>
                  <th scope="col">Route</th>
                  <th scope="col">Operator</th>
                  <th scope="col">Frequency</th>
                  <th scope="col">Journey</th>
                  <th scope="col">Token</th>
                  <th scope="col" />
                </tr>
              </thead>
              <tbody>
                {PUBLIC_ROUTES.map((r) => (
                  <tr key={r.id}>
                    <td>{r.route}</td>
                    <td>{r.operator}</td>
                    <td>{r.frequency}</td>
                    <td>{r.duration}</td>
                    <td>
                      <span
                        className={`darshan__route-token${r.tokenBundled ? ' darshan__route-token--yes' : ''}`}
                      >
                        {r.tokenBundled ? 'Included' : 'Separate'}
                      </span>
                    </td>
                    <td>
                      <button type="button" className="darshan__btn darshan__route-book">
                        Book
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </SectionShell>
  )
}
