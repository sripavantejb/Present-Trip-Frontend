import { useState } from 'react'
import type { DarshanTypeKey } from './darshanData'
import { COMPARE_COLUMNS, COMPARE_ROWS } from './darshanData'

export function CompareSection() {
  const [mobileCol, setMobileCol] = useState<DarshanTypeKey>('special300')

  return (
    <section className="darshan__section darshan__section--muted" aria-labelledby="compare-heading" id="vip-services">
      <div className="darshan__container">
        <div className="darshan__section-head">
          <h2 id="compare-heading" className="darshan__h2">
            Darshan types compared
          </h2>
          <p className="darshan__lead">
            Elegant planning view — illustrative timings only; verify with official advisories same day.
          </p>
        </div>

        <div className="darshan__compare-mobile">
          <div className="darshan__segment" role="tablist" aria-label="Select darshan type">
            {COMPARE_COLUMNS.map((c) => (
              <button
                key={c.key}
                type="button"
                role="tab"
                aria-selected={mobileCol === c.key}
                className={`darshan__segment-btn${mobileCol === c.key ? ' darshan__segment-btn--on' : ''}`}
                onClick={() => setMobileCol(c.key)}
              >
                {c.label}
              </button>
            ))}
          </div>
          <ul className="darshan__compare-mobile-list">
            {COMPARE_ROWS.map((row) => (
              <li key={row.label}>
                <span className="darshan__compare-label">{row.label}</span>
                <span className="darshan__compare-value">{row.values[mobileCol]}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="darshan__compare-desktop">
          <div className="darshan__compare-table-wrap">
            <table className="darshan__compare-table">
              <thead>
                <tr>
                  <th scope="col">Attribute</th>
                  {COMPARE_COLUMNS.map((c) => (
                    <th key={c.key} scope="col">
                      {c.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    {COMPARE_COLUMNS.map((c) => (
                      <td key={c.key}>{row.values[c.key]}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}
