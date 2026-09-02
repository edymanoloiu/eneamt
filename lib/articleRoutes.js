/** Canonical URL segment + slug for articles (no leading/trailing slashes). */

import { isRecomandarePost } from './recomandarePosts.js';

export const ARTICLE_SECTIONS = [
	'stiri',
	'trafic',
	'evenimente',
	'cultura',
	'meteo',
	'calendar',
	'recomandare',
];

const CATE_STIRI_NAT = 'Stiri nationale si internationale';
const CATE_EVENIMENTE = 'Evenimente si cultura';
const CATE_AZI = 'Azi in Bucuresti';

function isTraficSlug(slug) {
	const s = String(slug).toLowerCase();
	return (
		s.includes('trafic') ||
		s.includes('transportului-in-bucuresti') ||
		s.includes('transport-in-bucuresti') ||
		s.includes('troleibuz') ||
		s.includes('impact-in-trafic') ||
		s.includes('blocaj') ||
		s.includes('circulatie') ||
		s.includes('aglomerat') ||
		s.includes('metrou-linii') ||
		s.includes('noutati-majore-cu-troleibuze') ||
		(s.includes('stalp') && s.includes('inclinat'))
	);
}

function isCulturaPost(post) {
	const s = String(post.slug || '').toLowerCase();
	const t = String(post.title || '').toLowerCase();
	return (
		s.includes('evenimente-culturale') ||
		s.includes('cultura-in-bucuresti') ||
		t.includes('evenimente culturale') ||
		t.includes('culturale din bucuresti')
	);
}

/**
 * @param {{ slug?: string, cate?: string, title?: string }} post
 * @returns {string} e.g. "stiri", "meteo"
 */
export function getArticlePathPrefix(post) {
	if (!post || !post.slug) return 'stiri';
	if (isRecomandarePost(post)) return 'recomandare';
	const slug = post.slug;
	const cate = post.cate || '';
	const lowerSlug = slug.toLowerCase();

	if (cate === CATE_STIRI_NAT) return 'stiri';

	if (cate === CATE_EVENIMENTE) {
		return isCulturaPost(post) ? 'cultura' : 'evenimente';
	}

	if (cate === CATE_AZI || !cate) {
		if (
			lowerSlug.startsWith('vremea-') ||
			lowerSlug.includes('vremea-azi') ||
			lowerSlug.includes('vremea-in-bucuresti')
		) {
			return 'meteo';
		}
		if (lowerSlug.includes('calendar-ortodox')) return 'calendar';
		if (isTraficSlug(slug)) return 'trafic';
		return 'stiri';
	}

	return 'stiri';
}

export function getArticleUrlPath(post) {
	return `${getArticlePathPrefix(post)}/${post.slug}`;
}

/** Path for Next.js Link (respects trailingSlash). */
export function getPostHref(post) {
	return `/${getArticleUrlPath(post)}/`;
}

export function isValidArticleSection(section) {
	return ARTICLE_SECTIONS.includes(section);
}
