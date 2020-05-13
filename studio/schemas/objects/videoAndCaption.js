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
  ],
}
