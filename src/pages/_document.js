import { Html, Head, Main, NextScript } from 'next/document'

const Document = () => {
	return (
		<Html lang="ro">
			<Head>
			<link legacyBehavior rel="preconnect" href="https://fonts.googleapis.com" />
			<link legacyBehavior rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
			{/* <script id="Cookiebot" src="https://consent.cookiebot.com/uc.js" data-cbid="b1b020f5-6ddf-4684-9ebb-d8419e756ca3" type="text/javascript" async></script> */}
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}

export default Document;