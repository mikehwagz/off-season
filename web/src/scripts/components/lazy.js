import { component } from 'picoapp'
import choozy from 'choozy'
import inview from '@/util/inview'
import { on, remove } from '@selfaware/martha'

export default component((node, ctx) => {
  let { lqip, img } = choozy(node)

  let offTick = ctx.on('tick', ({ wh }) => {
    if (inview(node, wh)) {
      load()
      offTick()
    }
  })

  function load() {
    img.onload = () => {
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
    }
    img.src = img.dataset.src
    img.srcset = img.dataset.srcset
  }
})
