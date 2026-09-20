# Cloud & DevOps portfolio archive

Personal projects and technical articles by Rayane Kadi, preserved as a static Astro site. The website content is in English.

## Local development

Install Node.js LTS (including npm), then run:

```sh
npm ci
npm run dev
```

Open the local URL printed in the terminal. Press Ctrl+C to stop the server.

## Production check

```sh
npm run build
npm run preview
```

The generated website is in `dist/`. Dependencies and generated output are excluded from Git.

## Content

- Articles and their images: `src/content/blog/`
- Homepage sections: `src/components/`
- Public assets: `public/`
- Site address and sitemap: `astro.config.mjs`

The public address is `https://eenayar.github.io`. The GitHub Actions workflow in `.github/workflows/deploy.yml` builds and publishes the site whenever changes are pushed to `main`. In the repository settings, GitHub Pages uses GitHub Actions as its source.

Original GitHub project repositories are no longer available. Article notices explain this; the existing GitLab project link is retained. Historical code examples are preserved for context.
