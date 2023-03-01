import '../styles/globals.css'
import type { AppProps } from 'next/app'
import BasicLayout from "layout/Basic";
import AuthProvider from 'components/User/userContext';


function MyApp({ Component, pageProps }: AppProps) {
  return <AuthProvider>
    <BasicLayout>
      <Component {...pageProps} />
    </BasicLayout>
  </AuthProvider>
}

export default MyApp
