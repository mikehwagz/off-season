export default {
  title: 'Homepage',
  name: 'homepage',
  type: 'document',
  fields: [
    {
      title: 'Selected Projects',
      name: 'selectedProjects',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'project' }] }],
    },
  ],
  __experimental_actions: ['update', 'publish'],
}
