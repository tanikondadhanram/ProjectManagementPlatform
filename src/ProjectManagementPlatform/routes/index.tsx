import React from 'react'
import { Redirect } from 'react-router-dom'

import {
   PROJECTS_PATH,
   SPECIFIC_PROJECT_PATH
} from '../constants/routeConstants'

import { ProtectedRoute } from '../../Common/utils/ProtectedRoute'

import { PmpProjectsRoute } from './PmpProjectsRoute'
import { ProjectRoute } from './ProjectRoute'

export const projectManagementRoutes = [
   <ProtectedRoute
      key={PROJECTS_PATH}
      exact
      path={PROJECTS_PATH}
      component={PmpProjectsRoute}
   />,
   <ProtectedRoute
      key={SPECIFIC_PROJECT_PATH}
      exact
      path={SPECIFIC_PROJECT_PATH}
      component={ProjectRoute}
   />,
   <ProtectedRoute
      key={'/'}
      exact
      path={'/'}
      component={() => <Redirect to={{ pathname: PROJECTS_PATH }} />}
   />
]
