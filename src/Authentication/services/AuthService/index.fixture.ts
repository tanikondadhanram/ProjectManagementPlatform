import { resolveWithTimeout } from "../../../Common/utils/timeOutUtils"

import userData from '../../fixtures/userData.json'

class AuthFixtureService {
   signInAPI = () => resolveWithTimeout(userData)
}

export { AuthFixtureService }
