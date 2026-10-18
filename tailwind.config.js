import typography from '@tailwindcss/typography';

/**
 * Tailwind reads every brand value from src/styles/tokens.css.
 * No colour, font, radius or shadow values live here — only names that point at tokens.
 */
const role = (name) => `rgb(var(--color-${name}) / <alpha-value>)`;

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
      // Bridge: prose still uses the old HSL variables until step 4.4 moves it onto tokens.
      typography: {
        DEFAULT: {
          css: {
            color: 'hsl(var(--foreground))',
            a: {
              color: 'hsl(var(--brand))',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            },
            h1: {
              color: 'hsl(var(--foreground))',
              fontWeight: '600',
            },
            h2: {
              color: 'hsl(var(--foreground))',
              fontWeight: '600',
            },
            h3: {
              color: 'hsl(var(--foreground))',
              fontWeight: '600',
            },
            strong: {
              color: 'hsl(var(--foreground))',
            },
            code: {
              color: 'hsl(var(--foreground))',
              backgroundColor: 'hsl(var(--muted))',
              padding: '0.25rem 0.375rem',
              borderRadius: '0.25rem',
              fontSize: '0.875em',
            },
            pre: {
              backgroundColor: 'hsl(var(--muted))',
              color: 'hsl(var(--foreground))',
            },
            blockquote: {
              borderLeftColor: 'hsl(var(--brand))',
              color: 'hsl(var(--muted-foreground))',
            },
          },
        },
      },
    },
  },
  plugins: [typography],
};
