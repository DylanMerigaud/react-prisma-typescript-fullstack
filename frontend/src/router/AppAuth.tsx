import React from 'react'
import Feed from './../components/post/Feed'

import { Route, Switch } from 'react-router-dom'
import NotFound from './components/NotFound'

import { useQuery } from 'react-apollo-hooks'

import gql from 'graphql-tag'

import MeContext from './../context/MeContext'

const AppAuth: React.FC = () => {
	const me = useQuery(ME_QUERY)

	console.log({ me })

	return (
		<MeContext.Provider value={me}>
			<Switch>
				<Route exact path="/" component={Feed} />
				<Route component={NotFound} />
			</Switch>
		</MeContext.Provider>
	)
}

const ME_QUERY = gql`
	query Me {
		me {
			id
			name
			role
		}
	}
`

export default AppAuth
