// require('../mocks').mount(process.env.NEXT_PUBLIC_API_MOCKING === 'enabled')

import { ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/app'

import { apolloClient, ChakraProvider } from '../client'

import './app.css'

function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  )
}

export default App
