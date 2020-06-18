import { create } from 'apisauce'

import { BASE_URL } from '../../../Common/constants/UrlConstants'
import { networkCallWithApisauce } from '../../../Common/utils/APIUtils'
import { apiMethods } from '../../../Common/constants/APIConstants'

class AuthService {
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

export { AuthService }
