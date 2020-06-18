import { observable, action } from 'mobx'
import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

class ProjectPostStore {
   @observable apiStatus!: number
   @observable apiError!: null | string
   apiResponse!: any
   projectPostService

   constructor(service) {
      this.projectPostService = service
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
      this.apiResponse = response
   }

   @action.bound
   projectPostCall(
      requsetObject,
      onPostSuccess = () => null,
      onPostFailure = () => null
   ) {
      const projectPostPromise = this.projectPostService.postProjectAPI(
         requsetObject
      )
      return bindPromiseWithOnSuccess(projectPostPromise)
         .to(this.setGetWorkFlowAPIStatus, response => {
            this.setGetWorkFlowAPIResponse(response)
            onPostSuccess()
         })
         .catch(error => {
            this.setGetWorkFlowAPIError(error)
            onPostFailure()
         })
   }
}

export default ProjectPostStore
