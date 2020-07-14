import { observable, action } from 'mobx'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { API_INITIAL } from '@ib/api-constants'

class CreateTaskStore {
   @observable createTaskApiStatus!: number
   @observable createTaskApiError!: null | string
   @observable createTaskApiResponse!: string
   CreateTaskService

   constructor(service) {
      this.CreateTaskService = service
      this.init()
   }

   @action.bound
   init() {
      this.createTaskApiStatus = API_INITIAL
      this.createTaskApiError = null
   }

   @action.bound
   clearStore() {
      this.init()
   }

   @action.bound
   setGetCreateTaskCreateTaskApiStatus(status: number) {
      this.createTaskApiStatus = status
   }

   @action.bound
   setGetCreateTaskCreateTaskAPiError(error: string) {
      this.createTaskApiError = error
   }

   @action.bound
   setGetCreateTaskCreateTaskAPiResponse(response: any) {
      this.createTaskApiResponse = response
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
         .to(this.setGetCreateTaskCreateTaskApiStatus, response => {
            this.setGetCreateTaskCreateTaskAPiResponse(response)
            onTaskCreatedSuccessfully()
         })
         .catch(error => {
            this.setGetCreateTaskCreateTaskAPiError(error)
            onTaskCreatedFailure()
         })
   }
}

export default CreateTaskStore
