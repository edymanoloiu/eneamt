import Link from "next/link";
import ImageWithFallback from "../common/ImageWithFallback";
import { getPostImageSrc } from "../../../lib/postImage";
import { getPostHref } from "../../../lib/postHref";
import { normalizePartnerFeedItem } from "../../../lib/importedRssImage";
import {
	ensureActivePromosOnHomepage,
	getActivePromos,
	sortPostsByDate,
	takeUniquePosts,
} from "../../../lib/homepagePosts";
import site from "../../data/soledadSite";
import { isLocalNewsCate } from "../../utils/categories";
import SoledadPostCard from "./SoledadPostCard";

const formatDate = (date) => {
	try {
		return new Date(date).toLocaleDateString("ro-RO", {
			day: "numeric",
			month: "long",
			year: "numeric",
		});
	} catch {
		return "";
	}
};

const formatDateShort = (date) => {
	try {
		return new Date(date).toLocaleDateString("ro-RO", {
			month: "long",
			day: "numeric",
			year: "numeric",
		});
	} catch {
		return "";
	}
};

const postHref = (post) => post.link || getPostHref(post);

const LinkList = ({ items, dense }) => (
	<ul className={`h24-link-list${dense ? " h24-link-list--dense" : ""}`}>
		{items.map((item) => (
			<li key={item.slug || item.link || item.guid}>
				<Link href={postHref(item)}>{item.title}</Link>
			</li>
		))}
	</ul>
);

const LongList = ({ items }) => (
	<div className="h24-long-list">
		{items.map((item) => (
			<Link key={item.slug || item.link || item.guid} href={postHref(item)}>
				{item.title}
			</Link>
		))}
	</div>
);

