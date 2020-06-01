import React from 'react'
import Emoji from 'react-emoji-render'

export default {
  title: 'Quote',
  name: 'quote',
  type: 'object',
  fields: [
    {
      title: 'Quotation Text',
      description:
        'Quotation marks are added at the beginning and end of the quote in the front-end. If quotations are used within the quote, such as for a record title, use single quotes.',
      name: 'quotation',
      type: 'text',
      rows: 4,
    },
    {
      title: 'Attribution',
      name: 'attribution',
      description: 'Do not include dash',
      type: 'string',
    },
    {
      title: 'Link',
      description: 'Add a link to the quoted article (optional)',
      name: 'url',
      type: 'url',
    },
    {
      title: 'Use smaller margin bottom?',
      name: 'isMarginSmall',
      type: 'boolean',
    },
  ],
  preview: {
    select: {
      attribution: 'attribution',
    },
    prepare: ({ attribution }) => ({
      title: 'Quote',
      subtitle: attribution,
      media: () => <Emoji style={{ fontSize: 30 }} text="📝" />,
    }),
  },
}
