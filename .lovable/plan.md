# Finish the mobile/tablet pass (gold and sand palette kept)

## 1. Check what was already changed
- Screenshot every page (Home, About, Expertise, Projects, a project page, Experience, Learning, Contact, 404) at 360, 390, 768, 1280 and 1440px to confirm the gold colours and phone hero landed correctly, with no sideways scrolling.

## 2. Remaining phone layouts
- Expertise: skill rows stack as full-width tap rows; filters become a swipeable strip.
- Learning: stage switcher becomes a horizontal swipe selector above the dossier.
- Project detail: side column moves under the main content.
- Contact: WhatsApp and email become large full-width buttons; fields full width.

## 3. Tablet (768-1023px)
- Own two-column arrangements for Projects, About values/academics and Experience instead of phone or desktop layouts.

## 4. Navigation readability
- Menu links get a soft dark backing over the photo and turn into a solid bar after scrolling.

## 5. Motion on phones and reduced motion
- Shorter, lighter page transitions on small screens (no blur), no magnetic pull or hover lifts on touch.
- Reduced-motion run: everything visible immediately.

## 6. Verify and save
- Re-run screenshots at all sizes plus a reduced-motion run, run the existing tests, and save a restore point.

## Technical notes
- Breakpoint rules stay in `src/styles.css`; Magnetic gated by `(hover: hover) and (pointer: fine)`; PageTransition reads `matchMedia` after hydration to drop blur on mobile.
