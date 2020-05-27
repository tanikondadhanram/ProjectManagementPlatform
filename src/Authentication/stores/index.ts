import AuthStore from './AuthStore/AuthStore'
import AuthApi from '../services/AuthService/AuthApi'

const authAPi = new AuthApi()
const authStore = new AuthStore(authAPi)

export { authStore }
