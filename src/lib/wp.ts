// WordPress REST Client for Astro SSR
// Uses hardcoded dev URL - change for production

const API_BASE = process.env.WP_API_BASE || 'http://localhost:8882/wp-json/wp/v2';
const CACHE_TTL_MS = Number(process.env.WP_CACHE_TTL_SECONDS || '60') * 1000;

type CacheEntry<T> = {
	value: T;
	expiresAt: number;
};

const cache = new Map<string, CacheEntry<unknown>>();

function getApiBase(): string {
	const base = API_BASE;
	if (!base) {
		throw new Error('Missing WP_API_BASE. Set WP_API_BASE environment variable.');
	}
	return base.replace(/\/$/, '');
}

async function cachedFetchJson<T>(url: string): Promise<T> {
	// Check cache
	if (CACHE_TTL_MS > 0) {
		const hit = cache.get(url);
		if (hit && hit.expiresAt > Date.now()) {
			return hit.value as T;
		}
	}

	console.log('[WP] Fetching:', url);
	
	const res = await fetch(url, {
		headers: {
			Accept: 'application/json'
		}
	});
	
	if (!res.ok) {
		const text = await res.text().catch(() => '');
		console.error('[WP] Error response:', res.status, text.slice(0, 200));
		throw new Error(`WordPress API failed (${res.status}): ${text.slice(0, 100)}`);
	}

	const contentType = res.headers.get('content-type') || '';
	if (!contentType.includes('application/json')) {
		const text = await res.text();
		console.error('[WP] Non-JSON response:', text.slice(0, 200));
		throw new Error('WordPress returned non-JSON response. Is the REST API enabled?');
	}

	const data = (await res.json()) as T;
	
	// Store in cache
	if (CACHE_TTL_MS > 0) {
		cache.set(url, { value: data, expiresAt: Date.now() + CACHE_TTL_MS });
	}
	
	return data;
}

export type WpRendered = {
	rendered: string;
	protected?: boolean;
};

export type WpPost = {
	id: number;
	slug: string;
	date: string;
	modified: string;
	title: WpRendered;
	excerpt: WpRendered;
	content: WpRendered;
	link: string;
};

export async function listPosts(opts?: {
	page?: number;
	perPage?: number;
}): Promise<{ posts: WpPost[]; page: number; perPage: number }> {
	const page = opts?.page && opts.page > 0 ? opts.page : 1;
	const perPage = opts?.perPage && opts.perPage > 0 ? opts.perPage : 9;

	const apiBase = getApiBase();
	const url = `${apiBase}/posts?_embed=1&status=publish&orderby=date&order=desc&page=${page}&per_page=${perPage}`;

	const posts = await cachedFetchJson<WpPost[]>(url);
	return { posts, page, perPage };
}

export async function getPostBySlug(slug: string): Promise<WpPost | null> {
	const apiBase = getApiBase();
	const url = `${apiBase}/posts?_embed=1&status=publish&slug=${encodeURIComponent(slug)}`;

	const posts = await cachedFetchJson<WpPost[]>(url);
	return posts[0] ?? null;
}

export function clearWpCache(): void {
	cache.clear();
}
