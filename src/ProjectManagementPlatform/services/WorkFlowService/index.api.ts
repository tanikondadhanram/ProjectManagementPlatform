import { action } from 'mobx'
import { create } from 'apisauce'

import { networkCallWithApisauce } from '../../../Common/utils/APIUtils'
import { apiMethods } from '../../../Common/constants/APIConstants'
import { BASE_URL } from '../../../Common/constants/UrlConstants'

class WorkFlowService {
   api: any
   constructor() {
      this.api = create({
         baseURL: BASE_URL
      })
   }

   @action.bound
   getWorkFlowAPI(requestObject) {
      return networkCallWithApisauce(
         this.api,
         'workflows/v1',
         {},
         apiMethods.get
      )
   }
}

export default WorkFlowService
