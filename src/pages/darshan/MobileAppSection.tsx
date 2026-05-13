export function MobileAppSection() {
  return (
    <section className="darshan__section darshan__section--gradient" aria-labelledby="mobile-heading">
      <div className="darshan__container">
        <div className="darshan__mobile-showcase">
          <div>
            <h2 id="mobile-heading" className="darshan__h2">
              Mobile experience
            </h2>
            <p className="darshan__lead">
              Bottom navigation, sticky booking, swipeable packages — everything feels like a premium travel app with
              spiritual calm.
            </p>
            <ul className="darshan__checklist">
              <li>Smooth bottom navigation on small screens</li>
              <li>Sticky booking CTA &amp; floating assistant</li>
              <li>Swipeable rails &amp; collapsible details</li>
            </ul>
          </div>
          <div className="darshan__phone-mock" aria-hidden>
            <div className="darshan__phone-screen">
              <div className="darshan__phone-notch" />
              <div className="darshan__phone-content">
                <div className="darshan__phone-bar" />
                <div className="darshan__phone-card" />
                <div className="darshan__phone-card darshan__phone-card--sm" />
              </div>
              <div className="darshan__phone-nav">
                <span />
                <span />
                <span />
                <span />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
