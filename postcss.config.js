const path = require('path')

const siteRoot = path.resolve(__dirname)
const mainCssPath = path.join(siteRoot, 'assets', 'css', 'main.css')

// jekyll-postcss dev server always calls PostCSS with `{ from: undefined }` (see gem's bin/postcss),
// so Tailwind resolves `tailwindcss` from process.cwd() (often wrong). Pin the input path.
const fixJekyllPostcssFrom = {
  postcssPlugin: 'fix-jekyll-postcss-from',
  Once(_root, { result }) {
    if (!result.opts.from) {
      result.opts.from = mainCssPath
    }
  },
}

module.exports = {
  plugins: [
    fixJekyllPostcssFrom,
    require('@tailwindcss/postcss')({ base: siteRoot }),
    ...(process.env.JEKYLL_ENV == "production"
      ? [require('cssnano')({ preset: 'default' })]
      : [])
  ]
}
