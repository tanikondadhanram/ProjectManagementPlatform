import { types } from 'mobx-state-tree'

import { resolveWithTimeout } from '../../../Common/utils/timeOutUtils'

import states from '../../fixtures/ListOfStates.json'

const StatesService = types.model().actions(self => ({
   getStatesAPI() {
      return resolveWithTimeout(states)
   }
}))

export default StatesService
