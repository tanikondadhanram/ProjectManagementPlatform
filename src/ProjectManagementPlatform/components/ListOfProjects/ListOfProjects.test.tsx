import React from 'react'
import { render } from '@testing-library/react'

import stringConstants from '../../strings/stringConstants.json'
import { ListOfProjects } from '.'
import { projectManagementPlatformStore } from '../../stores'

import { Provider } from 'mobx-react'

describe('ListOfProjects Test Cases', () => {
   it('Should Test Projects Are Appearing', () => {
      // const cdmMock = jest.spyOn(ListOfProjects, 'render')
      const { getByText } = render(
         <Provider
            projectManagementPlatformStore={projectManagementPlatformStore}
         >
            <ListOfProjects />
         </Provider>
      )

      // console.log(ListOfProjects)
   })
})
