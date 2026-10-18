export interface Testimonial {
	name: string;
	role: string;
	company: string;
	location?: string;
	/** Short phrase copied verbatim from the quote, shown as the headline. */
	highlight?: string;
	quote: string;
	/** Path under /public. "photo" renders as a portrait, "logo" renders on a white tile. */
	image?: { src: string; type: 'photo' | 'logo' };
}

export const testimonials: Testimonial[] = [
	{
		name: 'Mr. Esayas Mengistu',
		role: 'Farm Manager',
		company: 'Ethio Vegfru Farm',
		location: 'Koka, Ethiopia',
		highlight: 'With their continuous support, we have significantly reduced non-conformances.',
		quote:
			'Mekan Quality Management and Training PLC has been a key partner in strengthening our compliance systems at Ethiovegfru. Their support has gone beyond basic guidance—they have worked closely with our team to build a clear and practical understanding of international standards, including BRCGS, SMETA, Tesco NURTURE, Tesco Food requirements, and GLOBALG.A.P. What sets Mekan apart is their ability to integrate food safety, environmental management, good agricultural practices, and ethical requirements into workable systems that fit our daily operations. Their approach is highly practical and tailored to our farm and packhouse realities. With their continuous support, we have significantly reduced non-conformances and achieved more consistent and sustainable implementation of these standards. Mekan also ensures our team stays up to date with changing requirements, which has strengthened our confidence in meeting the expectations of EU and UK markets. We highly value Mekan Quality Management and Training PLC as a trusted partner in our journey toward excellence in compliance and sustainable production.',
		image: { src: '/testimonials/ethio-vegfru.png', type: 'logo' }
	},
	{
		name: 'Mrs. Lydia Gerratt',
		role: 'CEO',
		company: 'EUPHORIA Global Sourcing',
		location: 'London, UK',
		highlight: 'Their approach is not theoretical—it is highly operational.',
		quote:
			'I had the opportunity to work alongside Mekan Quality Management and Training PLC during the CBI Ethiopia Spice Project, where I observed first hand their outstanding depth of expertise in compliance systems. What truly distinguishes Mekan is that their capacity goes far beyond food safety—they bring strong, practical knowledge in ethical standards, good agricultural practices, and environmental requirements aligned with EU and UK market expectations. Mekan’s unique strength lies in their clear understanding of private label standards and premium retail requirements, combined with their ability to translate these complex expectations into practical, implementable systems on the ground. Their approach is not theoretical—it is highly operational, tailored to real production and packhouse conditions. This ability to integrate food safety, ethics, sustainability, and market-driven compliance makes Mekan a highly valuable partner for organizations aiming to access and sustain high-value markets in Europe and the UK.',
		image: { src: '/testimonials/lydia-gerratt.jpg', type: 'photo' }
	},
	{
		name: 'Eshetu Hayiso',
		role: 'Deputy Farm Manager',
		company: 'Greenpath Food Ethiopia',
		highlight: 'Mekan helped us see our farm not just as a field, but as a business.',
		quote:
			'We had good land and hardworking people, but we lacked the structure investors were looking for. Mekan helped us see our farm not just as a field, but as a business. They refined our business plan, sharpened our financial projections, and prepared us for conversations we never thought we would have. Within a year, we had secured our first major investment and expanded our operations to three additional sites.',
		image: { src: '/testimonials/greenpath-food.jpg', type: 'logo' }
	}
];
