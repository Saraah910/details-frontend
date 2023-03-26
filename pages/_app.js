import Header from '@/components/header'
import '@/styles/globals.css'
import { MoralisProvider } from 'react-moralis'

export default function App({ Component, pageProps }) {

  return (
    <>
    
    <MoralisProvider initializeOnMount={false}>
      <Header/>
      <Component {...pageProps} />
    </MoralisProvider>
    </>
    
  )
}
