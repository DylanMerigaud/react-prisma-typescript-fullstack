import React from 'react'

import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { withClientState } from 'apollo-link-state'
import { ApolloLink, Observable, Operation } from 'apollo-link'

import { ApolloProvider } from 'react-apollo'

import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'

import Layout from './components/layout/Layout'

const cache = new InMemoryCache({
  cacheRedirects: {
    Query: {
      movie: (_, { id }, { getCacheKey }) =>
        getCacheKey({ __typename: 'Movie', id }),
    },
  },
})

const request = async (operation: Operation) => {
  const token = localStorage.getItem('token')
  operation.setContext({
    headers: {
      authorization: 'Bearer ' + token,
    },
  })
}

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle: ZenObservable.Subscription | undefined
      Promise.resolve(operation)
        .then((oper) => request(oper))
        .then(() => {
          handle = !!forward
            ? forward(operation).subscribe({
                next: observer.next.bind(observer),
                error: observer.error.bind(observer),
                complete: observer.complete.bind(observer),
              })
            : undefined
        })
        .catch(observer.error.bind(observer))

      return () => {
        if (handle) handle.unsubscribe()
      }
    }),
)

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        // sendToLoggingService(graphQLErrors);
      }
      if (networkError) {
        // logoutUser();
      }
    }),
    requestLink,
    withClientState({
      defaults: {
        isConnected: true,
      },
      resolvers: {
        Mutation: {
          updateNetworkStatus: (
            _: undefined,
            { isConnected }: { isConnected: boolean },
            {
              cache,
            }: {
              cache: {
                writeData: (data: { data: { isConnected: boolean } }) => void
              }
            },
          ) => {
            cache.writeData({ data: { isConnected } })
            return null
          },
        },
      },
      cache,
    }),
    new HttpLink({
      uri: 'http://localhost:4000/graphql',
      // credentials: 'include' TODO: what is include
    }),
  ]),
  cache,
})

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <ApolloHooksProvider client={client}>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <Layout />
      </ApolloHooksProvider>
    </ApolloProvider>
  )
}

export default App
