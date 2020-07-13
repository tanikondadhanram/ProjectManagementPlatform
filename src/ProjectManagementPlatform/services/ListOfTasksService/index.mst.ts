import { types } from 'mobx-state-tree'

import { resolveWithTimeout } from '../../../Common/utils/timeOutUtils'

import data from '../../fixtures/ListOfTasks.json'

const ListOfTasksService = types.model().actions(self => ({
   getListOfTasksAPI(requestObject) {
      const { limit, offset } = requestObject
      return resolveWithTimeout({
         tasks: data.tasks.slice().splice(offset, limit)
      })
   }
}))

export default ListOfTasksService
