import Highway from '@dogstudio/highway'
import choozy from 'choozy'
import gsap from 'gsap'
import { rect, has, index } from '@selfaware/martha'

class Tab extends Highway.Transition {
  in({ from, to, done }) {
    from.refs = choozy(from)
    to.refs = choozy(to)

    from.index = activeTabIndex(from.refs.navItems)
    to.index = activeTabIndex(to.refs.navItems)

    let direction = to.index - from.index

    let tl = new gsap.timeline({
      onComplete: () => {
        from.remove()
        done()
      },
    })

    let navItemRect = rect(to.refs.navItems[to.index])
    let tabRect = rect(to.refs.tabs[to.index])
    let x = navItemRect.width - tabRect.width

    tl.set(to, { autoAlpha: 1 })
    tl.set(from.refs.scroll, { overflow: 'hidden' })

    if (direction < 0) {
      tl.set(from, { zIndex: 1 })
        .set(from.refs.scroll, { willChange: 'transform' })
        .set(from.refs.tabs.slice(to.index + 1, from.index + 1), {
          willChange: 'transform',
        })
        .set(to.refs.tabs.slice(to.index + 1), { autoAlpha: 0 })
        .set(from.refs.dots[to.index], { backgroundColor: '#000' })
        .set(from.refs.dots[from.index], { backgroundColor: '#f1f1f1' })
        .to(
          from.refs.scroll,
          {
            x,
            duration: 1.2,
            ease: 'expo.inOut',
          },
          'a',
        )
        .to(
          from.refs.tabs.slice(to.index + 1, from.index + 1),
          {
            x,
            duration: 1.2,
            ease: 'expo.inOut',
          },
          'a',
        )
        .set(to.refs.tabs.slice(to.index + 1), { autoAlpha: 1 })
    } else if (direction > 0) {
      tl.set(from.refs.tabs.slice(from.index + 1, to.index + 1), {
        autoAlpha: 0,
      })
        .set(to.refs.scroll, { x: navItemRect.width, willChange: 'transform' })
        .set(to.refs.tabs.slice(from.index + 1, to.index + 1), {
          x,
          willChange: 'transform',
        })
        .set(to.refs.navItems[from.index], { autoAlpha: 0 })
        .to(
          to.refs.navItems[from.index],
          {
            autoAlpha: 1,
            duration: 0.6,
            ease: 'expo',
          },
          'a',
        )
        .to(
          [
            to.refs.tabs.slice(from.index + 1, to.index + 1),
            to.refs.scroll,
          ].flat(),
          {
            x: 0,
            duration: 1.2,
            ease: 'expo.inOut',
          },
          'a',
        )
    } else {
      tl.set(to.refs.links, {
        transformOrigin: 'top left',
        yPercent: 100,
      })
      tl.to(
        from,
        {
          autoAlpha: 0,
          duration: 1.2,
          ease: 'expo',
        },
        'a',
      )
      tl.to(
        to.refs.links,
        {
          yPercent: 0,
          duration: 1.2,
          ease: 'expo',
          stagger: 0.065,
        },
        'a+=0.6',
      )
    }

    tl.restart()
  }

  out({ done }) {
    done()
  }
}

export default Tab

function activeTabIndex(items) {
  return index(items.find((el) => has(el, 'fg1')))
}
