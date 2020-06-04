import { create } from 'apisauce'
import { action } from 'mobx'

import { networkCallWithApisauce } from '../../../Common/utils/APIUtils'
import { apiMethods } from '../../../Common/constants/APIConstants'

class ProjectPostService {
   api: any
   constructor() {
      this.api = create({
         baseURL: 'https://365847a626b0.ngrok.io/api/project_management_portal/'
      })
   }

   @action.bound
   postProjectAPI(requestObect) {
      return networkCallWithApisauce(
         this.api,
         'projects/v1/',
         requestObect,
         apiMethods.post
      )
   }
}

export default ProjectPostService
