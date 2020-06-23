import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import { Router, Route, withRouter } from 'react-router-dom'
import { createMemoryHistory } from 'history'

import { PROJECT_SIGN_IN_PATH } from '../../constants/routeConstants'

import { AuthStore } from '../../stores/AuthStore'
import userData from '../../fixtures/userData.json'
import stringConstants from '../../constants/stringConstants/stringConstants.json'

import { SignInRoute } from '.'

import { API_FAILED } from '@ib/api-constants'
import { AuthFixtureService } from '../../services/AuthService/index.fixture'
import { PROJECTS_PATH } from '../../../ProjectManagementPlatform/constants/routeConstants'
import { act } from 'react-dom/test-utils'

const LocationDisplay = withRouter(({ location }) => (
   <div data-testid='location-display'>{location.pathname}</div>
))

describe('SignInRoute Tests', () => {
   let authAPI
   let authStore

   beforeEach(() => {
      authAPI = new AuthFixtureService()
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

      const signInButton = getByRole('button', { name: 'Sign In' })

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
      const usernameField = getByPlaceholderText('username')
      const signInButton = getByRole('button', { name: 'Sign In' })

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

      const usernameField = getByPlaceholderText('username')
      const passwordField = getByPlaceholderText('password')
      const signInButton = getByRole('button', { name: 'Sign In' })

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

      const usernameField = getByPlaceholderText('username')
      const passwordField = getByPlaceholderText('password')
      const signInButton = getByRole('button', { name: 'Sign In' })

      const mockLoadingPromise = new Promise(function(resolve, reject) {})
      const mockSignInAPI = jest.fn().mockReturnValue(mockLoadingPromise)
      authAPI.signInAPI = mockSignInAPI

      fireEvent.change(usernameField, { target: { value: username } })
      fireEvent.change(passwordField, { target: { value: password } })
      fireEvent.click(signInButton)

      const obj: any = { disabled: true }

      getByRole('button', obj)
   })

   it('should render signInRoute success state', async () => {
      const history = createMemoryHistory()
      const route = PROJECTS_PATH

      const { getByPlaceholderText, getByRole, getByTestId } = render(
         <Router history={history}>
            <Route path='/'>
               <SignInRoute authStore={authStore} />
            </Route>
            <Route path={PROJECTS_PATH}>
               <LocationDisplay />
            </Route>
         </Router>
      )

      const username = 'test-user'
      const password = 'test-password'

      const usernameField = getByPlaceholderText('username')
      const passwordField = getByPlaceholderText('password')
      const signInButton = getByRole('button', { name: 'Sign In' })

      authAPI.signInAPI = jest
         .fn()
         .mockImplementation(() => Promise.resolve(userData))

      fireEvent.change(usernameField, { target: { value: username } })
      fireEvent.change(passwordField, { target: { value: password } })
      fireEvent.click(signInButton)
      history.push(route)

      await waitFor(() => getByTestId('location-display'))
   })

   it('should render signInRoute network failure state', async () => {
      const { getByPlaceholderText, getByRole } = render(
         <Router history={createMemoryHistory()}>
            <SignInRoute authStore={authStore} />
         </Router>
      )

      const username = 'test-user'
      const password = 'test-password'

      const usernameField = getByPlaceholderText('username')
      const passwordField = getByPlaceholderText('password')
      const signInButton = getByRole('button', { name: 'Sign In' })

      authAPI.signInAPI = jest.fn().mockImplementation(() =>
         Promise.reject(
            new Error(
               JSON.stringify({
                  data: { response: 'network error' },
                  status: null
               })
            )
         )
      )

      fireEvent.change(usernameField, { target: { value: username } })
      fireEvent.change(passwordField, { target: { value: password } })
      fireEvent.click(signInButton)

      await act(async () =>
         waitFor(() => expect(authStore.apiStatus).toBe(API_FAILED))
      )
   })

   it('should render signInRoute Username Failure state', async () => {
      const { getByPlaceholderText, getByRole } = render(
         <Router history={createMemoryHistory()}>
            <SignInRoute authStore={authStore} />
         </Router>
      )

      const username = 'test-user'
      const password = 'test-password'

      const usernameField = getByPlaceholderText('username')
      const passwordField = getByPlaceholderText('password')
      const signInButton = getByRole('button', { name: 'Sign In' })

      authAPI.signInAPI = jest.fn().mockImplementation(() =>
         Promise.reject(
            new Error(
               JSON.stringify({
                  data: { response: 'network error' },
                  status: 401
               })
            )
         )
      )

      fireEvent.change(usernameField, { target: { value: username } })
      fireEvent.change(passwordField, { target: { value: password } })
      fireEvent.click(signInButton)

      await act(async () =>
         waitFor(() => expect(JSON.parse(authStore.apiError).status).toBe(401))
      )
   })

   it('should render signInRoute Password Failure state', async () => {
      const { getByPlaceholderText, getByRole } = render(
         <Router history={createMemoryHistory()}>
            <SignInRoute authStore={authStore} />
         </Router>
      )

      const username = 'test-user'
      const password = 'test-password'

      const usernameField = getByPlaceholderText('username')
      const passwordField = getByPlaceholderText('password')
      const signInButton = getByRole('button', { name: 'Sign In' })

      authAPI.signInAPI = jest.fn().mockImplementation(() =>
         Promise.reject(
            new Error(
               JSON.stringify({
                  data: { response: 'network error' },
                  status: 404
               })
            )
         )
      )
      fireEvent.change(usernameField, { target: { value: username } })
      fireEvent.change(passwordField, { target: { value: password } })
      fireEvent.click(signInButton)

      await act(async () =>
         waitFor(() => expect(JSON.parse(authStore.apiError).status).toBe(404))
      )
   })
})
