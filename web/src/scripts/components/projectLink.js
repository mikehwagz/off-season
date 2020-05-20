import { component } from 'picoapp'
import { on } from '@selfaware/martha'
import gsap from 'gsap'

export default component((node) => {
  let thumbs = document.querySelectorAll('.js-thumb')

  let offEnter = on(node, 'mouseenter', enter)
  let offFocus = on(node, 'focus', enter)
  let offLeave = on(node, 'mouseleave', leave)
  let offBlur = on(node, 'blur', leave)

  return () => {
    offEnter()
    offFocus()
    offLeave()
    offBlur()
  }

  function enter() {
    thumbs.forEach((img) => {
      gsap.set(img, {
        autoAlpha: img.dataset.id === node.id ? 1 : 0,
      })
    })
  }

  function leave() {
    gsap.set(thumbs, { autoAlpha: 0 })
  }
})
