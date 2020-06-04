import { observable, action } from 'mobx'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { API_INITIAL } from '@ib/api-constants'

class WorkFlowStore {
   @observable apiStatus!: number
   @observable apiError!: null | string
   @observable workFlowTypes!: any
   workFlowService

   constructor(service) {
      this.workFlowService = service
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
   setGetWorkFlowAPIStatus(status: number) {
      this.apiStatus = status
   }

   @action.bound
   setGetWorkFlowAPIError(error: string) {
      this.apiError = error
   }

   @action.bound
   setGetWorkFlowAPIResponse(response: any) {
      this.workFlowTypes = response
   }

   @action.bound
   getWorkFlowTypes() {
      const workFlowPromise = this.workFlowService.getWorkFlowAPI()
      return bindPromiseWithOnSuccess(workFlowPromise)
         .to(this.setGetWorkFlowAPIStatus, response => {
            this.setGetWorkFlowAPIResponse(response)
         })
         .catch(error => {
            this.setGetWorkFlowAPIError(error)
         })
   }
}

export default WorkFlowStore
