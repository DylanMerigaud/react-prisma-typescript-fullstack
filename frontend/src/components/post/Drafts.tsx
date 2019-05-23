import React from 'react'
import { useQuery } from 'react-apollo-hooks'
import useReactRouter from 'use-react-router'

import gql from 'graphql-tag'
import get from 'lodash.get'

import PostType from './../../types/Post'

import PostList from './PostList'

interface FeedQueryResponse {
  drafts: {
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

const Drafts: React.FC = () => {
  const { history } = useReactRouter()

  const draftsQuery = useQuery(DRAFTS_QUERY)

  console.log('draftsQuery: ', draftsQuery)

  const handleLoadMore = () => {
    if (!draftsQuery || !draftsQuery.data || !draftsQuery.data.drafts) return
    draftsQuery.fetchMore({
      variables: {
        after: draftsQuery.data.drafts.pageInfo.endCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return previousResult
        }
        return {
          drafts: {
            __typename: 'PostConnection',
            aggregate: fetchMoreResult.drafts.aggregate,
            pageInfo: fetchMoreResult.drafts.pageInfo,
            edges: [
              ...previousResult.drafts.edges,
              ...fetchMoreResult.drafts.edges,
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
      {draftsQuery.data &&
        // @ts-ignore
        draftsQuery.data.drafts && (
          <PostList posts={draftsQuery.data.drafts.edges.map((e) => e.node)} />
        )}
      {get(draftsQuery, 'data.drafts.pageInfo.hasNextPage') && (
        <button onClick={handleLoadMore}>loadMore</button>
      )}
    </div>
  )
}

const DRAFTS_QUERY = gql`
  query Drafts(
    $after: String
    $orderBy: PostOrderByInput
    $where: PostWhereInput
    $skip: Int
  ) {
    drafts(
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

export default Drafts
