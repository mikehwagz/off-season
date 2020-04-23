import Highway from '@dogstudio/highway'
import choozy from 'choozy'
import gsap from 'gsap'
import { round, map } from '@selfaware/martha'
import app from '@/app'

class ToProject extends Highway.Transition {
  in({ trigger, from, to, done }) {
    from.refs = choozy(from)
    to.refs = choozy(to)

    from.refs.scroll.style.overflow = 'hidden'
    to.refs.title.textContent = this.title

    let tl = new gsap.timeline({
      onComplete: () => {
        from.remove()
        done()
      },
    })

    let first = trigger.getBoundingClientRect().top
    let last = to.refs.title.getBoundingClientRect().top
    let y = Math.round(first - last)
    let duration = round(map(Math.abs(y), 0, app.getState().wh, 0.8, 1.2), 100)

    tl.set(to.refs.title, { y })
      .set(to, { autoAlpha: 1 })
      .to(
        from.refs.items,
        {
          duration: duration * 0.5,
          ease: 'expo',
          autoAlpha: 0,
        },
        'a',
      )
      .to(
        to.refs.title,
        {
          y: 0,
          duration,
          ease: 'expo.inOut',
        },
        'a',
      )
  }

  out({ trigger, done }) {
    this.title = trigger.textContent
    done()
  }
}

export default ToProject
