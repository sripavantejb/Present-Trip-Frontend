import { useState } from 'react'
import { HERO_IMAGE, HERO_NAV_LINKS } from './darshanData'
import { HeroBookingForm } from './HeroBookingForm'
import { IconMenu, IconSparkle, IconTirumalaMark, IconUser } from './DarshanIcons'

type Props = {
  navScrolled: boolean
}

export function HeroSection({ navScrolled }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="darshan__hero darshan__hero--split darshan__hero--photo">
      <div className="darshan__hero-media darshan__hero-media--split" aria-hidden>
        <img
          className="darshan__hero-photo-img"
          src={HERO_IMAGE.src}
          alt=""
          decoding="async"
          fetchPriority="high"
        />
        <div className="darshan__hero-bg" />
        <div className="darshan__hero-bg-shine" />
        <div className="darshan__hero-bg-lines" />
      </div>

      <a href="#darshan-main" className="darshan__skip darshan__skip--split">
        Skip to main content
      </a>

      <nav
        className={`darshan__nav-split${navScrolled ? ' darshan__nav-split--raised' : ''}`}
        aria-label="Primary"
      >
        <div className="darshan__nav-split-inner">
          <a href="/" className="darshan__nav-split-brand">
            <IconTirumalaMark className="darshan__nav-split-mark" />
            <span className="darshan__nav-split-brand-text">
              <span className="darshan__nav-split-title">TIRUMALA DARSHAN</span>
              <span className="darshan__nav-split-tag">Divine Journey. Seamless Experience.</span>
            </span>
          </a>

          <ul className="darshan__nav-split-links">
            {HERO_NAV_LINKS.map(({ href, label }) => (
              <li key={`${href}-${label}`}>
                <a
                  href={href}
                  className="darshan__nav-split-link"
                  onClick={() => {
                    setMenuOpen(false)
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <div className="darshan__nav-split-actions">
            <a href="#darshan-search" className="darshan__nav-split-cta">
              Book Darshan
            </a>
            <a href="#profile" className="darshan__nav-split-profile" aria-label="Profile">
              <IconUser />
            </a>
            <button
              type="button"
              className="darshan__nav-split-burger"
              aria-expanded={menuOpen}
              aria-controls="darshan-split-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <IconMenu />
            </button>
          </div>
        </div>

        <div
          id="darshan-split-menu"
          className={`darshan__nav-split-drawer${menuOpen ? ' darshan__nav-split-drawer--open' : ''}`}
        >
          <ul className="darshan__nav-split-drawer-list">
            {HERO_NAV_LINKS.map(({ href, label }) => (
              <li key={`drawer-${href}-${label}`}>
                <a href={href} className="darshan__nav-split-drawer-link" onClick={() => setMenuOpen(false)}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <div className="darshan__hero-stage darshan__hero-stage--split">
        <div className="darshan__hero-core darshan__hero-core--split">
          <div className="darshan__hero-left">
            <div className="darshan__hero-booking">
              <div className="darshan__hero-lead">
                <p className="darshan__hero-kicker darshan__hero-kicker--split">
                  <IconSparkle className="darshan__hero-kicker-ic darshan__hero-kicker-ic--split" aria-hidden />
                  <span>PLAN YOUR PILGRIMAGE</span>
                </p>
                <p className="darshan__subtitle darshan__subtitle--split">
                  Book darshan, accommodation, sevas, transport, and complete pilgrimage experiences in one elegant
                  platform.
                </p>
              </div>

              <div
                id="darshan-search"
                className="darshan__search-card darshan__search-card--lite darshan__search-card--pro"
              >
                <div className="darshan__search-card-head darshan__search-card-head--lite">
                  <p className="darshan__search-card-eyebrow">Secure booking · Tirumala &amp; surrounds</p>
                  <h1 className="darshan__search-card-heading darshan__search-card-heading--lite">
                    Book darshan &amp; travel
                  </h1>
                </div>

                <HeroBookingForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
