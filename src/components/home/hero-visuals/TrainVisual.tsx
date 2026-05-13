/**
 * Trains hero: rails + locomotive silhouette (CSS only).
 */
export function TrainVisual() {
  return (
    <div className="heroScene heroScene--trains">
      <div className="heroScene__ambient heroScene__ambient--trains" />
      <div className="heroTrainGridBleed" aria-hidden />
      <div className="heroTrainRails" aria-hidden />
      <div className="heroTrainLocoWrap heroVisual__float1" aria-hidden>
        <div className="heroTrainLoco">
          <div className="heroTrainLoco__nose" />
          <div className="heroTrainLoco__windows" />
        </div>
      </div>
      <div className="heroTrainGlow heroTrainGlow--1" />
      <div className="heroTrainGlow heroTrainGlow--2" />
    </div>
  )
}
