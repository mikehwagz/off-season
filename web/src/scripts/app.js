import { picoapp } from 'picoapp'
import { size } from '@selfaware/martha'

import mark from '@/components/mark'
import marquee from '@/components/marquee'
import badge from '@/components/badge'

const components = {
  mark,
  marquee,
  badge,
}

const state = {
  ...size(),
}

export default picoapp(components, state)
