import { component } from 'picoapp'
import { on, remove, add } from 'martha'

export default component((node) => {
  let thumbs = Array.from(document.querySelectorAll('.js-thumb'))

  let offEnter = on(node, 'mouseenter', enter)
  let offFocus = on(node, 'focus', enter)
  let offLeave = on(node, 'mouseleave', leave)
  let offBlur = on(node, 'blur', leave)

  return () => {
    offEnter()
    offFocus()
    offLeave()
    offBlur()

    leave()
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
