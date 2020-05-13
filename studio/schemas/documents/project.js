export default {
  title: 'Project',
  name: 'project',
  type: 'document',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      title: 'Theme Color',
      name: 'themeColor',
      type: 'color',
      options: {
        disableAlpha: true,
      },
    },
    {
      title: 'Thumbnail Image',
      description: 'Appears when hovering a project title on the homepage.',
      name: 'thumbnail',
      type: 'a11yImage',
    },
    {
      title: 'Intro Text',
      name: 'introText',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.max(280),
    },
    {
      title: 'Roles',
      name: 'roles',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    },
    {
      title: 'Year',
      name: 'year',
      type: 'string',
    },
    {
      title: 'Management',
      name: 'management',
      type: 'shortText',
    },
    {
      title: 'Team',
      name: 'team',
      type: 'shortText',
    },
    {
      title: 'Content Modules',
      name: 'contentModules',
      type: 'contentModules',
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'thumbnail.image',
    },
  },
}
