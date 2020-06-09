import toPlainText from '../../toPlainText'

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
    {
      title: 'Use smaller margin bottom?',
      name: 'isMarginSmall',
      type: 'boolean',
    },
    {
      title: 'Use smaller width?',
      name: 'isWidthSmall',
      type: 'boolean',
    },
  ],
  preview: {
    select: {
      caption: 'caption',
      media: 'images.0.image',
    },
    prepare: ({ caption, ...selection }) => ({
      ...selection,
      title: 'Slideshow',
      subtitle: caption && caption.content ? toPlainText(caption.content) : '',
    }),
  },
}
