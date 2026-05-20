import { PACKAGES } from './darshanData'
import { PackageCard } from './PackageCard'
import { useScrollLinkedRail } from './useScrollLinkedRail'

type Props = { skeleton: boolean }

export function PackagesSection({ skeleton }: Props) {
  const { sectionRef, trackRef, viewportRef, enabled, offset, progress } = useScrollLinkedRail(!skeleton)

  const nativeRail = !enabled

  return (
    <section
      ref={sectionRef}
      className={`darshan__section darshan__section--packages darshan__packages-scroll darshan__reveal--visible${nativeRail ? ' darshan__packages-scroll--native' : ''}`}
      id="packages"
      aria-labelledby="packages-heading"
    >
      <span id="temple-tours" className="darshan__anchor" tabIndex={-1} aria-hidden />
      <div className="darshan__container">
        <div className="darshan__section-head">
          <h2 id="packages-heading" className="darshan__h2">
            Featured darshan packages
          </h2>
          <p className="darshan__lead darshan__lead--packages-desktop">
            Curated like luxury travel — scroll to explore every package.
          </p>
          <p className="darshan__lead darshan__lead--packages-mobile">
            Curated like luxury travel — swipe to explore on your phone.
          </p>
        </div>
      </div>

      <div className="darshan__packages-pin">
        <div
          ref={viewportRef}
          className={`darshan__packages-viewport${nativeRail ? ' darshan__packages-viewport--native' : ''}`}
        >
          <div
            ref={trackRef}
            className={`darshan__packages-track${nativeRail ? ' darshan__packages-rail--native' : ''}${skeleton ? ' darshan__packages-rail--skeleton' : ''}`}
            style={
              enabled
                ? { transform: `translate3d(${-offset}px, 0, 0)` }
                : undefined
            }
          >
            {skeleton
              ? [...Array(4)].map((_, i) => <PackageCard key={`sk-${i}`} pkg={PACKAGES[0]} skeleton />)
              : PACKAGES.map((p) => <PackageCard key={p.id} pkg={p} />)}
          </div>
        </div>
        {enabled && !skeleton && (
          <div className="darshan__packages-progress-wrap" aria-hidden>
            <div className="darshan__packages-progress">
              <div
                className="darshan__packages-progress-fill"
                style={{ transform: `scaleX(${progress})` }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
