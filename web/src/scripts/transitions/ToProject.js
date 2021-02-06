import Highway from '@dogstudio/highway'
import choozy from 'choozy'
import gsap from 'gsap'
import { rect, round, map, has } from 'martha'
import app from '@/app'
import inview from '@/util/inview'

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
    let title = trigger.hasAttribute('data-title')
      ? trigger
      : trigger.querySelector('[data-title]')

    let first = rect(title).top
    let last = rect(to.refs.title).top
    let y = Math.round(first - last)

    let min = 1.1
    let max = 1.5
    let duration = round(map(Math.abs(y), 0, app.getState().wh, min, max), 100)

    let isFromWork = from.refs.workLabel
    let isFooterVisible =
      from.refs.footer && inview(from.refs.footer, app.getState().wh)

    if (isFromWork) {
      tl.set(to.refs.backLabel, {
        autoAlpha: 0,
      })
    }

    tl.set(from.refs.scroll, { overflow: 'hidden' })
      .set(title, { autoAlpha: 0 })
      .set(to.refs.title, { y })
      .set(to.refs.content, { y: y + 100, autoAlpha: 0 })
      .set(to, { autoAlpha: 1 })
      .set(to.refs.backLink, { y, autoAlpha: 0 })

    tl.to(
      from.refs.inner,
      {
        duration: duration * 0.5,
        autoAlpha: 0,
        ease: 'expo',
      },
      'a',
    )

    if (img) {
      tl.to(
        img,
        {
          duration: duration * 0.5,
          autoAlpha: 0,
          ease: 'expo',
          clearProps: 'all',
        },
        'a',
      )
    }

    tl.to(
      to.refs.title,
      {
        y: 0,
        duration,
        ease: 'expo.inOut',
      },
      'a',
    ).to(
      to.refs.backLink,
      {
        autoAlpha: 1,
        y: 0,
        duration,
        ease: 'expo.inOut',
      },
      'a',
    )

    if (isFromWork) {
      tl.to(
        from.refs.workLabel,
        {
          autoAlpha: 0,
          duration,
          ease: 'expo',
        },
        'a',
      ).to(
        to.refs.backLabel,
        {
          autoAlpha: 1,
          duration,
          delay: 0.1,
          ease: 'expo.inOut',
        },
        'a',
      )
    }

    if (isFooterVisible) {
      tl.to(
        from.refs.footer,
        {
          yPercent: 100,
          duration,
          ease: `expo.inOut`,
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

  out({ done }) {
    done()
  }
}

export default ToProject
