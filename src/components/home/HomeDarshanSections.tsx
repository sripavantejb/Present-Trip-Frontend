import { useEffect } from 'react'
import { DarshanPostHeroContent } from '../../pages/darshan/DarshanPostHeroContent'
import '../../pages/darshan/darshan-post-hero.css'
import '../../styles/darshan-airbnb.css'

/** Full /darshan page sections below the homepage hero when the Darshan tab is selected */
export function HomeDarshanSections() {
  useEffect(() => {
    const root = document.querySelector('.darshan--home-posthero')
    if (!root) return

    const sections = root.querySelectorAll('.darshan__section, .pil-section')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('darshan__reveal--visible')
        })
      },
      { rootMargin: '0px 0px -5% 0px', threshold: 0.01 },
    )

    sections.forEach((s) => {
      s.classList.add('darshan__reveal', 'darshan__reveal--visible')
      io.observe(s)
    })

    return () => io.disconnect()
  }, [])

  return (
    <div className="darshan darshan--home-posthero darshan--site-chrome pt-home__darshanSections">
      <main id="darshan-main">
        <DarshanPostHeroContent showTrustStrip={false} />
      </main>
    </div>
  )
}
