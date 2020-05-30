import React from 'react'
import { Provider } from 'mobx-react'

import { projectManagementPlatformStore, workFlowStore } from '../../stores'

import { AddProject } from '.'

export default {
   component: AddProject,
   title: 'Add Project'
}

const stores = {
   projectManagementPlatformStore,
   workFlowStore
}

export const addProjectView = () => (
   <Provider {...stores}>
      <AddProject />
   </Provider>
)
