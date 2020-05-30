import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import stringConstants from '../../strings/stringConstants.json'

import { Header } from '.'

describe('Header Tests', () => {
   it('Should Test All Elements Should Appear', () => {
      const { getByText, getByAltText } = render(
         <Router history={createMemoryHistory()}>
            <Header />
         </Router>
      )
      getByAltText(stringConstants['ibLogoAltText'])
      getByText(stringConstants['ProjectTitle'])

      const rightClick = { button: 2 }

      fireEvent.click(getByText(stringConstants['sign out']), rightClick)
   })
})
