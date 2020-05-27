const fs = require('fs')
const path = require('path')
const util = require('util')
const readFile = util.promisify(fs.readFile)
const cx = require('nanoclass')
const blocksToHtml = require(`@sanity/block-content-to-html`)

const imageUrlBuilder = require('@sanity/image-url')
const client = require('./src/util/client')
const builder = imageUrlBuilder(client)

module.exports = function(eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false)

  eleventyConfig.addNunjucksAsyncShortcode('webpackAsset', async (name) => {
    const manifestData = await readFile(
      path.resolve(__dirname, 'src/templates/includes/_manifest.json'),
    )
    const manifest = JSON.parse(manifestData)

    return manifest[name]
  })

  eleventyConfig.addShortcode(
    'debug',
    (value) =>
      `<pre style="padding: 100px 0; font-size: 14px; font-family: monospace;">${JSON.stringify(
        value,
        null,
        2,
      )}</pre>`,
  )

  eleventyConfig.addShortcode('urlFor', (image, width, blur) => {
    let b = builder
      .image(image)
      .width(width)
      .auto('format')
      .fit('max')

    if (blur) {
      return b.blur(blur).url()
    } else {
      return b.url()
    }
  })

  eleventyConfig.addShortcode('blocksToHtml', (blocks) => {
    try {
      return blocksToHtml({ blocks })
    } catch (e) {
      return ''
    }
  })

  eleventyConfig.addShortcode('classNames', (...all) => cx(all))

  eleventyConfig.addPassthroughCopy({ 'src/assets/icons': '/' })
  eleventyConfig.addPassthroughCopy({ 'src/assets/videos': '/' })

  return {
    dir: {
      input: 'src/templates',
      data: '../data',
      includes: 'includes',
      layouts: 'layouts',
      output: 'build',
    },
  }
}
