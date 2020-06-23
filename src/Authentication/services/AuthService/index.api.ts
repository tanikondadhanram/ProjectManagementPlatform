import { create } from 'apisauce'

import { BASE_URL } from '../../../Common/constants/UrlConstants'
import { networkCallWithApisauce } from '../../../Common/utils/APIUtils'
import { apiMethods } from '../../../Common/constants/APIConstants'

import { SignInAPIRequestObject } from '../../stores/types'

import { endPoints } from '../endPoints'

import TodoService from '.'

class AuthService implements TodoService {
   api: Record<string, any>

   constructor() {
      this.api = create({
         baseURL: BASE_URL
      })
   }

   signInAPI = (requestObject: SignInAPIRequestObject) => {
      return networkCallWithApisauce(
         this.api,
         endPoints.signIn,
         requestObject,
         apiMethods.post
      )
   }
}

export { AuthService }
