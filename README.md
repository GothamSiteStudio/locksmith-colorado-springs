# Locksmith Solutions LLC Static Site

This project replaces a heavy Wix source dump with a cleaner static site structure focused on:

- faster load time
- cleaner HTML and shared assets
- separate service pages for better SEO targeting
- separate service-area pages for local relevance
- easier maintenance on a local computer

## Structure

- `index.html`: homepage
- `assets/css/styles.css`: shared design system
- `assets/js/site.js`: shared header, footer, and reveal behavior
- `services/`: all service landing pages
- `service-areas/`: all area landing pages
- `about/` and `contact/`: support pages
- `robots.txt` and `sitemap.xml`: basic SEO files

## How To Keep It Clean

1. Keep design changes inside `assets/css/styles.css` instead of editing every page.
2. Keep navigation and footer changes inside `assets/js/site.js`.
3. When adding a new service, copy an existing file from `services/` and change only:
   - title
   - meta description
   - hero heading
   - local SEO copy
   - internal links
4. When adding a new area page, copy an existing file from `service-areas/` and localize the copy so it is not a duplicate.
5. Add every new page to `sitemap.xml`.

## Recommended Next Improvements

1. Add real project photos compressed for web use.
2. Add review snippets and proof blocks to key pages.
3. Add FAQ schema per important page.
4. Add a tracked contact form with source attribution.
5. Add Google Business Profile style location signals and service-specific testimonials.