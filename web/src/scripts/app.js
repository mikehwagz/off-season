import { picoapp } from 'picoapp'
import { size } from '@selfaware/martha'

import mark from '@/components/mark'
import marquee from '@/components/marquee'
import badge from '@/components/badge'
import wave from '@/components/wave'
import signup from '@/components/signup'
import videoModule from '@/components/videoModule'
import clock from '@/components/clock'

const components = {
  mark,
  marquee,
  badge,
  wave,
  signup,
  videoModule,
  clock,
}

const state = {
  ...size(),
  t: 0,
}

export default picoapp(components, state)
