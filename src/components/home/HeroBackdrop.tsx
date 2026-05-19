import { useLayoutEffect, useRef, useState } from 'react'
import type { CategoryId } from '../../config/categoryThemes'
import { CATEGORY_THEMES } from '../../config/categoryThemes'
import { HERO_BACKGROUND_IMAGES } from '../../config/heroBackgrounds'

type SlotPayload = { category: CategoryId }

/** Crossfade buffer: exactly one of a/b is `active` (opacity --on). */
type DoubleBuffer = {
  active: 'a' | 'b'
  a: SlotPayload
  b: SlotPayload
}

type Props = { category: CategoryId }

function buildBuffer(category: CategoryId): DoubleBuffer {
  return {
    active: 'a',
    a: { category },
    b: { category },
  }
}

export function HeroBackdrop({ category }: Props) {
  const prevCategory = useRef(category)
  const [buf, setBuf] = useState<DoubleBuffer>(() => buildBuffer(category))

  useLayoutEffect(() => {
    if (prevCategory.current === category) return
    prevCategory.current = category

    setBuf((prev) => {
      const inactive: 'a' | 'b' = prev.active === 'a' ? 'b' : 'a'
      return {
        active: inactive,
        a: inactive === 'a' ? { category } : prev.a,
        b: inactive === 'b' ? { category } : prev.b,
      }
    })
  }, [category])

  return (
    <div className="pt-home__heroBackdrop heroBackground">
      <HeroBgLayer visible={buf.active === 'a'} payload={buf.a} />
      <HeroBgLayer visible={buf.active === 'b'} payload={buf.b} />
    </div>
  )
}

function HeroBgLayer({
  visible,
  payload,
}: {
  visible: boolean
  payload: SlotPayload
}) {
  const t = CATEGORY_THEMES[payload.category]
  const bgImage = HERO_BACKGROUND_IMAGES[payload.category]

  return (
    <div
      className={
        visible
          ? 'pt-home__heroBgLayer pt-home__heroBgLayer--on'
          : 'pt-home__heroBgLayer pt-home__heroBgLayer--off'
      }
      aria-hidden
      data-hero-category={payload.category}
    >
      {bgImage ? (
        <img
          className="pt-home__heroBgLayer__img heroBackground__photo"
          src={bgImage}
          alt=""
          decoding="async"
          fetchPriority={visible ? 'high' : 'low'}
        />
      ) : (
        <div
          className="pt-home__heroBgLayer__gradient heroBackground__gradient"
          style={{ backgroundImage: t.gradient }}
        />
      )}
      <div
        className={
          bgImage
            ? 'pt-home__heroBgLayer__overlay heroOverlay heroOverlay--photo'
            : 'pt-home__heroBgLayer__overlay heroOverlay'
        }
        style={bgImage ? undefined : { background: t.overlay }}
      />
    </div>
  )
}
