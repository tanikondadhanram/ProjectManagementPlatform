import { observable, action } from 'mobx'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { API_INITIAL } from '@ib/api-constants'

class StatesStore {
   @observable statesStoreApiStatus!: number
   @observable statesStoreApiError!: null | string
   statesStoreApiResponse!: any
   statesService

   constructor(service) {
      this.statesService = service
      this.init()
   }

   @action.bound
   init() {
      this.statesStoreApiStatus = API_INITIAL
      this.statesStoreApiError = null
   }

   @action.bound
   clearStore() {
      this.init()
   }

   @action.bound
   setGetStatesStoreApiStatus(status: number) {
      this.statesStoreApiStatus = status
   }

   @action.bound
   setGetStatesStoreApiError(error: any) {
      this.statesStoreApiError = error
   }

   @action.bound
   setGetStatesAPIResponse(response: any) {
      this.statesStoreApiResponse = response.states
   }

   @action.bound
   getStates(requestObject) {
      const statesPromise = this.statesService.getStatesAPI(requestObject)
      return bindPromiseWithOnSuccess(statesPromise)
         .to(this.setGetStatesStoreApiStatus, response => {
            this.setGetStatesAPIResponse(response)
         })
         .catch(error => {
            this.setGetStatesStoreApiError(error)
         })
   }
}

export default StatesStore
