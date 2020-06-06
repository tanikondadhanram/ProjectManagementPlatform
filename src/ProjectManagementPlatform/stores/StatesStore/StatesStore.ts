import { observable, action } from 'mobx'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { API_INITIAL } from '@ib/api-constants'

class StatesStore {
   @observable apiStatus!: number
   @observable apiError!: null | string
   states!: any
   statesService

   constructor(service) {
      this.statesService = service
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
   setGetStatesAPIStatus(status: number) {
      this.apiStatus = status
   }

   @action.bound
   setGetStatesAPIError(error: string) {
      this.apiError = error
   }

   @action.bound
   setGetStatesAPIResponse(response: any) {
      this.states = response.states
   }

   @action.bound
   getStates(requestObject) {
      const statesPromise = this.statesService.getStatesAPI(requestObject)
      return bindPromiseWithOnSuccess(statesPromise)
         .to(this.setGetStatesAPIStatus, response => {
            this.setGetStatesAPIResponse(response)
         })
         .catch(error => {
            this.setGetStatesAPIError(error)
         })
   }
}

export default StatesStore
