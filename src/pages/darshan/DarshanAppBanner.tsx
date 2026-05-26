export function DarshanAppBanner() {
  return (
    <section className="pil-app-banner" aria-labelledby="app-banner-heading">
      <div className="pil-section__inner">
        <h2 id="app-banner-heading" className="pil-app-banner__title">
          Download the Present Trip App
        </h2>
        <p className="pil-app-banner__tagline">
          Exclusive deals, live darshan alerts &amp; instant booking
        </p>
        <div className="pil-app-banner__stores">
          <a href="#app-store" className="pil-app-banner__store-btn" aria-label="Download on the App Store">
            App Store
          </a>
          <a href="#play-store" className="pil-app-banner__store-btn" aria-label="Get it on Google Play">
            Google Play
          </a>
        </div>
      </div>
    </section>
  )
}
