import { component } from 'picoapp'
import createWave from '@/lib/wave'
import { on } from '@selfaware/martha'
import choozy from 'choozy'
import inview from '@/util/inview'

export default component((node, ctx) => {
  let { video, mute, waveWrap } = choozy(node)

  let wave = createWave(waveWrap)

  let isInViewport = {
    last: false,
    current: false,
  }

  let offClick = on(mute, 'click', () => {
    toggleMuted()
  })

  ctx.on('resize', ({ dpr }) => {
    wave.resize(dpr)
  })

  ctx.on('tick', ({ t, wh }) => {
    if (inview(node, wh)) {
      isInViewport.current = true
      !isInViewport.last && video.play()
      wave.update(t)
    } else {
      isInViewport.current = false
      if (isInViewport.last) {
        setMuted(true)
        video.pause()
      }
    }

    isInViewport.last = isInViewport.current
  })

  function toggleMuted() {
    setMuted(!video.muted)
  }

  function setMuted(state) {
    video.muted = state
    state ? wave.off() : wave.on()
  }

  return offClick
})
