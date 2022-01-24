import { Fragment } from 'react'
import Metatags from './Metatags'

function Layout({ children, pageTitle }) {
	return (
		<Fragment>
			<Metatags pageTitle={pageTitle} />
			<div className='container max-w-7xl mx-auto my-4 px-4 md:px-6'>
				{children}
			</div>
		</Fragment>
	)
}

export default Layout
