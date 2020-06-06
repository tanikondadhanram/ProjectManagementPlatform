import { create } from 'apisauce'
import { action } from 'mobx'

import { networkCallWithApisauce } from '../../../Common/utils/APIUtils'
import { apiMethods } from '../../../Common/constants/APIConstants'
import { BASE_URL } from '../../../Common/constants/UrlConstants'

class StatesService {
   api: any
   constructor() {
      this.api = create({
         baseURL: BASE_URL
      })
   }

   getStatesAPI = requestObect => {
      const { projectId, taskId } = requestObect

      return networkCallWithApisauce(
         this.api,
         `projects/${projectId}/tasks/${taskId}/states/v1`,
         requestObect,
         apiMethods.get
      )
   }
}

export default StatesService
