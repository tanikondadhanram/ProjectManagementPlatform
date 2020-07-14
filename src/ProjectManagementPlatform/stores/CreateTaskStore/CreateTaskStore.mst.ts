import { types, getEnv } from 'mobx-state-tree'

import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

const CreateTaskStoreModel = types
   .model({
      createTaskApiStatus: types.number,
      createTaskApiError: types.maybeNull(types.string),
      createTaskApiResponse: types.maybeNull(types.string)
   })
   .actions(self => ({
      init() {
         self.createTaskApiStatus = API_INITIAL
         self.createTaskApiError = null
      },
      clearStore() {
         this.init()
      },
      setGetCreateTaskCreateTaskApiStatus(status: number) {
         self.createTaskApiStatus = status
      },
      setGetCreateTaskCreateTaskAPiError(error: string) {
         self.createTaskApiError = error
      },
      setGetCreateTaskCreateTaskAPiResponse(response: any) {
         self.createTaskApiResponse = response
      },
      postCreatedTask(
         requsetObject,
         onTaskCreatedSuccessfully = () => null,
         onTaskCreatedFailure = () => null
      ) {
         const workFlowPromise = getEnv(self).createTaskService.CreateTaskAPI(
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
   }))

export default CreateTaskStoreModel
