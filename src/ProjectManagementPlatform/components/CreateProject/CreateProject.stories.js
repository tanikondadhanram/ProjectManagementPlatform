import React from 'react'
import { CreateProject } from '.'
import { Provider } from 'mobx-react'
import { projectManagementPlatformStore } from '../../stores'

export default { component: CreateProject, title: 'Create Project Button' }

const stores = {
   projectManagementPlatformStore
}

export const createProjectButton = () => (
   <Provider {...stores}>
      <CreateProject />
   </Provider>
)
