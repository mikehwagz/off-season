import { component } from 'picoapp'
import choozy from 'choozy'
import { on } from '@selfaware/martha'

export default component((node, ctx) => {
  let { form } = choozy(node)
  let isOn = true
  let off = on(form, 'submit', (ev) => {
    ev.preventDefault()
    let fd = new FormData(form)
    if (fd.get('password') === atob(fd.get('hp'))) {
      off()
      node.remove()
      isOn = false
    } else {
      form.reset()
    }
  })

  return () => {
    isOn && off()
  }
})
