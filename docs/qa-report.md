# LetsZu QA audit

Tested in headless Chromium at 360, 390, 768, 1024 and 1440 px wide with axe-core (WCAG 2.0/2.1 A and AA plus best practices), Playwright browser tests, and Node unit tests. Test photos were stand-in images and fonts were system fallbacks.

## Fixed
| Area | Issue | Fix |
|---|---|---|
| Layout | Product page scrolled sideways on phones (`row g-5` gutter wider than the container padding). | `g-4 g-lg-5`. No page overflows at any tested width. |
| Layout | Product page and Our Story were one very tall column on tablets. | Two columns from 768 px. |
| Code | Two `LZ.footer` definitions; the old file loaded last, so the improved footer was never live. | One footer in `js/components/footer.js`. |
| Dead code | `lz_user` and `lz_news` saved visitors' emails to localStorage but nothing read them. | Removed. Forms now say they are demos and store nothing. |
| Dead UI | Mobile bottom-nav "Cart" was a `href="#"` link. | Real button. |
| Dead code | `newsletter.js` duplicated the submit handler. | Single handler in `form-validation.js`. |
| Accessibility | Gold text failed contrast (4.3:1). | Darker `--gold-2` (5.6:1). |
| Accessibility | Links inside text relied on colour only. | Underlined. |
| Accessibility | Heading order skipped levels (footer, collections, FAQ, shop cards, filters panel). | h2 where needed. |
| Accessibility | Small tap targets (footer links, breadcrumb, hero cue, card titles). | Padding added. |
| Forms | No `autocomplete`, errors not tied to fields, focus stayed on the button. | `autocomplete`, `aria-describedby`, `aria-invalid` (live), focus first error. |
| Filtering | Price filter used a different size than the price shown on the card; slider could reach an empty range; invalid `?cat=` showed nothing. | Uses the displayed price, slider range from real data, invalid category falls back to all. Filters button shows how many are active. |
| Images | A failed hero photo left a broken-image icon and alt text. | Hidden on error (the dark background remains). |
| SEO | Short or generic descriptions, no social tags, no favicon, utility pages indexable. | Unique titles and 70-160 character descriptions on all 18 pages, Open Graph and Twitter tags, inline favicon, `noindex` on cart, checkout, login, sign up, wishlist and 404. Product pages update title and tags per product. |
| Content | Legal pages said the store collects names, emails and delivery details. | Rewritten to match what the demo does. |

## Verified working
All 274 internal links resolve. 22 distinct control types were clicked and each does something. Six nav links, mobile menu (open, Escape to close) and bottom nav. Category chips, search, no-results state, three sorts, caffeine and price filters, reset, deep links. Contact, sign up, log in, newsletter and checkout forms. Cart, wishlist and storage persistence. Image-failure fallback. Console: no JavaScript errors on any page.

## Still needs manual testing
1. **Real devices:** Safari on iPhone (safe-area padding under the bottom bar, `100svh` hero, `inert` drawer), Firefox, and Android Chrome.
2. **Real fonts and photos:** Fraunces and Figtree change line breaks, and the Unsplash hero crop and focal point need an eye.
3. **Screen reader pass** (VoiceOver or NVDA): cart drawer, quick view, filters panel, toasts and Undo.
4. **Served over HTTPS** (for example Netlify): Lighthouse performance, CDN loading, and localStorage behaviour in private windows.
5. **Business content:** shipping time and cost, 30-day returns, delivery estimate, the Peshawar chai line, legal text, and the Open Graph image (currently an Unsplash photo; use your own brand image).
6. **Before launch:** a canonical URL, `sitemap.xml`, `robots.txt` and real social links (`LZ.config.social`) need your domain.
