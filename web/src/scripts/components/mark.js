import { component } from 'picoapp'
import choozy from 'choozy'
import { clamp, map, lerp, round, on } from '@selfaware/martha'
import gsap from 'gsap'

export default component((node, ctx) => {
  let { front, back } = choozy(node)
  let eventType = node.dataset.eventType

  let tx = ctx.getState().ww * 0.5
  let ty = ctx.getState().wh * 0.5
  let cx = 0
  let cy = 0
  let mx = 20
  let my = 10
  let ease = 0.075

  if (eventType === 'mousemove') {
    on(window, 'mousemove', ({ clientX, clientY }) => {
      tx = clientX
      ty = clientY
    })
  } else if (eventType === 'deviceorientation') {
    if (typeof window.DeviceOrientationEvent.requestPermission !== 'function')
      return

    ctx.on('nav:toggle', () => {
      window.DeviceOrientationEvent.requestPermission().then((state) => {
        if (state === 'granted') {
          on(window, 'deviceorientation', ({ gamma, beta }) => {
            let { ww, wh } = ctx.getState()
            tx = clamp(ww - map(gamma, -45, 45, 0, ww), 0, ww)
            ty = clamp(wh - map(beta, 0, 90, 0, wh), 0, wh)
          })
        }
      })
    })
  } else {
    return
  }

  ctx.on('tick', ({ ww, wh }) => {
    cx = round(lerp(cx, map(tx, 0, ww, -1, 1), ease))
    cy = round(lerp(cy, map(ty, 0, wh, -1, 1), ease))

    if (eventType === 'mousemove' || ctx.getState().isNavOpen) {
      gsap.set(front, {
        x: cx * mx,
        y: cy * my,
      })

      gsap.set(back, {
        x: -cx * mx,
        y: -cy * my,
      })
    }
  })
})
