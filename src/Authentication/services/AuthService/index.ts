import { SignInAPIResponse, SignInAPIRequestObject } from '../../stores/types'

interface AuthService {
   signInAPI: (
      requestObject: SignInAPIRequestObject
   ) => Promise<SignInAPIResponse>
}

export type { AuthService }
