import { action } from 'mobx'
import { create } from 'apisauce'

import { networkCallWithApisauce } from '../../../Common/utils/APIUtils'
import { apiMethods } from '../../../Common/constants/APIConstants'

class WorkFlowService {
   api: any
   constructor() {
      this.api = create({
         baseURL: 'https://365847a626b0.ngrok.io/api/project_management_portal/'
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
