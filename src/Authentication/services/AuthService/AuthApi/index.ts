import { create } from 'apisauce'
import { action } from 'mobx'

// import { networkCallWithApisauce } from '../../../../utils/APIUtils'
// import { apiMethods } from '../../../../constants/APIConstants'

import usersData from '../../../fixtures/usersData.json'

class AuthApi {
   api: object
   constructor() {
      this.api = create({
         baseURL: ''
      })
   }

   @action.bound
   signInAPI(requestObject) {
      return new Promise(resolve => setTimeout(() => resolve(usersData), 3000))
      //       return networkCallWithApisauce(this.api, '', requestObject, apiMethods.post)
   }
}

export { AuthApi }
