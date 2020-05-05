import { component } from 'picoapp'
import choozy from 'choozy'
import { on } from '@selfaware/martha'
import gsap from 'gsap'
import createWave from '@/lib/wave'

export default component((node, ctx) => {
  const refs = choozy(node)

  let offSubmit = on(refs.form, 'submit', (ev) => {
    ev.preventDefault()

    Promise.all([postToGoogleSheet(refs), showLoader(refs, ctx)]).then(
      ([res]) => {
        window.offWave()

        gsap.to(refs.form, {
          duration: 0.3,
          ease: 'quint.inOut',
          y: -10,
          autoAlpha: 0,
          onComplete: () => {
            window.destroyLoader()
          },
        })

        gsap.fromTo(
          refs.success,
          {
            autoAlpha: 0,
            y: 10,
          },
          {
            duration: 0.3,
            ease: 'quint.inOut',
            autoAlpha: 1,
            y: 0,
          },
        )
      },
    )
  })

  return () => {
    offSubmit()
  }
})

function postToGoogleSheet({ form }) {
  return fetch(
    'https://script.google.com/macros/s/AKfycbwOfv5FngYP-F7A1OtNHXqsR-JlqXVQmFVbAZ2Uc82MLnYATfs/exec',
    {
      method: 'POST',
      body: new FormData(form),
    },
  )
}

function showLoader({ mask, line, waveWrap }, ctx) {
  let tl = new gsap.timeline({ paused: true })
  let wave = null

  tl.to(mask, {
    duration: 0.3,
    ease: 'quint.inOut',
    attr: {
      height: 0,
      y: 6.5,
    },
  })
    .set(line, { autoAlpha: 0 })
    .add(() => {
      wave = createWave(waveWrap, {
        frequency: 3,
        speed: 10,
      })

      wave.amp.off = 0
      wave.resize(ctx.getState().dpr)
      wave.on()

      let offTick = ctx.on('tick', ({ t }) => {
        wave.update(t)
      })

      let offResize = ctx.on('resize', ({ dpr }) => {
        wave.resize(dpr)
      })

      window.offWave = () => {
        wave.off()
      }

      window.destroyLoader = () => {
        offTick()
        offResize()
      }
    })

  tl.restart()

  return tl.then()
}
