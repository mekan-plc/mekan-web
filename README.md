# Mekan Web — Public Website

**Modern, fast, SEO-optimized frontend for Mekan PLC.** Built with Astro, TailwindCSS, and decoupled from WordPress for performance and resilience.

---

## Overview

This is the public-facing website that visitors see. It is:

- **Fast** — Astro static generation with selective SSR
- **Modern** — TailwindCSS v3, smooth scroll (Lenis), scroll animations (AOS)
- **SEO-first** — Canonical URLs, OpenGraph/Twitter Cards, sitemap.xml, robots.txt, JSON-LD structured data
- **CMS-backed but resilient** — Shows static fallback content when WordPress is down
- **Decoupled** — Fetches content from WordPress REST API at build time and request time

The frontend never touches the WordPress database directly. All content comes through the WordPress REST API defined in `mekan-cms`.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Astro v6 |
| Styling | TailwindCSS v3 |
| Deployment | Vercel (static + SSR API routes) |
| Adapter | `@astrojs/vercel` |
| Animation | AOS (scroll animations) |
| Smooth scroll | Lenis |
| Icons | Lucide React |
| React | Enabled (interactive components) |
| TypeScript | Yes |

---

## Quick Start

### Local Development

```bash
npm install
cp .env.example .env      # fill in your local CMS URLs
npm run dev               # starts on http://localhost:4321
```

### Build for Production

```bash
npm run build             # outputs to dist/
npm run preview           # preview production build
```

---

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
# Public — safe to expose to the browser
PUBLIC_SITE_URL=https://mekanplc.com
PUBLIC_CMS_BASE_URL=https://cms.mekanplc.com

# Server-side only — never exposed to browser
WP_API_BASE=https://cms.mekanplc.com/wp-json/wp/v2
WP_ROOT_BASE=https://cms.mekanplc.com
WP_CACHE_TTL_SECONDS=60
```

### Local Development Override

```env
PUBLIC_SITE_URL=http://localhost:4321
PUBLIC_CMS_BASE_URL=http://localhost:8881
WP_API_BASE=http://localhost:8881/wp-json/wp/v2
WP_ROOT_BASE=http://localhost:8881
WP_CACHE_TTL_SECONDS=0
```

**Tip:** Set `WP_CACHE_TTL_SECONDS=0` during development to disable caching so you see CMS changes immediately.

---

## Pages

- `/` — Homepage with hero, services overview, projects showcase, partners marquee
- `/about` — About Mekan PLC with team section
- `/projects` — Projects listing with filters
- `/blog` — Blog post listing
- `/blog/[slug]` — Individual blog post with full content
- `/resources` — Resources listing with download links
- `/services/[id]` — Individual service pages
- `/privacy-policy` — Privacy policy
- `/terms-of-service` — Terms of service
- `/404` — Custom 404 page
- `/500` — Custom 500 error page

---

## Components

- `Navbar.astro` — Navigation with theme toggle
- `Footer.astro` — Footer with links and branding
- `CTASection.astro` — Call-to-action section
- `PartnersMarquee.astro` — Scrolling partner logos
- `ThemeToggle.astro` — Light/dark mode switch

---

## WordPress Integration

The frontend connects to WordPress via a custom client in `src/lib/wp.ts`:

- **In-memory caching** — Reduces API calls with configurable TTL
- **Error handling** — Falls back to static content if WordPress is down
- **Type-safe** — TypeScript interfaces for all CMS data

### Custom REST Endpoints

The frontend consumes these endpoints from `mekan-cms`:

```
/wp-json/mekan/v1/projects
/wp-json/mekan/v1/blogs
/wp-json/mekan/v1/blogs/{slug}
/wp-json/mekan/v1/resources
/wp-json/mekan/v1/contact (POST)
```

---

## Contact Form

The contact form is submitted via an SSR API route:

```bash
POST /api/contact
```

This route validates the request and proxies it to WordPress, protecting the WordPress credentials from the browser.

---

## SEO Implementation

- **Dynamic meta tags** — Title, description, canonical URLs per page
- **OpenGraph** — Facebook/LinkedIn sharing with images
- **Twitter Cards** — Twitter sharing with large images
- **Structured data** — JSON-LD for Organization, BlogPosting, BreadcrumbList
- **Sitemap** — Dynamic sitemap.xml at `/sitemap.xml` includes all static pages and CMS blog posts
- **Robots.txt** — Configured to allow crawling and point to sitemap

---

## Fallback Mode

If WordPress is unreachable, the frontend:

- Shows static content where available
- Displays an amber banner: "Content may be outdated due to CMS connectivity issues"
- Never shows a blank page or error to visitors

This ensures the website remains functional even during CMS downtime.

---

## File Structure

```bash
src/
├── lib/
│   └── wp.ts              WordPress API client with caching
├── layouts/
│   └── Layout.astro       Global SEO shell (meta, JSON-LD, fonts)
├── components/
│   ├── Navbar.astro
│   ├── Footer.astro
│   ├── CTASection.astro
│   ├── PartnersMarquee.astro
│   └── ThemeToggle.astro
└── pages/
    ├── index.astro        Homepage
    ├── about.astro
    ├── projects/
    ├── blog/
    │   ├── index.astro
    │   └── [slug].astro
    ├── resources/
    ├── services/
    │   └── [id].astro
    ├── privacy-policy.astro
    ├── terms-of-service.astro
    ├── 404.astro
    ├── 500.astro
    ├── sitemap.xml.ts
    └── api/
        └── contact.ts    Contact form proxy
```

---

## Documentation

For complete internal documentation covering architecture, file map, env vars, SEO, endpoints, troubleshooting, and deployment:

```text
docs/INTERNAL.md
```

---

## Deployment

This project is configured for Vercel deployment:

1. Connect the repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy — Vercel handles static builds and SSR API routes automatically

---

## License

Internal use only — Digital Aksumite.
