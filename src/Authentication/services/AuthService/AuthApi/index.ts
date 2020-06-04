import { create } from 'apisauce'

import { networkCallWithApisauce } from '../../../../Common/utils/APIUtils'
import { apiMethods } from '../../../../Common/constants/APIConstants'

class AuthApi {
   api: object
   constructor() {
      this.api = create({
         baseURL: 'https://365847a626b0.ngrok.io/api/project_management_portal/'
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
