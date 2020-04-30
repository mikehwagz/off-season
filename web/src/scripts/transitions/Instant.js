import Highway from '@dogstudio/highway'
import gsap from 'gsap'

class Instant extends Highway.Transition {
  in({ to, from, done }) {
    from.remove()

    gsap.set(to, { autoAlpha: 1 })
    done()
  }

  out({ from, done }) {
    done()
  }
}

export default Instant
