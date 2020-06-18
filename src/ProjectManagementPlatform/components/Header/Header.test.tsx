import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import stringConstants from '../../strings/stringConstants.json'

import { Header } from '.'

describe('Header Tests', () => {
   it('Should Test All Elements Should Appear', () => {
      window.localStorage.setItem(
         'userDetails',
         JSON.stringify(
            JSON.stringify({ username: 'rk', profile_pic: 'qwerty' })
         )
      )
      const { getByText, getByAltText } = render(
         <Router history={createMemoryHistory()}>
            <Header />
         </Router>
      )
      getByAltText(stringConstants['ibLogoAltText'])
      getByText(stringConstants['ProjectTitle'])
   })
})
