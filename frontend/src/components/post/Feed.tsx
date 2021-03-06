import React, { useCallback } from 'react'
import { useQuery } from 'react-apollo-hooks'

import Button from '@material-ui/core/Button'

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
  const feedQuery = useQuery<FeedQueryResponse>(FEED_QUERY)

  const handleLoadMore = useCallback(() => {
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
  }, [feedQuery])

  return (
    <div>
      <h1>Feed</h1>
      {feedQuery.data && feedQuery.data.feed && (
        <PostList posts={feedQuery.data.feed.edges.map((e) => e.node)} />
      )}
      {get(feedQuery, 'data.feed.pageInfo.hasNextPage') && (
        <Button onClick={handleLoadMore}>Load More</Button>
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
