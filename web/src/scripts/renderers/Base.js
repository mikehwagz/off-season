import Highway from '@dogstudio/highway'
import { on, size } from '@selfaware/martha'
import gsap from 'gsap'
import app from '@/app'
import { listen } from 'quicklink'

class Base extends Highway.Renderer {
  onFirstLoad() {
    // automatically prefetch URLs for links that are in-viewport during idle time
    listen()

    // broadcast global events
    on(window, 'resize', this.resize)
    on(window, 'focus', this.focus)
    on(window, 'blur', this.blur)

    // setup render loop
    gsap.ticker.add(this.tick)

    // mount picoapp
    this.mount()

    gsap.set('[data-router-view]', { autoAlpha: 1 })
  }

  onEnter() {}

  onEnterCompleted() {
    this.mount()
  }

  onLeave() {
    this.unmount()
  }

  onLeaveCompleted() {}

  resize = () => {
    app.emit('resize', size())
  }

  focus = () => {
    app.emit('focus')
  }

  blur = () => {
    app.emit('blur')
  }

  tick = () => {
    app.emit('tick', ({ t }) => ({
      t: t + 1,
    }))
  }

  mount = () => {
    app.mount()
    this.resize()
  }

  unmount = () => {
    app.unmount()
  }

  setup() {
    this.onFirstLoad()
  }
}

export default Base
