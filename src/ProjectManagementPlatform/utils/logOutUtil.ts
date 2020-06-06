import LogoutService from '../services/logOutService/index.api'
import { clearUserSession } from '../../Common/utils/StorageUtils'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

const logOutService = new LogoutService()

export const onLogOut = () => {
   const userLogoutPromise = logOutService.logOutAPI()

   return bindPromiseWithOnSuccess(userLogoutPromise)
      .to(
         () => null,
         () => clearUserSession()
      )
      .catch(() => null)
}
