import Highway from '@dogstudio/highway'
import gsap from 'gsap'
import { index } from '@selfaware/martha'

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
