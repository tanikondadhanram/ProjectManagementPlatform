import React from 'react'
import { Route } from 'react-router-dom'

import { PROJECT_MANAGEMANT_PLATFORM_PATH } from '../constants/routeConstants'
import { ProjectManagementApp } from '../components/ProjectManagementApp'

export const projectManagementRoutes = [
   <Route
      key={PROJECT_MANAGEMANT_PLATFORM_PATH}
      exact
      path={PROJECT_MANAGEMANT_PLATFORM_PATH}
      component={ProjectManagementApp}
   />
]
