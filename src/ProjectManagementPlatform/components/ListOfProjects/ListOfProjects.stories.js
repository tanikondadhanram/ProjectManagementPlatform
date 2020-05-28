import React from 'react'
import { Provider } from 'mobx-react'

import { projectManagementPlatformStore } from '../../stores'

import { ListOfProjects } from '.'

export default { component: ListOfProjects, title: 'ListOfProjects' }

export const listOfProjects = () => (
   <Provider projectManagementPlatformStore={projectManagementPlatformStore}>
      <ListOfProjects />
   </Provider>
)
