import { create } from 'apisauce'
import { action } from 'mobx'

import { networkCallWithApisauce } from '../../../Common/utils/APIUtils'
import { apiMethods } from '../../../Common/constants/APIConstants'

class ProjectPostService {
   api: any
   constructor() {
      this.api = create({ baseURL: '' })
   }

   @action.bound
   postProjectAPI(requestObect) {
      return networkCallWithApisauce(
         this.api,
         'endPoint',
         requestObect,
         apiMethods.post
      )
   }
}

export default ProjectPostService
