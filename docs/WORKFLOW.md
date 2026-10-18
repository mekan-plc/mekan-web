# Mekan Web — Brand Refresh Workflow

> **AI sessions: read this whole file and [BRAND_GUIDELINES.md](BRAND_GUIDELINES.md) before touching code.**
> Work on the first unchecked step only. When it's done and verified, tick it, add the date and a one-line note, update **Current status**, and stop for review.

## Current status

**Next step:** 2.1 · **Last updated:** 2026-10-19 · **Phase:** 2 · Global shell

---

## What we are doing

Making the public website as beautiful as it can be, built entirely on the **Mekan Brand Guidelines** (colours, fonts, cards, spacing, voice), without making anything worse. Logo, photos and page content stay as they are.

## How we do it

**One source of truth.** Every colour, font, radius, shadow and card style is defined once and everything else reads from it:

```
src/styles/tokens.css     ← the only place values live (brand + light/dark role tokens)
        ↓
tailwind.config.js        ← maps tokens to class names (bg-page, bg-surface, border-line, text-ink, text-muted,
                             text-heading, text-brand, bg-brand-surface, text-on-brand(-accent|-mark),
                             text-accent, ring-focus, bg-tint-brand/-accent, font-heading, font-body,
                             rounded-card, rounded-control, shadow-soft, shadow-lift,
                             text-hero, text-h1, text-h2, text-h3, text-stat, text-lead, text-body,
                             text-small, text-eyebrow)
        ↓
src/styles/global.css     ← shared components built from tokens (.card, .btn, .eyebrow, .input…)
        ↓
components + pages        ← use those classes only. No hex codes, no font names, no ad-hoc dark: colours.
```

Changing a value in `tokens.css` must change it everywhere. If a page needs a style that doesn't exist, add it to the token/component layer, not to the page.

**Token format.** Raw palette tokens are `--mk-*` and role tokens are `--color-*` (e.g. `--color-brand: var(--mk-navy);`). Both are stored as RGB channels (e.g. `--mk-navy: 15 44 89;`) and used in Tailwind as `rgb(var(--color-brand) / <alpha-value>)`, so opacity modifiers like `bg-brand/10` keep working.

**Compatibility bridge.** The old HSL variables in `global.css` (`--background`, `--brand`, `--accent`…, used about 680 times as `hsl(var(--x))`) stay untouched while pages are migrated, so nothing breaks mid-refresh. Each Phase 2–4 step moves its files onto the new tokens; step 5.1 deletes the old variables once nothing uses them.

## Rules for every step

1. Follow [BRAND_GUIDELINES.md](BRAND_GUIDELINES.md). If code and guide disagree, the guide wins. If the guide doesn't cover it, ask.
2. One step at a time. Keep each step small enough to review.
3. Do not change the logo, photos, page copy or CMS logic (except the naming fixes in step 5.3).
4. Before ticking a step: `npm run build` passes, and the changed pages are checked in the browser in **light and dark mode**, at **phone (375 px) and desktop** widths.
5. Work on the `brand-refresh` git branch. Never commit to `main`, push or deploy without the user's approval.
6. If a step makes something look worse, stop and report it. Don't push through.

---

## Plan

### Phase 0 · Safety and baseline
- [x] **0.1** Create the `brand-refresh` branch. Confirm `npm run dev` and `npm run build` work. *(2026-10-19: done; local CMS was offline, so pages used fallback content)*
- [x] **0.2** Take "before" screenshots of every page (light and dark, phone and desktop) into `docs/screenshots/before/` for comparison. *(2026-10-19: 60 shots via `scripts/screenshots.mjs`; project/blog detail pages skipped, need the CMS)*

