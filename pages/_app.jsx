import RegisterProvider from '../contexts/RegisterProvider'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
	return (
		<RegisterProvider>
			<Component {...pageProps} />
		</RegisterProvider>
	)
}

export default MyApp
