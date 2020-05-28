import Cookie from 'js-cookie'
import {
   API_SUCCESS,
   API_FAILED,
   API_FETCHING,
   API_INITIAL
} from '@ib/api-constants'

import { AuthApi } from '../../services/AuthService/AuthApi'
import { AuthStore } from '.'

import usersData from '../../fixtures/usersData.json'

let mockSetCookie = jest.fn()
let mockRemoveCookie = jest.fn()

Cookie.set = mockSetCookie
Cookie.remove = mockRemoveCookie

describe('AuthStore Tests', () => {
   let authAPI
   let authStore

   beforeEach(() => {
      authAPI = new AuthApi()
      authStore = new AuthStore(authAPI)
   })

   it('should test initialising auth store', () => {
      expect(authStore.apiStatus).toBe(API_INITIAL)

      expect(authStore.apiError).toBe(null)
   })

   it('should test userSignInAPI data fetching state', () => {
      const onSuccess = jest.fn()
      const onFailure = jest.fn()

      const requestObject = {
         username: 'ramakrishna',
         password: 'RAMAKRISHNA'
      }

      // const mockLoadingPromise = new Promise(function(resolve, reject) {})
      // const mockSignInAPI = jest.fn()
      // mockSignInAPI.mockReturnValue(mockLoadingPromise)
      // authAPI.signInAPI = mockSignInAPI

      authStore.userSignIn(requestObject, onSuccess, onFailure)
      expect(authStore.apiStatus).toBe(API_FETCHING)
   })

   // it('should test userSignInAPI success state', async () => {
   //    const onSuccess = jest.fn()
   //    const onFailure = jest.fn()

   //    const requestObject = {
   //       username: 'test-user',
   //       password: 'test-password'
   //    }

   //    const mockSuccessPromise = Promise.resolve(usersData)
   //    const mockSignInAPI = jest.fn()
   //    mockSignInAPI.mockReturnValue(mockSuccessPromise)
   //    authAPI.signInAPI = mockSignInAPI

   //    await authStore.userSignIn(requestObject, onSuccess, onFailure)
   //    expect(authStore.getUserSignInAPIStatus).toBe(API_SUCCESS)
   //    expect(mockSetCookie).toBeCalled()
   //    expect(onSuccess).toBeCalled()
   // })

   // it('should test userSignInAPI failure state', async () => {
   //    const onSuccess = jest.fn()
   //    const onFailure = jest.fn()
   //    const requestObject = {
   //       username: 'test-user',
   //       password: 'test-password'
   //    }

   //    jest
   //       .spyOn(authAPI, 'signInAPI')
   //       .mockImplementation(() => Promise.reject())

   //    authStore = new AuthStore(authAPI)
   //    await authStore.userSignIn(requestObject, onSuccess, onFailure)
   //    expect(authStore.getUserSignInAPIStatus).toBe(API_FAILED)
   //    expect(onFailure).toBeCalled()
   // })
})
