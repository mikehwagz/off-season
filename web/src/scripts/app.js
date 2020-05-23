import { picoapp } from 'picoapp'
import { size } from '@selfaware/martha'

import mark from '@/components/mark'
import clock from '@/components/clock'
import signup from '@/components/signup'
import projectLink from '@/components/projectLink'
import videoModule from '@/components/videoModule'
import slideshow from '@/components/slideshow'
import lazyboy from '@/components/lazyboy'

const components = {
  mark,
  clock,
  signup,
  projectLink,
  videoModule,
  slideshow,
  lazyboy,
}

const state = {
  ...size(),
  t: 0,
}

export default picoapp(components, state)
