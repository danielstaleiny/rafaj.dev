'use strict'

const glob = require('fast-glob')
const path = require('path')

/**
 * The @11ty/eleventy configuration.
 *
 * For a full list of options, see: https://www.11ty.io/docs/config/
 */
module.exports = (eleventyConfig) => {
  const paths = {
    filters: path.join(process.cwd(), 'lib/filters/*.js'),
    shortcodes: path.join(process.cwd(), 'lib/shortcodes/*.js'),
    transforms: path.join(process.cwd(), 'lib/transforms/*.js'),
  }
  const dirs = {
    input: 'src',
    data: `./_data/`,
    includes: `./_includes/`,
    layouts: `./_layouts/`,
  }
  const files = glob.sync(path.join(process.cwd(), dirs.input, '**/*'))
  const exts = files
    .map((file) => path.extname(file).replace('.', ''))
    .filter((value, index, self) => self.indexOf(value) === index) // Removes duplicates, Makes array unique
    .filter((it) => !['purs', 'css'].includes(it))
  const filters = glob.sync(paths.filters)
  const shortcodes = glob.sync(paths.shortcodes)
  const transforms = glob.sync(paths.transforms)

  // Add all found filters
  filters.forEach((filter) =>
    eleventyConfig.addFilter(resolveNameFromPath(filter), require(filter))
  )

  // Add all found shortcodes
  shortcodes.forEach((shortcode) => {
    const name = resolveNameFromPath(shortcode)
    if (name.endsWith('_ctx'))
      return eleventyConfig.addPairedShortcode(name, require(shortcode))
    else return eleventyConfig.addShortcode(name, require(shortcode))
  })

  // Add all found transforms
  transforms.forEach((transform) =>
    eleventyConfig.addTransform(
      resolveNameFromPath(transform),
      require(transform)
    )
  )

  // Make all files pass through to cache
  eleventyConfig.setTemplateFormats(exts)
  eleventyConfig.setWatchJavaScriptDependencies(false)

  // eleventyConfig.addPassthroughCopy(`${dirs.input}/assets`)

  // Because of Purescript pure/ folder we need to ignore it for git but pass it through the 11ty
  // .eleventyignore Only source of ignoring files for 11ty
  eleventyConfig.setUseGitIgnore(false)

  // eleventyConfig.setBrowserSyncConfig({
  //     notify: true
  // });

  return {
    // Set the path from the root of the deploy domain
    // i.e, example.com + "/"
    pathPrefix: '/',

    // Set the src and output directories
    dir: dirs,

    // Set the default template engine from `liquid` to `njk`
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',

    // Set up eleventy to pass-through files to be compiled by Parcel
    passthroughFileCopy: true,
  }
}

function resolveNameFromPath(pth) {
  return path.basename(pth, '.js')
}
