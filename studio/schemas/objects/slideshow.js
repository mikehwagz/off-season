export default {
  title: 'Slideshow',
  name: 'slideshow',
  type: 'object',
  fields: [
    {
      title: 'Images',
      name: 'images',
      type: 'array',
      of: [{ type: 'a11yImage' }],
    },
    {
      title: 'Caption',
      name: 'caption',
      type: 'caption',
    },
  ],
}
