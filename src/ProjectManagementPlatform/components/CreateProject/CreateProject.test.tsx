import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'mobx-react'

import stringConstants from '../../strings/stringConstants.json'
import { projectManagementPlatformStore } from '../../stores'

import { CreateProject } from '.'

describe('Create Project Button Tests', () => {
   it('Should Test All Elements Should Appear', () => {
      const { getByText } = render(
         <Provider
            projectManagementPlatformStore={projectManagementPlatformStore}
         >
            <CreateProject />
         </Provider>
      )

      getByText(stringConstants['addNewProject'])
   })
})
