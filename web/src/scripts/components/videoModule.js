import { component } from 'picoapp'
import createWave from '@/lib/wave'
import { on } from '@selfaware/martha'
import choozy from 'choozy'
import inview from '@/util/inview'
import gsap from 'gsap'

export default component((node, ctx) => {
  let { video, mute, muteText, waveWrap } = choozy(node)

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

  function setMuted(muted) {
    video.muted = muted
    if (muted) {
      wave.off()
      gsap.set(muteText, { yPercent: 0 })
    } else {
      wave.on()
      gsap.set(muteText, { yPercent: -120 })
    }
  }

  return offClick
})
