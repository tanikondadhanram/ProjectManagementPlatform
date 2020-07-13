import { observable, action } from 'mobx'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { API_INITIAL } from '@ib/api-constants'

class WorkFlowStore {
   @observable workFlowStoreApiStatus!: number
   @observable workFlowStoreApiError!: null | string
   workFlowTypes!: any
   workFlowService

   constructor(service) {
      this.workFlowService = service
      this.init()
   }

   @action.bound
   init() {
      this.workFlowStoreApiStatus = API_INITIAL
      this.workFlowStoreApiError = null
   }

   @action.bound
   clearStore() {
      this.init()
   }

   @action.bound
   setGetWorkFlowStoreApiStatus(status: number) {
      this.workFlowStoreApiStatus = status
   }

   @action.bound
   setGetWorkFlowStoreApiError(error: string) {
      this.workFlowStoreApiError = error
   }

   @action.bound
   setGetWorkFlowAPIResponse(response: any) {
      this.workFlowTypes = response
   }

   @action.bound
   getWorkFlowTypes() {
      const workFlowPromise = this.workFlowService.getWorkFlowAPI()
      return bindPromiseWithOnSuccess(workFlowPromise)
         .to(this.setGetWorkFlowStoreApiStatus, response => {
            this.setGetWorkFlowAPIResponse(response)
         })
         .catch(error => {
            this.setGetWorkFlowStoreApiError(error)
         })
   }
}

export default WorkFlowStore
