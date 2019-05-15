import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'

import { AUTH_TOKEN } from './constants/auth'

import { ApolloLink } from 'apollo-client-preset'

import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks'

const wsLink = new WebSocketLink({
	uri: 'ws://localhost:4000/',
	options: {
		reconnect: true
	}
})
const httpLink = new HttpLink({ uri: 'http://localhost:4000' })

const middlewareAuthLink = new ApolloLink((operation, forward) => {
	const token = localStorage.getItem(AUTH_TOKEN)
	const authorizationHeader = token ? `Bearer ${token}` : null
	operation.setContext({
		headers: {
			authorization: authorizationHeader
		}
	})
	return forward(operation)
})

const httpLinkWithAuthToken = middlewareAuthLink.concat(httpLink)

const link = split(
	({ query }) => {
		const { kind, operation } = getMainDefinition(query)
		return kind === 'OperationDefinition' && operation === 'subscription'
	},
	wsLink,
	httpLinkWithAuthToken
)

const client = new ApolloClient({
	link,
	cache: new InMemoryCache()
})

ReactDOM.render(
	<ApolloProvider client={client}>
		<ApolloHooksProvider client={client}>
			<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
			<App />
		</ApolloHooksProvider>
	</ApolloProvider>,
	document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
