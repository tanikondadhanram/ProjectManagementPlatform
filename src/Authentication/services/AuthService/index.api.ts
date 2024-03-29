import { create } from 'apisauce'

import envConstants from '../../../Common/constants/EnvironmentConstants'
import { networkCallWithApisauce } from '../../../Common/utils/APIUtils'
import { apiMethods } from '../../../Common/constants/APIConstants'

import { SignInAPIRequestObject } from '../../stores/types'

import { endPoints } from '../endPoints'

import { AuthService } from '.'

class AuthApiService implements AuthService {
   api: Record<string, any>

   constructor() {
      this.api = create({
         baseURL: envConstants.BASE_URL
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

export { AuthApiService }
