import React from 'react'
import Emoji from 'react-emoji-render'

export default {
  title: 'Text',
  name: 'moduleText',
  type: 'object',
  fields: [
    {
      title: 'Content',
      name: 'content',
      type: 'basicText',
    },
  ],
  preview: {
    prepare: () => ({
      title: 'Text',
      media: () => <Emoji style={{ fontSize: 30 }} text="📝" />,
    }),
  },
}
