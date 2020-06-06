import { create } from 'apisauce'

import { networkCallWithApisauce } from '../../../Common/utils/APIUtils'
import { apiMethods } from '../../../Common/constants/APIConstants'
import { BASE_URL } from '../../../Common/constants/UrlConstants'

class CheckListService {
   api: any
   constructor() {
      this.api = create({
         baseURL: BASE_URL
      })
   }

   getCheckListAPI = requestObject => {
      const { taskId, projectId, toStateId } = requestObject

      return networkCallWithApisauce(
         this.api,
         `projects/${projectId}/tasks/${taskId}/transition/details/v1/`,
         { to_state_id: toStateId },
         apiMethods.post
      )
   }

   postCheckListAPI = requestObject => {
      const { taskId, projectId, toStateId, checklist } = requestObject
      console.log(checklist)

      const data = { to_state_id: toStateId, checklist }
      return networkCallWithApisauce(
         this.api,
         `projects/${projectId}/tasks/${taskId}/state/update/v1/`,
         data,
         apiMethods.put
      )
   }
}

export default CheckListService
