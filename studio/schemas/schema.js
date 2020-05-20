import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'

import config from './documents/config'
import homepage from './documents/homepage'
import page from './documents/page'
import project from './documents/project'

import seo from './objects/seo'
import a11yImage from './objects/a11yImage'
import hyperlink from './objects/hyperlink'
import emailLink from './objects/emailLink'
import basicText from './objects/basicText'
import shortText from './objects/shortText'
import moduleText from './objects/moduleText'
import caption from './objects/caption'
import colophonItem from './objects/colophonItem'
import colophon from './objects/colophon'
import fullBleed from './objects/fullBleed'
import heading from './objects/heading'
import imageAndCaption from './objects/imageAndCaption'
import videoAndCaption from './objects/videoAndCaption'
import list from './objects/list'
import quote from './objects/quote'
import slideshow from './objects/slideshow'
import twoUpImageAndText from './objects/twoUpImageAndText'
import twoUpImages from './objects/twoUpImages'
import contentModules from './objects/contentModules'

const documents = [config, homepage, page, project]

const objects = [
  seo,
  a11yImage,
  hyperlink,
  emailLink,
  basicText,
  shortText,
  moduleText,
  caption,
  colophonItem,
  colophon,
  fullBleed,
  heading,
  imageAndCaption,
  videoAndCaption,
  list,
  quote,
  slideshow,
  twoUpImageAndText,
  twoUpImages,
  contentModules,
]

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([...documents, ...objects]),
})
