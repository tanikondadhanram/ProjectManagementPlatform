import { types } from 'mobx-state-tree'

import { resolveWithTimeout } from '../../../Common/utils/timeOutUtils'

import workFlowTypes from '../../fixtures/workFlowTypes.json'

const WorkFlowService = types.model().actions(self => ({
   getWorkFlowAPI(requestObject) {
      return resolveWithTimeout(workFlowTypes)
   }
}))

export default WorkFlowService