### Phase 1 · Token foundation (the single source)
- [x] **1.1** Create `src/styles/tokens.css`: brand colours, neutrals, tints, dark surfaces (guide §6), and the light/dark **role tokens** table (guide §15). Import it first in `global.css`. *(2026-10-19: done; old HSL variables kept as a bridge)*
- [x] **1.2** Rewire `tailwind.config.js`: colours from role tokens, `font-heading` (Source Serif 4) and `font-body` (Inter), radii (card 16 px, control 10 px), shadows. Remove the old gold `--accent` and the unused Fraunces setup. *(2026-10-19: done; gold `--accent` and the Fraunces font link moved to 3.5, because Testimonials still uses them)*
- [x] **1.3** Load fonts in `Layout.astro`: Source Serif 4 (500, 600) and Inter (400, 500, 600) with `display=swap`. Keep Fraunces in the font link until 3.5. Set base styles: body = Inter, h1–h3 = Source Serif 4, sizes and line heights from the website type scale (guide §7). *(2026-10-19: done)*
- [x] **1.4** Build the shared component classes in `global.css` from tokens only: `.card`, `.btn-primary`, `.btn-secondary`, `.btn-on-navy`, `.link`, `.eyebrow`, `.section-title`, `.lead`, `.input`, `.badge`, `.brand-band`, focus rings, reduced-motion handling (guide §9). *(2026-10-19: done; preview at `/kit-preview`)*

### Phase 2 · Global shell
- [ ] **2.1** `Layout.astro`: page background, scroll progress bar, back-to-top button, theme init.
- [ ] **2.2** `Navbar.astro` + `ThemeToggle.astro`.
- [ ] **2.3** `Footer.astro` (service short names from guide §12).
- [ ] **2.4** `CTASection.astro` (navy brand band, frame grid lines).

### Phase 3 · Homepage (`src/pages/index.astro`), one section per step
- [ ] **3.1** Hero (navy, Sky highlight line, buttons) + `PartnersMarquee.astro`. Move the headline to `text-hero` (it is 48 px / 6 lines on phones now; the guide says 38–42 px)
- [ ] **3.2** About + stats
- [ ] **3.3** Services cards
- [ ] **3.4** Projects cards
- [ ] **3.5** Testimonials (`Testimonials.astro`, `TestimonialMedia.astro`): replace gold accent and Fraunces with brand tokens, then delete `--accent`/`--accent-foreground` from `global.css` and Fraunces from the font link in `Layout.astro`
- [ ] **3.6** Blog cards
- [ ] **3.7** Contact section and form (inputs, country picker, errors, success state)

### Phase 4 · Inner pages
- [ ] **4.1** `about.astro`
- [ ] **4.2** `services/[id].astro`
- [ ] **4.3** `projects/index.astro` + `projects/[slug].astro`
- [ ] **4.4** `blog/index.astro` + `blog/[slug].astro` (prose styles from tokens)
- [ ] **4.5** `resources/index.astro`
- [ ] **4.6** `privacy-policy.astro` + `terms-of-service.astro`
- [ ] **4.7** `404.astro` + `500.astro`

### Phase 5 · Clean-up
- [ ] **5.1** Delete the old HSL bridge variables from `global.css`. Search `src/` for leftover hex codes, `#7EA2CE`/`#0F2C59`, `slate-`/`gray-` colours and hand-written `dark:` colour classes. Target: **zero** outside `tokens.css`.
- [ ] **5.2** Remove dead CSS (duplicate reveal styles in `Layout.astro` and `global.css`, unused Lenis styles, unused classes). Delete the temporary `src/pages/kit-preview.astro`.
- [ ] **5.3** Naming per guide §4 and §12: consistent company name and service names across nav, footer, titles and meta tags.

### Phase 6 · Signature touches *(only after the user approves Phases 1–5)*
- [ ] **6.1** Propose where to use the frame element (guide §8): offset frame on one hero or about image, corner marks on key numbers. Show a preview first, apply only once approved.

### Phase 7 · Final QA
- [ ] **7.1** Every page in light and dark, at 375 px, 768 px and 1280 px+. Compare with the "before" screenshots.
- [ ] **7.2** Contrast check (guide §6), keyboard focus visible, reduced motion respected, alt text present.
- [ ] **7.3** `npm run build` clean, Lighthouse run on home page. Write a short summary for the user, then wait for approval to merge and deploy.

---

## Log

Add one line per finished step, newest first: `YYYY-MM-DD · step · what changed · files`.

