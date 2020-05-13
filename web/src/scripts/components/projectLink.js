import { component } from 'picoapp'
import { on } from '@selfaware/martha'
import gsap from 'gsap'

export default component((node) => {
  let thumbs = document.querySelectorAll('.js-thumb')
  let links = document.querySelectorAll('.js-links')

  let offEnter = on(node, 'mouseenter', () => {
    gsap.set(node, { color: node.dataset.color })

    thumbs.forEach((img) => {
      gsap.set(img, {
        autoAlpha: img.dataset.id === node.id ? 1 : 0,
      })
    })
  })

  let offLeave = on(node, 'mouseleave', () => {
    gsap.set(links, { color: '#000' })
    gsap.set(thumbs, { autoAlpha: 0 })
  })

  return () => {
    offEnter()
    offLeave()
  }
})
