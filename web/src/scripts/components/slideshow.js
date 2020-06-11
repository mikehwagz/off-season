import { component } from 'picoapp'
import choozy from 'choozy'
import { on, wrap } from '@selfaware/martha'
import gsap from 'gsap'
import inview from '@/util/inview'

export default component((node, ctx) => {
  let { inc, dec, slides, progressBars } = choozy(node)
  let tl = gsap.timeline()
  let isPaused = false
  let isVisible = false
  let isInitial = true
  let pauseThreshold = 300
  let pauseTimeout = null
  let i = 0

  let offIncDown = on(inc, 'pointerdown', down)
  let offDecDown = on(dec, 'pointerdown', down)
  let offIncUp = on(inc, 'pointerup', up(1))
  let offDecUp = on(dec, 'pointerup', up(-1))

  ctx.on('tick', ({ wh }) => {
    if (inview(node, wh)) {
      if (isVisible) return

      isVisible = true

      if (isInitial) {
        isInitial = false
        set(i)
      } else {
        tl.play()
      }
    } else {
      if (!isVisible) return

      isVisible = false

      tl.pause()
    }
  })

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

    if (slides[idx].hasAttribute('data-id')) {
      ctx.on('lazy:load', ({ cache }) => {
        let id = cache[cache.length - 1]
        if (id !== slides[idx].dataset.id) return
        slides[idx].removeAttribute('data-id')
        animate()
      })
    } else {
      animate()
    }

    function animate() {
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
  }

  function clearPauseTimeout() {
    if (pauseTimeout !== null) {
      clearTimeout(pauseTimeout)
      pauseTimeout = null
    }
  }
})
