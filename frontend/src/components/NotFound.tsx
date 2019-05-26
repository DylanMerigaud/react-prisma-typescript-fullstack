import React from 'react'
import { Redirect } from 'react-router'

const NotFound: React.FC = (props) => {
  if (!localStorage.getItem('token')) return <Redirect to="/login" />

  return <div>Not Found</div>
}

export default NotFound
