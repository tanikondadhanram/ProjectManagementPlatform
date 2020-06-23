import { observable, action } from 'mobx'

import { API_INITIAL, APIStatus } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import { setAccessToken } from '../../../Common/utils/StorageUtils'

import { AuthService } from '../../services/AuthService/index.api'

import { SignInAPIResponse, SignInAPIRequestObject } from "../types"



class AuthStore {
   @observable apiStatus!: APIStatus
   @observable apiError!: Error | null
   @observable apiResponse!: SignInAPIResponse
   authService: AuthService

   constructor(authAPI: AuthService) {
      this.authService = authAPI
      this.init()
   }

   @action.bound
   init(): void {
      this.apiStatus = API_INITIAL
      this.apiError = null
   }

   @action.bound
   clearStore(): void {
      this.init()
   }

   @action.bound
   setUserSignInAPIStatus(status: APIStatus): void {
      this.apiStatus = status
   }

   @action.bound
   setUserSignInAPIError(error: Error): void {
      this.apiError = error
   }

   @action.bound
   setUserSignInAPIResponse(response: SignInAPIResponse): void {
      setAccessToken(response['access_token'])
      this.apiResponse = response

      window.localStorage.setItem(
         'userDetails',
         JSON.stringify(JSON.stringify(response))
      )
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
