import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import type { BookingTab } from './darshanData'
import {
  ACCOMMODATION_OPTIONS,
  BOOKING_TAB_LABELS,
  DARSHAN_TYPE_OPTIONS,
  HERO_NAV_LINKS,
  HERO_SPLIT_TEMPLE_IMAGE,
  HERO_TAB_ORDER,
  TEMPLE_OPTIONS,
  TRANSPORT_OPTIONS,
  heroTabLabel,
} from './darshanData'
import {
  IconCalendar,
  IconCar,
  IconChevronRight,
  IconClock,
  IconMenu,
  IconShield,
  IconSparkle,
  IconSun,
  IconTemple,
  IconTicket,
  IconBed,
  IconTirumalaMark,
  IconUser,
  IconUsers,
} from './DarshanIcons'

/** When we cannot read pixels (e.g. CORS), trim this much from the layout box bottom as a fallback. */
const SPLIT_HERO_LAND_FALLBACK_TRIM_PX = 48

const OPAQUE_CACHE_KEY_VER = 'v3'

/** Pixels brighter than this count as “solid” strokes (suppresses stray AA in transparent padding). */
const SPLIT_ROW_HARD_ALPHA_MIN = 44
/** Pixels brighter than this add to soft coverage (captures faint line art). */
const SPLIT_ROW_SOFT_ALPHA_MIN = 12
/** Must see enough ink in a row; padding rows fail because they only have stray pixels / low coverage. */
const SPLIT_ROW_HARD_MIN = 14
const SPLIT_ROW_HARD_MIN_FRAC = 0.024
const SPLIT_ROW_SOFT_MIN_FRAC = 0.068

let gopuramOpaqueRowCache: { key: string; lastRow: number } | null = null

/** Bottom-most raster row with real drawing mass (PNG footer padding excluded). */
function findLastSignificantRasterRow(imageData: Uint8ClampedArray, width: number, height: number): number {
  const hardNeed = Math.max(SPLIT_ROW_HARD_MIN, Math.floor(width * SPLIT_ROW_HARD_MIN_FRAC))
  const softNeed = Math.max(SPLIT_ROW_HARD_MIN * 2, Math.floor(width * SPLIT_ROW_SOFT_MIN_FRAC))

  for (let y = height - 1; y >= 0; y--) {
    const rowOffset = y * width * 4
    let hard = 0
    let soft = 0

    for (let x = 0; x < width; x++) {
      const i = rowOffset + x * 4
      const a = imageData[i + 3]!
      if (a > SPLIT_ROW_HARD_ALPHA_MIN) {
        hard++
        if (hard >= hardNeed) return y
        continue
      }
      if (a > SPLIT_ROW_SOFT_ALPHA_MIN) soft++
    }

    if (soft >= softNeed) return y
  }

  return -1
}

/**
 * Last substantial raster row in the decoded bitmap (excludes PNG padding fringe), or null if unreadable.
 * Cached per image URL + natural dimensions.
 */
function getLastOpaqueRowFromGopuram(img: HTMLImageElement): number | null {
  const iw = img.naturalWidth
  const ih = img.naturalHeight
  if (!iw || !ih) return null

  const key = `${OPAQUE_CACHE_KEY_VER}|${img.currentSrc || img.src}|${iw}x${ih}`
  if (gopuramOpaqueRowCache?.key === key) {
    return gopuramOpaqueRowCache.lastRow
  }

  try {
    const canvas = document.createElement('canvas')
    canvas.width = iw
    canvas.height = ih
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return null
    ctx.drawImage(img, 0, 0)
    const { data } = ctx.getImageData(0, 0, iw, ih)
    const lastRow = findLastSignificantRasterRow(data, iw, ih)
    if (lastRow < 0) return null
    gopuramOpaqueRowCache = { key, lastRow }
    return lastRow
  } catch {
    return null
  }
}

/**
 * Distance from the top of the IMG element’s laid-out box to the bottom edge of rendered art,
 * honoring `object-fit: contain` and `object-position: center bottom`.
 * `layoutW` / `layoutH` must match the same geometry as `img.getBoundingClientRect()`.
 */
function getGopuramOpaqueBottomOffsetPx(
  img: HTMLImageElement,
  layoutW: number,
  layoutH: number,
  lastOpaqueRow: number | null,
): number {
  const iw = img.naturalWidth
  const ih = img.naturalHeight
  if (!layoutW || !layoutH || !iw || !ih) {
    return layoutH
  }

  if (lastOpaqueRow === null) {
    return Math.max(0, layoutH - SPLIT_HERO_LAND_FALLBACK_TRIM_PX)
  }

  const scale = Math.min(layoutW / iw, layoutH / ih)
  const dispH = ih * scale
  const yOff = layoutH - dispH
  const bottomSrcPx = lastOpaqueRow + 1
  return yOff + (bottomSrcPx / ih) * dispH
}

