import { useCallback, useEffect, useState } from 'react'
import { createHeroRotationTimer } from '../utils/heroRotationTimer'

type ArtworkLayer = 'background' | 'character' | 'portrait'
type LayerStatus = 'loaded' | 'failed'
type SceneLayers = Partial<Record<ArtworkLayer, LayerStatus>>

function isReady(layers?: SceneLayers) {
  return layers?.portrait === 'loaded' || (layers?.background === 'loaded' && layers?.character === 'loaded')
}

function hasFailed(layers?: SceneLayers) {
  return !!layers && Object.values(layers).includes('failed')
}

export function useHeroCarousel(count: number) {
  const [current, setCurrent] = useState(0)
  const [pending, setPending] = useState<number | null>(null)
  const [requested, setRequested] = useState([0])
  const [enabled, setEnabled] = useState(true)
  const [manualPlayback, setManualPlayback] = useState<boolean | null>(null)
  const [visible, setVisible] = useState(() => !document.hidden)
  const [reduceMotion, setReduceMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [readiness, setReadiness] = useState<Record<number, SceneLayers>>({})
  const [rotationTimer] = useState(createHeroRotationTimer)

  const playing = manualPlayback ?? !reduceMotion

  function neighbor(direction: -1 | 1) {
    for (let distance = 1; distance < count; distance++) {
      const index = (current + direction * distance + count) % count
      if (!hasFailed(readiness[index])) return index
    }
    return null
  }

  const next = neighbor(1)
  const previous = neighbor(-1)
  const currentSettled = isReady(readiness[current]) || hasFailed(readiness[current])
  const pendingReady = pending !== null && isReady(readiness[pending])
  const pendingFailed = pending !== null && hasFailed(readiness[pending])

  const requestScene = useCallback((index: number) => {
    setRequested((indices) => indices.includes(index) ? indices : [...indices, index])
  }, [])

  function setLayerStatus(index: number, layer: ArtworkLayer, status: LayerStatus) {
    setReadiness((layers) => layers[index]?.[layer] === status
      ? layers
      : { ...layers, [index]: { ...layers[index], [layer]: status } })
  }

  function step(direction: -1 | 1) {
    const target = direction === 1 ? next : previous
    if (target === null || pending !== null) return
    requestScene(target)
    setPending(target)
  }

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onMotion = (event: MediaQueryListEvent) => setReduceMotion(event.matches)
    const onVisibility = () => {
      if (document.hidden) rotationTimer.pause()
      setVisible(!document.hidden)
    }
    motion.addEventListener('change', onMotion)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      motion.removeEventListener('change', onMotion)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [rotationTimer])

  // 首屏素材完成后再预载下一张；保留已展示的图层以便淡出和回看。
  useEffect(() => {
    if (enabled && visible && currentSettled && next !== null) requestScene(next)
  }, [currentSettled, enabled, next, requestScene, visible])

  useEffect(() => {
    if (pending === null) return
    if (pendingReady) {
      setCurrent(pending)
      setPending(null)
    } else if (pendingFailed) {
      setPending(null)
    }
  }, [pending, pendingFailed, pendingReady])

  // 只有换图才抽取新间隔；暂停、切标签和重渲染都保留剩余时间。
  useEffect(() => {
    rotationTimer.reset()
  }, [current, rotationTimer])

  useEffect(() => {
    if (!enabled || !playing || !visible || !currentSettled || next === null || pending !== null) return
    rotationTimer.resume(() => {
      requestScene(next)
      setPending(next)
    })
    return rotationTimer.pause
  }, [current, currentSettled, enabled, next, pending, playing, requestScene, rotationTimer, visible])

  return {
    current,
    enabled,
    playing,
    requested,
    canStep: currentSettled && next !== null && pending === null,
    setLayerStatus,
    step,
    togglePlayback: () => setManualPlayback(!playing),
    toggleEnabled: () => {
      if (enabled) setPending(null)
      setEnabled(!enabled)
    },
  }
}
