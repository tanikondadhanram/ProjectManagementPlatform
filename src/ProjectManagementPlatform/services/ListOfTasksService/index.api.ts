import { action } from 'mobx'
import { create } from 'apisauce'

import { networkCallWithApisauce } from '../../../Common/utils/APIUtils'
import { apiMethods } from '../../../Common/constants/APIConstants'
import { BASE_URL } from '../../../Common/constants/UrlConstants'

class ListOfTasksService {
   api: any
   constructor() {
      this.api = create({
         baseURL: BASE_URL
      })
   }

   @action.bound
   getListOfTasksAPI(requestObject) {
      const { projectId } = requestObject

      return networkCallWithApisauce(
         this.api,
         `projects/${projectId}/tasks/v1/`,
         {},
         apiMethods.get
      )
   }
}

export default ListOfTasksService
