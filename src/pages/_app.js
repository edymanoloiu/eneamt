import "bootstrap/dist/css/bootstrap.css";
import "../styles/style.css";
import "../styles/breaking-news-2.css";
import "../styles/24h-news-magazine.css";
import Script from "next/script";
import ConsentFooter from "../components/consentFooter";
import { useRouter } from "next/router";
import { useEffect } from "react";

const themeInitScript = `
	(function () {
		try {
			var storedTheme = localStorage.getItem('azi-theme');
			var systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			var theme = storedTheme || (systemPrefersDark ? 'dark' : 'light');
			document.documentElement.dataset.theme = theme;
		} catch (error) {
			document.documentElement.dataset.theme = 'light';
		}
	})();
`;

const GA_ID = "G-FL2BLLX9PN";

function MyApp({ Component, pageProps }) {
	const router = useRouter();

	useEffect(() => {
		document.body.classList.add("bn2-theme");
		return () => document.body.classList.remove("bn2-theme");
	}, []);

	useEffect(() => {
		const loadLink = (href) => {
			const link = document.createElement("link");
			link.rel = "stylesheet";
			link.href = href;
			document.head.appendChild(link);
		};
		loadLink("/css/fontawesome-all.min.css");
		loadLink("/css/iconfont.css");
		loadLink(
			"https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800&family=Roboto:ital,wght@0,300;0,400;0,500;0,700;0,900;1,300;1,400;1,500;1,700;1,900&display=swap",
		);
	}, []);

	useEffect(() => {
		const handleRouteChange = (url) => {
			if (typeof window.gtag === "function") {
				window.gtag("config", GA_ID, { page_path: url });
			}
		};
		router.events.on("routeChangeComplete", handleRouteChange);
		return () => router.events.off("routeChangeComplete", handleRouteChange);
	}, [router.events]);

	return (
		<>
			<Script id="theme-init" strategy="beforeInteractive">
				{themeInitScript}
			</Script>
			<Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
			<Script
				src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8393185642530610"
				strategy="lazyOnload"
				crossOrigin="anonymous"
			/>
			<Script id="google-analytics" strategy="afterInteractive">
				{`
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('consent', 'default', {
						'ad_storage': 'granted',
						'analytics_storage': 'granted',
						'functionality_storage': 'granted',
						'personalization_storage': 'granted',
						'security_storage': 'granted'
					});

					gtag('config', '${GA_ID}', { page_path: window.location.pathname });
				`}
			</Script>
			<ConsentFooter />
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
