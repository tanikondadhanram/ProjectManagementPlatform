import React from 'react'
import Pagination from './Pagination'
import { Provider } from 'mobx-react'
import { projectManagementPlatformStore } from '../../stores'

export default { component: Pagination, title: 'pagination' }

export const pagination = () => (
   <Provider projectManagementPlatformStore={projectManagementPlatformStore}>
      <Pagination />
   </Provider>
)
