import { component } from 'picoapp'
import choozy from 'choozy'
import { map, lerp, round, on } from '@selfaware/martha'
import gsap from 'gsap'

export default component((node, ctx) => {
  let { front, back } = choozy(node)

  let tx = ctx.getState().ww * 0.5
  let ty = ctx.getState().wh * 0.5
  let cx = 0
  let cy = 0
  let mx = 20
  let my = 10
  let ease = 0.075

  on(window, 'mousemove', ({ clientX, clientY }) => {
    tx = clientX
    ty = clientY
  })

  ctx.on('tick', ({ ww, wh }) => {
    cx = round(lerp(cx, map(tx, 0, ww, -1, 1), ease))
    cy = round(lerp(cy, map(ty, 0, wh, -1, 1), ease))

    gsap.set(front, {
      x: cx * mx,
      y: cy * my,
    })

    gsap.set(back, {
      x: -cx * mx,
      y: -cy * my,
    })
  })
})
