const ITEMS = [
  {
    title: 'Best Price Guarantee',
    sub: 'Get the best prices or we match it',
    icon: 'price',
  },
  {
    title: 'Secure Payments',
    sub: '100% secure payment options',
    icon: 'lock',
  },
  {
    title: '24/7 Customer Support',
    sub: "We're here to help anytime",
    icon: 'support',
  },
  {
    title: 'Trusted by Millions',
    sub: 'Join millions of happy travelers',
    icon: 'people',
  },
] as const

export function TrustBar() {
  return (
    <div id="mice" className="pt-home__trust" role="presentation">
      {ITEMS.map((item) => (
        <div key={item.title} className="pt-home__trustItem">
          <div className="pt-home__trustIconWrap" aria-hidden>
            <TrustGlyph kind={item.icon} />
          </div>
          <div>
            <p className="pt-home__trustTitle">{item.title}</p>
            <p className="pt-home__trustSub">{item.sub}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function TrustGlyph({ kind }: { kind: (typeof ITEMS)[number]['icon'] }) {
  const p = {
    viewBox: '0 0 32 32',
    width: 28,
    height: 28,
    fill: 'none',
    stroke: 'var(--pt-blue)',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
  switch (kind) {
    case 'price':
      return (
        <svg {...p}>
          <path d="M16 6l8 4v6c0 4.5-3.5 8.2-8 9-4.5-.8-8-4.5-8-9v-6l8-4z" />
          <path d="M12 13h8M12 17h5" />
        </svg>
      )
    case 'lock':
      return (
        <svg {...p}>
          <rect x="10" y="14" width="12" height="10" rx="2" />
          <path d="M11 14v-3a5 5 0 0110 0v3" />
          <circle cx="16" cy="19" r="1.5" fill="var(--pt-blue)" stroke="none" />
        </svg>
      )
    case 'support':
      return (
        <svg {...p}>
          <path d="M10 14h4v6H10zM18 14h4v6h-4M8 14v-2a8 8 0 0116 0v2" />
          <path d="M14 24h4" />
        </svg>
      )
    case 'people':
      return (
        <svg {...p}>
          <circle cx="12" cy="12" r="3" />
          <circle cx="21" cy="11" r="2.5" />
          <path d="M6 24c0-3.3 2.7-6 6-6s6 2.7 6 6M17 24c0-2.5 2-4.5 4.5-4.5" />
        </svg>
      )
    default:
      return (
        <svg {...p}>
          <path d="M16 6l8 4v6c0 4.5-3.5 8.2-8 9-4.5-.8-8-4.5-8-9v-6l8-4z" />
        </svg>
      )
  }
}
