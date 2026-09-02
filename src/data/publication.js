/**
 * Configurație centrală a publicației.
 * Domeniul canonic este explicit — nu se deduce din headere HTTP.
 */

const publication = {
	publicationName: "eNeamț",
	publicationTagline: "Știrile zilei în Piatra Neamț",
	canonicalDomain: "https://eneamt.ro",
	city: "Piatra Neamț",
	county: "Neamț",
	region: "Nord-Est",
	latitude: 46.9275,
	longitude: 26.3709,
	locale: 'ro-RO',
	language: 'ro',
	timezone: 'Europe/Bucharest',
	logo: '/images/logo.png',
	defaultSocialImage: '/images/logo.png',
	favicon: '/images/cropped_image.png',
	editorialEmail: 'contact@weboratory.ro',
	legalCompanyName: 'Weboratory Capital SRL',
	publisherInformation: {
		name: 'Weboratory Capital SRL',
		email: 'contact@weboratory.ro',
		website: 'https://www.weboratory.ro',
	},
	socialProfiles: [
		"https://www.facebook.com/905474842659768"
	],
	foundingDate: '2024-01-01',
	coverageArea: "Municipiul Piatra Neamț și județul Neamț",
	nearbyLocalities: [],
	mapProvider: 'openstreetmap',
	mapsEnabled: true,
	environment: process.env.NODE_ENV === 'production' ? 'production' : 'development',
	isIndexable: process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV !== 'preview' && process.env.CF_PAGES_BRANCH !== 'preview',
	localCate: "Azi in Piatra Neamt",
	categorySlug: "azi-in-piatra-neamt",
	tagMinIndexCount: 5,
	correctionEmail: 'contact@weboratory.ro',
	ogLocale: 'ro_RO',
};

export default publication;
