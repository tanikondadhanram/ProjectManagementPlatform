import React, { lazy } from 'react'
import { Redirect } from 'react-router-dom'

import {
   PROJECTS_PATH,
   SPECIFIC_PROJECT_PATH
} from '../constants/routeConstants'

import { ProtectedRoute } from '../../Common/components/ProtectedRoute/ProtectedRoute'

const ProjectsRoute = lazy(() => import('./PmpProjectsRoute/PmpProjectsRoute'))
const SpecificProjectRoute = lazy(() => import('./ProjectRoute/ProjectRoute'))

export const projectManagementRoutes = [
   <ProtectedRoute
      key={PROJECTS_PATH}
      exact
      path={PROJECTS_PATH}
      component={ProjectsRoute}
   />,
   <ProtectedRoute
      key={SPECIFIC_PROJECT_PATH}
      exact
      path={SPECIFIC_PROJECT_PATH}
      component={SpecificProjectRoute}
   />,
   <ProtectedRoute
      key='/'
      exact
      path='/'
      component={() => <Redirect to={{ pathname: PROJECTS_PATH }} />}
   />
]
