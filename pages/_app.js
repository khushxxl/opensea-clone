import NFTProvider from '../context/NFTContext'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <NFTProvider>
      <Component {...pageProps} />
    </NFTProvider>
  )
}

export default MyApp
