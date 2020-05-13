export default {
  title: 'Two-Up: Image & Text',
  name: 'twoUpImageAndText',
  type: 'object',
  fields: [
    {
      title: 'Image',
      name: 'image',
      type: 'a11yImage',
    },
    {
      title: 'Text',
      name: 'text',
      type: 'basicText',
    },
    {
      title: 'Column Order',
      name: 'columnOrder',
      type: 'string',
      options: {
        layout: 'radio',
        list: [
          { title: 'Image / Text', value: 1 },
          { title: 'Text / Image', value: -1 },
        ],
      },
    },
  ],
}
