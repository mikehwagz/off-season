import { picoapp } from 'picoapp'
import { size } from '@selfaware/martha'

import mark from '@/components/mark'

const components = {
  mark,
}

const state = {
  ...size(),
}

export default picoapp(components, state)
