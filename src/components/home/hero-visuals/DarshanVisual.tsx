import { useId } from 'react'

/**
 * Darshan hero: temple architecture, diyas, mandala, bells — no deity imagery.
 */
export function DarshanVisual() {
  const gid = useId().replace(/:/g, '')
  const gradId = `darshan-stone-${gid}`

  return (
    <div className="heroScene heroScene--darshan">
      <div className="heroScene__ambient heroScene__ambient--darshan" />
      <div className="heroDarshanToran" aria-hidden />
      <div className="heroDarshanMandala" />
      <div className="heroDarshanAura" />
      <div className="heroDarshanTemple">
        <svg viewBox="0 0 200 220" className="heroDarshanTemple__svg" aria-hidden>
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
          </defs>
          <path
            fill={`url(#${gradId})`}
            fillOpacity="0.35"
            stroke="rgba(251, 191, 36, 0.5)"
            strokeWidth="1.2"
            d="M100 12 L118 48 L168 52 L128 82 L140 132 L100 108 L60 132 L72 82 L32 52 L82 48 Z"
          />
          <path
            fill="rgba(69, 10, 10, 0.4)"
            d="M52 132 H148 V188 H52 Z M68 132 V108 H132 V132"
          />
          <path fill="rgba(251, 191, 36, 0.25)" d="M76 88 H124 V108 H76 Z" />
          <circle cx="100" cy="158" r="6" fill="rgba(251, 191, 36, 0.5)" />
        </svg>
      </div>
      <div className="heroDarshanDiyaRow">
        <span className="heroDarshanDiya heroVisual__float1" />
        <span className="heroDarshanDiya heroDarshanDiya--wide heroVisual__float2" />
        <span className="heroDarshanDiya heroVisual__float3" />
      </div>
      <div className="heroDarshanDiyaRow heroDarshanDiyaRow--secondary">
        <span className="heroDarshanDiya heroDarshanDiya--small heroVisual__float2" />
        <span className="heroDarshanDiya heroDarshanDiya--small heroVisual__float3" />
      </div>
      <div className="heroDarshanBell heroVisual__float2">
        <svg viewBox="0 0 36 44" width="30" height="36" aria-hidden>
          <path
            fill="rgba(254, 243, 199, 0.25)"
            stroke="rgba(251, 191, 36, 0.7)"
            strokeWidth="1.2"
            d="M18 6v4M8 38h20M12 14c0-7 3-10 6-10s6 3 6 10v16H12V14z"
          />
        </svg>
      </div>
      <div className="heroDarshanPattern" />
    </div>
  )
}
