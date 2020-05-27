const client = require('../util/client.js')
const groq = require('groq')
const fragments = require('../util/fragments')
const blocksToHtml = require(`@sanity/block-content-to-html`)

module.exports = async function() {
  let projects = await client.fetch(groq`*[_type == 'homepage'][0] {
    selectedProjects[]-> {
      title,
      "slug": slug.current,
      "themeColor": themeColor.hex,
      thumbnail {
        altText,
        ...image.asset->
      },
      introText,
      roles,
      year,
      management,
      team,
      password,
      ${fragments.contentModules}
    }
  }`)

  return projects.selectedProjects
}
