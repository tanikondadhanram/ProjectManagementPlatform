import { create } from 'apisauce'

import { networkCallWithApisauce } from '../../../Common/utils/APIUtils'
import { apiMethods } from '../../../Common/constants/APIConstants'

class CreateTaskService {
   api: any
   constructor() {
      this.api = create({ baseURL: '' })
   }

   CreateTaskAPI = requestObject => {
      return networkCallWithApisauce(
         this.api,
         'endPoint',
         requestObject,
         apiMethods.post
      )
   }
}

export default CreateTaskService
