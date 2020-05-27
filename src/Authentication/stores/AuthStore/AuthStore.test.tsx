import Cookie from 'js-cookie'
import {
   API_SUCCESS,
   API_FAILED,
   API_FETCHING,
   API_INITIAL
} from '@ib/api-constants'

import AuthApi from '../../services/AuthService/AuthApi'
import usersData from '../../fixtures/usersData.json'

import AuthStore from './AuthStore'

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
      const requestObject = {
         username: 'ramakrishna',
         password: 'RAMAKRISHNA'
      }

      authStore.onUserSignIn(requestObject)
      expect(authStore.apiStatus).toBe(API_FETCHING)
   })

   it('should test userSignInAPI success state', async () => {
      const requestObject = {
         username: 'ramakrishna',
         password: 'RAMAKRISHNA'
      }

      const mockSuccessPromise = Promise.resolve(usersData)

      jest
         .spyOn(authAPI, 'signInAPI')
         .mockImplementation(() => mockSuccessPromise)

      await authStore.onUserSignIn(requestObject)
      expect(authStore.apiStatus).toBe(API_SUCCESS)
      expect(mockSetCookie).toBeCalled()
   })

   it('should test userSignInAPI failure state', async () => {
      const requestObject = {
         username: 'ramakrishna',
         password: 'RAMAKRISHNA'
      }

      jest
         .spyOn(authAPI, 'signInAPI')
         .mockImplementation(() => Promise.reject())

      authStore = new AuthStore(authAPI)
      await authStore.onUserSignIn(requestObject)
      expect(authStore.apiStatus).toBe(API_FAILED)
   })

   it('should test user sign-out', () => {
      authStore.onUserSignOut()
      expect(mockRemoveCookie).toBeCalled()
      expect(authStore.apiStatus).toBe(API_INITIAL)
      expect(authStore.apiError).toBe(null)
   })

   it('Should Test Username Should Update While Typing', () => {
      const event = {
         target: {
            value: 'rk'
         }
      }
      authStore.onChangeUsername(event)
      expect(authStore.username).toBe('rk')
   })

   it('Should Test password Should Update While Typing', () => {
      const event = {
         target: {
            value: 'rk'
         }
      }
      authStore.onChangePassword(event)
      expect(authStore.password).toBe('rk')
   })
   it('Should Test OnUserSubmit', () => {
      authStore.username = 'ramakrishna'
      authStore.password = 'RAMAKRISHNA'
      const event = { preventDefault: () => null }

      authStore.onUserSubmit(event)
      expect(authStore.onUserSignIn()).toStrictEqual(new Promise(() => null))
   })
})
