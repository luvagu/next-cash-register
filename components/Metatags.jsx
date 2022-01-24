import Head from 'next/head'

const defaultPageTile = 'IMP - Caja Registradora'

function Metatags({ pageTitle }) {
	return (
		<Head>
			<title>
				{pageTitle ? `${title} | ${defaultPageTile}` : defaultPageTile}
			</title>
			<meta
				name='description'
				content='Virtual Cash Register app built with Next.js, Auth0, FaunaDb and Tailwind CSS'
			/>
			<meta name='author' content='@luvagu' />
			<meta charSet='UTF-8' />
			<meta
				name='viewport'
				content='width=device-width, initial-scale=1.0, shrink-to-fit=no'
			/>
		</Head>
	)
}

export default Metatags
