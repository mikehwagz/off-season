import toPlainText from '../../toPlainText'

export default {
  title: 'Two-Up: Images',
  name: 'twoUpImages',
  type: 'object',
  fields: [
    {
      title: 'Image 1',
      name: 'image1',
      type: 'a11yImage',
    },
    {
      title: 'Image 2',
      name: 'image2',
      type: 'a11yImage',
    },
    {
      title: 'Caption',
      name: 'caption',
      type: 'caption',
    },
  ],
  preview: {
    select: {
      caption: 'caption',
      media: 'image1.image',
    },
    prepare: ({ caption, ...selection }) => ({
      ...selection,
      title: 'Two-up: Images',
      subtitle: caption && caption.content ? toPlainText(caption.content) : '',
    }),
  },
}
