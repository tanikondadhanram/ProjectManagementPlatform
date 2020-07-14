import { types } from 'mobx-state-tree'
import Cookie from 'js-cookie'

import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import {
   API_SUCCESS,
   API_FAILED,
   API_FETCHING,
   API_INITIAL
} from '@ib/api-constants'

import AuthMstFixtureService from '../../services/AuthService/index.fixture.mst'
import usersData from '../../fixtures/userData.json'

import AuthMstModel from './AuthStore.mst'

let mockSetCookie = jest.fn()
let mockRemoveCookie = jest.fn()

Cookie.set = mockSetCookie
Cookie.remove = mockRemoveCookie

describe('AuthStore Tests', () => {
   let authStore
   let authService

   beforeEach(() => {
      authService = AuthMstFixtureService.create()
      authStore = AuthMstModel.create(
         {
            signInApiStatus: API_INITIAL,
            signInApiError: null,
            signInApiResponse: null
         },
         {
            authService
         }
      )
   })

   it('should test initialising auth store', () => {
      expect(authStore.signInApiStatus).toBe(API_INITIAL)
      expect(authStore.signInApiError).toBe(null)
   })

   it('should test userSignInAPI data fetching state', () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()

      const requestObject = {
         username: 'ramakrishna',
         password: 'RAMAKRISHNA'
      }

      authStore.userSignIn(requestObject, onSuccess, onFailure)
      expect(authStore.signInApiStatus).toBe(API_FETCHING)
   })

   it('should test userSignInAPI success state', async () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()

      const requestObject = {
         username: 'test-user',
         password: 'test-password'
      }

      const mockSuccessPromise = Promise.resolve(usersData)
      const mockSignInAPI = jest.fn()
      mockSignInAPI.mockReturnValue(mockSuccessPromise)
      authService.signInAPI = mockSignInAPI

      await authStore.userSignIn(requestObject, onSuccess, onFailure)
      expect(authStore.signInApiStatus).toBe(API_SUCCESS)
      expect(mockSetCookie).toBeCalled()
      expect(onSuccess).toBeCalled()
   })

   it('should test userSignInAPI failure state', async () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()

      const requestObject = {
         username: 'test-user',
         password: 'test-password'
      }

      authService.signInAPI = jest
         .fn()
         .mockImplementation(() => Promise.reject(new Error('error')))

      await authStore.userSignIn(requestObject, onSuccess, onFailure)

      expect(authStore.signInApiStatus).toBe(API_FAILED)
      expect(onFailure).toBeCalled()
   })

   it('Should Test Store Is Cleared', () => {
      authStore.clearStore()
      expect(authStore.signInApiStatus).toBe(API_INITIAL)
      expect(authStore.signInApiError).toBe(null)
   })
})
