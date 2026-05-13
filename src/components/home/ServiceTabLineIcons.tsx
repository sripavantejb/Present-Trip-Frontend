import type { CategoryId } from '../../config/categoryThemes'

/**
 * Tab icons — stroke + currentColor; inactive tabs stay neutral (see App.css hover).
 */
const common = {
  viewBox: '0 0 24 24',
  width: '100%',
  height: '100%',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.45,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true as const,
}

export function ServiceLineIcon({ id }: { id: CategoryId }) {
  switch (id) {
    case 'hotels':
      return <IconHotels />
    case 'flights':
      return <IconFlights />
    case 'trains':
      return <IconTrains />
    case 'buses':
      return <IconBuses />
    case 'darshan':
      return <IconDarshan />
    default:
      return <IconFlights />
  }
}

/** Side-view airliner — nose, fuselage, swept wing, tail planes. */
function IconFlights() {
  return (
    <svg {...common}>
      <path d="M3.25 12h5.75l2.35-1.85h2.45l-.4 3.7H11L9.35 12H3.25" />
      <path d="M10.5 12h9l3.4-1.15v2.3L19.5 12h-9" />
      <path d="M15.25 12l4.5-3M15.25 12l4.5 3" />
    </svg>
  )
}

/** Side-view coach — body, roof/pantograph, windows, wheels (arcs use explicit flags). */
function IconTrains() {
  return (
    <svg {...common}>
      <path d="M5.5 16h13a1 1 0 0 1 1-1v-4.75a2.2 2.2 0 0 0-2.2-2.2H7.7a2.2 2.2 0 0 0-2.2 2.2V15a1 1 0 0 1 1 1z" />
      <path d="M10.5 7.8V6.25M13.5 7.8V6.25M12 7.8v-1.35" />
      <path d="M7.5 8.25h9" />
      <path d="M7.5 12h3M12 12h3M16.5 12H18" />
      <circle cx="9.25" cy="16" r="1.05" />
      <circle cx="14.75" cy="16" r="1.05" />
    </svg>
  )
}

/** Side-view bus — body, windshield, glazing, wheels. */
function IconBuses() {
  return (
    <svg {...common}>
      <path d="M5.25 15.75h13.5a1 1 0 0 1 1-1v-4a2 2 0 0 0-2-2H7.25a2 2 0 0 0-2 2v4a1 1 0 0 1 1 1z" />
      <path d="M7 9.25h10" />
      <path d="M10 9.25V7.35M14 9.25V7.35" />
      <path d="M5.25 12.35h14.5" />
      <path d="M8 15.75v-1.85M16 15.75v-1.85" />
      <circle cx="9.2" cy="15.75" r="1.02" />
      <circle cx="14.8" cy="15.75" r="1.02" />
    </svg>
  )
}

/** Hotel block + roofline + entry. */
function IconHotels() {
  return (
    <svg {...common}>
      <path d="M4.5 17.5h15M4.5 17.5v-7h15v7" />
      <path d="M7.5 10.5V8.5h9v2" />
      <path d="M12 6.5v2M9.5 8.5h5" />
      <path d="M8.5 14.5h2M13.5 14.5h2" />
      <path d="M11 17.5v-2.5h2v2.5" />
    </svg>
  )
}

/** Temple silhouette — architecture only, no deity imagery. */
function IconDarshan() {
  return (
    <svg {...common}>
      <path d="M12 4.25v2.75M9.25 7.75h5.5l-1.1 2.65h-3.3L9.25 7.75z" />
      <path d="M6.75 10.75h10.5v9h-10.5z" />
      <path d="M9.75 14.25h4.5M9.75 16.75h4.5" />
      <path d="M10.75 19.75h2.5" />
    </svg>
  )
}
