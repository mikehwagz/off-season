export default {
  title: 'Colophon',
  name: 'colophon',
  type: 'object',
  fields: [
    {
      title: 'Colophon Items',
      name: 'items',
      type: 'array',
      of: [
        {
          type: 'colophonItem',
        },
      ],
    },
  ],
}
