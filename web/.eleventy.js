const fs = require('fs')
const path = require('path')
const util = require('util')
const readFile = util.promisify(fs.readFile)
const cx = require('nanoclass')
const blocksToHtml = require(`@sanity/block-content-to-html`)
const { wrap } = require('@selfaware/martha')
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
      const h = blocksToHtml.h
      const serializers = {
        marks: {
          hyperlink: ({ children, mark }) =>
            h(
              'a',
              {
                className: 'inline-link',
                href: mark.url,
                target: mark.isExternal ? '_blank' : null,
                rel: mark.isExternal ? 'noopener noreferrer' : null,
              },
              children,
            ),
          emailLink: ({ children, mark }) =>
            h(
              'a',
              {
                className: 'inline-link',
                href: `mailto:${mark.email}`,
                'data-component': 'emailLink',
                'data-router-disabled': null,
              },
              children,
            ),
        },
      }
      return blocksToHtml({ blocks, serializers })
    } catch (e) {
      return ''
    }
  })

  eleventyConfig.addShortcode('classNames', (...all) => cx(all))

  function nextProject(slug, selectedProjects) {
    let project = selectedProjects.find((p) => p.slug === slug)
    if (project) {
      let currentIndex = selectedProjects.indexOf(project)
      let nextIndex = wrap(currentIndex + 1, selectedProjects.length)
      return selectedProjects[nextIndex]
    } else {
      return false
    }
  }

  eleventyConfig.addShortcode('nextProjectSlug', (slug, selectedProjects) => {
    let next = nextProject(slug, selectedProjects)
    return next ? next.slug : ''
  })

  eleventyConfig.addShortcode('nextProjectTitle', (slug, selectedProjects) => {
    let next = nextProject(slug, selectedProjects)
    return next ? next.title : ''
  })

  eleventyConfig.addShortcode('nextProjectColor', (slug, selectedProjects) => {
    let next = nextProject(slug, selectedProjects)
    return next ? next.themeColor : ''
  })

  eleventyConfig.addShortcode('encode', (str) =>
    Buffer.from(str, 'utf-8').toString('base64'),
  )

  eleventyConfig.addPassthroughCopy({ 'src/scripts/sw.js': '/sw.js' })
  eleventyConfig.addPassthroughCopy({ 'src/assets/robots.txt': '/robots.txt' })
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
