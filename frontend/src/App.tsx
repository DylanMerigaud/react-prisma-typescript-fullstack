import React, { useState, useEffect } from 'react'

import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { onError } from 'apollo-link-error'
import { withClientState } from 'apollo-link-state'
import { ApolloLink, Observable } from 'apollo-link'

import { ApolloProvider } from 'react-apollo'

import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'

import Layout from './components/layout/Layout'

const cache = new InMemoryCache({
	cacheRedirects: {
		Query: {
			movie: (_, { id }, { getCacheKey }) => getCacheKey({ __typename: 'Movie', id })
		}
	}
})

const request = async (operation: any) => {
	const token = localStorage.getItem('token')
	operation.setContext({
		headers: {
			authorization: 'Bearer ' + token
		}
	})
}

const requestLink = new ApolloLink(
	(operation, forward) =>
		new Observable((observer) => {
			let handle: any
			Promise.resolve(operation)
				.then((oper) => request(oper))
				.then(() => {
					handle =
						forward &&
						forward(operation).subscribe({
							next: observer.next.bind(observer),
							error: observer.error.bind(observer),
							complete: observer.complete.bind(observer)
						})
				})
				.catch(observer.error.bind(observer))

			return () => {
				if (handle) handle.unsubscribe()
			}
		})
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
				isConnected: true
			},
			resolvers: {
				Mutation: {
					updateNetworkStatus: (_: any, { isConnected }: any, { cache }: any) => {
						cache.writeData({ data: { isConnected } })
						return null
					}
				}
			},
			cache
		}),
		new HttpLink({
			uri: 'https://w5xlvm3vzz.lp.gql.zone/graphql',
			credentials: 'include'
		})
	]),
	cache
})

const App: React.FC = () => {
	return (
		<ApolloProvider client={client}>
			<ApolloHooksProvider client={client}>
				<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
				<Layout />
			</ApolloHooksProvider>
		</ApolloProvider>
	)
}

export default App
