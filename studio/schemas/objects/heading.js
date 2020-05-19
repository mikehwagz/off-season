import React from 'react'
import Emoji from 'react-emoji-render'

export default {
  title: 'Heading',
  name: 'heading',
  type: 'object',
  fields: [
    {
      title: 'Text',
      name: 'text',
      type: 'string',
    },
  ],
  preview: {
    select: {
      text: 'text',
    },
    prepare: ({ text }) => ({
      title: 'Heading',
      subtitle: text,
      media: () => <Emoji style={{ fontSize: 30 }} text="📝" />,
    }),
  },
}
