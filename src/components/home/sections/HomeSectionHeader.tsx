import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { AppIcon } from '../../ui/AppIcon'

type Props = {
  title: string
  subtitle: string
  seeAllHref?: string
  seeAllLabel?: string
}

export function HomeSectionHeader({ title, subtitle, seeAllHref, seeAllLabel }: Props) {
  const seeAll =
    seeAllHref && seeAllLabel ? (
      seeAllHref.startsWith('/') ? (
        <Link to={seeAllHref} className="pt-home-link pt-home-link--seeAll">
          {seeAllLabel}
          <AppIcon icon={ChevronRight} size={16} aria-hidden />
        </Link>
      ) : (
        <a href={seeAllHref} className="pt-home-link pt-home-link--seeAll">
          {seeAllLabel}
          <AppIcon icon={ChevronRight} size={16} aria-hidden />
        </a>
      )
    ) : null

  return (
    <div className="pt-home-sectionHead">
      <div>
        <h2 className="pt-home-sectionTitle">{title}</h2>
        <p className="pt-home-sectionSub">{subtitle}</p>
      </div>
      {seeAll}
    </div>
  )
}
