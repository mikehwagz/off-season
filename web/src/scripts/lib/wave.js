import createCanvas from '@/util/canvas'

export default function createWave(el, opt = {}) {
  let c2d = createCanvas(el)

  let isOn = false

  let amp = {
    t: 0,
    c: 0,
    on: 0,
    off: 0,
  }

  let speed = opt.speed ?? 25
  let ease = opt.ease ?? 0.2
  let frequency = opt.frequency ?? 12

  return {
    ...c2d,
    amp,
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

      amp.on = c2d.h / 4
      amp.t = isOn ? amp.on : amp.off
      amp.c = amp.t
    },
    update(t) {
      amp.c += ease * (amp.t - amp.c)

      c2d.ctx.clearRect(0, 0, c2d.w, c2d.h)
      c2d.ctx.beginPath()
      c2d.ctx.strokeStyle = '#000000'

      for (let s = 0; s < c2d.w; s++) {
        let e = amp.c * Math.sin(s * (frequency / c2d.h) + t / speed)
        c2d.ctx.lineTo(s, c2d.h / 2 + e)
      }

      c2d.ctx.stroke()
    },
  }
}
