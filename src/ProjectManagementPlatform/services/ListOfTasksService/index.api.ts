import { action } from 'mobx'
import { create } from 'apisauce'

import { networkCallWithApisauce } from '../../../Common/utils/APIUtils'
import { apiMethods } from '../../../Common/constants/APIConstants'

class ListOfTasksService {
   api: any
   constructor() {
      this.api = create({ baseURL: '' })
   }

   @action.bound
   getListOfTasksAPI(requestObject) {
      const { limit, offset } = requestObject
      return networkCallWithApisauce(this.api, 'endPoint', {}, apiMethods.get)
   }
}

export default ListOfTasksService
