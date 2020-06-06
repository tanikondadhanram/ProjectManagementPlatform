import { create } from 'apisauce'
import { action } from 'mobx'

import { networkCallWithApisauce } from '../../../Common/utils/APIUtils'
import { apiMethods } from '../../../Common/constants/APIConstants'
import { BASE_URL } from '../../../Common/constants/UrlConstants'

class TaskStateService {
   api: any
   constructor() {
      this.api = create({ baseURL: BASE_URL })
   }

   @action.bound
   updateTaskStateAPI(requestObect) {
      return networkCallWithApisauce(
         this.api,
         'endPoint',
         requestObect,
         apiMethods.post
      )
   }
}

export default TaskStateService
