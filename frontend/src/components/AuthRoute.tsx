import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const AuthRoute = ({ ...rest }) => {
  const token = localStorage.getItem('token')
  return token ? <Route {...rest} /> : <Redirect to="/login" />
}

export default AuthRoute
