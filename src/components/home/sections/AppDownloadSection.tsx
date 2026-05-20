import { SITE_IMAGES } from '../../../config/siteImages'

export function AppDownloadSection() {
  return (
    <section className="pt-home-section pt-home-section--navy pt-home-appSection" aria-labelledby="app-heading">
      <div className="pt-home-section__inner">
        <div className="pt-home-appGrid">
          <div>
            <p className="pt-home-appKicker">Present Trip App</p>
            <h2 id="app-heading" className="pt-home-appTitle">
              Your Travel Companion, Always in Your Pocket
            </h2>
            <p className="pt-home-appSub">
              Book flights, hotels &amp; trains in seconds. Get exclusive app-only deals and
              real-time alerts.
            </p>
            <div className="pt-home-appBtns">
              <button type="button" className="pt-home-btn pt-home-btn--white-outline">
                App Store
              </button>
              <button type="button" className="pt-home-btn pt-home-btn--white-fill">
                Google Play
              </button>
            </div>
            <p className="pt-home-appTrust">4.8★ rated · 50 Lakh+ downloads · Free</p>
          </div>
          <div className="pt-home-phone" aria-hidden>
            <img
              className="pt-home-phoneScreen"
              src={SITE_IMAGES.appMockup}
              alt="Present Trip mobile app"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
