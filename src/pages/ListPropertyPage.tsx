import { SiteLayout } from '../components/layout/SiteLayout'

export default function ListPropertyPage() {
  return (
    <SiteLayout>
      <div className="ds-pageHero">
        <h1 className="ds-display-xl">List your property</h1>
        <p className="ds-body-md">
          Reach millions of travelers on Present Trip. List a hotel, homestay, or guest house with transparent
          pricing and simple tools.
        </p>
      </div>
      <div className="ds-pageContent" id="resources">
        <div className="ds-card" style={{ maxWidth: '520px' }}>
          <div className="ds-card__body">
            <h2 className="ds-title-md">Get started</h2>
            <p className="ds-body-sm" style={{ margin: 'var(--space-sm) 0 var(--space-lg)' }}>
              Tell us about your property. Our team will reach out within 2 business days.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault()
              }}
            >
              <label className="ds-caption" htmlFor="property-name">
                Property name
              </label>
              <input id="property-name" className="ds-input" type="text" placeholder="e.g. Orion Suites" style={{ marginBottom: 'var(--space-base)' }} />
              <label className="ds-caption" htmlFor="property-email">
                Email
              </label>
              <input id="property-email" className="ds-input" type="email" placeholder="you@email.com" style={{ marginBottom: 'var(--space-lg)' }} />
              <button type="submit" className="ds-btn ds-btn--primary ds-btn--block">
                Submit listing inquiry
              </button>
            </form>
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}
