const client = require('../util/client.js')
const groq = require('groq')
const fragments = require('../util/fragments')

module.exports = async function() {
  const site = await client.fetch(groq`*[_type == 'config'][0] {
    headerText,
    mobileHeaderText,
    sidebarText,
    nav[]-> {
      title,
      'slug': slug.current,
      ${fragments.contentModules}
    },
    footer,
    seo,
  }`)

  site.footer.copyrightText = site.footer.copyrightText.replace(
    '{year}',
    new Date().getFullYear(),
  )

  site.pages = site.nav
  site.nav = [{ title: 'Work', slug: '' }].concat(site.nav)

  return site
}
