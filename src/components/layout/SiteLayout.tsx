import type { ReactNode } from 'react'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from '../home/SiteHeader'

type SiteLayoutProps = {
  children: ReactNode
  /** Hide global footer on specific layouts */
  hideFooter?: boolean
  className?: string
}

export function SiteLayout({ children, hideFooter = false, className }: SiteLayoutProps) {
  return (
    <div className={`ds-page ${className ?? ''}`.trim()}>
      <SiteHeader />
      <main className="ds-main">{children}</main>
      {hideFooter ? null : <SiteFooter />}
    </div>
  )
}
