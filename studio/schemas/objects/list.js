import React from 'react'
import Emoji from 'react-emoji-render'

export default {
  title: 'List',
  name: 'list',
  type: 'object',
  fields: [
    {
      title: 'Items',
      name: 'items',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
  ],
  preview: {
    select: {
      items: 'items',
    },
    prepare: ({ items }) => ({
      title: 'List',
      subtitle: items
        .join(', ')
        .slice(0, 50)
        .concat('…'),
      media: () => <Emoji style={{ fontSize: 30 }} text="📝" />,
    }),
  },
}
