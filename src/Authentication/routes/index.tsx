import React from 'react'
import { Route } from 'react-router-dom'

import { PROJECT_SIGN_IN_PATH } from '../constants/routeConstants'
import { SignInRoute } from './SignInRoute'
// import { ProtectedRoute } from '../../Common/utils/ProtectedRoute'

const authRoutes = [
   <Route
      key={PROJECT_SIGN_IN_PATH}
      exact
      path={PROJECT_SIGN_IN_PATH}
      component={SignInRoute}
   />
]

export { authRoutes }
