/**
 * Hotels hero: resort tower, warm light, pool band, luxury glass props.
 */
export function HotelVisual() {
  return (
    <div className="heroScene heroScene--hotels">
      <div className="heroScene__ambient heroScene__ambient--hotels" />
      <div className="heroHotelDecorArches" aria-hidden />
      <div className="heroHotelPoolBand" aria-hidden />
      <div className="heroHotelWarm heroHotelWarm--1" />
      <div className="heroHotelWarm heroHotelWarm--2" />
      <div className="heroHotelChandelier" aria-hidden />
      <div className="heroHotelBuilding">
        <div className="heroHotelBuilding__roof" />
        <div className="heroHotelBuilding__spire" />
        <div className="heroHotelBuilding__floor heroHotelBuilding__floor--3" />
        <div className="heroHotelBuilding__floor heroHotelBuilding__floor--2" />
        <div className="heroHotelBuilding__floor heroHotelBuilding__floor--1" />
        <div className="heroHotelBuilding__entrance" />
        <div className="heroHotelBuilding__glow" />
      </div>
      <div className="heroHotelPalmShadow" />
      <div className="heroHotelGlass heroHotelGlass--bell heroVisual__float1">
        <svg viewBox="0 0 32 40" width="26" height="32" aria-hidden>
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            d="M16 4v4M8 32h16M10 12c0-6 3-8 6-8s6 2 6 8v14H10V12z"
          />
        </svg>
      </div>
      <div className="heroHotelGlass heroHotelGlass--key heroVisual__float2">
        <svg viewBox="0 0 40 28" width="34" height="24" aria-hidden>
          <rect x="4" y="10" width="22" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.3" />
          <path d="M26 17h8v4h-8M30 17v-6" fill="none" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      </div>
      <div className="heroHotelGlass heroHotelGlass--case heroVisual__float3">
        <svg viewBox="0 0 40 32" width="34" height="28" aria-hidden>
          <rect x="6" y="8" width="28" height="18" rx="3" fill="none" stroke="currentColor" strokeWidth="1.3" />
          <path d="M6 14h28" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </div>
    </div>
  )
}
