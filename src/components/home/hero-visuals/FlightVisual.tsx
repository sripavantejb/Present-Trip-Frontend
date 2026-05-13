/**
 * Flights hero: soft mesh + large flight SVG (no window frame).
 */
export function FlightVisual() {
  return (
    <div className="heroScene heroScene--flights">
      <div className="heroScene__ambient heroScene__ambient--flights" />
      <div className="heroFlightDecorMesh" aria-hidden />
      <div className="heroFlightHorizon" aria-hidden />
      <div className="heroFlightSvgBg" aria-hidden>
        <img
          className="heroFlightSvgBg__img"
          src="/hero-flight.svg"
          alt=""
          decoding="async"
          fetchPriority="low"
        />
      </div>
      <div className="heroFlightOrb heroFlightOrb--1 heroVisual__float1" />
      <div className="heroFlightOrb heroFlightOrb--2 heroVisual__float2" />
    </div>
  )
}
