import React from 'react'
import { useQuery } from 'react-apollo-hooks'
import useReactRouter from 'use-react-router'

import gql from 'graphql-tag'

import PostType from './../../types/Post'

import PostList from './PostList'

interface FeedQueryResponse {
  feed: [PostType]
}

const Feed: React.FC = () => {
  const { history } = useReactRouter()

  const feedQuery = useQuery(FEED_QUERY)

  console.log('feedQuery: ', feedQuery)

  return (
    <div>
      <button
        onClick={() => {
          localStorage.removeItem('token')
          history.push('/login')
        }}
      >
        logout
      </button>
      {feedQuery.data && feedQuery.data.feed && (
        <PostList posts={feedQuery.data.feed} />
      )}
    </div>
  )
}

const FEED_QUERY = gql`
  query Feed {
    feed {
      id
      title
      author {
        id
        name
      }
    }
  }
`

export default Feed
