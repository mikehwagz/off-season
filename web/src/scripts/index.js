import Highway from '@dogstudio/highway'

// renderers
import base from '@/renderers/base'

// transitions
import instant from '@/transitions/instant'

import { toggleVisibilityOnKey } from '@/util/misc'
toggleVisibilityOnKey('#grid', 'g')

const H = new Highway.Core({
  renderers: {
    default: base,
  },
  transitions: {
    default: instant,
  },
})
