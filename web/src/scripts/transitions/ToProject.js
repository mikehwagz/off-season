import Highway from '@dogstudio/highway'
import choozy from 'choozy'
import gsap from 'gsap'
import { rect, round, map } from '@selfaware/martha'
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

    let first = rect(trigger).top
    let last = rect(to.refs.title).top
    let y = Math.round(first - last)
    let duration = round(map(Math.abs(y), 0, app.getState().wh, 0.8, 1.2), 100)

    tl.set([to.refs.title, to.refs.content], { y })
      .set(to.refs.content, { autoAlpha: 0 })
      .set(to, { autoAlpha: 1 })
      .set(from.refs.items, { autoAlpha: 0 })
      .to(
        to.refs.title,
        {
          y: 0,
          duration,
          ease: 'expo.inOut',
        },
        'a',
      )
      .to(
        to.refs.content,
        {
          y: 0,
          autoAlpha: 1,
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
