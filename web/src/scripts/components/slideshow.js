import { component } from 'picoapp'
import choozy from 'choozy'
import { on, add, remove, wrap } from '@selfaware/martha'
import gsap from 'gsap'

export default component((node, ctx) => {
  let { inc, dec, slides, wraps, progressBars } = choozy(node)
  let tl = gsap.timeline()
  let isPaused = false
  let pauseThreshold = 300
  let pauseTimeout = null
  let i = 0

  let offIncDown = on(inc, 'pointerdown', down)
  let offDecDown = on(dec, 'pointerdown', down)
  let offIncUp = on(inc, 'pointerup', up(1))
  let offDecUp = on(dec, 'pointerup', up(-1))

  set(0)

  return () => {
    offIncDown()
    offDecDown()
    offIncUp()
    offDecUp()
    clearPauseTimeout()
    tl.clear()
  }

  function down() {
    tl.pause()

    pauseTimeout = setTimeout(() => {
      isPaused = true
    }, pauseThreshold)
  }

  function up(n) {
    return () => {
      clearPauseTimeout()

      if (isPaused) {
        tl.play()
        isPaused = false
      } else {
        i = wrap(i + n, slides.length)
        set(i)
      }
    }
  }

  function set(idx) {
    tl.clear()

    slides.forEach((el, j) => {
      gsap.set(progressBars[j], { scaleX: j < idx ? 1 : 0 })

      if (j === idx) {
        el.removeAttribute('aria-hidden')
      } else {
        el.setAttribute('aria-hidden', true)
      }
    })

    let el = wraps[idx]
    if (!el.loaded) {
      let img = new Image()

      img.src = el.dataset.src
      img.className = el.dataset.class
      img.alt = el.dataset.alt

      el.loaded = true

      img.decode().then(() => {
        el.append(img)
        requestAnimationFrame(() => {
          remove(img, 'o0')
        })
      })
    }

    tl.to(progressBars[idx], {
      duration: 4,
      scaleX: 1,
      ease: 'linear',
      onComplete: () => {
        i = wrap(idx + 1, slides.length)
        set(i)
      },
    })

    tl.restart()
  }

  function clearPauseTimeout() {
    if (pauseTimeout !== null) {
      clearTimeout(pauseTimeout)
      pauseTimeout = null
    }
  }
})
