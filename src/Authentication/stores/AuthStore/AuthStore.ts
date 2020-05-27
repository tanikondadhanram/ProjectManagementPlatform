import { observable, action } from 'mobx'
import { API_INITIAL } from '@ib/api-constants'

import { clearUserSession, setAccessToken } from '../../../utils/StorageUtils'

import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

class AuthStore {
   @observable username!: string
   @observable password!: string
   @observable apiStatus!: number
   @observable apiError!: string | null
   @observable apiResponse: any
   authService: any

   constructor(authAPI: any) {
      this.authService = authAPI
      this.init()
      this.apiStatus = API_INITIAL
      this.apiError = null
   }

   @action.bound
   init() {
      this.username = ''
      this.password = ''
   }

   @action.bound
   clearStore() {
      this.init()
   }

   @action.bound
   onChangeUsername(event: { target: { value: string } }) {
      this.username = event.target.value
   }

   @action.bound
   onChangePassword(event: { target: { value: string } }) {
      this.password = event.target.value
   }

   @action.bound
   onUserSubmit(event: { preventDefault: () => void }) {
      event.preventDefault()
      this.onUserSignIn({
         username: this.username,
         password: this.password
      })
   }

   @action.bound
   setUserSignInAPIStatus(status: number) {
      this.apiStatus = status
   }

   @action.bound
   setUserSignInAPIError(error: string) {
      this.apiError = error
   }

   @action.bound
   setUserSignInAPIResponse(response: any) {
      setAccessToken(response.length > 0 && response[0].access_token)
      this.apiResponse = response
   }

   @action.bound
   onUserSignIn(userDetails) {
      const userSignInAPIPromise = this.authService.signInAPI(userDetails)
      return bindPromiseWithOnSuccess(userSignInAPIPromise)
         .to(this.setUserSignInAPIStatus, response => {
            this.setUserSignInAPIResponse(response)
         })
         .catch(error => {
            this.setUserSignInAPIError(error)
         })
   }

   @action.bound
   onUserSignOut() {
      clearUserSession()
   }
}

export default AuthStore
