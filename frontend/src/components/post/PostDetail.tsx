import React, { useState } from 'react'
import PropTypes from 'prop-types'

import PostType from './../../types/Post'

import Button from '@material-ui/core/Button'

import { Link } from 'react-router-dom'

import { useMutation, useApolloClient, useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'

import useReactRouter from 'use-react-router'

interface PostQueryResponse {
	post: PostType
}

interface PublishMutationResponse {
	publish: PostType
}

interface MatchParam {
	id: string
}

const PostDetail: React.FC = () => {
	const [ error, setError ] = useState()
	const { match, history } = useReactRouter<MatchParam>()
	const client = useApolloClient()

	const postQuery = useQuery<PostQueryResponse>(POST_QUERY, {
		variables: {
			where: { id: match.params.id }
		}
	})

	const publishMutation = useMutation<PublishMutationResponse>(PUBLISH_MUTATION)

	const handlePublish = () => {
		if (!postQuery.data) return

		publishMutation({
			variables: {
				id: postQuery.data.post.id
			}
		})
			.then(() => {
				client.resetStore().then(() => history.push('/'))
			})
			.catch((e) => {
				setError(e.message)
			})
	}

	console.log('PostDetail: ', postQuery)

	if (!postQuery || !postQuery.data) return <div>ERROR</div>

	if (postQuery.loading) return <div>Loading</div>

	if (postQuery.error) return <div>Post query error: {postQuery.error.message}</div> // TODO Error || Loading

	if (!postQuery.data.post) return <div>Post not found</div>

	return (
		<div>
			<h3>{postQuery.data.post.title}</h3>
			<Button component={Link} to={'/post/' + postQuery.data.post.id + '/edit'}>
				Edit
			</Button>
			{!postQuery.data.post.published && <Button onClick={handlePublish}>Publish</Button>}
			{error}
		</div>
	)
}

const PUBLISH_MUTATION = gql`
	mutation Publish($id: ID!) {
		publish(id: $id) {
			id
			title
		}
	}
`

const POST_QUERY = gql`
	query Post($where: PostWhereUniqueInput!) {
		post(where: $where) {
			id
			title
			published
			author {
				id
				name
			}
		}
	}
`

export default PostDetail
