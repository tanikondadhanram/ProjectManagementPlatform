import { create } from 'apisauce'
import { action } from 'mobx'

import { networkCallWithApisauce } from '../../../Common/utils/APIUtils'
import { apiMethods } from '../../../Common/constants/APIConstants'
import { BASE_URL } from '../../../Common/constants/UrlConstants'

class ProjectPostService {
   api: any
   constructor() {
      this.api = create({
         baseURL: BASE_URL
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
