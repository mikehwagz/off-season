export default {
  title: 'Full Bleed',
  name: 'fullBleed',
  type: 'object',
  fields: [
    {
      title: 'Image',
      name: 'image',
      type: 'a11yImage',
    },
    {
      title: 'Use smaller margin bottom?',
      name: 'isMarginSmall',
      type: 'boolean',
    },
  ],
  preview: {
    select: {
      media: 'image.image',
    },
    prepare: ({ ...selection }) => ({
      ...selection,
      title: 'Full Bleed',
    }),
  },
}
