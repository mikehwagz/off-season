import Highway from '@dogstudio/highway'

// renderers
import Base from '@/renderers/Base'

// transitions
import Instant from '@/transitions/Instant'
import ToProject from '@/transitions/ToProject'
import Tab from '@/transitions/Tab'

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
  if (typeof gtag === 'undefined') return

  let data = {
    page_path: location.pathname,
    page_title: to.page.title,
    page_location: location.href,
  }

  gtag('config', 'UA-129345000-9', data)
})
