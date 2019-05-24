import React, { useContext } from 'react'
import MeQueryContext from '../../context/MeQueryContext'

const Profile = () => {
  const meQuery = useContext(MeQueryContext)

  if (!meQuery || !meQuery.data) return <div>Error</div>
  if (meQuery.loading) return <div>Loading</div>
  if (meQuery.error) return <div>{meQuery.error.message}</div>

  return (
    <div>
      <h2>{meQuery.data.me.name}</h2>
      <p>{meQuery.data.me.email}</p>
    </div>
  )
}

export default Profile
