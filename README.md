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

## Google Reviews Sync

The homepage now loads reviews from `assets/data/google-reviews.json`.

To keep API credentials out of the frontend, sync the data locally first and let the site read the JSON file:

1. Copy `.env.local.example` to `.env.local`
2. Put your real values in `.env.local`

Google Places API mode:
   - Set `GOOGLE_PLACES_API_KEY`
   - Set `GOOGLE_PLACE_ID`

Custom endpoint mode:
   - Set `GOOGLE_REVIEWS_ENDPOINT`
   - Optionally set `GOOGLE_REVIEWS_HEADERS` to a JSON object string such as `{"Authorization":"Bearer ..."}`

Then run:

```bash
python _sync_google_reviews.py
```

That command writes the latest normalized review data into `assets/data/google-reviews.json` for the homepage reviews section.

Example `.env.local`:

```env
GOOGLE_PLACE_ID=ChIJr8kfZN7vwogRIRvm9Kjuk7g
GOOGLE_PLACES_API_KEY=your-real-api-key
```