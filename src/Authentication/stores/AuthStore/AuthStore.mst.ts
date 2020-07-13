import { types } from 'mobx-state-tree'

import { setAccessToken } from '../../../Common/utils/StorageUtils'
import { API_INITIAL } from '@ib/api-constants'

const SignInResponseModel = types.model({
   access_token: types.string,
   refresh_token: types.string,
   expires_in: types.number,
   is_admin: types.boolean,
   profile_pic: types.string,
   name: types.string
})

const AuthMstModel = types
   .model({
      signInApiStatus: types.number,
      signInApiError: types.maybeNull(types.string),
      signInApiResponse: types.maybeNull(SignInResponseModel)
   })
   .actions(self => ({
      init() {
         self.signInApiStatus = API_INITIAL
         self.signInApiError = null
      },
      clearStore() {
         this.init()
      },
      setUserSignInAPIStatus(status) {
         self.signInApiStatus = status
      },
      setUserSignInAPIError(error) {
         self.signInApiError = error
      },
      setUserSignInAPIResponse(response) {
         if (response) {
            setAccessToken(response['access_token'])
            self.signInApiResponse = response

            window.localStorage.setItem(
               'userDetails',
               JSON.stringify(JSON.stringify(response))
            )
         }
      }
   }))

export default AuthMstModel
