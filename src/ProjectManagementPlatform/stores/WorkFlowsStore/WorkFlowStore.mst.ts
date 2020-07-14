import { types, getEnv } from 'mobx-state-tree'

import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

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
      },
      getWorkFlowTypes() {
         const workFlowPromise = getEnv(self).workFlowService.getWorkFlowAPI({})
         return bindPromiseWithOnSuccess(workFlowPromise)
            .to(this.setGetWorkFlowStoreApiStatus, response => {
               this.setGetWorkFlowAPIResponse(response)
            })
            .catch(error => {
               this.setGetWorkFlowStoreApiError(error)
            })
      }
   }))

export default WorkFlowStoreModel
