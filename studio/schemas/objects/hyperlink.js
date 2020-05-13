import React from 'react'
import { FaExternalLinkAlt } from 'react-icons/fa'

export default {
  name: 'hyperlink',
  title: 'Hyperlink',
  type: 'object',
  blockEditor: {
    icon: () => <FaExternalLinkAlt />,
    render: (props) => (
      <span>
        {props.children} <FaExternalLinkAlt />
      </span>
    ),
  },
  fields: [
    {
      title: 'URL',
      type: 'url',
      name: 'url',
    },
    {
      title: 'Open in new tab?',
      type: 'boolean',
      name: 'isExternal',
    },
  ],
}
