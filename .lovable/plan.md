# Responsive audit + return to gold and sand palette

## 1. Bring back the gold and sand colours
- Restore the original champagne gold (#D6B875), soft sand highlight and deep bronze, plus the warmer midnight background used before.
- Re-tint every glow, shadow, selection colour, light sweep, background light and page curtain from indigo to warm gold/sand so nothing blue is left over.
- Keep the suit portrait; warm the edge shading around it so it blends with the gold tones.

## 2. Audit every page at four sizes
Pages: Home, About, Expertise, Projects, a project detail page, Experience, Learning, Contact, 404.
Sizes: mobile 390px (and 360px), tablet 768px, laptop 1280px, desktop 1440-1920px.
Check for sideways scrolling, clipped or oversized text, cramped spacing, overlapping photo/text, tap targets under 44px, menu behaviour, and animation jank. Screenshot before and after.

## 3. Mobile-first redesign (not shrunk desktop)
- Home: portrait becomes a framed vertical image placed after the name instead of a huge empty block; shorter hero; caption sits below the photo; menu links readable over the photo (solid bar on scroll).
- Big headings use fluid sizing so long words never overflow; tighter line-height on small screens.
- Ledgers (expertise, values, academics, education) become stacked rows with full-width tap areas; filters scroll horizontally as a swipeable strip.
- Projects: single column with no staggered offsets on mobile/tablet; detail page sidebar moves under the content.
- Learning stage switcher becomes a horizontal swipe selector on mobile.
- Contact: full-width fields, larger inputs (no iOS zoom, 16px text), WhatsApp/email as large buttons.
- Mobile menu: safe-area padding, larger links, closes on link tap, background scroll locked.
- Footer signature and invitation watermark scaled down so they never overflow.
- Tablet gets its own two-column arrangements rather than the phone or desktop layout.

## 4. Touch and motion
- Disable magnetic pull, tilt and hover lifts on touch devices; give buttons a press state instead.
- Shorter, lighter animations on mobile; reduce blur cost; reduced-motion users see everything instantly.

## 5. Verify
Re-run screenshots at all sizes plus a reduced-motion run; confirm no page scrolls sideways; run existing tests.

## Technical notes
- Palette changes only in `src/styles.css` tokens; update brand memory to the gold palette.
- Use `clamp()` for scale classes, `(hover: hover)` / `(pointer: fine)` gates for Magnetic and lifts, `env(safe-area-inset-*)` in header/menu.
