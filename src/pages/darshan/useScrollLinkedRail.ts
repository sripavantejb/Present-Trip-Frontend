import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'

const MOBILE_MAX_WIDTH = 900

function isScrollJackEnabled(): boolean {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  if (window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`).matches) return false
  return true
}

export function useScrollLinkedRail(contentReady = true) {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const viewportRef = useRef<HTMLDivElement>(null)
  const maxOffsetRef = useRef(0)

  const [enabled, setEnabled] = useState(isScrollJackEnabled)
  const [offset, setOffset] = useState(0)
  const [progress, setProgress] = useState(0)

  const measure = useCallback(() => {
    const section = sectionRef.current
    const track = trackRef.current
    const viewport = viewportRef.current
    if (!section || !track || !viewport) return

    const scrollJack = isScrollJackEnabled()
    setEnabled(scrollJack)

    if (!scrollJack) {
      section.style.minHeight = ''
      section.style.height = ''
      maxOffsetRef.current = 0
      setOffset(0)
      setProgress(0)
      return
    }

    const max = Math.max(0, track.scrollWidth - viewport.clientWidth)
    maxOffsetRef.current = max

    const pin = section.querySelector<HTMLElement>('.darshan__packages-pin')
    const pinHeight = Math.max(pin?.offsetHeight ?? 0, viewport.offsetHeight, 420)
    const runway = max > 0 ? max : 0
    section.style.height = ''
    section.style.minHeight = `${pinHeight + runway}px`

    const sectionTop = section.offsetTop
    const scrolled = window.scrollY - sectionTop
    const p = runway > 0 ? Math.min(Math.max(scrolled / runway, 0), 1) : 0
    setProgress(p)
    setOffset(p * max)
  }, [])

  const updateScroll = useCallback(() => {
    if (!isScrollJackEnabled() || !sectionRef.current) return
    const max = maxOffsetRef.current
    if (max <= 0) {
      setProgress(0)
      setOffset(0)
      return
    }

    const section = sectionRef.current
    const sectionTop = section.offsetTop
    const scrolled = window.scrollY - sectionTop
    const p = Math.min(Math.max(scrolled / max, 0), 1)
    setProgress(p)
    setOffset(p * max)
  }, [])

  useLayoutEffect(() => {
    if (!contentReady) return
    measure()
    const id = requestAnimationFrame(() => measure())
    return () => cancelAnimationFrame(id)
  }, [contentReady, measure])

  useEffect(() => {
    const onResize = () => measure()
    const onScroll = () => updateScroll()

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)

    const mqMobile = window.matchMedia(`(max-width: ${MOBILE_MAX_WIDTH}px)`)
    const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onMqChange = () => measure()
    mqMobile.addEventListener('change', onMqChange)
    mqMotion.addEventListener('change', onMqChange)

    const ro = new ResizeObserver(() => measure())
    const section = sectionRef.current
    const track = trackRef.current
    const viewport = viewportRef.current
    if (section) ro.observe(section)
    if (track) ro.observe(track)
    if (viewport) ro.observe(viewport)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      mqMobile.removeEventListener('change', onMqChange)
      mqMotion.removeEventListener('change', onMqChange)
      ro.disconnect()
    }
  }, [contentReady, measure, updateScroll])

  return {
    sectionRef,
    trackRef,
    viewportRef,
    enabled,
    offset,
    progress,
  }
}
