import { picoapp } from 'picoapp'
import { size } from '@selfaware/martha'

import mark from '@/components/mark'
import marquee from '@/components/marquee'

const components = {
  mark,
  marquee,
}

const state = {
  ...size(),
}

export default picoapp(components, state)
