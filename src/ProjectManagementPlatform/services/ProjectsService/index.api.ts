import { networkCallWithApisauce } from '../../../Common/utils/APIUtils'
import { create } from 'apisauce'
import { apiMethods } from '../../../Common/constants/APIConstants'

class ProjectsAPI {
   api: any
   constructor() {
      this.api = create({
         baseURL: 'https://365847a626b0.ngrok.io/api/project_management_portal/'
      })
   }

   getProjectsAPI = requestObject => {
      const { limit, offset } = requestObject

      return networkCallWithApisauce(
         this.api,
         `projects/v1/?limit=${limit}&offset=${offset}`,
         {},
         apiMethods.get
      )
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
