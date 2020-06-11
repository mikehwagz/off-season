import Highway from '@dogstudio/highway'
import { on, size, add, remove } from '@selfaware/martha'
import gsap from 'gsap'
import app from '@/app'
import { listen } from 'quicklink'
import loadFonts from '@/lib/loadFonts'

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

    gsap.set('[data-router-view]', { autoAlpha: 1 })

    loadFonts().then(() => {
      // mount app
      this.mount()
      // animate in
      remove(document.body, 'o0')
    })
  }

  onEnter() {}

  onEnterCompleted() {
    this.mount()

    if (app.getState().isNavOpen) {
      app.emit('nav:toggle', () => ({
        isNavOpen: false,
      }))
    }
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

    let links = Array.from(document.querySelectorAll('.js-mobileNavLinks'))

    links.forEach((el) => {
      remove(el, 'is-active')

      let href = el.getAttribute('href').replace(/\//g, '')
      let path = window.location.pathname.replace(/\//g, '')

      if (href === path) add(el, 'is-active')
    })
  }

  unmount = () => {
    app.unmount()
  }

  setup() {
    this.onFirstLoad()
  }
}

export default Base
