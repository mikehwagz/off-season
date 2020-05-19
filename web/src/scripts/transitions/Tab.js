import Highway from '@dogstudio/highway'
import choozy from 'choozy'
import gsap from 'gsap'
import { rect, has, index } from '@selfaware/martha'

class Tab extends Highway.Transition {
  in({ from, to, done }) {
    from.refs = choozy(from)
    to.refs = choozy(to)

    from.index = this.activeTabIndex(from.refs.navItems)
    to.index = this.activeTabIndex(to.refs.navItems)

    this.tl = new gsap.timeline({
      onComplete: () => {
        from.remove()
        done()
      },
    })

    this.tl.set(to, { autoAlpha: 1 })
    this.tl.set(from.refs.scroll, { overflow: 'hidden' })

    let direction = to.index - from.index

    this[
      direction > 0 ? 'toRight' : direction < 0 ? 'toLeft' : 'projectToIndex'
    ]({ from, to, duration: 0.8, ease: 'expo' })
  }

  out({ done }) {
    done()
  }

  toRight({ from, to, duration, ease }) {
    let x = this.getX(to)
    this.tl
      .set(from.refs.tabs.slice(from.index + 1, to.index + 1), {
        autoAlpha: 0,
      })
      .set(to.refs.scroll, { x, willChange: 'transform' })
      .set(to.refs.tabs.slice(from.index + 1, to.index + 1), {
        x,
        willChange: 'transform',
      })
      .set(to.refs.navItems[from.index], { autoAlpha: 0 })
      .to(
        to.refs.navItems[from.index],
        {
          autoAlpha: 1,
          duration: duration * 0.5,
          ease,
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
          duration,
          ease: `${ease}.inOut`,
        },
        'a',
      )
  }

  toLeft({ from, to, duration, ease }) {
    let x = this.getX(to)
    this.tl
      .set(from, { zIndex: 1 })
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
          duration,
          ease: `${ease}.inOut`,
        },
        'a',
      )
      .to(
        from.refs.tabs.slice(to.index + 1, from.index + 1),
        {
          x,
          duration,
          ease: `${ease}.inOut`,
        },
        'a',
      )
      .set(to.refs.tabs.slice(to.index + 1), { autoAlpha: 1 })
  }

  projectToIndex({ from, to, duration, ease }) {
    this.tl
      .set(to.refs.links, {
        yPercent: 100,
      })
      .to(
        from,
        {
          autoAlpha: 0,
          duration,
          ease,
        },
        'a',
      )
      .to(
        to.refs.links,
        {
          yPercent: 0,
          duration,
          ease,
          stagger: duration / 18,
        },
        `a+=${duration * 0.5}`,
      )
  }

  activeTabIndex(items) {
    return index(items.find((el) => has(el, 'fg1')))
  }

  getX(to) {
    let navItemRect = rect(to.refs.navItems[to.index])
    let tabRect = rect(to.refs.tabs[to.index])
    return navItemRect.width - tabRect.width
  }
}

export default Tab
