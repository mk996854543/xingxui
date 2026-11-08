export const MIN_HERO_SECONDS = 600
export const MAX_HERO_SECONDS = 1200

export function randomHeroDelayMs(random = Math.random) {
  return (MIN_HERO_SECONDS + Math.floor(random() * (MAX_HERO_SECONDS - MIN_HERO_SECONDS + 1))) * 1000
}

type RotationClock = {
  now: () => number
  schedule: (callback: () => void, delay: number) => number
  cancel: (handle: number) => void
}

const browserClock: RotationClock = {
  now: () => performance.now(),
  schedule: (callback, delay) => window.setTimeout(callback, delay),
  cancel: (handle) => window.clearTimeout(handle),
}

export function createHeroRotationTimer(clock = browserClock, nextDelay = randomHeroDelayMs) {
  let remaining: number | null = null
  let startedAt = 0
  let handle: number | null = null
  let generation = 0

  function pause() {
    if (handle === null) return
    clock.cancel(handle)
    handle = null
    generation += 1
    remaining = Math.max(0, (remaining ?? 0) - (clock.now() - startedAt))
  }

  function reset() {
    pause()
    remaining = nextDelay()
  }

  function resume(onElapsed: () => void) {
    if (handle !== null) return
    if (remaining === null) remaining = nextDelay()
    const scheduledGeneration = ++generation
    startedAt = clock.now()
    handle = clock.schedule(() => {
      if (scheduledGeneration !== generation) return
      handle = null
      remaining = null
      onElapsed()
    }, remaining)
  }

  return { pause, reset, resume }
}
