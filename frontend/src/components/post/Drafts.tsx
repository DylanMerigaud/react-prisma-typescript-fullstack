import React from 'react'
import { useQuery } from 'react-apollo-hooks'
import useReactRouter from 'use-react-router'

import gql from 'graphql-tag'

import PostType from './../../types/Post'

import PostList from './PostList'

interface FeedQueryResponse {
	drafts: [PostType]
}

const Drafts: React.FC = () => {
	const { history } = useReactRouter()

	const draftsQuery = useQuery(DRAFTS_QUERY)

	console.log('draftsQuery: ', draftsQuery)

	return (
		<div>
			<button
				onClick={() => {
					localStorage.removeItem('token')
					history.push('/login')
				}}>
				logout
			</button>
			{draftsQuery.data && draftsQuery.data.drafts && <PostList posts={draftsQuery.data.drafts} />}
		</div>
	)
}

const DRAFTS_QUERY = gql`
	query Drafts {
		drafts {
			id
			title
			author {
				id
				name
			}
		}
	}
`

export default Drafts
