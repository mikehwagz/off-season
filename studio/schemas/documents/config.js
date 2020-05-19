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
          title: 'Contact Heading',
          name: 'contactHeading',
          type: 'string',
        },
        {
          title: 'Address Line 1',
          name: 'addressLine1',
          type: 'string',
        },
        {
          title: 'Address Line 2',
          name: 'addressLine2',
          type: 'string',
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
