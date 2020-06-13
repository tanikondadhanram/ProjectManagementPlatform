import React from 'react'
import { Redirect } from 'react-router-dom'
import {
   PROJECTS_PATH,
   SPECIFIC_PROJECT_PATH
} from '../constants/routeConstants'
import { HomePage } from '../components/HomePage'
import { ProtectedRoute } from '../../Common/utils/ProtectedRoute'
import { ProjectTasks } from '../components/ProjectTasks'

export const projectManagementRoutes = [
   <ProtectedRoute
      key={PROJECTS_PATH}
      exact
      path={PROJECTS_PATH}
      component={HomePage}
   />,
   <ProtectedRoute
      key={SPECIFIC_PROJECT_PATH}
      exact
      path={SPECIFIC_PROJECT_PATH}
      component={ProjectTasks}
   />,
   <ProtectedRoute
      key={'/'}
      exact
      path={'/'}
      component={() => <Redirect to={{ pathname: PROJECTS_PATH }} />}
   />
]
