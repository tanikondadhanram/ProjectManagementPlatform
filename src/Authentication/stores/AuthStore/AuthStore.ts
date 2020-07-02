import { observable, action } from 'mobx'

import { API_INITIAL, APIStatus } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import { setAccessToken } from '../../../Common/utils/StorageUtils'

import { AuthService } from '../../services/AuthService'

import { SignInAPIResponse, SignInAPIRequestObject } from '../types'

class AuthStore {
   @observable signInApiStatus!: APIStatus
   @observable signInApiError!: Error | null
   @observable signInApiResponse!: SignInAPIResponse | null
   authService: AuthService

   constructor(authAPI: AuthService) {
      this.authService = authAPI
      this.init()
   }

   @action.bound
   init(): void {
      this.signInApiStatus = API_INITIAL
      this.signInApiError = null
   }

   @action.bound
   clearStore(): void {
      this.init()
   }

   @action.bound
   setUserSignInAPIStatus(status: APIStatus): void {
      this.signInApiStatus = status
   }

   @action.bound
   setUserSignInAPIError(error: Error): void {
      this.signInApiError = error
   }

   @action.bound
   setUserSignInAPIResponse(response: SignInAPIResponse | null): void {
      if (response) {
         setAccessToken(response['access_token'])
         this.signInApiResponse = response

         window.localStorage.setItem(
            'userDetails',
            JSON.stringify(JSON.stringify(response))
         )
      }
   }

   @action.bound
   async userSignIn(
      userDetails: SignInAPIRequestObject,
      onSignInSuccess: Function,
      onSignInFailure: Function
   ): Promise<any> {
      const userSignInAPIPromise = this.authService.signInAPI(userDetails)

      return bindPromiseWithOnSuccess(userSignInAPIPromise)
         .to(this.setUserSignInAPIStatus, response => {
            this.setUserSignInAPIResponse(response)
            onSignInSuccess()
         })
         .catch(error => {
            this.setUserSignInAPIError(error)
            onSignInFailure()
         })
   }
}

export default AuthStore