const TopicBlock = ({ title, lead, minis }) => {
	if (!lead) return null;
	const excerpt = lead.excerpt
		? `${lead.excerpt.substring(0, 160)}...`
		: (lead.summary || lead.description || "").replace(/<[^>]+>/g, "").substring(0, 160);

	return (
		<section className="h24-topic-block">
			<div className="soledad-container">
				<h2 className="h24-topic-block__head">{title}</h2>
				<div className="h24-topic-duo">
					<div className="h24-topic-duo__lead">
						<SoledadPostCard data={lead} variant="hero" />
						{excerpt && (
							<p style={{ marginTop: 14, fontSize: 14, color: "var(--soledad-text-muted)", lineHeight: 1.6 }}>
								{excerpt}...
							</p>
						)}
					</div>
					<div className="h24-mini-posts">
						{minis.map((post) => (
							<article key={post.slug || post.link} className="h24-mini-post">
								<Link href={postHref(post)} className="h24-mini-post__title">
									{post.title}
								</Link>
								<span className="h24-mini-post__date">{formatDateShort(post.date || post.isoDate)}</span>
							</article>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

const Soledad24hNewsMagazine = ({ localPosts, culturePosts, nationalPosts, sitemaps }) => {
	const seen = new Set();
	const dedupedLocal = localPosts.filter((p) => {
		if (seen.has(p.slug)) return false;
		seen.add(p.slug);
		return true;
	});
	const localCity = sortPostsByDate(
		dedupedLocal.filter((p) => p.isPromo || isLocalNewsCate(p.cate)),
	);
	const evenimente = sortPostsByDate(
		culturePosts.filter((p) => p.cate === "Evenimente si cultura"),
	);
	const nationalFeed = nationalPosts || [];
	const activePromos = getActivePromos(localCity);
	const usedSlugs = new Set();
	const promoPriority = () => activePromos.filter((p) => !usedSlugs.has(p.slug));

	let topSix = takeUniquePosts(localCity, 6, usedSlugs, promoPriority());
	let pillFour = takeUniquePosts(localCity, 4, usedSlugs, promoPriority());
	let featuredMain = takeUniquePosts(localCity, 1, usedSlugs, promoPriority())[0];
	const trendingPool = sortPostsByDate([
		...localCity.filter((p) => p.trending === true || p.topPost === true),
		...localCity,
	]).filter((p, i, arr) => arr.findIndex((x) => x.slug === p.slug) === i);
	let trendingSix = takeUniquePosts(
		trendingPool.filter((p) => p.slug !== featuredMain?.slug),
		6,
		usedSlugs,
		promoPriority(),
	);

	let entertainment = takeUniquePosts(evenimente, 4, usedSlugs);
	const moneyList = nationalFeed.slice(0, 12).length
		? nationalFeed.slice(0, 12)
		: takeUniquePosts(localCity, 12, usedSlugs, promoPriority());

	const healthPosts = (
		sitemaps?.sanatate?.length
			? sitemaps.sanatate
			: takeUniquePosts(localCity, 4, usedSlugs, promoPriority())
	)
		.slice(0, 4)
		.map((item) => normalizePartnerFeedItem(item))
		.filter(Boolean);

	const techList = sitemaps?.cm?.length ? sitemaps.cm : takeUniquePosts(localCity, 10, usedSlugs, promoPriority());
	const editorPool = localCity.filter((p) => p.trending || p.topPost);
	const editorPicks = takeUniquePosts(
		editorPool.length ? editorPool : localCity,
		8,
		usedSlugs,
		promoPriority(),
	);
	let picksDisplay =
		editorPicks.length >= 4 ? editorPicks : takeUniquePosts(localCity, 8, usedSlugs, promoPriority());

	const travelPosts = (sitemaps?.mm?.length ? sitemaps.mm : takeUniquePosts(evenimente, 4, usedSlugs))
		.slice(0, 4)
		.map((item) => normalizePartnerFeedItem(item))
		.filter(Boolean);

	let lifestyleList = takeUniquePosts(localCity, 10, usedSlugs, promoPriority());
	const foodLead = sitemaps?.azi?.[0] || takeUniquePosts(localCity, 1, usedSlugs, promoPriority())[0];
	const foodMinis = (sitemaps?.azi?.slice(1, 6) || takeUniquePosts(localCity, 5, usedSlugs, promoPriority())).map(
		(item) => ({
			...item,
			slug: item.guid || item.slug,
		}),
	);

	const musicLead = takeUniquePosts(evenimente, 1, usedSlugs)[0] || featuredMain;
	let musicMinis = takeUniquePosts(evenimente, 5, usedSlugs);
	const esportsLead = takeUniquePosts(evenimente, 1, new Set())[0] || featuredMain;
	let esportsMinis = takeUniquePosts(evenimente, 5, usedSlugs);
	const movieLead = takeUniquePosts(evenimente, 1, new Set())[0] || featuredMain;
	let movieMinis = takeUniquePosts(evenimente, 5, usedSlugs);

	let stylePosts = takeUniquePosts(localCity, 4, usedSlugs, promoPriority());
	let careerFeatured = takeUniquePosts(localCity, 2, usedSlugs, promoPriority());
	const careerLinks = (sitemaps?.legal?.slice(0, 4) || takeUniquePosts(localCity, 4, usedSlugs, promoPriority())).map(
		(item) => ({
			...item,
			slug: item.guid || item.slug,
		}),
	);

	const ensured = ensureActivePromosOnHomepage(activePromos, usedSlugs, [
		{ key: "topSix", posts: topSix, limit: 6 },
		{ key: "pillFour", posts: pillFour, limit: 4 },
		{ key: "trendingSix", posts: trendingSix, limit: 6 },
		{ key: "picksDisplay", posts: picksDisplay, limit: 8 },
		{ key: "lifestyleList", posts: lifestyleList, limit: 10 },
		{ key: "stylePosts", posts: stylePosts, limit: 4 },
		{ key: "careerFeatured", posts: careerFeatured, limit: 2 },
	]);
	topSix = ensured.topSix;
	pillFour = ensured.pillFour;
	trendingSix = ensured.trendingSix;
	picksDisplay = ensured.picksDisplay;
	lifestyleList = ensured.lifestyleList;
	stylePosts = ensured.stylePosts;
	careerFeatured = ensured.careerFeatured;
	featuredMain = featuredMain || topSix[0];

	return (
		<div className="bn2-homepage h24-home">
			<h1 className="visually-hidden">{site.pageH1}</h1>

			{/* Top 6 – author byline grid */}
			{topSix.length > 0 && (
				<section className="soledad-container">
					<div className="h24-top-grid">
						{topSix.map((post) => {
							const img = getPostImageSrc(post);
							return (
								<article key={post.slug} className="h24-top-card">
									<Link href={getPostHref(post)} className="h24-top-card__link">
										<span className="h24-top-card__media">
											<ImageWithFallback
												src={img}
												alt={post.title}
												fill
												sizes="(max-width: 767px) 100vw, 33vw"
												unoptimized
												style={{ objectFit: "cover" }}
											/>
										</span>
										<span className="h24-top-card__title">{post.title}</span>
										<span className="h24-top-card__meta">
											de <span>{post.author_name || "Redacție"}</span> · {formatDate(post.date)}
										</span>
									</Link>
								</article>
							);
						})}
					</div>
				</section>
			)}

			{/* 4 headline pills */}
			{pillFour.length > 0 && (
				<section className="soledad-container">
					<div className="h24-pills">
						{pillFour.map((post) => (
							<Link key={post.slug} href={getPostHref(post)} className="h24-pills__item">
								{post.title}
							</Link>
						))}
					</div>
				</section>
			)}

			{/* Featured story + Trending Now */}
			{featuredMain && (
				<section className="soledad-container">
					<div className="h24-featured-row">
						<div className="h24-featured-main">
							<SoledadPostCard data={featuredMain} variant="hero" />
						</div>
						{trendingSix.length > 0 && (
							<aside className="h24-trending-box">
								<span className="h24-trending-box__label">Trending acum</span>
								<ul className="h24-trending-list">
									{trendingSix.map((post) => (
										<li key={post.slug}>
											<Link href={getPostHref(post)}>{post.title}</Link>
										</li>
									))}
								</ul>
							</aside>
						)}
					</div>
				</section>
			)}

			{/* Entertainment | Money */}
			{(entertainment.length > 0 || moneyList.length > 0) && (
				<section className="soledad-container">
					<div className="h24-dual-cols">
						<div>
							<h3 className="h24-dual-cols__title">
								<Link href="/categorie/evenimente-si-cultura">Evenimente &amp; cultură</Link>
							</h3>
							<LinkList items={entertainment} />
						</div>
						<div>
							<h3 className="h24-dual-cols__title">
								<Link href="/categorie/stiri-nationale-si-internationale">Știri naționale</Link>
							</h3>
							<LinkList items={moneyList} dense />
						</div>
					</div>
				</section>
			)}

			{/* Health */}
			{healthPosts.length > 0 && (
				<section className="h24-section h24-section--alt">
					<div className="soledad-container">
						<h2 className="h24-section__title">
							<Link href="https://sfaturidesanatate.ro" target="_blank" rel="noopener noreferrer">
								Sănătate
							</Link>
						</h2>
						<div className="h24-travel-grid">
							{healthPosts.map((post) => (
								<SoledadPostCard key={post.slug || post.link} data={post} variant="trending" />
							))}
						</div>
					</div>
				</section>
			)}

			{/* Latest Technology */}
			{techList.length > 0 && (
				<section className="h24-section">
					<div className="soledad-container">
						<h2 className="h24-section__title">
							<Link href="https://cautimasina.ro" target="_blank" rel="noopener noreferrer">
								Tehnologie &amp; auto
							</Link>
						</h2>
						<LongList items={techList.map((item) => ({ ...item, slug: item.guid || item.slug }))} />
					</div>
				</section>
			)}

			{/* Editor's Picks */}
			{picksDisplay.length > 0 && (
				<section className="h24-section h24-section--alt">
					<div className="soledad-container">
						<h2 className="h24-section__title">Alegerile redacției</h2>
						<div className="h24-picks-grid">
							{picksDisplay.slice(0, 8).map((post) => (
								<SoledadPostCard key={post.slug} data={post} variant="trending" />
							))}
						</div>
					</div>
				</section>
			)}

			{/* Travel */}
			{travelPosts.length > 0 && (
				<section className="h24-section">
					<div className="soledad-container">
						<h2 className="h24-section__title">
							<Link href="https://meritasamergi.ro" target="_blank" rel="noopener noreferrer">
								Călătorii
							</Link>
						</h2>
						<div className="h24-travel-grid">
							{travelPosts.map((post) => (
								<SoledadPostCard key={post.slug || post.link} data={post} variant="trending" />
							))}
						</div>
					</div>
				</section>
			)}

			{/* Life Style */}
			{lifestyleList.length > 0 && (
				<section className="h24-section h24-section--alt">
					<div className="soledad-container">
						<h2 className="h24-section__title">
							<Link href={`/categorie/${site.categorySlug}`}>Viață &amp; stil</Link>
						</h2>
						<LongList items={lifestyleList} />
					</div>
				</section>
			)}

			{/* Food & Cuisine */}
			{foodLead && (
				<section className="h24-topic-block h24-section--alt">
					<div className="soledad-container">
						<h2 className="h24-topic-block__head">
							<Link href="https://azicemancam.ro" target="_blank" rel="noopener noreferrer">
								Bucătărie &amp; rețete
							</Link>
						</h2>
						<div className="h24-food-layout">
							<div className="h24-food-layout__lead">
								<SoledadPostCard
									data={{
										...foodLead,
										slug: foodLead.guid || foodLead.slug,
										excerpt: (foodLead.summary || foodLead.description || "").replace(/<[^>]+>/g, "").substring(0, 200),
									}}
									variant="hero"
								/>
							</div>
							<div className="h24-mini-posts">
								{foodMinis.map((post) => (
									<article key={post.slug || post.link} className="h24-mini-post">
										<Link href={postHref(post)} className="h24-mini-post__title">
											{post.title}
										</Link>
										<span className="h24-mini-post__date">{formatDateShort(post.date || post.isoDate)}</span>
									</article>
								))}
							</div>
						</div>
					</div>
				</section>
			)}

			<TopicBlock title="Evenimente & cultură" lead={musicLead} minis={musicMinis} />
			<TopicBlock title="Sport & comunitate" lead={esportsLead} minis={esportsMinis} />
			<TopicBlock title="Divertisment" lead={movieLead} minis={movieMinis} />

			{/* Style & Trends */}
			{stylePosts.length > 0 && (
				<section className="h24-section">
					<div className="soledad-container">
						<h2 className="h24-section__title">Stil &amp; tendințe</h2>
						<div className="h24-style-row">
							{stylePosts.map((post) => (
								<SoledadPostCard key={post.slug} data={post} variant="trending" />
							))}
						</div>
					</div>
				</section>
			)}

			{/* Career */}
			{(careerFeatured.length > 0 || careerLinks.length > 0) && (
				<section className="h24-section h24-section--alt">
					<div className="soledad-container">
						<h2 className="h24-section__title">
							<Link href="https://ghidullegal.ro" target="_blank" rel="noopener noreferrer">
								Carieră &amp; drepturi
							</Link>
						</h2>
						<div className="h24-career-layout">
							{careerFeatured[0] && <SoledadPostCard data={careerFeatured[0]} variant="trending" />}
							{careerFeatured[1] && <SoledadPostCard data={careerFeatured[1]} variant="trending" />}
							<LinkList items={careerLinks} dense />
						</div>
					</div>
				</section>
			)}
		</div>
	);
};

export default Soledad24hNewsMagazine;
