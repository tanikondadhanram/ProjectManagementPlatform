import { networkCallWithApisauce } from '../../../Common/utils/APIUtils'
import { create } from 'apisauce'
import { apiMethods } from '../../../Common/constants/APIConstants'
import { BASE_URL } from '../../../Common/constants/UrlConstants'

class ProjectsAPI {
   api: any
   constructor() {
      this.api = create({
         baseURL: BASE_URL
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
}

export default ProjectsAPI
