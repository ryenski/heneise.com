# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website (heneise.com) built with Jekyll static site generator, Tailwind CSS v4, and PostCSS. Deployed to GitHub Pages automatically on push to master branch.

## Common Commands

### Development Setup
```bash
bundle install        # Install Ruby gems (Jekyll + plugins)
npm install           # Install Node dependencies (Tailwind, PostCSS, Prettier)
```

### Building & Serving
```bash
bundle exec jekyll serve              # Start dev server at http://localhost:4000
bundle exec jekyll serve --livereload # Dev server with live reload
bundle exec jekyll build              # Build static site to _site/
JEKYLL_ENV=production bundle exec jekyll build  # Production build (runs cssnano)
```

### Code Quality
```bash
npx prettier --write .                # Format all files (HTML, Liquid, CSS, JS)
npx prettier --check .                # Check formatting without changes
```

### Testing & Verification
There are no automated tests in this project. Verify changes by:
1. Running `bundle exec jekyll serve --livereload`
2. Viewing at `http://localhost:4000`
3. Testing all pages and links manually

## Project Structure

```
_layouts/              # HTML + Liquid templates
  └── default.html     # Main layout used by all pages
  └── post.html        # Individual post layout
  └── posts.html       # Posts listing layout

assets/css/
  ├── main.css         # Tailwind v4 entry point (@import "tailwindcss")
  ├── site-custom.css  # Custom CSS overrides (uses Flexoki color palette)
  └── flexoki.css      # Flexoki theme colors

_posts/                # Blog posts (Jekyll collection)
*.md                   # Content pages (index.md, resume.md, now.md)

_config.yml            # Jekyll configuration (plugins, site metadata)
postcss.config.js      # PostCSS pipeline: Tailwind → autoprefixer → cssnano (prod only)
.prettierrc            # Prettier config with Shopify liquid-html plugin
```

## Architecture & Build System

### Jekyll + PostCSS Pipeline

1. **Jekyll** reads Markdown content and Liquid templates
2. **jekyll-postcss plugin** intercepts CSS processing:
   - Runs `main.css` through PostCSS pipeline
   - Tailwind v4 scans `_layouts/` and `*.md` for class names
   - Autoprefixer adds vendor prefixes (dev & prod)
   - cssnano minifies CSS (production only)
3. **jekyll-inline-svg plugin** allows `{% svg %}` tags for SVG embedding
4. Output written to `_site/` directory

### CSS Architecture

- **main.css**: Imports Tailwind v4 with `@import "tailwindcss"`. No tailwind.config.js needed; Tailwind v4 auto-discovers content paths from PostCSS config
- **site-custom.css**: Custom CSS that overrides Tailwind (e.g., Flexoki colors, typography). Imported after Tailwind in default layout
- **flexoki.css**: Color palette using Flexoki theme (GitHub dark palette); imported in `_layouts/default.html`

Tailwind scans these paths for class discovery:
- `_layouts/**/*.html`
- `*.md` files in root

### CSS Output

Development build produces uncompressed CSS with source maps. Production build uses cssnano to minify and optimize.

## Key Files & Dependencies

**Ruby (Gemfile)**:
- `jekyll` - Static site generator
- `jekyll-postcss` - PostCSS integration
- `jekyll-inline-svg` - SVG embedding
- `jekyll-compose` - Draft & post scaffolding
- Standard library gems (base64, csv, json, rexml, bigdecimal) required for Ruby 3.4+

**Node (package.json)**:
- `@tailwindcss/postcss@4.2.2` - Tailwind CSS v4 (CSS-first approach)
- `@tailwindcss/typography` - Typography plugin
- `postcss@8.5.9` - CSS processing
- `cssnano@7.1.4` - CSS minification (production only)
- `prettier@3.7.4` + `@shopify/prettier-plugin-liquid` - Code formatting

**Runtime**:
- Ruby 3.4.7 (specified in `.ruby-version`, managed by Mise)
- Node 20.x (specified in GitHub Actions workflow)

## Deployment

**Automatic**: GitHub Actions workflow (`.github/workflows/jekyll.yml`) triggers on push to `master`:
1. Checks out code
2. Installs Ruby gems via Bundler
3. Installs Node dependencies
4. Builds with `JEKYLL_ENV=production bundle exec jekyll build`
5. Deploys `_site/` to GitHub Pages

No manual deployment needed. Push to master = live.

## Development Notes

### Live Reload
Use `bundle exec jekyll serve --livereload` for development. Changes to:
- Markdown files trigger rebuild
- Liquid templates trigger rebuild
- CSS/JS changes are reflected via LiveReload
- Changes appear within 1-2 seconds

### CSS Debugging
If Tailwind classes don't work:
1. Check that classes are in layouts or markdown files (Tailwind scans these)
2. Run `bundle exec jekyll build` to see PostCSS warnings
3. Verify `@import "tailwindcss"` is at top of `assets/css/main.css`
4. Check that site-custom.css is imported *after* Tailwind in `_layouts/default.html`

### Adding Pages
1. Create `.md` file in root (e.g., `new-page.md`)
2. Add Jekyll front matter:
   ```yaml
   ---
   layout: default
   title: Page Title
   ---
   ```
3. Content becomes a route (`/new-page/`)

### Adding Posts
Use `bundle exec jekyll compose "Post Title"` or manually create `_posts/YYYY-MM-DD-slug.md` with front matter.

## Recent Project History

- **Flexoki theme**: Site uses Flexoki GitHub dark color palette (see `assets/css/flexoki.css`)
- **Tailwind v5→v7 cssnano**: Upgraded cssnano to fix broken responsive centering
- **Current navigation**: Highlights active nav item based on current page
- **Contact info**: Updated on master branch

