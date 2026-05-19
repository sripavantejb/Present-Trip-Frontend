import { Link } from 'react-router-dom'
import { FOOTER_COLUMNS } from '../../config/footerData'

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="pt-footer">
      <div className="pt-footer__main">
        <div className="pt-footer__grid">
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="pt-footer__colTitle">{col.title}</h3>
              <nav aria-label={col.title}>
                {col.links.map((link) => (
                  <Link key={link.href} to={link.href} className="pt-footer__link">
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </div>
      <div className="pt-footer__legal">
        <span>© {year} Present Trip, Inc.</span>
        <span>
          <a href="/support#privacy">Privacy</a>
          {' · '}
          <a href="/support#terms">Terms</a>
          {' · '}
          <a href="/support#sitemap">Sitemap</a>
        </span>
        <span>English (IN) · INR</span>
      </div>
    </footer>
  )
}
