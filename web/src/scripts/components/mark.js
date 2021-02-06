import { component } from 'picoapp'
import choozy from 'choozy'
import { clamp, map, lerp, round, on } from 'martha'
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

  if (isTouch()) return

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

function isTouch() {
  var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ')
  var mq = function(query) {
    return window.matchMedia(query).matches
  }

  if (
    'ontouchstart' in window ||
    (window.DocumentTouch && document instanceof DocumentTouch)
  ) {
    return true
  }

  // include the 'heartz' as a way to have a non matching MQ to help terminate the join
  // https://git.io/vznFH
  var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('')
  return mq(query)
}