- 2026-10-19 · 1.4 · Component layer rebuilt from tokens only: `.card` (+ `.card-interactive` hover lift), `.btn` (44 px, 15 px SemiBold, 10 px radius) with `.btn-primary`, `.btn-secondary` (green outline; Sprout outline + light text in dark), `.btn-on-navy`, `.link`, `.eyebrow`, `.section-title`, `.lead`, `.input` (textarea too), `.badge`/`.badge-brand`, `.brand-band` (children switch to on-navy colours through low-specificity `:where`). Global `:focus-visible` ring (Navy; Sky in dark and on bands); reduced-motion block turns off transitions/animations and shows reveal/AOS content. New tokens: button size, motion (`duration-fast`, `duration-reveal`, `ease-out`), `--color-btn-secondary-text`, `--color-btn-primary-ring`. Removed unused `.card-muted`, `.btn-brand`, `.btn-brand-outline`. Visible now: 2 existing cards lose their resting shadow; the homepage "View all" buttons are green outlines; the services-page button is the new navy primary. Guide gap: no error/danger colour, so the contact form keeps `red-500` until we agree one (3.7). Temporary preview page at `/kit-preview` (delete in 5.2). Build passes; checked light/dark with keyboard focus and hover; full screenshot set re-run · `src/styles/global.css`, `src/styles/tokens.css`, `tailwind.config.js`, `src/pages/kit-preview.astro`

- 2026-10-19 · 1.3 · Fonts: Inter 400/500/600 + Source Serif 4 (opsz, 500–600) with `display=swap`; Fraunces kept until 3.5; Inter 700 dropped (existing `font-bold` now renders at 600, as the guide asks). Type scale added as fluid `--mk-text-*` / `--mk-leading-*` tokens (375 → 1280 px) and exposed as `text-hero` … `text-eyebrow`. Base: body = `font-body text-body` (line height 1.65); h1–h3 = Source Serif 4 SemiBold, -0.01em tracking, balanced wrapping, default sizes `text-h1/h2/h3`. Every existing heading still has its own size class, so only the typeface changed; colours are untouched. Dev server needs a restart after `tailwind.config.js` changes. Checked home + privacy at 375 px and desktop, light and dark · `src/layouts/Layout.astro`, `src/styles/global.css`, `src/styles/tokens.css`, `tailwind.config.js`

- 2026-10-19 · 1.2 · `tailwind.config.js` now only names tokens: role colours as `rgb(var(--color-*) / <alpha-value>)` (opacity modifiers work, e.g. `bg-brand/10`), `font-heading`/`font-body` (and `font-sans`) from `--mk-font-*`, `rounded-card`/`rounded-control`, `shadow-soft`/`shadow-lift` (new shadow tokens in `tokens.css`). The focus colour is `focus` (`ring-focus`) to avoid `ring-ring`. Removed the unused `font-display` Fraunces family; switched to ESM `import` for the typography plugin. Prose styles still use the old HSL bridge until 4.4. Gold `--accent` and the Fraunces font link stay until 3.5, because Testimonials uses them directly. Build passes; every new class checked in generated CSS; the homepage looks the same · `tailwind.config.js`, `src/styles/tokens.css`

- 2026-10-19 · 1.1 · Added `tokens.css`: raw `--mk-*` palette, fonts and radii, plus `--color-*` role tokens for light and `.dark` (guide §15 table, plus on-brand text/accent/mark and tint roles). Imported first in `global.css`. Old HSL variables left in place as a bridge, so the site looks exactly the same. Guide gap: tints are light-mode only, so dark mode falls back to the card surface for now. Build passes; values checked in the browser in light and dark · `src/styles/tokens.css`, `src/styles/global.css`

- 2026-10-19 · 0.2 · 60 full-page "before" shots (15 pages × light/dark × 1440 px desktop / 375 px phone), named `<page>--<viewport>--<theme>.jpg`. Captured by `scripts/screenshots.mjs` (headless Chrome, forces scroll animations visible); re-run it into `docs/screenshots/after/` in step 7.1. Not captured: single project/blog pages (CMS offline). The CMS was offline, so the footer copyright shows "Digital Aksumite" (the `mekan_da_fallback` behaviour) · `docs/screenshots/before/`, `scripts/screenshots.mjs`
- 2026-10-19 · 0.1 · `brand-refresh` branch created from `main`; `npm run build` passes, `npm run dev` serves the homepage on :4321. Local CMS (`mekan-cms.local`) was offline, so projects/blogs used fallback content and the browser logged one connection-refused error from the CMS check · no source files changed
- 2026-10-19 · docs · Brand guideline (MD + Word) and this workflow written · `docs/`
