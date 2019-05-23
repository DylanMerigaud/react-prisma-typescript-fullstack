import React from 'react'
import { useQuery } from 'react-apollo-hooks'
import useReactRouter from 'use-react-router'

import gql from 'graphql-tag'
import get from 'lodash.get'

import PostType from './../../types/Post'

import PostList from './PostList'

interface FeedQueryResponse {
  feed: {
    pageInfo: {
      hasNextPage: boolean
      endCursor: string
    }
    edges: {
      node: PostType
    }[]
    aggregate: {
      count: number
    }
  }
}

const Feed: React.FC = () => {
  const { history } = useReactRouter()

  const feedQuery = useQuery<FeedQueryResponse>(FEED_QUERY)

  console.log('feedQuery: ', feedQuery)

  const handleLoadMore = () => {
    if (!feedQuery || !feedQuery.data || !feedQuery.data.feed) return
    feedQuery.fetchMore({
      variables: {
        after: feedQuery.data.feed.pageInfo.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult
        }
        return {
          feed: {
            __typename: 'PostConnection',
            aggregate: fetchMoreResult.feed.aggregate,
            pageInfo: fetchMoreResult.feed.pageInfo,
            edges: [
              ...previousResult.feed.edges,
              ...fetchMoreResult.feed.edges,
            ],
          },
        }
      },
    })
  }

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
        <PostList posts={feedQuery.data.feed.edges.map((e) => e.node)} />
      )}
      {get(feedQuery, 'data.feed.pageInfo.hasNextPage') && (
        <button onClick={handleLoadMore}>loadMore</button>
      )}
    </div>
  )
}

const FEED_QUERY = gql`
  query Feed(
    $after: String
    $orderBy: PostOrderByInput
    $where: PostWhereInput
    $skip: Int
  ) {
    feed(
      after: $after
      orderBy: $orderBy
      where: $where
      first: 5
      skip: $skip
    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        node {
          id
          title
          author {
            id
            name
          }
        }
      }
      aggregate {
        count
      }
    }
  }
`

export default Feed
