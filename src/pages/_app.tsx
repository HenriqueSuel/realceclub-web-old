import { ChakraProvider } from '@chakra-ui/react'

import { theme } from '../styles/theme';
import { AppProps } from 'next/app'
import { AlertProvider } from '../contexts/AlertContext';
import { LoadingProvider, useLoading } from '../contexts/LoadingContext';
import Alerts from '../components/alerts';
import { AuthProvider } from '../contexts/AuthContext';
import LoadingPage from '../components/Loading';

function MyApp({ Component, pageProps }: AppProps) {


  return (
    <ChakraProvider theme={theme}>
      <LoadingProvider>
        <AuthProvider>
          <AlertProvider>
            <Alerts />
            <LoadingPage />
            <Component {...pageProps} />
          </AlertProvider>
        </AuthProvider>
      </LoadingProvider>
    </ChakraProvider >
  )
}

export default MyApp;
