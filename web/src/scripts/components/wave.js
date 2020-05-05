import { component } from 'picoapp'
import { on } from '@selfaware/martha'
import createWave from '@/lib/wave'

export default component((node, ctx) => {
  let wave = createWave(node)

  on(node, 'click', () => {
    wave.isOn ? wave.off() : wave.on()
  })

  ctx.on('resize', ({ dpr }) => {
    wave.resize(dpr)
  })

  ctx.on('tick', ({ t }) => {
    wave.update(t)
  })
})
