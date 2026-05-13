/**
 * Buses hero: road band + coach silhouette (CSS only).
 */
export function BusVisual() {
  return (
    <div className="heroScene heroScene--buses">
      <div className="heroScene__ambient heroScene__ambient--buses" />
      <div className="heroBusRoad" aria-hidden />
      <div className="heroBusVehicleWrap heroVisual__float2" aria-hidden>
        <div className="heroBusShell">
          <div className="heroBusShell__roof" />
          <div className="heroBusShell__glazing" />
          <div className="heroBusShell__stripe" />
        </div>
      </div>
      <div className="heroBusBloom" />
    </div>
  )
}