type Props = {
  bookingTab: BookingTab
  setBookingTab: (t: BookingTab) => void
  navScrolled: boolean
}

export function HeroSection({ bookingTab, setBookingTab, navScrolled }: Props) {
  const [menuOpen, setMenuOpen] = useState(false)
  const heroRef = useRef<HTMLElement | null>(null)
  const gopuramRef = useRef<HTMLImageElement | null>(null)

  const updateHeroLandStart = useCallback(() => {
    const hero = heroRef.current
    const img = gopuramRef.current
    if (!hero || !img) return
    if (!img.complete || img.naturalWidth === 0) return

    const heroRect = hero.getBoundingClientRect()
    const imgRect = img.getBoundingClientRect()
    const lastOpaqueRow = getLastOpaqueRowFromGopuram(img)
    const contentBottomOffset = getGopuramOpaqueBottomOffsetPx(
      img,
      imgRect.width,
      imgRect.height,
      lastOpaqueRow,
    )
    const landStartPx = imgRect.top - heroRect.top + contentBottomOffset
    hero.style.setProperty('--split-hero-land-start', `${Math.max(0, landStartPx)}px`)
  }, [])

  useLayoutEffect(() => {
    updateHeroLandStart()
    const hero = heroRef.current
    const img = gopuramRef.current
    if (!hero) return

    const schedule = () => {
      requestAnimationFrame(updateHeroLandStart)
    }

    const ro = new ResizeObserver(schedule)
    ro.observe(hero)
    if (img) ro.observe(img)

    window.addEventListener('resize', schedule)
    img?.addEventListener('load', schedule)

    return () => {
      ro.disconnect()
      window.removeEventListener('resize', schedule)
      img?.removeEventListener('load', schedule)
    }
  }, [updateHeroLandStart])

  return (
    <header ref={heroRef} className="darshan__hero darshan__hero--split">
      <div className="darshan__hero-media darshan__hero-media--split" aria-hidden>
        <div className="darshan__hero-bg" />
        <div className="darshan__hero-bg-shine" />
        <div className="darshan__hero-bg-lines" />
      </div>

      <div className="darshan__hero-white-land" aria-hidden />

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

              <div id="darshan-search" className="darshan__search-card darshan__search-card--lite">
                <div className="darshan__search-card-head darshan__search-card-head--lite">
                  <p className="darshan__search-card-eyebrow">Secure booking · Tirumala &amp; surrounds</p>
                  <h1 className="darshan__search-card-heading darshan__search-card-heading--lite">
                    Book darshan &amp; travel
                  </h1>
                </div>

                <div className="darshan__search-tabs-lite" role="tablist" aria-label="Booking type">
                  {HERO_TAB_ORDER.map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      role="tab"
                      aria-selected={bookingTab === tab}
                      className={`darshan__search-tab-lite${bookingTab === tab ? ' darshan__search-tab-lite--active' : ''}`}
                      onClick={() => setBookingTab(tab)}
                    >
                      {heroTabLabel(tab)}
                    </button>
                  ))}
                </div>

                <div className="darshan__search-grid darshan__search-grid--lite" role="tabpanel">
                <label className="darshan__field darshan__field--lite">
                  <span className="darshan__field-label darshan__field-label--lite">Temple</span>
                  <span className="darshan__field-input-wrap darshan__field-input-wrap--lite">
                    <IconTemple className="darshan__field-icon darshan__field-icon--lite" aria-hidden />
                    <select className="darshan__input darshan__input--lite" defaultValue={TEMPLE_OPTIONS[0]}>
                      {TEMPLE_OPTIONS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </span>
                </label>
                <label className="darshan__field darshan__field--lite">
                  <span className="darshan__field-label darshan__field-label--lite">Darshan type</span>
                  <span className="darshan__field-input-wrap darshan__field-input-wrap--lite">
                    <IconTicket className="darshan__field-icon darshan__field-icon--lite" aria-hidden />
                    <select className="darshan__input darshan__input--lite" defaultValue={DARSHAN_TYPE_OPTIONS[0]}>
                      {DARSHAN_TYPE_OPTIONS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </span>
                </label>
                <label className="darshan__field darshan__field--lite">
                  <span className="darshan__field-label darshan__field-label--lite">Travel date</span>
                  <span className="darshan__field-input-wrap darshan__field-input-wrap--lite">
                    <IconCalendar className="darshan__field-icon darshan__field-icon--lite" aria-hidden />
                    <input className="darshan__input darshan__input--lite" type="date" name="travel-date" />
                  </span>
                </label>
                <label className="darshan__field darshan__field--lite">
                  <span className="darshan__field-label darshan__field-label--lite">Pilgrims</span>
                  <span className="darshan__field-input-wrap darshan__field-input-wrap--lite">
                    <IconUsers className="darshan__field-icon darshan__field-icon--lite" aria-hidden />
                    <input
                      className="darshan__input darshan__input--lite"
                      type="number"
                      min={1}
                      max={50}
                      defaultValue={2}
                      aria-label="Number of pilgrims"
                    />
                  </span>
                </label>
                <label className="darshan__field darshan__field--lite darshan__field--span2-lite">
                  <span className="darshan__field-label darshan__field-label--lite">Accommodation</span>
                  <span className="darshan__field-input-wrap darshan__field-input-wrap--lite">
                    <IconBed className="darshan__field-icon darshan__field-icon--lite" aria-hidden />
                    <select className="darshan__input darshan__input--lite" defaultValue={ACCOMMODATION_OPTIONS[1]}>
                      {ACCOMMODATION_OPTIONS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </span>
                </label>
                <label className="darshan__field darshan__field--lite darshan__field--span2-lite">
                  <span className="darshan__field-label darshan__field-label--lite">Transport</span>
                  <span className="darshan__field-input-wrap darshan__field-input-wrap--lite">
                    <IconCar className="darshan__field-icon darshan__field-icon--lite" aria-hidden />
                    <select className="darshan__input darshan__input--lite" defaultValue={TRANSPORT_OPTIONS[1]}>
                      {TRANSPORT_OPTIONS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </span>
                </label>
                <div className="darshan__field darshan__field--lite darshan__field--cta-lite">
                  <div className="darshan__search-card-foot-lite">
                    <span className="darshan__field-hint darshan__field-hint--lite">
                      Selected flow ·{' '}
                      <strong className="darshan__field-hint-strong">{BOOKING_TAB_LABELS[bookingTab]}</strong>
                    </span>
                    <button type="button" className="darshan__btn darshan__btn-hero-lite">
                      <span>Book your darshan</span>
                      <IconChevronRight className="darshan__btn-hero-lite-arrow" aria-hidden />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>

          <div className="darshan__hero-right">
            <div className="darshan__hero-temple-wrap">
              <figure className="darshan__hero-art darshan__hero-art--sketch">
                <img
                  ref={gopuramRef}
                  className="darshan__hero-gopuram-img"
                  src={HERO_SPLIT_TEMPLE_IMAGE.src}
                  alt=""
                  width={1024}
                  height={1536}
                  sizes="(max-width: 1024px) min(92vw, 480px), min(58vw, 720px)"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  crossOrigin="anonymous"
                  onLoad={updateHeroLandStart}
                />
              </figure>
            </div>
          </div>
        </div>

        <div className="darshan__hero-bottom darshan__hero-bottom--split">
          <ul className="darshan__trust-dock darshan__trust-dock--split" aria-label="Trust indicators">
            <li>
              <IconUsers className="darshan__trust-ic darshan__trust-ic--split" aria-hidden />
              <span>
                <strong>50K+</strong> Pilgrims Served
              </span>
            </li>
            <li className="darshan__trust-sep darshan__trust-sep--split" aria-hidden />
            <li>
              <IconShield className="darshan__trust-ic darshan__trust-ic--split" aria-hidden />
              <span>Verified Bookings</span>
            </li>
            <li className="darshan__trust-sep darshan__trust-sep--split" aria-hidden />
            <li>
              <IconSun className="darshan__trust-ic darshan__trust-ic--split" aria-hidden />
              <span>Trusted Operators</span>
            </li>
            <li className="darshan__trust-sep darshan__trust-sep--split" aria-hidden />
            <li>
              <IconClock className="darshan__trust-ic darshan__trust-ic--split" aria-hidden />
              <span>24×7 Support</span>
            </li>
          </ul>
          <blockquote className="darshan__hero-quote darshan__hero-quote--split">
            <span className="darshan__hero-quote-line darshan__hero-quote-line--split" aria-hidden />
            <span>Where devotion meets seamless travel.</span>
          </blockquote>
        </div>
      </div>
    </header>
  )
}
