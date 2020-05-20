export default {
  title: 'Text',
  name: 'basicText',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [{ title: 'Normal', value: 'normal' }],
      lists: [],
      marks: {
        decorators: [],
        annotations: [
          {
            title: 'Hyperlink',
            name: 'hyperlink',
            type: 'hyperlink',
          },
          {
            title: 'Email Link',
            name: 'emailLink',
            type: 'emailLink',
          },
        ],
      },
    },
  ],
}
