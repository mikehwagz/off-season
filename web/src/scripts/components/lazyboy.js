import { component } from 'picoapp'
import choozy from 'choozy'
import inview from '@/util/inview'
import { on, remove, index } from '@selfaware/martha'

export default component((node, ctx) => {
  let { lqip, img } = choozy(node)

  let offTick = ctx.on('tick', ({ wh }) => {
    if (inview(node, wh)) {
      console.log(`slide ${index(node.parentNode)} is visible`)
      load()
      offTick()
    }
  })

  function load() {
    img.onload = () => {
      requestAnimationFrame(() => {
        let off = on(img, 'transitionend', () => {
          off()
          lqip.remove()
        })
        remove(img, 'o0')
        img.removeAttribute('data-src')
      })
    }
    img.src = img.dataset.src
  }
})
