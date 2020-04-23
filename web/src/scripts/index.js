import Highway from '@dogstudio/highway'

// renderers
import Base from '@/renderers/Base'

// transitions
import Instant from '@/transitions/Instant'
import ToProject from '@/transitions/ToProject'

const H = new Highway.Core({
  renderers: {
    default: Base,
  },
  transitions: {
    default: Instant,
    contextual: {
      toProject: ToProject,
    },
  },
})
