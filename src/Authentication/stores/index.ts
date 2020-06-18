import AuthStore from './AuthStore/AuthStore'
import { AuthService } from '../services/AuthService/index.api'

const authAPi = new AuthService()
const authStore = new AuthStore(authAPi)

export { authStore }
