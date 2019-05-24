import React, { useState, useContext } from 'react'

import PostType from './../../types/Post'

import Button from '@material-ui/core/Button'

import { Link } from 'react-router-dom'

import { useMutation, useApolloClient, useQuery } from 'react-apollo-hooks'
import gql from 'graphql-tag'

import useReactRouter from 'use-react-router'
import MeQueryContext from '../../context/MeQueryContext'
import DialogConfirmDelete from './DialogConfirmDelete'

interface PostQueryResponse {
  post: PostType
}

interface PublishMutationResponse {
  publish: PostType
}

interface DeleteMutationResponse {
  deletePost: PostType
}

interface MatchParam {
  id: string
}

const PostDetail: React.FC = () => {
  const [error, setError] = useState()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const { match, history } = useReactRouter<MatchParam>()
  const client = useApolloClient()
  const meQuery = useContext(MeQueryContext)

  const postQuery = useQuery<PostQueryResponse>(POST_QUERY, {
    variables: {
      where: { id: match.params.id },
    },
  })

  const publishMutation = useMutation<PublishMutationResponse>(PUBLISH_MUTATION)

  const deleteMutation = useMutation<DeleteMutationResponse>(DELETE_MUTATION)

  const handlePublish = () => {
    if (!postQuery.data) return

    publishMutation({
      variables: {
        id: postQuery.data.post.id,
      },
    })
      .then(() => {
        client.resetStore().then(() => history.push('/'))
      })
      .catch((e) => {
        setError(e.message)
      })
  }

  const handleDelete = () => {
    if (!postQuery.data) return

    deleteMutation({
      variables: {
        where: { id: postQuery.data.post.id },
      },
    })
      .then(() => {
        client.resetStore().then(() => {
          history.push(
            postQuery.data && postQuery.data.post.published ? '/' : '/drafts',
          )
          handleDeleteDialogClose()
        })
      })
      .catch((e) => {
        setError(e.message)
      })
  }

  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false)
  }

  const handleDeleteDialogOpen = () => {
    setIsDeleteDialogOpen(true)
  }

  console.log('PostDetail: ', postQuery)

  if (!meQuery || !meQuery.data || !postQuery || !postQuery.data)
    return <div>ERROR</div>
  if (meQuery.loading || postQuery.loading) return <div>Loading</div>
  if (postQuery.error)
    return <div>Post query error: {postQuery.error.message}</div> // TODO Error || Loading
  if (meQuery.error) return <div>Me query error: {meQuery.error.message}</div>
  if (!postQuery.data.post) return <div>Post not found</div>

  const isOwner = postQuery.data.post.author.id === meQuery.data.me.id

  return (
    <div>
      <h3>{postQuery.data.post.title}</h3>
      {isOwner && (
        <Button
          component={Link}
          to={'/post/' + postQuery.data.post.id + '/edit'}
        >
          Edit
        </Button>
      )}
      {isOwner && !postQuery.data.post.published && (
        <Button onClick={handlePublish}>Publish</Button>
      )}
      {isOwner && <Button onClick={handleDeleteDialogOpen}>Delete</Button>}
      {error}
      <DialogConfirmDelete
        title={postQuery.data.post.title}
        open={isDeleteDialogOpen}
        onClose={handleDeleteDialogClose}
        onConfirm={handleDelete}
      />
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

const DELETE_MUTATION = gql`
  mutation DeletePost($where: PostWhereUniqueInput!) {
    deletePost(where: $where) {
      id
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
