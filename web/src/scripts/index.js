import Highway from '@dogstudio/highway'

// renderers
import Base from '@/renderers/Base'

// transitions
import Instant from '@/transitions/Instant'
import ToProject from '@/transitions/ToProject'
import Tab from '@/transitions/Tab'
import GAnalytics from 'ganalytics'

window.ga = new GAnalytics('UA-129345000-9')

class Core extends Highway.Core {
  constructor() {
    super({
      renderers: {
        default: Base,
      },
      transitions: {
        default: Instant,
        contextual: {
          toProject: ToProject,
          tab: Tab,
        },
      },
    })
  }

  popState() {
    window.location.reload()
  }
}

const H = new Core()

H.on('NAVIGATE_END', ({ to, location }) => {
  if (typeof window.ga === 'undefined') return
  window.ga.send('pageview', {
    dp: location.pathname,
    dt: to.page.title,
    dl: location.href,
  })
})
