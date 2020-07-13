import { types } from 'mobx-state-tree'

import { resolveWithTimeout } from '../../../Common/utils/timeOutUtils'

import response from '../../fixtures/ProjectPostFixture.json'

const ProjectPostFixture = types.model().actions(self => ({
   postProjectAPI(requestObject) {
      return resolveWithTimeout(response)
   }
}))

export default ProjectPostFixture
