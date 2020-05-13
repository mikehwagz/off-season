import { component } from 'picoapp'
import { on } from '@selfaware/martha'
import gsap from 'gsap'

export default component((node, ctx) => {
  let thumbs = document.querySelectorAll('.js-thumb')
  let offEnter = on(node, 'mouseenter', () => {
    thumbs.forEach((img) => {
      gsap.set(img, {
        autoAlpha: img.dataset.id === node.getAttribute('id') ? 1 : 0,
      })
    })
  })

  return offEnter
})
