import { types } from 'mobx-state-tree'
import { resolveWithTimeout } from '../../../Common/utils/timeOutUtils'

const CreateTaskService = types.model().actions(self => ({
   CreateTaskAPI(requestObject) {
      return resolveWithTimeout()
   }
}))

export default CreateTaskService
