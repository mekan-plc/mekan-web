// WordPress REST Client for Astro SSR
// Uses hardcoded dev URL - change for production

const API_BASE = (import.meta as any).env?.WP_API_BASE || 'http://localhost:8881/wp-json/wp/v2';
const CACHE_TTL_MS = Number((import.meta as any).env?.WP_CACHE_TTL_SECONDS || '60') * 1000;

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

function getWpRootBase(): string {
	const apiBase = getApiBase();
	if (apiBase.endsWith('/wp/v2')) {
		return apiBase.slice(0, -'/wp/v2'.length);
	}
	return apiBase;
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

export type MekanProject = {
	id: number;
	slug: string;
	date: string;
	title: string;
	client: string;
	location: string;
	duration: string;
	description: string;
	services: string[];
	results: string[];
	imageUrl: string | null;
	featured: boolean;
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

export async function listProjects(opts?: {
	perPage?: number;
}): Promise<{ projects: MekanProject[]; perPage: number }> {
	const perPage = opts?.perPage && opts.perPage > 0 ? opts.perPage : 100;
	const root = getWpRootBase();
	const url = `${root}/mekan/v1/projects?per_page=${perPage}`;
	const projects = await cachedFetchJson<MekanProject[]>(url);
	return { projects, perPage };
}

export async function listFeaturedProjects(opts?: {
	perPage?: number;
}): Promise<{ projects: MekanProject[]; perPage: number }> {
	const perPage = opts?.perPage && opts.perPage > 0 ? opts.perPage : 3;
	const root = getWpRootBase();
	const url = `${root}/mekan/v1/projects?featured=1&per_page=${perPage}`;
	const projects = await cachedFetchJson<MekanProject[]>(url);
	return { projects, perPage };
}

export type MekanResource = {
	id: number;
	slug: string;
	title: string;
	description: string;
	category: string;
	icon: string;
	fileSize: string;
	fileType: string;
	downloadUrl: string;
	features: string[];
	imageUrl: string | null;
};

export async function listResources(opts?: {
	perPage?: number;
	category?: string;
}): Promise<{ resources: MekanResource[]; perPage: number }> {
	const perPage = opts?.perPage && opts.perPage > 0 ? opts.perPage : 100;
	const root = getWpRootBase();
	let url = `${root}/mekan/v1/resources?per_page=${perPage}`;
	if (opts?.category) {
		url += `&category=${encodeURIComponent(opts.category)}`;
	}
	const resources = await cachedFetchJson<MekanResource[]>(url);
	return { resources, perPage };
}

export function clearWpCache(): void {
	cache.clear();
}

export type MekanBlog = {
	id: number;
	slug: string;
	title: string;
	excerpt: string;
	content?: string;
	category: string;
	categorySlug?: string;
	date: string;
	imageUrl: string | null;
	featured?: boolean;
};

export async function listBlogs(opts?: {
	perPage?: number;
	category?: string;
	featured?: boolean;
}): Promise<{ blogs: MekanBlog[]; perPage: number }> {
	const perPage = opts?.perPage && opts.perPage > 0 ? opts.perPage : 10;
	const root = getWpRootBase();
	let url = `${root}/mekan/v1/blogs?per_page=${perPage}`;
	if (opts?.category) {
		url += `&category=${encodeURIComponent(opts.category)}`;
	}
	if (opts?.featured) {
		url += `&featured=1`;
	}
	const blogs = await cachedFetchJson<MekanBlog[]>(url);
	return { blogs, perPage };
}

export async function getBlogBySlug(slug: string): Promise<MekanBlog | null> {
	const root = getWpRootBase();
	const url = `${root}/mekan/v1/blogs/${encodeURIComponent(slug)}`;
	try {
		const blog = await cachedFetchJson<MekanBlog>(url);
		return blog;
	} catch {
		return null;
	}
}
