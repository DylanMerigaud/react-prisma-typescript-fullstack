import React from 'react'
import { useQuery } from 'react-apollo-hooks'

import Button from '@material-ui/core/Button'

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

interface DraftsQueryResponse {
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
  const draftsQuery = useQuery<DraftsQueryResponse>(DRAFTS_QUERY)

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
      <h1>Drafts</h1>
      {draftsQuery && draftsQuery.data && draftsQuery.data.drafts && (
        <PostList
          posts={draftsQuery.data.drafts.edges.map((e: any) => e.node)}
        />
      )}
      {get(draftsQuery, 'data.drafts.pageInfo.hasNextPage') && (
        <Button onClick={handleLoadMore}>Load More</Button>
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
