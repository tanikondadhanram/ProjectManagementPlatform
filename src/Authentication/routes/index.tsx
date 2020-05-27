import React from 'react'
import { Route } from 'react-router-dom'

import { PROJECT_SIGN_IN_PATH } from '../constants/routeConstants'
import { SignInForm } from '../components/SignInForm'

const authRoutes = [
   <Route
      key={PROJECT_SIGN_IN_PATH}
      exact
      path={PROJECT_SIGN_IN_PATH}
      component={SignInForm}
   />,
   <Route key={'/'} exact path={'/'} component={SignInForm} />
]

export { authRoutes }
