import { strict as assert } from 'node:assert'
import { test } from 'node:test'
import { createHeroRotationTimer, randomHeroDelayMs } from '../src/utils/heroRotationTimer.ts'

function fakeClock() {
  let time = 0
  let id = 0
  const tasks = new Map()
  return {
    now: () => time,
    schedule(callback, delay) {
      tasks.set(++id, { callback, at: time + delay })
      return id
    },
    cancel(handle) { tasks.delete(handle) },
    tick(duration) {
      const end = time + duration
      for (;;) {
        const due = [...tasks].filter(([, task]) => task.at <= end).sort((a, b) => a[1].at - b[1].at)[0]
        if (!due) break
        const [handle, task] = due
        tasks.delete(handle)
        time = task.at
        task.callback()
      }
      time = end
    },
    get active() { return tasks.size },
  }
}

test('随机区间包含 600 秒与 1200 秒，中间值按秒计算', () => {
  assert.equal(randomHeroDelayMs(() => 0), 600_000)
  assert.equal(randomHeroDelayMs(() => 0.5), 900_000)
  assert.equal(randomHeroDelayMs(() => 0.999999), 1_200_000)
})

test('不提前换图，自动换图后重新抽取间隔', () => {
  const clock = fakeClock()
  const delays = [600_000, 1_200_000]
  const timer = createHeroRotationTimer(clock, () => delays.shift())
  let changes = 0
  const next = () => { changes += 1 }

  timer.reset()
  timer.resume(next)
  clock.tick(599_999)
  assert.equal(changes, 0)
  clock.tick(1)
  assert.equal(changes, 1)
  assert.equal(clock.active, 0)
  timer.reset()
  timer.resume(next)
  clock.tick(1_199_999)
  assert.equal(changes, 1)
  clock.tick(1)
  assert.equal(changes, 2)
})

test('切到后台暂停，回来接着计时；重复恢复不会创建额外定时器', () => {
  const clock = fakeClock()
  const timer = createHeroRotationTimer(clock, () => 900_000)
  let changes = 0
  const next = () => { changes += 1 }
  timer.resume(next)
  clock.tick(300_000)
  timer.pause()
  assert.equal(clock.active, 0)
  clock.tick(1_800_000)
  assert.equal(changes, 0)
  timer.resume(next)
  timer.resume(next)
  assert.equal(clock.active, 1)
  clock.tick(599_999)
  assert.equal(changes, 0)
  clock.tick(1)
  assert.equal(changes, 1)
})

test('手动换图重计时，卸载清理后不再执行', () => {
  const clock = fakeClock()
  const delays = [600_000, 1_200_000]
  const timer = createHeroRotationTimer(clock, () => delays.shift())
  let changes = 0
  const next = () => { changes += 1 }
  timer.resume(next)
  clock.tick(580_000)
  timer.reset()
  assert.equal(clock.active, 0)
  timer.resume(next)
  clock.tick(1_199_999)
  assert.equal(changes, 0)
  timer.pause()
  clock.tick(60_000)
  assert.equal(changes, 0)
  assert.equal(clock.active, 0)
})
