import { picoapp } from 'picoapp'
import { size } from '@selfaware/martha'

import mark from '@/components/mark'
import marquee from '@/components/marquee'
import badge from '@/components/badge'
import wave from '@/components/wave'
import videoModule from '@/components/videoModule'

const components = {
  mark,
  marquee,
  badge,
  wave,
  videoModule,
}

const state = {
  ...size(),
  t: 0,
}

export default picoapp(components, state)
