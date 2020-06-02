import React from 'react'

import { PROJECT_MANAGEMANT_PLATFORM_PATH } from '../constants/routeConstants'
import { ProjectManagementApp } from '../components/ProjectManagementApp'
import { ProtectedRoute } from '../../Common/utils/ProtectedRoute'

export const projectManagementRoutes = [
   <ProtectedRoute
      key={PROJECT_MANAGEMANT_PLATFORM_PATH}
      exact
      path={PROJECT_MANAGEMANT_PLATFORM_PATH}
      component={ProjectManagementApp}
   />
]
