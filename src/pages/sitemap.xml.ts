export const prerender = false;

function getSiteUrl(request: Request) {
	const fromEnv = (import.meta.env.PUBLIC_SITE_URL || '').replace(/\/$/, '');
	if (fromEnv) return fromEnv;
	try {
		return new URL(request.url).origin;
	} catch {
		return '';
	}
}

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
