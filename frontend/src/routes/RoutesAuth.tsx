import React from 'react'

import { Route, Switch } from 'react-router-dom'
import NotFound from './../components/NotFound'

import { useQuery } from 'react-apollo-hooks'

import gql from 'graphql-tag'

import AuthRoute from './../components/AuthRoute'
import AuthLayout from './../components/layout/AuthLayout'

import Feed from './../components/post/Feed'
import Drafts from './../components/post/Drafts'
import PostCreate from './../components/post/PostCreate'
import PostDetail from './../components/post/PostDetail'
import PostEdit from './../components/post/PostEdit'

import MeQueryContext from './../context/MeQueryContext'

import UserType from './../types/User'

interface MeQueryResponse {
  data: {
    me: UserType
  }
  error: {
    message: string
  }
  loading: boolean
}

const RoutesAuth: React.FC = () => {
  const meQuery = useQuery<MeQueryResponse>(ME_QUERY)

  console.log({ meQuery })

  return (
    <MeQueryContext.Provider value={meQuery}>
      <AuthLayout>
        <Switch>
          <AuthRoute exact path="/" component={Feed} />
          <AuthRoute exact path="/drafts" component={Drafts} />
          <AuthRoute exact path="/create" component={PostCreate} />
          <AuthRoute path="/post/:id/edit" component={PostEdit} />
          <AuthRoute path="/post/:id" component={PostDetail} />
          <Route component={NotFound} />
        </Switch>
      </AuthLayout>
    </MeQueryContext.Provider>
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

export default RoutesAuth
