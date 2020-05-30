import React from 'react'
import { render } from '@testing-library/react'
import { SignInForm } from '.'

describe('SignInForm Tests', () => {
   it('Should Test All Elements Are Rendering', () => {
      const userDetails = {
         username: 'rk',
         password: 'RK',
         onChangeUsername: () => null,
         onChangePassword: () => null
      }
      const { getByPlaceholderText, getByText } = render(
         <SignInForm {...userDetails} />
      )
      getByPlaceholderText('username')
      getByPlaceholderText('password')
      getByText('Sign In')
   })
})
