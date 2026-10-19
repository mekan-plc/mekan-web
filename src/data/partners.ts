// Partners shown in the hero marquee and the homepage partner wall. One list, so both stay in step.

export interface Partner {
	name: string;
	logo: string;
	url: string;
}

export const partners: Partner[] = [
	{ name: 'Gena Investment Group', logo: '/partners/Gena investment group.jpg', url: 'https://genaigroup.com/' },
	{ name: 'Colead Maheber Ethiopia', logo: '/partners/Colead mahaber prrogram.jpg', url: 'https://colead.link/programmes-page/maheber-ethiopia/' },
	{ name: 'CBI Ethiopia Spices and Herbs', logo: '/partners/cbi ethiopia spices and herbs.png', url: 'https://www.cbi.eu/' },
	{ name: 'The Day Agro Industry', logo: '/partners/Theday Agro Industry.jpg', url: 'http://thedayjam.com/' },
	{ name: 'Mahader Foods', logo: '/partners/Mahader foods and catering.jpg', url: 'https://mahederfoods.com/service/' },
	{ name: 'Vegpro Agriculture PLC', logo: '/partners/Ethio Vegpro farm.jpg', url: 'https://freshdi.com/supplier/VEGPRO-AGRICULTURE-PLC' },
	{ name: 'Almeta Impex PLC', logo: '/partners/Almeta koka farm.jpg', url: 'https://web.facebook.com/p/Almeta-Impex-PLC-100093981290055/' },
	{ name: 'Greenpath Food Ethiopia', logo: '/partners/Greenpath farm Ethiopia.jpg', url: 'https://ethiopiandiasporafellowship.org/portfolio/greenpath-food-3/' },
];
