import { observable, action } from 'mobx'
import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import { setAccessToken } from '../../../Common/utils/StorageUtils'

class AuthStore {
   @observable apiStatus!: number
   @observable apiError!: string | null
   @observable apiResponse: any
   authService: any

   constructor(authAPI: any) {
      this.authService = authAPI
      this.init()
   }

   @action.bound
   init() {
      this.apiStatus = API_INITIAL
      this.apiError = null
   }

   @action.bound
   clearStore() {
      this.init()
   }

   @action.bound
   setUserSignInAPIStatus(status: number) {
      this.apiStatus = status
   }

   @action.bound
   setUserSignInAPIError(error: any) {
      this.apiError = error
   }

   @action.bound
   setUserSignInAPIResponse(response: any) {
      setAccessToken(response['access_token'])
      this.apiResponse = response

      window.localStorage.setItem(
         'userDetails',
         JSON.stringify(JSON.stringify(response))
      )
   }

   @action.bound
   userSignIn(userDetails, onSignInSuccess, onSignInFailure) {
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
