import { resolveWithTimeout } from '../../../Common/utils/timeOutUtils'

import userData from '../../fixtures/userData.json'

import { AuthService } from '.'

class AuthFixtureService implements AuthService {
   signInAPI = (): Promise<any> => resolveWithTimeout(userData)
}

export { AuthFixtureService }
