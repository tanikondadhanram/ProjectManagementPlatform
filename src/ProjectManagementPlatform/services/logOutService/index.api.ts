import { create } from 'apisauce'

import { BASE_URL } from '../../../Common/constants/UrlConstants'
import { networkCallWithApisauce } from '../../../Common/utils/APIUtils'
import { apiMethods } from '../../../Common/constants/APIConstants'

class LogoutService {
   api
   constructor() {
      this.api = create({
         baseURL: BASE_URL
      })
   }
   logOutAPI = () =>
      networkCallWithApisauce(
         this.api,
         'user/logout/v1/',
         {},
         apiMethods.delete
      )
}

export default LogoutService
