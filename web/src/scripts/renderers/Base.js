import Highway from '@dogstudio/highway'
import { on, size } from '@selfaware/martha'
import gsap from 'gsap'
import app from '@/app'

class Base extends Highway.Renderer {
  onFirstLoad() {
    console.log('onFirstLoad')

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

  onEnter() {
    this.mount()
  }

  onEnterCompleted() {}

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
