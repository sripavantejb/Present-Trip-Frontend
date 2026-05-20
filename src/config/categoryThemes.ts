/** Travel hero sections (tabs + theme). */
export type CategoryId = 'flights' | 'trains' | 'buses' | 'hotels' | 'darshan'

/** Hero intro glass + text contrast. */
export type HeadingTone = 'onLight' | 'onDark'

export type CategoryTheme = {
  id: CategoryId
  label: string
  badge: string
  title: string
  subtitle: string
  cta: string
  gradient: string
  overlay: string
  accentColor: string
  /** Soft UI glow (window rim, aura). */
  glowColor: string
  headingTone: HeadingTone
}

export const CATEGORY_THEMES: Record<CategoryId, CategoryTheme> = {
  flights: {
    id: 'flights',
    label: 'Flights',
    badge: 'Book Flights Easily',
    title: 'Fly to Your Next Destination',
    subtitle: 'Search, compare, and book flights with a smooth travel experience.',
    cta: 'Search Flights',
    gradient: `
      radial-gradient(ellipse 90% 70% at 85% 25%, rgba(56, 189, 248, 0.35) 0%, transparent 55%),
      radial-gradient(ellipse 70% 60% at 10% 80%, rgba(6, 182, 212, 0.2) 0%, transparent 50%),
      radial-gradient(ellipse 55% 45% at 50% 0%, rgba(255, 255, 255, 0.12) 0%, transparent 42%),
      linear-gradient(168deg, #020617 0%, #0f172a 22%, #1e3a5f 48%, #0c4a6e 72%, #164e63 100%)
    `
      .trim()
      .replace(/\s+/g, ' '),
    overlay:
      'linear-gradient(200deg, rgba(15, 23, 42, 0.2) 0%, transparent 35%, rgba(6, 182, 212, 0.12) 55%, rgba(15, 23, 42, 0.45) 100%)',
    accentColor: '#22D3EE',
    glowColor: 'rgba(34, 211, 238, 0.45)',
    headingTone: 'onDark',
  },
  trains: {
    id: 'trains',
    label: 'Trains',
    badge: 'Rail Journeys Simplified',
    title: 'Book Train Tickets Your Way',
    subtitle: 'Search routes, classes, and fares for comfortable rail travel between cities.',
    cta: 'Search Trains',
    gradient: `
      radial-gradient(ellipse 85% 65% at 80% 20%, rgba(129, 140, 248, 0.4) 0%, transparent 52%),
      radial-gradient(ellipse 60% 55% at 5% 90%, rgba(99, 102, 241, 0.25) 0%, transparent 50%),
      radial-gradient(ellipse 50% 40% at 50% 0%, rgba(255, 255, 255, 0.08) 0%, transparent 42%),
      linear-gradient(172deg, #0f0a1a 0%, #1e1b4b 28%, #312e81 52%, #1e1b4b 78%, #0c0a12 100%)
    `
      .trim()
      .replace(/\s+/g, ' '),
    overlay:
      'linear-gradient(198deg, rgba(15, 23, 42, 0.35) 0%, transparent 38%, rgba(99, 102, 241, 0.12) 55%, rgba(15, 23, 42, 0.5) 100%)',
    accentColor: '#A5B4FC',
    glowColor: 'rgba(165, 180, 252, 0.5)',
    headingTone: 'onDark',
  },
  buses: {
    id: 'buses',
    label: 'Buses',
    badge: 'Bus Travel Made Easy',
    title: 'Find the Right Bus Ride',
    subtitle: 'Compare operators, timings, and seats for intercity and daily bus routes.',
    cta: 'Search Buses',
    gradient: `
      radial-gradient(ellipse 90% 70% at 88% 22%, rgba(52, 211, 153, 0.35) 0%, transparent 54%),
      radial-gradient(ellipse 65% 50% at 8% 85%, rgba(16, 185, 129, 0.22) 0%, transparent 52%),
      radial-gradient(ellipse 48% 38% at 50% 0%, rgba(255, 255, 255, 0.1) 0%, transparent 45%),
      linear-gradient(168deg, #022c22 0%, #064e3b 30%, #0f766e 55%, #115e59 78%, #042f2e 100%)
    `
      .trim()
      .replace(/\s+/g, ' '),
    overlay:
      'linear-gradient(195deg, rgba(6, 78, 59, 0.25) 0%, transparent 40%, rgba(16, 185, 129, 0.1) 58%, rgba(2, 44, 34, 0.45) 100%)',
    accentColor: '#34D399',
    glowColor: 'rgba(52, 211, 153, 0.45)',
    headingTone: 'onDark',
  },
  hotels: {
    id: 'hotels',
    label: 'Hotels',
    badge: 'Hotel Booking Made Easy',
    title: 'Find Your Perfect Stay',
    subtitle: 'Discover premium hotels, resorts, and comfortable stays for every journey.',
    cta: 'Explore Hotels',
    gradient: `
      radial-gradient(ellipse 100% 80% at 90% 10%, rgba(253, 230, 138, 0.5) 0%, transparent 50%),
      radial-gradient(ellipse 70% 55% at 0% 100%, rgba(180, 83, 9, 0.18) 0%, transparent 52%),
      radial-gradient(ellipse 50% 40% at 50% 0%, rgba(255, 255, 255, 0.65) 0%, transparent 45%),
      linear-gradient(158deg, #fffbeb 0%, #fef3c7 28%, #fde68a 52%, #d4a574 78%, #78350f 100%)
    `
      .trim()
      .replace(/\s+/g, ' '),
    overlay:
      'linear-gradient(180deg, rgba(255, 255, 255, 0.35) 0%, rgba(254, 243, 199, 0.15) 45%, rgba(69, 26, 3, 0.2) 100%)',
    accentColor: '#B45309',
    glowColor: 'rgba(251, 191, 36, 0.5)',
    headingTone: 'onLight',
  },
  darshan: {
    id: 'darshan',
    label: 'Darshan',
    badge: 'Pilgrimage Booking',
    title: 'Book Darshan & Travel',
    subtitle: 'Temple darshan, stay, and transport to Tirumala — planned in one place.',
    cta: 'Check Availability',
    gradient: `
      radial-gradient(ellipse 90% 70% at 88% 20%, rgba(255, 56, 92, 0.22) 0%, transparent 52%),
      radial-gradient(ellipse 65% 55% at 8% 85%, rgba(180, 83, 9, 0.2) 0%, transparent 50%),
      radial-gradient(ellipse 50% 40% at 50% 0%, rgba(255, 255, 255, 0.1) 0%, transparent 42%),
      linear-gradient(168deg, #1c1917 0%, #44403c 28%, #78716c 52%, #292524 78%, #0c0a09 100%)
    `
      .trim()
      .replace(/\s+/g, ' '),
    overlay:
      'linear-gradient(200deg, rgba(28, 25, 23, 0.45) 0%, transparent 38%, rgba(255, 56, 92, 0.08) 55%, rgba(12, 10, 9, 0.5) 100%)',
    accentColor: '#FF385C',
    glowColor: 'rgba(255, 56, 92, 0.4)',
    headingTone: 'onDark',
  },
}
