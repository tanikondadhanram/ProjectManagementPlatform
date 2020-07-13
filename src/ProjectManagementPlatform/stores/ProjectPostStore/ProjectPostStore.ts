import { observable, action } from 'mobx'
import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

class ProjectPostStore {
   @observable projectPostStoreApiStatus!: number
   @observable projectPostStoreApiError!: null | string
   projectPostStoreApiResponse!: any
   projectPostService

   constructor(service) {
      this.projectPostService = service
      this.init()
   }

   @action.bound
   init() {
      this.projectPostStoreApiStatus = API_INITIAL
      this.projectPostStoreApiError = null
   }

   @action.bound
   clearStore() {
      this.init()
   }

   @action.bound
   setGetProjectPostStoreApiStatus(status: number) {
      this.projectPostStoreApiStatus = status
   }

   @action.bound
   setGetProjectPostStoreApiError(error: string) {
      this.projectPostStoreApiError = error
   }

   @action.bound
   setGetProjectPostStoreApiResponse(response: any) {
      this.projectPostStoreApiResponse = response
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
         .to(this.setGetProjectPostStoreApiStatus, response => {
            this.setGetProjectPostStoreApiResponse(response)
            onPostSuccess()
         })
         .catch(error => {
            this.setGetProjectPostStoreApiError(error)
            onPostFailure()
         })
   }
}

export default ProjectPostStore
