/**
 * Dynamic XML Sitemap Generator
 *
 * Generates sitemap.xml on-demand for search engine crawlers.
 * Lists all static pages that should be indexed by Google and other search engines.
 *
 * Features:
 * - Dynamic site URL detection from PUBLIC_SITE_URL env var or request origin
 * - XML escaping for special characters in URLs
 * - Proper XML headers and sitemap schema
 * - 1-hour cache for performance
 *
 * @see https://www.sitemaps.org/protocol.html
 * @see https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview
 */
export const prerender = false;

/**
 * Determine site base URL for sitemap generation
 * Priority: PUBLIC_SITE_URL env var > request origin
 */
function getSiteUrl(request: Request) {
	const fromEnv = (import.meta.env.PUBLIC_SITE_URL || '').replace(/\/$/, '');
	if (fromEnv) return fromEnv;
	try {
		return new URL(request.url).origin;
	} catch {
		return '';
	}
}

/**
 * Escape special XML characters to prevent parsing errors
 * Required by XML 1.0 specification for valid sitemap documents
 */
function xmlEscape(str: string) {
	return str
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

export async function GET({ request }: { request: Request }) {
	const siteUrl = getSiteUrl(request);

	const paths = [
		'/',
		'/about',
		'/projects',
		'/blog',
		'/resources',
		'/privacy-policy',
		'/terms-of-service'
	];

	const urls = paths
		.map((path) => {
			const loc = siteUrl ? new URL(path, siteUrl).toString() : path;
			return `\n\t<url><loc>${xmlEscape(loc)}</loc></url>`;
		})
		.join('');

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}
</urlset>`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
}
