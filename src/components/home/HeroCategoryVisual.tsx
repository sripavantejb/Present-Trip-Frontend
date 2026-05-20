import { useLayoutEffect, useRef, useState } from 'react'
import type { CategoryId } from '../../config/categoryThemes'
import { heroHasPhotoBackground } from '../../config/heroBackgrounds'
import { BusVisual, FlightVisual, HotelVisual, TrainVisual } from './hero-visuals'

type SlotPayload = { category: CategoryId }

type DoubleBuffer = {
  active: 'a' | 'b'
  a: SlotPayload
  b: SlotPayload
}

function buildBuffer(category: CategoryId): DoubleBuffer {
  return { active: 'a', a: { category }, b: { category } }
}

function renderVisual(category: CategoryId) {
  switch (category) {
    case 'flights':
      return <FlightVisual />
    case 'trains':
      return <TrainVisual />
    case 'buses':
      return <BusVisual />
    case 'hotels':
      return <HotelVisual />
    case 'darshan':
      return <FlightVisual />
    default:
      return <FlightVisual />
  }
}

/** Crossfaded right-side hero art per category (syncs with hero backdrop). */
export function HeroCategoryVisual({ category }: { category: CategoryId }) {
  const prev = useRef(category)
  const [buf, setBuf] = useState<DoubleBuffer>(() => buildBuffer(category))

  useLayoutEffect(() => {
    if (prev.current === category) return
    prev.current = category
    setBuf((p) => {
      const inactive: 'a' | 'b' = p.active === 'a' ? 'b' : 'a'
      return {
        active: inactive,
        a: inactive === 'a' ? { category } : p.a,
        b: inactive === 'b' ? { category } : p.b,
      }
    })
  }, [category])

  return (
    <div className="heroVisualRoot pt-home__heroVisualRoot" aria-hidden>
      <VisualSlot visible={buf.active === 'a'} payload={buf.a} />
      <VisualSlot visible={buf.active === 'b'} payload={buf.b} />
    </div>
  )
}

function VisualSlot({ visible, payload }: { visible: boolean; payload: SlotPayload }) {
  if (heroHasPhotoBackground(payload.category)) return null

  return (
    <div
      className={
        visible
          ? 'heroVisualSlot heroVisualSlot--on'
          : 'heroVisualSlot heroVisualSlot--off'
      }
      data-hero-visual={payload.category}
    >
      <div className="heroVisual heroVisual__inner">{renderVisual(payload.category)}</div>
    </div>
  )
}
