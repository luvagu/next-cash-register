import { Fragment } from 'react'
import Metatags from './Metatags'

function Layout({ children, pageTitle }) {
	return (
		<Fragment>
			<Metatags pageTitle={pageTitle} />
			<div className='relative h-screen overflow-x-hidden'>{children}</div>
		</Fragment>
	)
}

export default Layout
