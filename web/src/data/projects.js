const client = require('../util/client.js')
const groq = require('groq')
const fragments = require('../util/fragments')

module.exports = async function() {
  let projects = await client.fetch(
    groq`*[_type == 'project'] ${fragments.project}`,
  )

  return projects
}
