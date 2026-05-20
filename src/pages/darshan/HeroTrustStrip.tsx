import { IconClock, IconShield, IconSun, IconUsers } from './DarshanIcons'

export function HeroTrustStrip() {
  return (
    <div className="darshan__trust-strip-main">
      <div className="darshan__container">
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
    </div>
  )
}
