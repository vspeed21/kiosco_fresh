import '../styles/globals.css'
import { KioscoProvider } from '../src/context/KioscoProvider'

function MyApp({ Component, pageProps }) {
  return (
    <KioscoProvider>
      <Component {...pageProps} />
    </KioscoProvider>
  )
}

export default MyApp
