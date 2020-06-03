import Highway from '@dogstudio/highway'
import choozy from 'choozy'
import gsap from 'gsap'
import { rect, round, map } from '@selfaware/martha'
import app from '@/app'

class ToProject extends Highway.Transition {
  in({ trigger, from, to, done }) {
    from.refs = choozy(from)
    to.refs = choozy(to)

    let tl = new gsap.timeline({
      onComplete: () => {
        from.remove()
        done()
      },
    })

    let img = document.querySelector(`[data-id="${trigger.id}"]`)

    let first = rect(trigger).top
    let last = rect(to.refs.title).top
    let y = Math.round(first - last)

    let min = 1.1
    let max = 1.5
    let duration = round(map(Math.abs(y), 0, app.getState().wh, min, max), 100)

    if (from.refs.workLabel) {
      tl.set(to.refs.backLabel, {
        autoAlpha: 0,
      })
    }

    tl.set(from.refs.scroll, { overflow: 'hidden' })
      .set(trigger, { autoAlpha: 0 })
      .set(to.refs.title, { y })
      .set(to.refs.content, { y: y + 100, autoAlpha: 0 })
      .set(to, { autoAlpha: 1 })
      .to(
        [from, img],
        {
          duration: duration * 0.5,
          autoAlpha: 0,
          ease: 'expo',
          clearProps: 'all',
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

    if (from.refs.workLabel) {
      tl.to(
        from.refs.workLabel,
        {
          duration,
          ease: 'expo.inOut',
        },
        'a',
      ).to(
        to.refs.backLabel,
        {
          autoAlpha: 1,
          duration,
          ease: 'expo.inOut',
        },
        'a',
      )
    }

    tl.to(
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
