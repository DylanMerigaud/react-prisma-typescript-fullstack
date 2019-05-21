import React from 'react'
import { QueryHookResult } from 'react-apollo-hooks'
import { OperationVariables } from 'apollo-client'

import UserType from './../types/User'

export interface MeQueryResponse {
  me: UserType
}

export default React.createContext<
  QueryHookResult<MeQueryResponse, OperationVariables> | undefined
>(undefined)
