type Props = {
  title: string
  subtitle: string
  seeAllHref?: string
  seeAllLabel?: string
}

export function HomeSectionHeader({ title, subtitle, seeAllHref, seeAllLabel }: Props) {
  return (
    <div className="pt-home-sectionHead">
      <div>
        <h2 className="pt-home-sectionTitle">{title}</h2>
        <p className="pt-home-sectionSub">{subtitle}</p>
      </div>
      {seeAllHref && seeAllLabel ? (
        <a href={seeAllHref} className="pt-home-link">
          {seeAllLabel}
        </a>
      ) : null}
    </div>
  )
}
