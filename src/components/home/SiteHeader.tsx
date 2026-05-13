export function SiteHeader() {
  return (
    <header className="pt-home__header">
      <div className="pt-home__headerInner">
        <a href="/" className="pt-home__logo" aria-label="Present Trip home">
          <span className="pt-home__logoText">Present</span>
          <span className="pt-home__logoMark">trip</span>
        </a>

        <nav className="pt-home__headerNav" aria-label="Account and tools">
          <button type="button" className="pt-home__localeBtn">
            <span className="pt-home__localeFlag" aria-hidden>
              IN
            </span>
            <span>INR | English</span>
            <IconChevronDown />
          </button>
          <a href="#list" className="pt-home__navLink">
            <IconBuilding />
            <span>List Your Property</span>
          </a>
          <a href="#support" className="pt-home__navLink">
            <IconSupport />
            <span>Support</span>
          </a>
          <a href="#trips" className="pt-home__navLink">
            <IconSuitcase />
            <span>My Trips</span>
          </a>
          <button type="button" className="pt-home__signInBtn">
            <IconUser />
            <span>Sign in</span>
          </button>
        </nav>
      </div>
    </header>
  )
}

function IconBuilding() {
  return (
    <svg className="pt-home__navIcon" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 20h16M6 20V9l6-4 6 4v11M10 20v-6h4v6"
      />
    </svg>
  )
}

function IconSupport() {
  return (
    <svg className="pt-home__navIcon" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 10h.01M16 10h.01M7 16h10a5 5 0 005-5V9a5 5 0 10-10 0v2a5 5 0 005 5z"
      />
    </svg>
  )
}

function IconSuitcase() {
  return (
    <svg className="pt-home__navIcon" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 8V6a2 2 0 012-2h2a2 2 0 012 2v2M8 8h8a2 2 0 012 2v9a2 2 0 01-2 2H8a2 2 0 01-2-2v-9a2 2 0 012-2zM10 12v2M14 12v2"
      />
    </svg>
  )
}

function IconUser() {
  return (
    <svg className="pt-home__navIcon" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        d="M12 12a3 3 0 100-6 3 3 0 000 6zM5 20a7 7 0 0114 0"
      />
    </svg>
  )
}

function IconChevronDown() {
  return (
    <svg className="pt-home__chevron" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 9l6 6 6-6"
      />
    </svg>
  )
}
