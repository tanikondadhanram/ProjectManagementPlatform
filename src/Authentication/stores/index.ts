import { API_INITIAL } from '@ib/api-constants'

import AuthMstFixtureService from '../services/AuthService/index.fixture.mst'

import AuthMstModel from './AuthStore/AuthStore.mst'

const authStore = AuthMstModel.create(
   {
      signInApiStatus: API_INITIAL,
      signInApiError: null,
      signInApiResponse: null
   },
   {
      authService: AuthMstFixtureService.create()
   }
)

export { authStore }
