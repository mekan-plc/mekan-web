/**
 * WordPress REST API Client for Astro SSR
 *
 * Provides cached access to WordPress content with the following features:
 * - In-memory caching with configurable TTL (default: 60 seconds)
 * - Automatic cache invalidation on expiry
 * - Error handling with descriptive messages
 * - Support for both standard WP REST API and custom Mekan endpoints
 * - HTML entity decoding for titles/excerpts (defense against WP smart quotes)
 *
 * Environment Variables:
 * - WP_API_BASE: WordPress REST API base URL (default: http://localhost:8881/wp-json/wp/v2)
 * - WP_CACHE_TTL_SECONDS: Cache duration in seconds (default: 60)
 *
 * @module wp
 */

/**
 * Decode common HTML entities in a string (Node.js and browser safe).
 * WordPress wptexturize converts apostrophes to &#8217; and quotes to &#8220;/&#8221;.
 * This ensures they render correctly even if the CMS sends encoded entities.
 */
function decodeEntities(text: string | null | undefined): string {
	if (!text) return '';
	return text
		.replace(/&#8217;/g, "'")   // right single quote (')
		.replace(/&#8216;/g, "'")   // left single quote (')
		.replace(/&#8220;/g, '"')   // left double quote (")
		.replace(/&#8221;/g, '"')   // right double quote (")
		.replace(/&#8230;/g, '...') // ellipsis
		.replace(/&#8211;/g, '-')   // en dash
		.replace(/&#8212;/g, '--')  // em dash
		.replace(/&amp;/g, '&')
		.replace(/&lt;/g, '<')
		.replace(/&gt;/g, '>')
		.replace(/&quot;/g, '"')
		.replace(/&#039;/g, "'");
}

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

/**
 * Cached JSON fetch from WordPress API
 *
 * Implements request deduplication and response caching to minimize
 * API calls during SSR. Cache entries are keyed by full URL and include
 * TTL-based expiration. Non-JSON responses trigger descriptive errors
 * to help diagnose REST API configuration issues.
 *
 * @template T - Expected response type
 * @param url - Full WordPress API URL to fetch
 * @returns Parsed JSON response
 * @throws Error if request fails or returns non-JSON
 */
async function cachedFetchJson<T>(url: string): Promise<T> {
	// Return cached response if still valid
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

	// Cache successful response with TTL
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
	content?: string;
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
	posts.forEach((post) => {
		if (post.title?.rendered) post.title.rendered = decodeEntities(post.title.rendered);
		if (post.excerpt?.rendered) post.excerpt.rendered = decodeEntities(post.excerpt.rendered);
		if (post.content?.rendered) post.content.rendered = decodeEntities(post.content.rendered);
	});
	return { posts, page, perPage };
}

export async function getPostBySlug(slug: string): Promise<WpPost | null> {
	const apiBase = getApiBase();
	const url = `${apiBase}/posts?_embed=1&status=publish&slug=${encodeURIComponent(slug)}`;

	const posts = await cachedFetchJson<WpPost[]>(url);
	const post = posts[0] ?? null;
	if (post) {
		if (post.title?.rendered) post.title.rendered = decodeEntities(post.title.rendered);
		if (post.excerpt?.rendered) post.excerpt.rendered = decodeEntities(post.excerpt.rendered);
		if (post.content?.rendered) post.content.rendered = decodeEntities(post.content.rendered);
	}
	return post;
}

export async function listProjects(opts?: {
	perPage?: number;
}): Promise<{ projects: MekanProject[]; perPage: number }> {
	const perPage = opts?.perPage && opts.perPage > 0 ? opts.perPage : 100;
	const root = getWpRootBase();
	const url = `${root}/mekan/v1/projects?per_page=${perPage}`;
	const projects = await cachedFetchJson<MekanProject[]>(url);
	projects.forEach((p) => {
		p.title = decodeEntities(p.title);
		p.client = decodeEntities(p.client);
		p.location = decodeEntities(p.location);
		p.duration = decodeEntities(p.duration);
		p.description = decodeEntities(p.description);
		if (p.content) p.content = decodeEntities(p.content);
		if (p.results) p.results = p.results.map(decodeEntities);
	});
	return { projects, perPage };
}

export async function listFeaturedProjects(opts?: {
	perPage?: number;
}): Promise<{ projects: MekanProject[]; perPage: number }> {
	const perPage = opts?.perPage && opts.perPage > 0 ? opts.perPage : 3;
	const root = getWpRootBase();
	const url = `${root}/mekan/v1/projects?featured=1&per_page=${perPage}`;
	const projects = await cachedFetchJson<MekanProject[]>(url);
	projects.forEach((p) => {
		p.title = decodeEntities(p.title);
		p.client = decodeEntities(p.client);
		p.location = decodeEntities(p.location);
		p.duration = decodeEntities(p.duration);
		p.description = decodeEntities(p.description);
		if (p.content) p.content = decodeEntities(p.content);
		if (p.results) p.results = p.results.map(decodeEntities);
	});
	return { projects, perPage };
}

export async function getProjectBySlug(slug: string): Promise<MekanProject | null> {
	const root = getWpRootBase();
	const url = `${root}/mekan/v1/projects/${encodeURIComponent(slug)}`;
	try {
		const project = await cachedFetchJson<MekanProject>(url);
		project.title = decodeEntities(project.title);
		project.client = decodeEntities(project.client);
		project.location = decodeEntities(project.location);
		project.duration = decodeEntities(project.duration);
		project.description = decodeEntities(project.description);
		if (project.content) project.content = decodeEntities(project.content);
		if (project.results) project.results = project.results.map(decodeEntities);
		return project;
	} catch {
		return null;
	}
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
	resources.forEach((r) => {
		r.title = decodeEntities(r.title);
		r.description = decodeEntities(r.description);
		if (r.features) r.features = r.features.map(decodeEntities);
	});
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
	blogs.forEach((b) => {
		b.title = decodeEntities(b.title);
		b.excerpt = decodeEntities(b.excerpt);
		if (b.content) b.content = decodeEntities(b.content);
		b.category = decodeEntities(b.category);
	});
	return { blogs, perPage };
}

export async function getBlogBySlug(slug: string): Promise<MekanBlog | null> {
	const root = getWpRootBase();
	const url = `${root}/mekan/v1/blogs/${encodeURIComponent(slug)}`;
	try {
		const blog = await cachedFetchJson<MekanBlog>(url);
		blog.title = decodeEntities(blog.title);
		blog.excerpt = decodeEntities(blog.excerpt);
		if (blog.content) blog.content = decodeEntities(blog.content);
		blog.category = decodeEntities(blog.category);
		return blog;
	} catch {
		return null;
	}
}
