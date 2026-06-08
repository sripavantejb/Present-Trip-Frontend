import type { ReactNode } from 'react'
import { MobileBottomNav } from './MobileBottomNav'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from '../home/SiteHeader'

type SiteLayoutProps = {
  children: ReactNode
  /** Hide global footer on specific layouts */
  hideFooter?: boolean
  /** Hide mobile tab bar (e.g. full-screen flows) */
  hideMobileNav?: boolean
  className?: string
}

export function SiteLayout({
  children,
  hideFooter = false,
  hideMobileNav = false,
  className,
}: SiteLayoutProps) {
  const pageClass = [
    'ds-page',
    hideMobileNav ? '' : 'ds-page--mobile-nav',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={pageClass}>
      <SiteHeader />
      <main className="ds-main">{children}</main>
      {hideFooter ? null : <SiteFooter />}
      {hideMobileNav ? null : <MobileBottomNav />}
    </div>
  )
}
