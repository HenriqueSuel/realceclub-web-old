import { ChakraProvider } from '@chakra-ui/react'

import { theme } from '../styles/theme';
import { AppProps } from 'next/app'
import { AlertProvider } from '../contexts/AlertContext';
import Alerts from '../components/alerts';
import { AuthProvider } from '../contexts/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <AlertProvider>
          <Alerts />
          <Component {...pageProps} />
        </AlertProvider>
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
