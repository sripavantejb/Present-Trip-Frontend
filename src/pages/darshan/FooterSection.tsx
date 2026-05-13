import { FOOTER_COLUMNS } from './darshanData'

export function FooterSection() {
  return (
    <footer className="darshan__footer darshan__footer--luxury" id="contact">
      <div className="darshan__footer-silhouette" aria-hidden />
      <div className="darshan__container">
        <div id="support" className="darshan__anchor" tabIndex={-1} aria-hidden />
        <div className="darshan__footer-top">
          <div>
            <p className="darshan__footer-brand">presenttrip</p>
            <p className="darshan__footer-tagline">Luxury spiritual travel for Tirumala pilgrims.</p>
            <div className="darshan__app-cta">
              <button type="button" className="darshan__btn darshan__btn--footer-outline darshan__btn--sm">
                App Store
              </button>
              <button type="button" className="darshan__btn darshan__btn--footer-outline darshan__btn--sm">
                Google Play
              </button>
            </div>
          </div>
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title} id={col.title === 'Guides' ? 'guides' : undefined}>
              <h3 className="darshan__footer-col-title">{col.title}</h3>
              <ul className="darshan__footer-links">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href}>{l.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h3 className="darshan__footer-col-title">Newsletter</h3>
            <p className="darshan__muted darshan__footer-news">Darshan tips &amp; calm travel nudges — no spam.</p>
            <form
              className="darshan__newsletter"
              onSubmit={(e) => {
                e.preventDefault()
              }}
            >
              <label className="darshan__sr-only" htmlFor="darshan-news-email">
                Email
              </label>
              <input id="darshan-news-email" type="email" className="darshan__input darshan__input--footer" placeholder="you@email.com" />
              <button type="submit" className="darshan__btn darshan__btn--footer-cta darshan__btn--sm">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="darshan__footer-mid">
          <div className="darshan__social">
            <a href="https://instagram.com" className="darshan__social-link" aria-label="Instagram">
              IG
            </a>
            <a href="https://youtube.com" className="darshan__social-link" aria-label="YouTube">
              YT
            </a>
            <a href="https://wa.me" className="darshan__social-link" aria-label="WhatsApp">
              WA
            </a>
          </div>
          <div className="darshan__badges">
            <span className="darshan__badge">PCI-minded</span>
            <span className="darshan__badge">Verified partners</span>
            <span className="darshan__badge">24×7 desk</span>
          </div>
        </div>
        <div className="darshan__footer-bottom">
          <p>© {new Date().getFullYear()} presenttrip. Illustrative content — not affiliated with any official temple body.</p>
          <p className="darshan__footer-emergency">
            Emergency: <a href="tel:+911800000000">1800-000-0000</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
