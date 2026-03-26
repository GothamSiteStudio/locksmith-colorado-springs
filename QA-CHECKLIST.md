# QA Audit Checklist

Full accessibility and visual audit completed on all 25 pages.
Tools used: html-validate, axe-core, Playwright, broken-link-checker.

---

## High Priority (Accessibility)

- [x] **1. `.mobile-cta-bar` missing landmark role**
  - Issue: Element is not contained within a landmark region (axe: `region`)
  - Affects: All 25 pages
  - Fix: Add `role="region"` and `aria-label="Quick contact"` in `assets/js/site.js` line 379
  - Single fix covers all pages

- [x] **2. Heading order violated (h3 before h2)**
  - Issue: `<h3>` appears before `<h2>` in content sections (axe: `heading-order`)
  - Affects: 3 pages (car-lockout, car-key-replacement, transponder-key-programming)
  - Fix: Changed all standalone h3 tags to h2 in content-grid sections

- [ ] **3. `<aside>` nested inside `<section>`**
  - Issue: Complementary landmark (`<aside>`) is nested inside another landmark (axe: `landmark-complementary-is-top-level`)
  - Affects: `index.html` line 104 (hero section)
  - Fix: Change `<aside class="hero-panel">` to `<div class="hero-panel">` or restructure so aside is top-level

---

## Medium Priority (SEO + HTML Validation)

- [ ] **4. Inline styles in index.html**
  - Issue: 4 inline `style` attributes (html-validate: `no-inline-style`)
  - Location: `index.html` lines 228, 231, 232, 235
  - Elements: `div style="margin-top:1.5rem"` (x2), `a style="color:inherit"` (x2)
  - Fix: Move styles to `assets/css/styles.css` with proper class names

- [ ] **5. Title tags exceed 70 characters**
  - Issue: Page titles too long for optimal SEO display (html-validate: `long-title`)
  - Affects: 7 pages
  - Pages and current titles:
    - `service-areas/index.html`
    - `services/business-lockout.html`
    - `services/house-lockout.html`
    - `services/lock-installation-repair.html`
    - `services/panic-bar-installation.html`
    - `services/smart-lock-installation.html`
    - `services/transponder-key-programming.html`
  - Fix: Shorten each title to 60-70 characters max

- [ ] **6. Phone numbers missing non-breaking formatting**
  - Issue: Phone numbers can break across lines (html-validate: `tel-non-breaking`)
  - Affects: Most pages (majority of the 61 html-validate errors)
  - Fix: Replace spaces with `&nbsp;` and hyphens with `&#8209;` in displayed phone numbers

---

## Low Priority

- [ ] **7. Missing favicon**
  - Issue: `favicon.ico` returns 404 (Playwright console error)
  - Affects: All pages
  - Fix: Add favicon file and `<link rel="icon">` tag in each page head

---

## Passed Checks

- [x] All images load correctly (189+ images verified)
- [x] All images have alt text
- [x] 0 broken internal links (313 links checked)
- [x] Responsive layout renders correctly (mobile 375px + desktop 1440px)
- [x] Skip-to-content link present
- [x] ARIA attributes on nav toggle correct
- [x] FAQ accordion accessibility attributes correct
- [x] Schema markup (JSON-LD) present and valid
- [x] Canonical URLs set
- [x] Open Graph and Twitter meta tags present
