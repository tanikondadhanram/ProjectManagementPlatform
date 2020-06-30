// import { AuthService } from '../services/AuthService/index.api'
import { AuthFixtureService } from '../services/AuthService/index.fixture'

import AuthStore from './AuthStore/AuthStore'

const authAPi = new AuthFixtureService()
const authStore = new AuthStore(authAPi)

export { authStore }
