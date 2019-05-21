import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ ...rest }) => {
  const token = localStorage.getItem('token')
  return !token ? <Route {...rest} /> : <Redirect to="/" />
}

export default PrivateRoute
