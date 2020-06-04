import { create } from 'apisauce'
import { action } from 'mobx'

import { networkCallWithApisauce } from '../../../Common/utils/APIUtils'
import { apiMethods } from '../../../Common/constants/APIConstants'

class TaskStateService {
   api: any
   constructor() {
      this.api = create({ baseURL: '' })
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
