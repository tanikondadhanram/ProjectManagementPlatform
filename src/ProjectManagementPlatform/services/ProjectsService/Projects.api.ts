import { networkCallWithApisauce } from '../../../utils/APIUtils'
import { create } from 'apisauce'
import { apiMethods } from '../../../constants/APIConstants'

class ProjectsAPI {
   api: any
   constructor() {
      this.api = create({ baseURL: '' })
   }

   getProjects = requestObject => {
      return networkCallWithApisauce(this.api, 'endPoint', {}, apiMethods.get)
   }

   postProject = requestObect => {
      return networkCallWithApisauce(
         this.api,
         'endPoint',
         requestObect,
         apiMethods.post
      )
   }
}

export default ProjectsAPI
