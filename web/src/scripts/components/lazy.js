import { component } from 'picoapp'
import choozy from 'choozy'
import { on, remove } from 'martha'

export default component((node, ctx) => {
  let { lqip, img } = choozy(node)

  on(img, 'load', () => {
    img.decode().then(() => {
      requestAnimationFrame(() => {
        ctx.emit('lazy:load', null, { id: node.dataset.id })
        let off = on(img, 'transitionend', () => {
          off()
          lqip.remove()
        })
        remove(img, 'o0')
        img.removeAttribute('data-src')
      })
    })
  })

  img.src = img.dataset.src
  img.srcset = img.dataset.srcset
})
