import { component } from 'picoapp'
import { on, remove, add } from '@selfaware/martha'
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
    thumbs.forEach((thumb) => {
      if (thumb.dataset.id === node.id) {
        remove(thumb, 'dn')
      } else {
        add(thumb, 'dn')
      }
    })
  }

  function leave() {
    add(thumbs, 'dn')
  }
})
