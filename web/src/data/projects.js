const client = require('../util/client.js')
const groq = require('groq')

module.exports = async function() {
  const projects = await client.fetch(groq`*[_type == 'homepage'][0] {
    selectedProjects[]-> {
      title,
      "slug": slug.current,
      "themeColor": themeColor.hex,
      thumbnail {
        altText,
        ...image.asset->
      }
    }
  }`)

  return projects.selectedProjects
}
