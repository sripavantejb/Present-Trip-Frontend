import { useId } from 'react'

const stroke = 'currentColor'

export function IconSparkle({ className }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 2v3m0 14v3M4.22 4.22l2.12 2.12m11.31 11.31 2.12 2.12M2 12h3m14 0h3M4.22 19.78l2.12-2.12m11.31-11.31 2.12-2.12"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="3.5" stroke={stroke} strokeWidth="1.2" />
    </svg>
  )
}

export function IconShield({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3 6 5.4v5.05c0 4.52 3.06 8.71 6 9.91 2.94-1.2 6-5.39 6-9.91V5.4L12 3Z"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="m10 11.8 2 2 4-5" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconInfo({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke={stroke} strokeWidth="1.2" />
      <path d="M12 10v6M12 8h.01" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  )
}

export function IconClock({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8.5" stroke={stroke} strokeWidth="1.2" />
      <path d="M12 7.5v5l3 2" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconUsers({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="9" cy="9.5" r="3.2" stroke={stroke} strokeWidth="1.2" />
      <path d="M4 19c1.2-2.9 5-3 5-3s1.76.06 3.2.72" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="16" cy="9" r="2.5" stroke={stroke} strokeWidth="1.2" />
      <path d="M20 17.8c-.8-1.6-2.6-2.3-4-2.3-.26 0-.52.03-.76.06" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

export function IconChevronLeft({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="m14 6-6 6 6 6" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconChevronRight({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="m10 6 6 6-6 6" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconSun({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="4" stroke={stroke} strokeWidth="1.2" />
      <path
        d="M12 2v2m0 18v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m18 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function IconMoon({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M21 14.2A8.5 8.5 0 0 1 9.8 3a6.7 6.7 0 1 0 11.2 11.2Z"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function IconChat({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 17.5 3.75 21v-6.5A9 9 0 1 1 12 21v-.75"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function IconUser({ className }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="9" r="3.5" stroke={stroke} strokeWidth="1.3" />
      <path
        d="M5 20v-.8a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v.8"
        stroke={stroke}
        strokeWidth="1.3"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg className={className} width="36" height="36" viewBox="0 0 48 48" fill="none" aria-hidden>
      <path
        d="M24 8 11 14.5V19h26v-4.5L24 8Z"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M16 21v17h16V21M14 38h20" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" />
      <path d="m19 28 5 4 10-11" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Minimal gopuram tier silhouette for hero brand marks */
export function IconTirumalaMark({ className }: { className?: string }) {
  return (
    <svg className={className} width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden>
      <path
        d="M20 4 8 11v3h24v-3L20 4Z"
        stroke={stroke}
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <path d="M12 14h16M11 18h18" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M14 18v14M26 18v14M17 32h6" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" />
      <path d="M17 22h6M17 26h6" stroke={stroke} strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  )
}

export function IconMenu({ className }: { className?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M5 7h14M5 12h14M5 17h14" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export function IconTemple({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3 5 8v2h14V8l-7-5Z"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M8 10v10M12 10v10M16 10v10M6 20h12" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

export function IconTicket({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1.5a1.5 1.5 0 0 0 0 3V15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1.5a1.5 1.5 0 0 0 0-3V9Z"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M9 10v4M15 10v4" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

export function IconCalendar({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="4" y="5" width="16" height="15" rx="2" stroke={stroke} strokeWidth="1.2" />
      <path d="M4 10h16M9 3v4M15 3v4" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

export function IconBed({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 14V19M21 14V19"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M3 14c0-2 2-4 5-4h8c3 0 5 2 5 4"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M8 10V7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

export function IconMapPin({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 21s6-5.15 6-10a6 6 0 1 0-12 0c0 4.85 6 10 6 10Z"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="11" r="2.5" stroke={stroke} strokeWidth="1.2" />
    </svg>
  )
}

export function IconCar({ className }: { className?: string }) {
  return (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 16l-1.2-4A2 2 0 0 1 6.8 10h10.4a2 2 0 0 1 2 2L18 16M6 20h.5M17.5 20H18"
        stroke={stroke}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="8.5" cy="16.5" r="1.5" stroke={stroke} strokeWidth="1.2" />
      <circle cx="15.5" cy="16.5" r="1.5" stroke={stroke} strokeWidth="1.2" />
      <path d="M7 13h10" stroke={stroke} strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

/** Large decorative South Indian gopuram silhouette for split hero (blue-white theme, high-contrast strokes) */
export function HeroGopuramGraphic({ className }: { className?: string }) {
  const baseId = useId().replace(/:/g, '')
  const gFill = `${baseId}-gfill`
  const gAura = `${baseId}-gaura`
  const wStrong = 'rgba(255,255,255,0.88)'
  const wMid = 'rgba(255,255,255,0.52)'
  const wSoft = 'rgba(255,255,255,0.28)'

  return (
    <svg
      className={className}
      viewBox="0 0 320 420"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <radialGradient id={gAura} cx="50%" cy="68%" r="58%" fx="50%" fy="58%">
          <stop offset="0%" stopColor="#BFDBFE" stopOpacity="0.35" />
          <stop offset="55%" stopColor="#3B82F6" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={gFill} x1="160" y1="20" x2="160" y2="404" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" stopOpacity="0.38" />
          <stop offset="0.35" stopColor="#DBEAFE" stopOpacity="0.26" />
          <stop offset="0.72" stopColor="#93C5FD" stopOpacity="0.18" />
          <stop offset="1" stopColor="#1E40AF" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      <ellipse cx="160" cy="360" rx="132" ry="84" fill={`url(#${gAura})`} />

      {/* Plinth + base */}
      <path
        d="M20 396h280v16H20v-16Z"
        fill={`url(#${gFill})`}
        stroke={wStrong}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M32 384h256" stroke={wMid} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M28 372h264v12H28v-12Z" fill="rgba(255,255,255,0.08)" stroke={wMid} strokeWidth="1.4" />

      {/* Side wings */}
      <path
        d="M24 372V268l36-28v132H24Z"
        fill={`url(#${gFill})`}
        stroke={wStrong}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M296 372V268l-36-28v132h36Z"
        fill={`url(#${gFill})`}
        stroke={wStrong}
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M40 320h48M232 320h48" stroke={wSoft} strokeWidth="1.3" strokeLinecap="round" />
      <path d="M52 302h40M228 302h40" stroke={wSoft} strokeWidth="1.1" strokeLinecap="round" />

      {/* Main vimana shaft */}
      <path
        d="M96 372V232h128v140H96Z"
        fill={`url(#${gFill})`}
        stroke={wStrong}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />

      {/* Stacked roofs */}
      <path
        d="M84 232 160 168l76 64H84Z"
        fill={`url(#${gFill})`}
        stroke={wStrong}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M96 224h128M108 212h104" stroke={wMid} strokeWidth="1.35" strokeLinecap="round" />

      <path
        d="M72 168 160 92l88 76H72Z"
        fill={`url(#${gFill})`}
        stroke={wStrong}
        strokeWidth="1.85"
        strokeLinejoin="round"
      />
      <path d="M88 156h144M102 142h116" stroke={wMid} strokeWidth="1.25" strokeLinecap="round" />

      <path
        d="M60 92 160 12l100 80H60Z"
        fill={`url(#${gFill})`}
        stroke={wStrong}
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
      <path d="M78 80h164M96 64h128" stroke={wMid} strokeWidth="1.2" strokeLinecap="round" />

      {/* Kalasam */}
      <path d="M160 12V4" stroke={wStrong} strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="160" cy="8" r="8" fill="rgba(255,255,255,0.42)" stroke={wStrong} strokeWidth="2" />
      <circle cx="160" cy="8" r="3.5" fill="rgba(191,219,254,0.95)" />

      {/* Central arch + niches */}
      <path
        d="M114 344c0-20 18-34 46-34s46 14 46 34v28H114v-28Z"
        fill="rgba(255,255,255,0.12)"
        stroke={wStrong}
        strokeWidth="1.6"
      />
      <path
        d="M128 320c0-12 12-20 32-20s32 8 32 20v52h-64v-52Z"
        stroke={wMid}
        strokeWidth="1.2"
        fill="rgba(255,255,255,0.06)"
      />

      {/* Pilaster lines */}
      <path d="M122 372V248M160 372V228M198 372V248" stroke={wMid} strokeWidth="1.15" />
      <path d="M108 280h104M104 304h112" stroke={wSoft} strokeWidth="1" strokeLinecap="round" />

      {/* Roof molding scallops */}
      <path
        d="M88 232c8-6 16-9 24-9s16 3 24 9M120 168c10-7 20-11 40-11s30 4 40 11M108 92c12-8 26-13 52-13s40 5 52 13"
        stroke={wSoft}
        strokeWidth="0.9"
        fill="none"
      />
    </svg>
  )
}

/** Subtle mandala-style ornament behind gopuram */
export function HeroTempleOrnament({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="200" cy="200" r="178" stroke="#2563EB" strokeOpacity="0.08" strokeWidth="1" />
      <circle cx="200" cy="200" r="148" stroke="#2563EB" strokeOpacity="0.1" strokeWidth="0.8" />
      <circle cx="200" cy="200" r="118" stroke="#93C5FD" strokeOpacity="0.15" strokeWidth="0.7" />
      <path
        d="M200 44v24M356 200h-24M200 356v-24M68 200h24"
        stroke="#2563EB"
        strokeOpacity="0.12"
        strokeWidth="1"
      />
      <circle cx="200" cy="200" r="6" fill="#2563EB" fillOpacity="0.12" />
    </svg>
  )
}
