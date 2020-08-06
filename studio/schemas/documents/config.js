export default {
  title: 'Global Configuration',
  name: 'config',
  type: 'document',
  fields: [
    {
      title: 'Header Text',
      type: 'string',
      name: 'headerText',
    },
    {
      title: 'Mobile Header Text',
      type: 'string',
      name: 'mobileHeaderText',
    },
    {
      title: 'Sidebar Text',
      type: 'text',
      name: 'sidebarText',
      validation: (Rule) => Rule.max(280),
    },
    {
      title: 'Navigation',
      name: 'nav',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'page' }] }],
      validation: (Rule) => Rule.max(3),
    },
    {
      title: 'Footer',
      name: 'footer',
      type: 'object',
      fields: [
        {
          title: 'Background Color',
          name: 'bgColor',
          type: 'color',
          options: {
            disableAlpha: true,
          },
        },
        {
          title: 'Newsletter Heading',
          name: 'newsletterHeading',
          type: 'string',
        },
        {
          title: 'Newsletter Input Placeholder',
          name: 'newsletterPlaceholder',
          type: 'string',
        },
        {
          title: 'Newsletter Signup Success Message',
          name: 'newsletterSuccessMessage',
          type: 'string',
        },
        {
          title: 'Contact Heading',
          name: 'contactHeading',
          type: 'string',
        },
        {
          title: 'Address',
          name: 'address',
          type: 'shortText',
        },
        {
          title: 'Email Address',
          name: 'email',
          type: 'string',
        },
        {
          title: 'Instagram Handle',
          name: 'instagramHandle',
          type: 'string',
        },
        {
          title: 'Spotify Link',
          name: 'spotifyLink',
          type: 'url',
        },
        {
          title: 'Copyright Text',
          description: 'Use {year} to display the current year',
          name: 'copyrightText',
          type: 'string',
        },
      ],
    },
    {
      title: 'SEO Metadata',
      name: 'seo',
      type: 'seo',
    },
  ],
  __experimental_actions: ['update', 'publish'],
}
