import { types, getEnv } from 'mobx-state-tree'

import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

const DeveloperModel = types.model({
   name: types.string
})

const ProjectModel = types.model({
   id: types.number,
   project_title: types.string,
   workflow_type: types.string,
   created_by: types.string,
   description: types.string,
   created_at: types.string,
   project_type: types.string,
   developers: types.array(DeveloperModel)
})

ProjectModel

const PmpStore = types
   .model({
      pmpStoreApiStatus: types.number,
      pmpStoreApiError: types.maybeNull(types.string),
      listOfProjects: types.array(ProjectModel),
      offset: types.number,
      limit: types.number,
      totalProjectsLength: types.number
   })
   .actions(self => ({
      init() {
         self.pmpStoreApiStatus = API_INITIAL
         self.pmpStoreApiError = null
         //@ts-ignore
         self.listOfProjects = []
         self.offset = 0
         self.limit = 10
         self.totalProjectsLength = 0
      },
      clearStore() {
         this.init()
      },
      setGetPmpStoreApiStatus(status) {
         self.pmpStoreApiStatus = status
      },
      setGetPmpStoreApiError(error) {
         self.pmpStoreApiError = error
      },
      setGetProjectsAPIResponse(response) {
         self.totalProjectsLength = response.total_projects
         self.listOfProjects = response.projects.map(projectDetails =>
            ProjectModel.create({
               id: projectDetails.id,
               project_title: projectDetails.project_title,
               workflow_type: projectDetails.workflow_type,
               created_by: projectDetails.created_by,
               description: projectDetails.description,
               created_at: projectDetails.created_at,
               project_type: projectDetails.project_type,
               developers: projectDetails.developers
            })
         )
      },
      getProjects() {
         const requestObject = {
            limit: self.limit,
            offset: self.offset
         }

         const projectsPromise = getEnv(self).projectsService.getProjectsAPI(
            requestObject
         )
         return bindPromiseWithOnSuccess(projectsPromise)
            .to(this.setGetPmpStoreApiStatus, response => {
               this.setGetProjectsAPIResponse(response)
            })
            .catch(error => {
               this.setGetPmpStoreApiError(error)
            })
      },
      navigateToClickedPage(paginationObject) {
         const pageNumber = paginationObject.selected
         self.offset = pageNumber * self.limit
      }
   }))

export default PmpStore
