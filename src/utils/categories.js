import publication from '../data/publication';
import { slugify } from './index';

/**
 * Legacy / variant slugs for the main local news category.
 * Posts historically used several cate spellings,
 * while nav uses publication.categorySlug ("azi-in-neamt").
 */
const LOCAL_CATEGORY_SLUG_ALIASES = [
	'azi-in-neamt',
	'azi-in-piatra-neamt',
];

export function getLocalCategorySlug() {
	return publication.categorySlug || 'azi-in-neamt';
}

export function getLocalCategorySlugSet() {
	const set = new Set(LOCAL_CATEGORY_SLUG_ALIASES);
	set.add(getLocalCategorySlug());
	if (publication.localCate) {
		set.add(slugify(publication.localCate));
	}
	return set;
}

export function isLocalCategorySlug(slug) {
	return getLocalCategorySlugSet().has(String(slug || ''));
}

export function isLocalCategoryName(cate) {
	if (!cate) return false;
	return isLocalCategorySlug(slugify(cate));
}

/** Matches local-news posts across legacy and current cate labels. */
export function isLocalNewsCate(cate) {
	if (!cate || cate === 'Evenimente si cultura') return false;
	if (isLocalCategoryName(cate)) return true;
	return /piatra\s*neamt|neamt/i.test(String(cate));
}

/** Canonical public slug for a post's cate (collapses local variants). */
export function getCanonicalCategorySlug(cate) {
	if (!cate) return getLocalCategorySlug();
	const raw = slugify(cate);
	return isLocalCategorySlug(raw) ? getLocalCategorySlug() : raw;
}

export function postMatchesCategorySlug(cate, requestedSlug) {
	if (!cate || !requestedSlug) return false;
	const postSlug = slugify(cate);
	if (postSlug === requestedSlug) return true;
	const local = getLocalCategorySlugSet();
	return local.has(requestedSlug) && local.has(postSlug);
}
