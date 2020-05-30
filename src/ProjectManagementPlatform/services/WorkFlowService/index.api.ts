import { action } from 'mobx'
import { create } from 'apisauce'

import { networkCallWithApisauce } from '../../../utils/APIUtils'
import { apiMethods } from '../../../constants/APIConstants'

class WorkFlowService {
   api: any
   constructor() {
      this.api = create({ baseURL: '' })
   }

   @action.bound
   getWorkFlowAPI(requestObject) {
      return networkCallWithApisauce(this.api, 'endPoint', {}, apiMethods.get)
   }
}

export default WorkFlowService
