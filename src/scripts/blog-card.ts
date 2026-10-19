/**
 * Fills a BlogCard rendered inside a <template> (see src/components/BlogCard.astro)
 * with a post loaded in the browser. Text goes in through textContent, so CMS
 * strings never become markup.
 */
export type BlogCardData = {
	slug: string;
	title?: string;
	date?: string;
	excerpt?: string;
	category?: string;
	imageUrl?: string | null;
};

export function fillBlogCard(template: HTMLTemplateElement, blog: BlogCardData): HTMLAnchorElement {
	const card = (template.content.firstElementChild as HTMLAnchorElement).cloneNode(true) as HTMLAnchorElement;
	const field = <T extends Element = HTMLElement>(name: string) => card.querySelector<T>(`[data-field="${name}"]`);

	card.href = `/blog/${encodeURIComponent(blog.slug)}`;
	card.dataset.slug = blog.slug;

	const title = field('title');
	if (title) title.textContent = blog.title || '';
	const date = field('date');
	if (date) date.textContent = blog.date || '';
	const excerpt = field('excerpt');
	if (excerpt) excerpt.textContent = blog.excerpt || '';

	const category = field('category');
	if (category) {
		if (blog.category) category.textContent = blog.category;
		else category.remove();
	}

	if (blog.imageUrl) {
		const img = document.createElement('img');
		img.src = blog.imageUrl;
		img.alt = blog.title || '';
		img.loading = 'lazy';
		img.decoding = 'async';
		img.className = 'absolute inset-0 h-full w-full object-cover';
		field('placeholder')?.replaceWith(img);
	}

	return card;
}
