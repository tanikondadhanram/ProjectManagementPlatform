import { types } from 'mobx-state-tree'
import { API_INITIAL } from '@ib/api-constants'

const ProjectPostModel = types.model({
   response: types.string
})

const ProjectPostStore = types
   .model({
      projectPostStoreApiStatus: types.number,
      projectPostStoreApiError: types.maybeNull(types.string),
      projectPostStoreApiResponse: types.maybeNull(ProjectPostModel)
   })
   .actions(self => ({
      init() {
         self.projectPostStoreApiStatus = API_INITIAL
         self.projectPostStoreApiError = null
      },
      clearStore() {
         this.init()
      },
      setGetProjectPostStoreApiStatus(status) {
         self.projectPostStoreApiStatus = status
      },
      setGetProjectPostStoreApiError(error) {
         self.projectPostStoreApiError = error
      },
      setGetProjectPostStoreApiResponse(response) {
         self.projectPostStoreApiResponse = response
      }
   }))

export default ProjectPostStore
