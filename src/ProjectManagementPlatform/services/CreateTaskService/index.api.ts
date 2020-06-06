import { create } from 'apisauce'

import { networkCallWithApisauce } from '../../../Common/utils/APIUtils'
import { apiMethods } from '../../../Common/constants/APIConstants'
import { BASE_URL } from '../../../Common/constants/UrlConstants'

class CreateTaskService {
   api: any
   constructor() {
      this.api = create({
         baseURL: BASE_URL
      })
   }

   CreateTaskAPI = requestObject => {
      const { stateId, projectId } = requestObject

      const request = {
         issue_type: requestObject.issueType,
         description: requestObject.description,
         title: requestObject.title,
         state_id: stateId
      }

      return networkCallWithApisauce(
         this.api,
         `projects/${projectId}/tasks/v1/`,
         request,
         apiMethods.post
      )
   }
}

export default CreateTaskService
