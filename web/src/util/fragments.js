module.exports.contentModules = `contentModules[] {
  _type,
  _type == 'imageAndCaption' => {
    'caption': caption.content,
    'image': {
      ...image.image.asset->,
      'altText': image.altText,
    },
  },
  _type == 'videoAndCaption' => {
    'video': file.asset->,
    'caption': caption.content,
    'poster': poster.image.asset->,
    'altText': image.altText,
  },
  _type == 'twoUpImageAndText' => {
    text,
    columnOrder,
    'image': {
      ...image.image.asset->,
      'altText': image.altText,
    },
  },
  _type == 'twoUpImages' => {
    'image1': {
      ...image1.image.asset->,
      'altText': image1.altText,
    },
    'image2': {
      ...image2.image.asset->,
      'altText': image1.altText,
    },
    'caption': caption.content,
  },
  _type == 'slideshow' => {
    images[] {
      ...image.asset->,
      altText,
    },
    'caption': caption.content,
  },
  _type == 'fullBleed' => {
    'image': {
      ...image.image.asset->,
      'altText': image.altText,
    },
  },
  _type == 'heading' => {
    text,
  },
  _type == 'moduleText' => {
    content,
  },
  _type == 'colophon' => {
    items[] {
      title,
      'body': body.content,
    },
  },
  _type == 'list' => {
    items,
  },
  _type == 'quote' => {
    quote,
    attribution,
  },
}`
