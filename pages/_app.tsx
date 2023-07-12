import Providers from '../redux/store/provider'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";   
import "/node_modules/primeflex/primeflex.css"  
import 'primeicons/primeicons.css';
        

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  )
}
