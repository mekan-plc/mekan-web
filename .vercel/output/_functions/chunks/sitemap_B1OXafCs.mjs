import { l as listBlogs } from './wp_BS7XIf38.mjs';

const prerender = false;
function getSiteUrl(request) {
  const fromEnv = "https://mekanplc.com".replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  try {
    return new URL(request.url).origin;
  } catch {
    return "";
  }
}
function xmlEscape(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}
async function GET({ request }) {
  const siteUrl = getSiteUrl(request);
  const staticPaths = [
    "/",
    "/about",
    "/projects",
    "/blog",
    "/resources",
    "/privacy-policy",
    "/terms-of-service",
    "/services/quality-assurance",
    "/services/agribusiness-development",
    "/services/agricultural-productivity",
    "/services/food-systems",
    "/services/global-standards",
    "/services/investment-advisory"
  ];
  const blogPaths = await listBlogs({ perPage: 100 }).then(({ blogs }) => blogs.map((blog) => `/blog/${blog.slug}`)).catch(() => []);
  const paths = [...staticPaths, ...blogPaths];
  const urls = paths.map((path) => {
    const loc = siteUrl ? new URL(path, siteUrl).toString() : path;
    return `
	<url><loc>${xmlEscape(loc)}</loc></url>`;
  }).join("");
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;
  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600"
    }
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	GET,
	prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
