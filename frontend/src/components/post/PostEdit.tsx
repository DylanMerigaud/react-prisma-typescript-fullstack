import React, { useState, useContext } from 'react'
import { Formik, FormikActions } from 'formik'

import TextField from '@material-ui/core/TextField'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'

import gql from 'graphql-tag'
import { useMutation, useApolloClient, useQuery } from 'react-apollo-hooks'

import * as Yup from 'yup'

import useReactRouter from 'use-react-router'

import PostType from './../../types/Post'

import MeContext from './../../context/MeContext'

const PostCreateSchema = Yup.object().shape({
	title: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required')
})

interface Props {}

interface Form {
	title: string
}
type FormValues = Record<keyof Form, string>

interface PostQueryResponse {
	post: PostType
}

interface updatePostMutationResponse {
	updatePost: PostType
}

interface MatchParam {
	id: string
}

const PostEdit: React.FC<Props> = ({}) => {
	const createDraftMutation = useMutation<updatePostMutationResponse>(UPDATE_POST_MUTATION)
	const { history, match } = useReactRouter<MatchParam>()
	const [ error, setError ] = useState<string>()

	const client = useApolloClient()
	const postQuery = useQuery<PostQueryResponse>(POST_QUERY, {
		variables: {
			where: {
				id: match.params.id
			}
		}
	})

	const handleSubmit = (values: FormValues, { setSubmitting }: FormikActions<FormValues>) => {
		if (!postQuery || !postQuery.data || !postQuery.data.post) return

		setError(undefined)
		createDraftMutation({
			variables: {
				data: {
					title: values.title
				},
				where: {
					id: postQuery.data.post.id
				}
			}
		})
			.then((res) => {
				if (!res.data) return
				client
					.resetStore()
					.then(() => history.push(postQuery.data && postQuery.data.post.published ? '/' : '/drafts')) // TODO wtf typescript
			})
			.catch((e) => {
				console.error(e)
				setError(e.message)
				setSubmitting(false)
			})
	}

	if (!postQuery || !postQuery.data) return <div>ERROR</div>

	if (postQuery.loading) return <div>Loading</div>

	if (postQuery.error) return <div>Post query error: {postQuery.error.message}</div> // TODO Error || Loading

	if (!postQuery.data.post) return <div>Post not found</div>

	return (
		<Box p={1} clone>
			<Paper>
				<h1>Update {postQuery.data.post.published ? 'Post' : 'Draft'}</h1>
				<Formik
					initialValues={{ title: postQuery.data.post.title }}
					validationSchema={PostCreateSchema}
					onSubmit={handleSubmit}>
					{({
						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						handleSubmit,
						isSubmitting
						/* and other goodies */
					}) => (
						<Box display="flex" flexDirection="column" clone>
							<form onSubmit={handleSubmit}>
								<TextField
									type="title"
									name="title"
									placeholder="title"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.title}
								/>
								{errors.title && touched.title && errors.title}
								<Button type="submit" disabled={isSubmitting}>
									Save
								</Button>
							</form>
						</Box>
					)}
				</Formik>
				{error}
			</Paper>
		</Box>
	)
}

const POST_QUERY = gql`
	query Post($where: PostWhereUniqueInput!) {
		post(where: $where) {
			id
			title
			author {
				id
				name
			}
			published
		}
	}
`

const UPDATE_POST_MUTATION = gql`
	mutation UpdatePost($data: PostUpdateInput!, $where: PostWhereUniqueInput!) {
		updatePost(data: $data, where: $where) {
			id
			title
			author {
				id
				name
			}
		}
	}
`

export default PostEdit
