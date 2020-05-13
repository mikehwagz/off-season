export default {
  title: 'Content Modules',
  name: 'contentModules',
  type: 'array',
  of: [
    { type: 'imageAndCaption' },
    { type: 'videoAndCaption' },
    { type: 'twoUpImageAndText' },
    { type: 'twoUpImages' },
    { type: 'slideshow' },
    { type: 'fullBleed' },
    { type: 'heading' },
    { type: 'basicText' },
    { type: 'colophon' },
    { type: 'list' },
    { type: 'quote' },
  ],
}
