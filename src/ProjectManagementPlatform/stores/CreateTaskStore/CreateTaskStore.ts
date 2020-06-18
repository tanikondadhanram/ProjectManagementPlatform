import { observable, action } from 'mobx'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { API_INITIAL } from '@ib/api-constants'

class CreateTaskStore {
   @observable apiStatus!: number
   @observable apiError!: null | string
   @observable apiResponse!: string
   CreateTaskService

   constructor(service) {
      this.CreateTaskService = service
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
   setGetCreateTaskAPIStatus(status: number) {
      this.apiStatus = status
   }

   @action.bound
   setGetCreateTaskAPIError(error: string) {
      this.apiError = error
   }

   @action.bound
   setGetCreateTaskAPIResponse(response: any) {
      this.apiResponse = response
   }

   @action.bound
   postCreatedTask(
      requsetObject,
      onTaskCreatedSuccessfully = () => null,
      onTaskCreatedFailure = () => null
   ) {
      const workFlowPromise = this.CreateTaskService.CreateTaskAPI(
         requsetObject
      )
      return bindPromiseWithOnSuccess(workFlowPromise)
         .to(this.setGetCreateTaskAPIStatus, response => {
            this.setGetCreateTaskAPIResponse(response)
            onTaskCreatedSuccessfully()
         })
         .catch(error => {
            this.setGetCreateTaskAPIError(error)
            onTaskCreatedFailure()
         })
   }
}

export default CreateTaskStore
