import { types } from 'mobx-state-tree'

const WorkFlowModel = types.model({
   todo: types.string,
   in_progress: types.string,
   completed: types.string
})

const WorkFlowStoreModel = types
   .model({
      workFlowStoreApiStatus: types.number,
      workFlowStoreApiError: types.maybeNull(types.string),
      workFlowTypes: types.maybeNull(WorkFlowModel)
   })
   .actions(self => ({
      init() {
         self.workFlowStoreApiStatus = 0
         self.workFlowStoreApiError = null
      },
      clearStore() {
         this.init()
      },
      setGetWorkFlowStoreApiStatus(status) {
         self.workFlowStoreApiStatus = status
      },
      setGetWorkFlowStoreApiError(error) {
         self.workFlowStoreApiError = error
      },
      setGetWorkFlowAPIResponse(response) {
         self.workFlowTypes = response
      }
   }))

export default WorkFlowStoreModel
