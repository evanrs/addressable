import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'

const cache = new InMemoryCache()

const link = new HttpLink({
  uri: 'http://api.staging.updater.com/graphql',
  headers: {
    // 'access-token': `mdyZLf5vphENjcdpkZ-VpQ`,
    // client: `tZmRsp7breugP8BBCC3q7A`,
    app: `mover`,
  },

  // Use explicit `window.fetch` so tha outgoing requests
  // are captured and deferred until the Service Worker is ready.
  fetch: (...args) => fetch(...args),
})

// Isolate Apollo client so it could be reused
// in both application runtime and tests.
export const apolloClient = new ApolloClient({
  cache,
  link,
})
