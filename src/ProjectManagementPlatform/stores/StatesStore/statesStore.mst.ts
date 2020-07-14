import { types } from 'mobx-state-tree'

import { API_INITIAL } from '@ib/api-constants'

const StatesStoreModel = types
   .model({
      statesStoreApiStatus: types.number,
      statesStoreApiError: types.maybeNull(types.string),
      statesStoreApiResponse: types.maybeNull(types.string)
   })
   .actions(self => ({
      init() {
         self.statesStoreApiStatus = API_INITIAL
         self.statesStoreApiError = null
      },
      clearStore() {
         this.init()
      },
      setGetStatesStoreApiStatus(status: number) {
         self.statesStoreApiStatus = status
      },
      setGetStatesStoreApiError(error: any) {
         self.statesStoreApiError = error
      },
      setGetStatesAPIResponse(response: any) {
         self.statesStoreApiResponse = response.states
      }
   }))

export default StatesStoreModel
