import { useEffect, useState, type CSSProperties } from 'react'
import type { HeroBookingTab } from './darshanData'
import { ASSISTANT_PROMPTS } from './darshanData'
import './darshan.css'
import './darshan-post-hero.css'
import '../../styles/darshan-airbnb.css'
import { SiteLayout } from '../../components/layout/SiteLayout'
import { AccommodationSection } from './AccommodationSection'
import { CuratedPackagesSection } from './CuratedPackagesSection'
import { DarshanTypesSection } from './DarshanTypesSection'
import { FaqSection } from './FaqSection'
import { HeroSection } from './HeroSection'
import { HeroTrustStrip } from './HeroTrustStrip'
import { PilgrimInfoSection } from './PilgrimInfoSection'
import { ReviewsSection } from './ReviewsSection'
import { SevaBookingSection } from './SevaBookingSection'
import { TransportSection } from './TransportSection'
import { WhyBookSection } from './WhyBookSection'
import { IconChat } from './DarshanIcons'

export default function DarshanLanding() {
  const [bookingTab, setBookingTab] = useState<HeroBookingTab>('darshan')
  const [assistantOpen, setAssistantOpen] = useState(false)
  const [parallaxY, setParallaxY] = useState(0)
  const [navScrolled, setNavScrolled] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const onScroll = () => {
      setNavScrolled(window.scrollY > 28)
      if (!reduced) {
        setParallaxY(Math.min(1, window.scrollY / 900))
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const root = document.querySelector('.darshan')
    if (!root) return
    const sections = root.querySelectorAll('.darshan__section')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('darshan__reveal--visible')
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 },
    )
    sections.forEach((s) => {
      s.classList.add('darshan__reveal')
      io.observe(s)
    })
    return () => io.disconnect()
  }, [])

  return (
    <SiteLayout className="darshan-layout">
      <div className="darshan darshan--breakout darshan--site-chrome" style={{ '--darshan-parallax': String(parallaxY) } as CSSProperties}>
        <HeroSection bookingTab={bookingTab} setBookingTab={setBookingTab} navScrolled={navScrolled} />

        <main id="darshan-main">
          <HeroTrustStrip />
          <DarshanTypesSection />
          <CuratedPackagesSection />
          <AccommodationSection />
          <TransportSection />
          <PilgrimInfoSection />
          <SevaBookingSection />
          <ReviewsSection />
          <WhyBookSection />
          <FaqSection />
        </main>

        <div className="darshan__bottom-cta">
          <button
            type="button"
            className="darshan__btn darshan__btn--primary darshan__bottom-cta-btn"
            onClick={() => document.getElementById('darshan-search')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Book Darshan
          </button>
        </div>

        <nav className="darshan__bottom-nav" aria-label="Mobile primary">
          <a href="/" className="darshan__bn-item">
            Home
          </a>
          <a href="#packages" className="darshan__bn-item">
            Packages
          </a>
          <a href="#darshan-search" className="darshan__bn-item darshan__bn-item--fab">
            Book
          </a>
          <a href="/support" className="darshan__bn-item">
            Contact
          </a>
          <a href="#profile" className="darshan__bn-item">
            Profile
          </a>
        </nav>

        <button type="button" className="darshan__fab" aria-label="Open darshan assistant" onClick={() => setAssistantOpen(true)}>
          <IconChat />
        </button>

        {assistantOpen ? (
          <>
            <button type="button" className="darshan__assistant-scrim" aria-label="Close assistant" onClick={() => setAssistantOpen(false)} />
            <aside className="darshan__assistant-panel" role="dialog" aria-modal="true" aria-label="Darshan assistant">
              <header className="darshan__assistant-head">
                <h2 className="darshan__assistant-title">Darshan assistant</h2>
                <button type="button" className="darshan__icon-btn" onClick={() => setAssistantOpen(false)} aria-label="Close">
                  ×
                </button>
              </header>
              <p className="darshan__muted">Quick prompts — connect to desk for authoritative answers.</p>
              <ul className="darshan__assistant-list">
                {ASSISTANT_PROMPTS.map((p) => (
                  <li key={p}>
                    <button type="button" className="darshan__assistant-chip">
                      {p}
                    </button>
                  </li>
                ))}
              </ul>
              <a href="tel:+911800000000" className="darshan__btn darshan__btn--primary darshan__btn--block">
                Call 24×7 desk
              </a>
            </aside>
          </>
        ) : null}
      </div>
    </SiteLayout>
  )
}
