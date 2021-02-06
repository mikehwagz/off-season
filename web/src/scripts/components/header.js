import { component } from 'picoapp'
import choozy from 'choozy'
import { on, toggle } from 'martha'

export default component((node, ctx) => {
  let { burger } = choozy(node)

  on(burger, 'click', () => {
    ctx.emit('nav:toggle', ({ isNavOpen }) => ({
      isNavOpen: !isNavOpen,
    }))
  })

  ctx.on('nav:toggle', () => {
    toggle(document.body, 'is-nav-open')
  })
})
