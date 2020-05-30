import React from 'react'
import { Provider } from 'mobx-react'
import { render, waitFor, fireEvent } from '@testing-library/react'

import { AddProject } from '.'
import { projectManagementPlatformStore, workFlowStore } from '../../stores'

const stores = {
   projectManagementPlatformStore,
   workFlowStore
}

describe('AddProject Form Tests', () => {
   it('Should Test All Elements Are Rendered', () => {
      const { getByText } = render(
         <Provider {...stores}>
            <AddProject />
         </Provider>
      )

      waitFor(() => {
         getByText('title')
         getByText('description')
         getByText('workFlowType')
         getByText('Project FlowType')
      })
   })

   it('Should Test ErrorMessage Should Rendering', () => {
      const { getByText } = render(
         <Provider {...stores}>
            <AddProject />
         </Provider>
      )
      waitFor(() => getByText('*this field is required'))
   })

   it('Should Test Form Should Submit', () => {
      const { getByText } = render(
         <Provider {...stores}>
            <AddProject />
         </Provider>
      )
      waitFor(() => fireEvent.click(getByText('*this field is required')))
   })

   it('Should Test Form Should Close', () => {
      const { getByText } = render(
         <Provider {...stores}>
            <AddProject />
         </Provider>
      )
      waitFor(() => fireEvent.click(getByText('X')))
   })
})
