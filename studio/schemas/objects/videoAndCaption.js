import React from 'react'
import Emoji from 'react-emoji-render'
import toPlainText from '../../toPlainText'

export default {
  title: 'Video & Caption',
  name: 'videoAndCaption',
  type: 'object',
  fields: [
    {
      title: 'MP4 File',
      name: 'file',
      type: 'file',
    },
    {
      title: 'Does the video have audio?',
      description:
        'If true, video will be muted by default with a mute/unmute button.',
      name: 'hasAudio',
      type: 'boolean',
    },
    {
      title: 'First Frame Image',
      description:
        'An image of the first frame of the video that is displayed while the video is loading.',
      name: 'poster',
      type: 'a11yImage',
    },
    {
      title: 'Caption',
      name: 'caption',
      type: 'caption',
    },
    {
      title: 'Use smaller margin bottom?',
      name: 'isMarginSmall',
      type: 'boolean',
    },
  ],
  preview: {
    select: {
      caption: 'caption',
      media: 'poster.image',
    },
    prepare: ({ caption, ...selection }) => ({
      title: 'Video & Caption',
      subtitle: caption && caption.content ? toPlainText(caption.content) : '',
      ...selection,
    }),
  },
}
