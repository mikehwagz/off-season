import React from 'react'
import Emoji from 'react-emoji-render'

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
    {
      title: 'Use smaller margin bottom?',
      name: 'isMarginSmall',
      type: 'boolean',
    },
  ],
  preview: {
    prepare: () => ({
      title: 'Colophon',
      media: () => <Emoji style={{ fontSize: 30 }} text="📝" />,
    }),
  },
}
