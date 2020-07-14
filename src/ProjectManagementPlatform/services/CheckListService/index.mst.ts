import { types } from 'mobx-state-tree'

import { resolveWithTimeout } from '../../../Common/utils/timeOutUtils'

import checkList from '../../fixtures/CheckList.json'

const CheckListService = types.model().actions(self => ({
   getCheckListAPI() {
      return resolveWithTimeout(checkList)
   },
   postCheckListAPI(requestObject) {
      return resolveWithTimeout('State Updated Successfully')
   }
}))

export default CheckListService
