import { component } from 'picoapp'
import createWave from '@/lib/wave'
import { on, once } from 'martha'
import choozy from 'choozy'
import inview from '@/util/inview'
import gsap from 'gsap'

export default component((node, ctx) => {
  let { video, mute, muteText, waveWrap } = choozy(node)
  let hasAudio = node.hasAttribute('data-audio')
  let wave = null
  let offClick = () => {}

  if (hasAudio) {
    video.volume = 0.5
    wave = createWave(waveWrap)
    wave.amp.off = 2

    offClick = on(mute, 'click', () => {
      toggleMuted()
    })

    ctx.on('resize', ({ dpr }) => {
      wave.resize(dpr)
    })
  }

  let isInViewport = {
    last: false,
    current: false,
  }

  ctx.on('tick', ({ t, wh }) => {
    if (inview(node, wh)) {
      isInViewport.current = true
      !isInViewport.last && video.play()
      hasAudio && wave.update(t)
    } else {
      isInViewport.current = false
      if (isInViewport.last) {
        hasAudio && setMuted(true)
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

  return () => {
    offClick()
  }
})
