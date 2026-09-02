const assert = require('assert');

const DIACRITICS_MAP = {
	ă: 'a', â: 'a', î: 'i', ș: 's', ț: 't',
	Ă: 'a', Â: 'a', Î: 'i', Ș: 's', Ţ: 't', Ț: 't',
	ş: 's', Ş: 's',
};

function slugify(text) {
	return String(text ?? '')
		.replace(/[\u2010\u2011\u2012\u2013\u2014\u2212]/g, '-')
		.split('')
		.map((ch) => DIACRITICS_MAP[ch] ?? ch)
		.join('')
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^a-z0-9-]+/g, '')
		.replace(/--+/g, '-')
		.replace(/^-+/, '')
		.replace(/-+$/, '');
}

const LOCAL = new Set(['azi-in-neamt', 'azi-in-piatra-neamt']);

function postMatches(cate, requested) {
	const postSlug = slugify(cate);
	if (postSlug === requested) return true;
	return LOCAL.has(requested) && LOCAL.has(postSlug);
}

assert.strictEqual(slugify('Azi in Piatra Neamt'), 'azi-in-piatra-neamt');
assert.strictEqual(slugify('Azi in Neamt'), 'azi-in-neamt');

assert.ok(postMatches('Azi in Piatra Neamt', 'azi-in-neamt'));
assert.ok(postMatches('Azi in Neamt', 'azi-in-neamt'));
assert.ok(postMatches('Azi in Piatra Neamt', 'azi-in-piatra-neamt'));
assert.ok(!postMatches('Evenimente si cultura', 'azi-in-neamt'));
assert.ok(postMatches('Evenimente si cultura', 'evenimente-si-cultura'));

console.log('ok: category slug aliases');
