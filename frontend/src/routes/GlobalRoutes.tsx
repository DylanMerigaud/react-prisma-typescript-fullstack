import React from 'react'
import { Switch } from 'react-router-dom'

import RoutesAuth from './RoutesAuth'

import Login from './../components/auth/Login'
import Signup from './../components/auth/Signup'

import NoAuthRoute from './../components/NoAuthRoute'

const GlobalRoutes: React.FC = () => {
  return (
    <Switch>
      <NoAuthRoute path="/login" component={Login} />
      <NoAuthRoute path="/signup" component={Signup} />
      <RoutesAuth />
    </Switch>
  )
}

export default GlobalRoutes
