import { types } from 'mobx-state-tree'
import { API_INITIAL } from '@ib/api-constants'

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
      }
   }))

export default CreateTaskStoreModel
