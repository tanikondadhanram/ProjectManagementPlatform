import { create } from 'apisauce'

import { networkCallWithApisauce } from '../../../../Common/utils/APIUtils'
import { apiMethods } from '../../../../Common/constants/APIConstants'
import { BASE_URL } from '../../../../Common/constants/UrlConstants'

class AuthApi {
   api: object
   constructor() {
      this.api = create({
         baseURL: BASE_URL
      })
   }

   signInAPI = requestObject => {
      return networkCallWithApisauce(
         this.api,
         'user/login/v1/',
         requestObject,
         apiMethods.post
      )
   }
}

export { AuthApi }
