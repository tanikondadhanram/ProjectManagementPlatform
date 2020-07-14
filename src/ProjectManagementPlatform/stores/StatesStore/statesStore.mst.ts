import { types, getEnv } from 'mobx-state-tree'

import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

const StateModel = types.model({
   state_id: types.number,
   name: types.string
})

const StatesStoreModel = types
   .model({
      statesStoreApiStatus: types.number,
      statesStoreApiError: types.maybeNull(types.string),
      statesStoreApiResponse: types.maybeNull(types.array(StateModel))
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
      },
      getStates(requestObject) {
         const statesPromise = getEnv(self).statesService.getStatesAPI()
         return bindPromiseWithOnSuccess(statesPromise)
            .to(this.setGetStatesStoreApiStatus, response => {
               this.setGetStatesAPIResponse(response)
            })
            .catch(error => {
               this.setGetStatesStoreApiError(error)
            })
      }
   }))

export default StatesStoreModel
