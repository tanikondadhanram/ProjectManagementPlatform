import React from 'react'
import { render } from '@testing-library/react'
import { API_INITIAL } from '@ib/api-constants'

import { SignInForm } from '.'

describe('SignInForm Tests', () => {
   it('Should Test All Elements Are Rendering', () => {
      const userDetails = {
         username: 'rk',
         password: 'RK',
         usernameRef: null,
         passwordRef: null,
         onChangeUsername: jest.fn(),
         onChangePassword: jest.fn(),
         onUserSubmit: jest.fn(),
         apiStatus: API_INITIAL,
         usernameErrorMessage: null,
         passwordErrorMessage: null,
         isValidUsername: true,
         isValidPassword: true
      }
      const { getByPlaceholderText, getByText } = render(
         <SignInForm {...userDetails} />
      )
      getByPlaceholderText('username')
      getByPlaceholderText('password')
      getByText('Sign In')
   })

   it('Should test UserName Error display', () => {
      const userDetails = {
         username: 'rk',
         password: 'RK',
         usernameRef: null,
         passwordRef: null,
         onChangeUsername: jest.fn(),
         onChangePassword: jest.fn(),
         onUserSubmit: jest.fn(),
         apiStatus: API_INITIAL,
         usernameErrorMessage: 'wrong username',
         passwordErrorMessage: null,
         isValidUsername: false,
         isValidPassword: true
      }
      const { getByText } = render(<SignInForm {...userDetails} />)
      getByText('wrong username')
   })

   it('Should test password Error display', () => {
      const userDetails = {
         username: 'rk',
         password: 'RK',
         usernameRef: null,
         passwordRef: null,
         onChangeUsername: jest.fn(),
         onChangePassword: jest.fn(),
         onUserSubmit: jest.fn(),
         apiStatus: API_INITIAL,
         usernameErrorMessage: null,
         passwordErrorMessage: 'wrong password',
         isValidUsername: true,
         isValidPassword: false
      }
      const { getByText } = render(<SignInForm {...userDetails} />)
      getByText('wrong password')
   })
})
