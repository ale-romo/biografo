import '../styles/globals.css'
import type { AppProps } from 'next/app'
import BasicLayout from "layout/Basic";
import UserProvider from 'components/Session/user';


function MyApp({ Component, pageProps }: AppProps) {
  return <UserProvider>
    <BasicLayout>
      <Component {...pageProps} />
    </BasicLayout>
  </UserProvider>
}

export default MyApp
