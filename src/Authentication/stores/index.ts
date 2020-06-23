import { AuthService } from '../services/AuthService/index.api'

import AuthStore from './AuthStore/AuthStore'

const authAPi = new AuthService()
const authStore = new AuthStore(authAPi)

export { authStore }
