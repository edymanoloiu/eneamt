import RSS from 'rss';
import { isRecomandarePost } from './recomandarePosts.js';

export function generateRssFeed(posts) {
	const feed = new RSS({
		title: 'Azi în Piatra Neamț | Cele mai importante știri din Piatra Neamț. Află tot ce contează, azi, în Piatra Neamț.',
		description: '„Azi în Piatra Neamț” este publicația online dedicată tuturor celor care vor să fie la curent cu tot ce se întâmplă în inima Moldovei. De la știri locale actualizate în timp real, evenimente culturale, administrative și sociale, până la povești cu oameni remarcabili din comunitate – platforma oferă o perspectivă echilibrată și relevantă asupra vieții din Piatra Neamț. Cu un conținut accesibil, bine structurat și adaptat nevoilor cititorilor, „Azi în Piatra Neamț” devine ghidul tău zilnic pentru un oraș în continuă mișcare.',
		site_url: 'https://eneamt.ro',
		feed_url: 'https://eneamt.ro/rss.xml',
		language: 'ro',
		image_url: 'https://eneamt.ro/images/cropped_image.png'
	});

	posts.forEach(post => {
		feed.item({
			title: post.title,
			description: post.excerpt,
			url: `${feed.site_url.replace(/\/$/, '')}${isRecomandarePost(post) ? '/recomandare/' : '/post/'}${post.slug}`,
			date: post.date,
			categories: post.tags,
			enclosure: {
				url: post.featureImg,
				type: 'image/jpeg',
			},
		});
	});

	return feed.xml({ indent: true });
}
