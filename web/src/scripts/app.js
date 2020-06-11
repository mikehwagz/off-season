import { picoapp } from 'picoapp'
import { size } from '@selfaware/martha'

import mark from '@/components/mark'
import clock from '@/components/clock'
import signup from '@/components/signup'
import projectLink from '@/components/projectLink'
import videoModule from '@/components/videoModule'
import slideshow from '@/components/slideshow'
import lazy from '@/components/lazy'
import password from '@/components/password'
import header from '@/components/header'
import emailLink from '@/components/emailLink'

const components = {
  mark,
  clock,
  signup,
  projectLink,
  videoModule,
  slideshow,
  lazy,
  password,
  header,
  emailLink,
}

const state = {
  ...size(),
  t: 0,
  navOpen: false,
}

export default picoapp(components, state)
