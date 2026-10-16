import { getAllPosts } from "../../lib/api";
import { getHomepagePosts } from "../../lib/homepagePostsIndex";
import { fetchPartnerSitemaps } from "../../lib/partnerRssFeeds";
import { isRecomandarePost, dedupePostsBySlug } from "../../lib/recomandarePosts";
import { buildLocalPostsWithPromos, sortPostsByDate } from "../../lib/homepagePosts";
import HeadMeta from "../components/elements/HeadMeta";
import FooterOne from "../components/footer/FooterOne";
import HeaderOne from "../components/header/HeaderOne";
import Soledad24hNewsMagazine from "../components/soledad/Soledad24hNewsMagazine";
import publication from "../data/publication";
import site from "../data/soledadSite";
import { isLocalNewsCate } from "../utils/categories";

const HomeOne = ({ allPosts, sitemaps }) => {
	const uniquePosts = dedupePostsBySlug(allPosts);
	const localPosts = buildLocalPostsWithPromos(uniquePosts, site.localCate);

	const culturePosts = uniquePosts
		.filter((a) => a.cate === "Evenimente si cultura")
		.sort((a, b) => new Date(b.date) - new Date(a.date));
	const nationalPosts = sitemaps?.pc ?? [];

	return (
		<>
			<HeadMeta
				fullPageTitle={publication.seo.title}
				metaDesc={publication.seo.description}
				ogTitle={publication.seo.openGraph.title}
				ogDescription={publication.seo.openGraph.description}
				twitterTitle={publication.seo.twitter.title}
				twitterDescription={publication.seo.twitter.description}
			/>
			<HeaderOne />
			<Soledad24hNewsMagazine
				localPosts={localPosts}
				culturePosts={culturePosts}
				nationalPosts={nationalPosts}
				sitemaps={sitemaps}
			/>
			<FooterOne />
		</>
	);
};

export default HomeOne;



export async function getServerSideProps({ res }) {
	if (res) {
		res.setHeader(
			"Cache-Control",
			"public, s-maxage=300, stale-while-revalidate=86400",
		);
		res.setHeader(
			"CDN-Cache-Control",
			"public, s-maxage=300, stale-while-revalidate=86400",
		);
	}


	const posts = (await getHomepagePosts()).filter((post) => !isRecomandarePost(post));

	const takeLatest = (predicate, limit = 30) =>
		sortPostsByDate(posts.filter(predicate)).slice(0, limit);

	const allPosts = [
		...takeLatest((a) => a.cate === "Evenimente si cultura"),
		...takeLatest((a) => isLocalNewsCate(a.cate)),
		...takeLatest((a) => a.cate === "Stiri nationale si internationale"),
		...takeLatest((a) => a.isPromo),
	];

	const sitemaps = await fetchPartnerSitemaps();
const cmItems = await fetchCautiMasinaItems(new Parser({ timeout: 8000 }), 6);

	return {
		props: {
			allPosts,
			sitemaps,
		},
	};
}
