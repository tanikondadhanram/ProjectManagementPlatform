import { types } from 'mobx-state-tree'

import { resolveWithTimeout } from '../../../Common/utils/timeOutUtils'

import userData from '../../fixtures/userData.json'

const AuthMstFixtureService = types.model().actions(self => ({
   signInAPI(requestObj) {
      return resolveWithTimeout(userData)
   }
}))

export default AuthMstFixtureService
