import { types } from 'mobx-state-tree'

import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

import { AuthMstFixtureService } from '../services/AuthService/index.fixture.mst'

import AuthMstModel from './AuthStore/AuthStore.mst'

const AuthStoreWithService = types
   .compose(AuthMstFixtureService, AuthMstModel)
   .actions(self => ({
      userSignIn(userDetails, onSignInSuccess, onSignInFailure) {
         const userSignInAPIPromise = self.signInAPI(userDetails)

         return bindPromiseWithOnSuccess(userSignInAPIPromise)
            .to(self.setUserSignInAPIStatus, response => {
               self.setUserSignInAPIResponse(response)
               onSignInSuccess()
            })
            .catch(error => {
               self.setUserSignInAPIError(error)
               onSignInFailure()
            })
      }
   }))

const authStore = AuthStoreWithService.create({
   signInApiStatus: API_INITIAL,
   signInApiError: null,
   signInApiResponse: null
})

export { authStore }
