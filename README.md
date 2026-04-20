# Mekan Web (mekan-web)

This is the **public website** for **Mekan PLC**.

It is built to be:
- **Fast** (Astro)
- **Modern** (TailwindCSS)
- **SEO-first** (canonical URLs, OpenGraph/Twitter, sitemap, robots, JSON‑LD)
- **CMS-backed but resilient** (shows static fallback content when WordPress is down)

## Internal documentation
For the full “everything you need to know” guide (architecture, file map, env vars, SEO, endpoints, troubleshooting), see:

- `docs/INTERNAL.md`

## Quick start
Install dependencies:

```sh
npm install
```

Run dev server:

```sh
npm run dev
```

## Environment variables (high level)
- `PUBLIC_SITE_URL`: Used for canonical URLs + absolute OG image URLs.
- `PUBLIC_CMS_BASE_URL`: WordPress base URL for client-side requests.
- `WP_API_BASE`: WordPress REST API base URL for server-side fetching.

If something looks off, start with `docs/INTERNAL.md`.
