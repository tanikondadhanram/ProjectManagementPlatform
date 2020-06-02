import { networkCallWithApisauce } from '../../../Common/utils/APIUtils'
import { create } from 'apisauce'
import { apiMethods } from '../../../Common/constants/APIConstants'

class ProjectsAPI {
   api: any
   constructor() {
      this.api = create({ baseURL: '' })
   }

   getProjectsAPI = requestObject => {
      return networkCallWithApisauce(this.api, 'endPoint', {}, apiMethods.get)
   }

   postProjectAPI = requestObect => {
      return networkCallWithApisauce(
         this.api,
         'endPoint',
         requestObect,
         apiMethods.post
      )
   }
}

export default ProjectsAPI
