import React from 'react'
import { getAccessToken } from '../../utils/StorageUtils'
import { Route, Redirect } from 'react-router-dom'
import { PROJECT_SIGN_IN_PATH } from '../../../Authentication/constants/routeConstants'

export const ProtectedRoute = (props: any) => {
   const isUserLoggedIn = Boolean(getAccessToken())
   return isUserLoggedIn ? (
      <Route {...props} />
   ) : (
      <Redirect to={{ pathname: PROJECT_SIGN_IN_PATH }} />
   )
}
