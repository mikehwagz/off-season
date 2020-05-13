const client = require('@sanity/client')

module.exports = client({
  projectId: 'jfzju37l',
  dataset: 'production',
  useCdn: true,
})
