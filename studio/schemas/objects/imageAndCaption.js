import toPlainText from '../../toPlainText'

export default {
  title: 'Image & Caption',
  name: 'imageAndCaption',
  type: 'object',
  fields: [
    {
      title: 'Image',
      name: 'image',
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
      media: 'image.image',
    },
    prepare: ({ caption, ...selection }) => ({
      ...selection,
      title: 'Image & Caption',
      subtitle: caption && caption.content ? toPlainText(caption.content) : '',
    }),
  },
}
