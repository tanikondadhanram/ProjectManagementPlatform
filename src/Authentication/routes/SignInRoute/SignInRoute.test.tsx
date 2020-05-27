import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Router, Route, withRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import { createMemoryHistory } from 'history'

import { PROJECT_SIGN_IN_PATH } from '../../constants/routeConstants'
import { AuthApi } from '../../services/AuthService/AuthApi'
import { AuthStore } from '../../stores/AuthStore'
import usersData from '../../fixtures/usersData.json'
import stringConstants from '../../constants/stringConstants/stringConstants.json'

import { SignInRoute } from '.'

const LocationDisplay = withRouter(({ location }) => (
   <div data-testid='location-display'>{location.pathname}</div>
))

describe('SignInRoute Tests', () => {
   let authAPI
   let authStore

   beforeEach(() => {
      authAPI = new AuthApi()
      authStore = new AuthStore(authAPI)
   })

   afterEach(() => {
      jest.resetAllMocks()
   })

   it('should render username empty error message', () => {
      const { getByText, getByRole } = render(
         <Router history={createMemoryHistory()}>
            <SignInRoute authStore={authStore} />
         </Router>
      )

      const signInButton = getByRole('button', { name: 'Sign in' })

      fireEvent.click(signInButton)

      getByText(stringConstants['enterUsername'])
   })

   it('should render password empty error message', () => {
      const { getByText, getByPlaceholderText, getByRole } = render(
         <Router history={createMemoryHistory()}>
            <SignInRoute authStore={authStore} />
         </Router>
      )
      const username = 'test-user'
      const usernameField = getByPlaceholderText('Username')
      const signInButton = getByRole('button', { name: 'Sign in' })

      fireEvent.change(usernameField, { target: { value: username } })
      fireEvent.click(signInButton)

      getByText(stringConstants['enterPassword'])
   })

   it('should submit sign-in on press enter', () => {
      const { getByPlaceholderText, getByRole } = render(
         <Router history={createMemoryHistory()}>
            <SignInRoute authStore={authStore} />
         </Router>
      )
      const username = 'test-user'
      const password = 'test-password'

      const usernameField = getByPlaceholderText('Username')
      const passwordField = getByPlaceholderText('Password')
      const signInButton = getByRole('button', { name: 'Sign in' })

      fireEvent.change(usernameField, { target: { value: username } })
      fireEvent.change(passwordField, { target: { value: password } })
      fireEvent.keyPress(signInButton, { key: 'Enter', code: 'Enter' })
   })

   it('should render signInRoute loading state', async () => {
      const { getByPlaceholderText, getByRole } = render(
         <Router history={createMemoryHistory()}>
            <SignInRoute authStore={authStore} />
         </Router>
      )
      const username = 'test-user'
      const password = 'test-password'

      const usernameField = getByPlaceholderText('Username')
      const passwordField = getByPlaceholderText('Password')
      const signInButton = getByRole('button', { name: 'Sign in' })

      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockSignInAPI = jest.fn()
      mockSignInAPI.mockReturnValue(mockLoadingPromise)
      authAPI.signInAPI = mockSignInAPI

      fireEvent.change(usernameField, { target: { value: username } })
      fireEvent.change(passwordField, { target: { value: password } })
      fireEvent.click(signInButton)

      const obj: any = { disabled: true }

      getByRole('button', obj)
   })

   it('should render signInRoute success state', async () => {
      const history = createMemoryHistory()
      const route = PROJECT_SIGN_IN_PATH
      history.push(route)

      const { getByPlaceholderText, getByRole } = render(
         <Provider authStore={authStore}>
            <Router history={history}>
               <Route path={PROJECT_SIGN_IN_PATH}>
                  <SignInRoute />
               </Route>
               <Route path={PROJECT_SIGN_IN_PATH}>
                  <LocationDisplay />
               </Route>
            </Router>
         </Provider>
      )

      const username = 'test-user'
      const password = 'test-password'

      const usernameField = getByPlaceholderText('Username')
      const passwordField = getByPlaceholderText('Password')
      const signInButton = getByRole('button', { name: 'Sign in' })

      const mockSuccessPromise = new Promise(function(resolve, reject) {
         resolve(usersData)
      })
      const mockSignInAPI = jest.fn()
      mockSignInAPI.mockReturnValue(mockSuccessPromise)
      authAPI.signInAPI = mockSignInAPI

      fireEvent.change(usernameField, { target: { value: username } })
      fireEvent.change(passwordField, { target: { value: password } })
      fireEvent.click(signInButton)
   })

   it('should render signInRoute failure state', async () => {
      const { getByPlaceholderText, getByRole, getByText } = render(
         <Router history={createMemoryHistory()}>
            <SignInRoute authStore={authStore} />
         </Router>
      )

      const username = 'test-user'
      const password = 'test-password'

      const usernameField = getByPlaceholderText('Username')
      const passwordField = getByPlaceholderText('Password')
      const signInButton = getByRole('button', { name: 'Sign in' })

      const mockFailurePromise = new Promise(function(resolve, reject) {
         reject(new Error('error'))
      }).catch(() => {})
      const mockSignInAPI = jest.fn()
      mockSignInAPI.mockReturnValue(mockFailurePromise)
      authAPI.signInAPI = mockSignInAPI

      fireEvent.change(usernameField, { target: { value: username } })
      fireEvent.change(passwordField, { target: { value: password } })
      fireEvent.click(signInButton)

      // await waitFor(() => {
      // 	getByText("network error");
      // });
   })
})
