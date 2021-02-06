import { component } from 'picoapp'
import inview from '@/util/inview'
import { add, remove } from 'martha'

export default component((node, ctx) => {
  if (inview(node, ctx.getState().wh)) return

  add(node, 'is-hidden')

  let off = ctx.on('tick', ({ wh }) => {
    if (inview(node, wh)) {
      off()
      remove(node, 'is-hidden')
    }
  })
})
