export function SecondaryNav() {
  return (
    <nav className="pt-home__secondaryNav" aria-label="Quick links">
      <a href="#tracker" className="pt-home__secondaryLink">
        <IconPlane />
        Flight Tracker
      </a>
      <a href="#dutyfree" className="pt-home__secondaryLink">
        <IconBag />
        Shop Duty Free
        <span className="pt-home__tag pt-home__tag--pink">10% off</span>
      </a>
      <a href="#card" className="pt-home__secondaryLink">
        <IconCard />
        Present Trip Partner Card
      </a>
      <a href="#mice" className="pt-home__secondaryLink">
        <IconPeople />
        MICE
      </a>
      <a href="#gifts" className="pt-home__secondaryLink">
        <IconGift />
        Gift Cards
      </a>
    </nav>
  )
}

function iconProps(className: string) {
  return {
    className,
    viewBox: '0 0 24 24' as const,
    'aria-hidden': true as const,
    fill: 'none' as const,
    stroke: 'currentColor',
    strokeWidth: 1.55,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
}

function IconPlane() {
  return (
    <svg {...iconProps('pt-home__secondaryIcon')}>
      <path d="M10 18v-4L4 12l12-4 2 6-2 2-6-2-4z" />
      <path d="M12 8l2 2-2 6" />
    </svg>
  )
}

function IconBag() {
  return (
    <svg {...iconProps('pt-home__secondaryIcon')}>
      <path d="M6 8h12l1 12H5L6 8zM9 8V6a3 3 0 016 0v2" />
      <path d="M9 12h6" />
    </svg>
  )
}

function IconCard() {
  return (
    <svg {...iconProps('pt-home__secondaryIcon')}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 10h18" />
    </svg>
  )
}

function IconPeople() {
  return (
    <svg {...iconProps('pt-home__secondaryIcon')}>
      <circle cx="9" cy="10" r="2.5" />
      <circle cx="15" cy="10" r="2.5" />
      <path d="M4 18c0-3 2.5-5 5-5s5 2 5 5M14 18c0-2.5 2-4 4-4" />
    </svg>
  )
}

function IconGift() {
  return (
    <svg {...iconProps('pt-home__secondaryIcon')}>
      <path d="M12 8v13M4 8h16v4H4V8zM12 8V6a2 2 0 014 0 2 2 0 01-4 0zM12 8V6a2 2 0 00-4 0 2 2 0 004 0z" />
    </svg>
  )
}
