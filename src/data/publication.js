/**
 * Configurație centrală a publicației.
 * Domeniul canonic este explicit — nu se deduce din headere HTTP.
 */

const publication = {
	publicationName: "eNeamț",
	publicationTagline: "Neamțul, aproape de tine",
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
	coverageArea: "Județul Neamț, România",
	editorialPositioning:
		"Publicație județeană care combină actualitatea locală cu informații despre turism, natură, comunități și dezvoltarea județului Neamț.",
	nearbyLocalities: ["Roman", "Târgu Neamț", "Bicaz", "Roznov"],
	mapProvider: 'openstreetmap',
	mapsEnabled: true,
	environment: process.env.NODE_ENV === 'production' ? 'production' : 'development',
	isIndexable: process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV !== 'preview' && process.env.CF_PAGES_BRANCH !== 'preview',
	localCate: "Azi in Neamt",
	categorySlug: "azi-in-neamt",
	tagMinIndexCount: 5,
	correctionEmail: 'contact@weboratory.ro',
	ogLocale: 'ro_RO',
	seo: {
		title: "eNeamț - Știri din Neamț și Piatra Neamț",
		titleTemplate: "%s | eNeamț",
		description:
			"Știri din județul Neamț, Piatra Neamț, Roman și Târgu Neamț. Actualitate, turism, administrație, evenimente, trafic, educație și viața comunității.",
		homepageH1: "Știri din Neamț",
		homepageIntro:
			"Actualitatea din Piatra Neamț, Roman, Târgu Neamț și celelalte comunități ale județului, completată de informații despre turism, administrație și evenimente.",
		openGraph: {
			type: "website",
			siteName: "eNeamț",
			title: "eNeamț - Știrile județului Neamț",
			description:
				"Actualitate din Piatra Neamț, Roman, Târgu Neamț și întreg județul, plus informații despre turism și comunitățile locale.",
			locale: "ro_RO",
		},
		twitter: {
			card: "summary_large_image",
			title: "eNeamț - Știri locale din Neamț",
			description:
				"Știri și informații utile din Piatra Neamț, Roman, Târgu Neamț și restul județului.",
		},
		schema: {
			type: "NewsMediaOrganization",
			name: "eNeamț",
			alternateName: "eNeamt.ro",
			areaServed: "Județul Neamț, România",
		},
	},
};

export default publication;
