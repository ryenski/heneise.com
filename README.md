# heneise.com

Personal website for Ryan Heneise, built with Jekyll and Tailwind CSS.

## Tech Stack

- **Jekyll** - Static site generator
- **Tailwind CSS** - Utility-first CSS framework
- **PostCSS** - CSS processing with autoprefixer and cssnano
- **jekyll-postcss** - Jekyll plugin for PostCSS integration
- **jekyll-inline-svg** - Jekyll plugin for inline SVG support

## Prerequisites

Before you begin, ensure you have the following installed:

- **Ruby** (3.1 or compatible version)
- **Bundler** (`gem install bundler`)
- **Node.js** (16.x or compatible version)
- **npm** (comes with Node.js)

## Using Mise (Optional)

This project includes a `.ruby-version` file that specifies the Ruby version. If you use [Mise](https://mise.jdx.dev/) (formerly rtx) for managing runtime versions, it will automatically detect and install the correct Ruby version when you enter the project directory.

### Setup with Mise

1. **Install Mise** (if not already installed)
   ```bash
   curl https://mise.run | sh
   ```

2. **Install project runtimes**
   ```bash
   mise install
   ```
   This will automatically install Ruby 3.1.5 (as specified in `.ruby-version`).

3. **Activate the environment**
   ```bash
   mise activate
   ```
   Or if you're using a shell that supports automatic activation, Mise will activate when you `cd` into the project directory.

Mise will automatically manage the Ruby version for this project, so you don't need to manually install or switch Ruby versions. You can also add a `.node-version` file if you want Mise to manage Node.js versions as well.

## Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd heneise.com
   ```

2. **Install Ruby dependencies**
   ```bash
   bundle install
   ```

3. **Install Node.js dependencies**
   ```bash
   npm install
   ```

4. **Build the site locally**
   ```bash
   bundle exec jekyll build
   ```

5. **Serve the site locally**
   ```bash
   bundle exec jekyll serve
   ```

   The site will be available at `http://localhost:4000`

   For live reload during development, you can use:
   ```bash
   bundle exec jekyll serve --livereload
   ```

## Project Structure

```
heneise.com/
├── _config.yml          # Jekyll configuration
├── _layouts/            # HTML layouts
│   └── default.html
├── _sass/               # Sass stylesheets
│   └── custom.scss
├── assets/              # Static assets
│   ├── css/            # Compiled CSS
│   └── images/         # Image files
├── index.md            # Homepage
├── resume.md           # Resume page
├── now.md              # Now page
├── Gemfile             # Ruby dependencies
├── package.json        # Node.js dependencies
└── tailwind.config.js  # Tailwind CSS configuration
```

## Development Workflow

1. Make changes to your Markdown files (`.md`) or HTML layouts
2. Edit Tailwind classes directly in your HTML/Markdown files
3. The CSS will be automatically processed by PostCSS during Jekyll build
4. View changes at `http://localhost:4000` (with `--livereload` for automatic refresh)

## Building for Production

To build the site for production:

```bash
JEKYLL_ENV=production bundle exec jekyll build
```

The built site will be in the `_site/` directory.

## Deployment

This site is configured to deploy automatically to GitHub Pages via GitHub Actions when changes are pushed to the `master` branch. The workflow:

1. Installs Node.js and Ruby dependencies
2. Builds the Jekyll site
3. Deploys to GitHub Pages

See `.github/workflows/jekyll.yml` for the complete deployment configuration.

## Configuration

Key configuration files:

- **`_config.yml`** - Jekyll site configuration, plugins, and settings
- **`tailwind.config.js`** - Tailwind CSS configuration and content paths
- **`postcss.config.js`** - PostCSS plugins (autoprefixer, cssnano)

## Plugins

- `jekyll-postcss` - Processes CSS with PostCSS during Jekyll build
- `jekyll-inline-svg` - Allows inline SVG embedding with `{% svg %}` tag

## License

[Add your license here if applicable]

