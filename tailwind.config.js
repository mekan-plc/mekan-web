import typography from '@tailwindcss/typography';

/**
 * Tailwind reads every brand value from src/styles/tokens.css.
 * No colour, font, radius or shadow values live here — only names that point at tokens.
 */
const role = (name) => `rgb(var(--color-${name}) / <alpha-value>)`;
const rgb = (name, alpha = 1) => `rgb(var(--color-${name}) / ${alpha})`;

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        page: role('bg'),                 // bg-page
        surface: role('card'),            // bg-surface
        line: role('border'),             // border-line
        ink: role('text'),                // text-ink
        muted: role('muted'),             // text-muted
        heading: role('heading'),         // text-heading
        brand: {
          DEFAULT: role('brand'),         // text-brand (Navy → Sky in dark)
          surface: role('brand-surface'), // bg-brand-surface (always Navy)
        },
        'on-brand': {
          DEFAULT: role('on-brand'),      // text-on-brand
          accent: role('on-brand-accent'),// text-on-brand-accent (Sky)
          mark: role('on-brand-mark'),    // text-on-brand-mark (Sprout)
        },
        accent: role('accent'),           // text-accent (Green → Sprout in dark)
        focus: role('ring'),              // ring-focus, outline-focus
        'btn-secondary': role('btn-secondary-text'),
        'btn-primary': role('btn-primary-ring'),
        'logo-panel': role('logo-panel'),
        danger: role('danger'),           // text-danger, border-danger (form errors only)
        tint: {
          brand: role('tint-brand'),      // bg-tint-brand
          accent: role('tint-accent'),    // bg-tint-accent
        },
      },
      fontFamily: {
        sans: ['var(--mk-font-body)'],
        body: ['var(--mk-font-body)'],
        heading: ['var(--mk-font-heading)'],
      },
      // Type scale (guide §7): text-hero, text-h1 … text-eyebrow set size and line height together.
      fontSize: Object.fromEntries(
        ['hero', 'h1', 'h2', 'h3', 'stat', 'lead', 'body', 'small', 'eyebrow', 'button'].map((step) => [
          step,
          [`var(--mk-text-${step})`, { lineHeight: `var(--mk-leading-${step})` }],
        ]),
      ),
      borderRadius: {
        card: 'var(--mk-radius-card)',
        control: 'var(--mk-radius-control)',
      },
      transitionDuration: {
        fast: 'var(--mk-duration-fast)',
        reveal: 'var(--mk-duration-reveal)',
      },
      transitionTimingFunction: {
        out: 'var(--mk-ease-out)',
      },
      boxShadow: {
        soft: 'var(--mk-shadow-soft)',
        lift: 'var(--mk-shadow-lift)',
      },
      // Long-form CMS content (project and blog bodies). Colours come from role tokens, so
      // dark mode needs no prose-invert: the tokens already switch.
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': rgb('text', 0.85),
            '--tw-prose-headings': rgb('heading'),
            '--tw-prose-lead': rgb('muted'),
            '--tw-prose-links': rgb('accent'),
            '--tw-prose-bold': rgb('text'),
            '--tw-prose-counters': rgb('muted'),
            '--tw-prose-bullets': rgb('accent'),
            '--tw-prose-hr': rgb('border'),
            '--tw-prose-quotes': rgb('text'),
            '--tw-prose-quote-borders': rgb('accent'),
            '--tw-prose-captions': rgb('muted'),
            '--tw-prose-code': rgb('text'),
            '--tw-prose-pre-code': rgb('text'),
            '--tw-prose-pre-bg': rgb('tint-brand'),
            '--tw-prose-th-borders': rgb('border'),
            '--tw-prose-td-borders': rgb('border'),
            'h1, h2, h3, h4': {
              fontFamily: 'var(--mk-font-heading)',
              fontWeight: '600',
              letterSpacing: 'var(--mk-tracking-heading)',
            },
            a: {
              fontWeight: '500',
              textDecoration: 'none',
              textUnderlineOffset: '4px',
              '&:hover': { textDecoration: 'underline' },
            },
            blockquote: {
              fontStyle: 'normal',
              fontWeight: '400',
              borderLeftWidth: '2px',
            },
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:last-of-type::after': { content: 'none' },
            img: { borderRadius: 'var(--mk-radius-card)' },
            code: {
              backgroundColor: rgb('tint-brand'),
              padding: '0.125rem 0.375rem',
              borderRadius: '0.25rem',
              fontWeight: '500',
            },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            pre: { borderRadius: 'var(--mk-radius-control)' },
          },
        },
      },
    },
  },
  plugins: [typography],
};
