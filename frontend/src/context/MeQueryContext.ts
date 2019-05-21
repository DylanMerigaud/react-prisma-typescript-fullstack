import React from 'react'

import UserType from './../types/User'

interface MeQueryType {
  data: {
    me: UserType
  }
  error: {
    message: string
  }
  loading: boolean
}

export default React.createContext<MeQueryType | undefined>(undefined)
