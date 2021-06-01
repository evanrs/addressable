import React from 'react'
import { render as __render } from '@testing-library/react'
import { ApolloProvider } from '@apollo/client'
import { apolloClient, ChakraProvider } from '../../client'

export * from '@testing-library/react'

// TODO remove fragment when types are corrected
const Providers: React.FC = ({ children }) => (
  <ApolloProvider client={apolloClient}>
    <ChakraProvider>{children}</ChakraProvider>
  </ApolloProvider>
)

export const render = (root: React.ReactElement, options = {}) =>
  __render(root, { wrapper: Providers, ...options })
