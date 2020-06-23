import { SignInAPIResponse, SignInAPIRequestObject } from '../../stores/types'

interface TodoService {
   signInAPI: (
      requestObject: SignInAPIRequestObject
   ) => Promise<SignInAPIResponse>
}

export default TodoService
