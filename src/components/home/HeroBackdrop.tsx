import { useLayoutEffect, useRef, useState } from 'react'
import type { CategoryId } from '../../config/categoryThemes'
import { CATEGORY_THEMES } from '../../config/categoryThemes'

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
      <div
        className="pt-home__heroBgLayer__gradient heroBackground__gradient"
        style={{ backgroundImage: t.gradient }}
      />
      <div
        className="pt-home__heroBgLayer__overlay heroOverlay"
        style={{ background: t.overlay }}
      />
    </div>
  )
}
