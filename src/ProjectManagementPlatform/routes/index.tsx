import React from 'react'

import { PROJECT_MANAGEMANT_PLATFORM_PATH } from '../constants/routeConstants'
import { HomePage } from '../components/HomePage'
import { ProtectedRoute } from '../../Common/utils/ProtectedRoute'
import { ProjectTasks } from '../components/ProjectTasks'

export const projectManagementRoutes = [
   <ProtectedRoute
      key={PROJECT_MANAGEMANT_PLATFORM_PATH}
      exact
      path={PROJECT_MANAGEMANT_PLATFORM_PATH}
      component={HomePage}
   />,
   <ProtectedRoute
      key={PROJECT_MANAGEMANT_PLATFORM_PATH}
      exact
      path={`${PROJECT_MANAGEMANT_PLATFORM_PATH}/:id`}
      component={ProjectTasks}
   />
]
