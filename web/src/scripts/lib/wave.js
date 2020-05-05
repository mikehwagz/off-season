import createCanvas from '@/util/canvas'

export default function createWave(el) {
  let c2d = createCanvas(el)

  let isOn = false

  let amp = {
    t: 0,
    c: 0,
    on: 0,
    off: 0,
  }

  let speed = 25
  let ease = 0.2
  let wMax = 0
  let yStart = 0
  let freq = 0

  return {
    ...c2d,
    get isOn() {
      return isOn ? true : false
    },
    on() {
      isOn = true
      amp.t = amp.on
    },
    off() {
      isOn = false
      amp.t = amp.off
    },
    resize(dpr) {
      c2d.resize({
        width: el.offsetWidth,
        height: el.offsetHeight,
        dpr,
      })

      c2d.ctx.lineWidth = 2

      wMax = c2d.w
      yStart = c2d.h / 2
      freq = 12 / c2d.h

      amp.on = c2d.h / 4
      amp.off = 2
      amp.t = isOn ? amp.on : amp.off
      amp.c = amp.t
    },
    update(t) {
      amp.c += ease * (amp.t - amp.c)

      c2d.ctx.clearRect(0, 0, c2d.w, c2d.h)
      c2d.ctx.beginPath()
      c2d.ctx.strokeStyle = '#000000'

      for (let s = 0; s < wMax; s++) {
        let e = amp.c * Math.sin(s * freq + t / speed)
        c2d.ctx.lineTo(s, yStart + e)
      }

      c2d.ctx.stroke()
    },
  }
}
