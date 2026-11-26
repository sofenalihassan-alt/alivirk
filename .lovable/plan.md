# New portrait, retuned palette, magnetic CTAs, count-ups and a full motion pass

## 1. New portrait used creatively
- Replace the blue-kurta photo everywhere with the new black-suit portrait (uploaded as a new CDN image, old one removed).
- Home hero: a "lens" composition. The portrait sits full-bleed on the right, fading into the midnight background, with a slow scroll parallax and a soft light sweep that passes across the glasses once on load.
- On pointer devices, a subtle tilt/depth shift follows the cursor; a frosted caption keeps "ICT Apprentice · FFC Port Qasim".
- About page: a second, tighter crop (face and glasses) as an editorial side portrait, revealed with a clip-mask wipe.
- Alt text updated to describe the suit portrait.

## 2. Colours and shadows retuned to the new photo
The photo is black suit, white shirt, cool grey wall, and a blue-violet tint in the glasses. The warm gold no longer matches.
- Background: stays deep midnight, nudged slightly cooler (charcoal-blue like the wall).
- New accent: "lens indigo" (a soft electric blue-violet taken from the glasses), with a light silver/ice tone for highlights, replacing champagne gold.
- Glows, focus rings, selection colour, gradients, sheen and button shadows all switch to the new accent; shadows become cooler and deeper.
- Done in one place in the design system, so every page updates together. Brand memory updated to the new palette.

## 3. Magnetic pull and count-ups
- Magnetic pull, tuned stronger, on the main buttons: "Get in touch / Let's Connect", "Explore Skill Serve / Explore My Work", "Visit live site", and on arrow buttons (project arrows, back-to-top, expand triggers).
- The arrow icon inside each button moves a little further than the button for a layered feel.
- Academic milestones count up with spring physics when scrolled into view: 1st, 2,125 / 2,250, 4th in Board. Real final values are in the page from the start, so nothing is hidden or faked.

## 4. Motion-design pass across the site
- Page transitions: a short accent-coloured curtain sweep between pages, content rising in with a slight blur; the first load still uses the intro screen.
- Scroll storytelling: section titles reveal line by line from a mask; the journey timeline line draws itself as you scroll; the hero name drifts and fades as you scroll away.
- Typography reveals: headings split into words with staggered rise; italic serif words get a delayed accent shimmer.
- Interactive elements: hover states on links and rows get a sliding underline and accent fill; skill rows and project items lift with a soft shadow; the cursor gets a small accent follower on desktop only.
- Background motion: slow drifting light fields in the new accent, very low opacity, paused when the tab is hidden.
- Mobile: no cursor follower or tilt, lighter blur, shorter durations, no parallax on small screens.
- Reduced motion: all movement, count-ups, parallax and sweeps switch off; content appears immediately with final numbers.

## Technical details
- New pointer from `lovable-assets create` for the upload; delete the old portrait pointer after references move.
- Tokens in `src/styles.css`: replace `--gold*` values (keep token names or rename to `--accent-*` with aliases) and update `--shadow-*`, `--gradient-*`, `::selection`.
- New `CountUp` motion component (useSpring + useInView, renders final value in SSR); `Magnetic` gets an inner-element offset; `PageTransition`, `Reveal`, `SplitText`, `Ambient`, `Timeline`, `HeroObject` updated; `MotionConfig reducedMotion="user"` kept.
- Verify with Playwright at 390px and 1440px, plus a reduced-motion run; run existing tests.
