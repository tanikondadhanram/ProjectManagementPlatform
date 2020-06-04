import React from 'react'
import { withRouter } from 'react-router-dom'

import { ProjectManagementApp } from '.'
import { Provider } from 'mobx-react'
import { projectManagementPlatformStore } from '../../stores'

export default {
   component: ProjectManagementApp,
   title: 'ProjectManagementApp'
}

export const userView = () => (
   <Provider projectManagementPlatformStore={projectManagementPlatformStore}>
      {withRouter(<ProjectManagementApp />)}
   </Provider>
)
