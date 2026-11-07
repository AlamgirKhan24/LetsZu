# LetsZu motion system

Everything uses CSS transitions, CSS keyframes and one IntersectionObserver. No animation library.

## Tokens (`css/variables.css`)
| Token | Value | Used for |
|---|---|---|
| `--t-fast` | 220ms | hover, press, colour changes |
| `--t-ui` | 320ms | drawer, menus, toasts, button states, progress |
| `--t-reveal` | 600ms | scroll reveals |
| `--t-image` | 600ms | image zoom and photo fade-ins |
| `--t-intro` | 800ms | hero entrance only |
| `--ease` | cubic-bezier(.22,.8,.24,1) | every transition |
| `--stagger` | 70ms | step between siblings that reveal together |

## Rules
1. Animate only `transform` and `opacity` (reveals use the `translate` property so hover transforms are never overridden).
2. Hover movement lives inside `@media (hover:hover) and (pointer:fine)`. Colour changes and focus styles are not gated.
3. Looping animation only for loaders (spinner, image skeleton). Nothing decorative loops.
4. `prefers-reduced-motion: reduce` switches every animation and transition off (`css/animations.css`), shows reveals immediately and stops the hero parallax.
5. Content is never hidden by default. Hidden states only apply under `html.reveal-ready`, which `scroll-reveal.js` adds itself. Without JavaScript, or if it fails, everything stays visible. The `<noscript>` blocks give navigation and an explanation on pages that need JavaScript.

## Patterns
- **Scroll reveal:** add `class="reveal"` to a block. `main .section-head` is tagged automatically. In-view elements show at once (static content) or animate in (freshly rendered content); the rest reveal as they scroll in. Siblings stagger automatically (max 4 steps). Re-rendered grids (filtering, searching) appear instantly to avoid flicker.
- **Hover:** cards lift 4px with a soft shadow, card images zoom 5%, category tiles zoom 6%, buttons rise 1px, links and nav items underline.
- **Press feedback:** every control scales to 96% while pressed (one rule at the end of `components.css`).
- **Button states:** `LZ.addState(btn, 'loading' | 'success' | 'error')` on product cards.
- **Images:** card images fade in after a skeleton; photo blocks (`data-photo`) and category tiles fade in once the image has loaded; failed images keep a colour placeholder.
- **Smooth scrolling:** `html{scroll-behavior:smooth}` with `scroll-padding-top` for the fixed header (off under reduced motion).

## Deliberately not animated
Body text, forms, legal pages, the header (apart from its scroll colour change), prices, tables, and anything already on screen when the page loads (except the hero entrance and first-time product grids).
