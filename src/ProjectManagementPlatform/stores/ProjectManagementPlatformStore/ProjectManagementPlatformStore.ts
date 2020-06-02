import { observable, action, computed } from 'mobx'
import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import ProjectModel from '../models/ProjectModel'

class ProjectManagementPlatformStore {
   @observable apiStatus!: number
   @observable apiError!: string | null
   @observable listOfProjects!: any
   @observable paginationOffset!: number
   @observable paginationLimit!: number
   projectsService: any

   constructor(service: any) {
      this.projectsService = service
      this.init()
   }

   @action.bound
   init() {
      this.apiStatus = API_INITIAL
      this.apiError = null
      this.listOfProjects = []
      this.paginationOffset = 0
      this.paginationLimit = 10
   }

   @action.bound
   clearStore() {
      this.init()
   }

   @action.bound
   navigateToClickedPage(paginationObject) {
      const pageNumber = paginationObject.selected
      this.paginationOffset = pageNumber * 10
   }

   @action.bound
   setGetProjectsAPIStatus(status: number) {
      this.apiStatus = status
   }

   @action.bound
   setGetProjectsAPIError(error: string) {
      this.apiError = error
   }

   @action.bound
   setGetProjectsAPIResponse(response: any) {
      if (Array.isArray(response)) {
         this.listOfProjects = response.map(
            projectDetails => new ProjectModel(projectDetails)
         )
      }
   }

   @action.bound
   getProjects() {
      const requestObject = {
         limit: this.paginationLimit,
         offset: this.paginationOffset
      }

      const projectsPromise = this.projectsService.getProjectsAPI(requestObject)
      return bindPromiseWithOnSuccess(projectsPromise)
         .to(this.setGetProjectsAPIStatus, response => {
            this.setGetProjectsAPIResponse(response)
         })
         .catch(error => {
            this.setGetProjectsAPIError(error)
         })
   }

   @computed
   get maxPages() {
      return this.listOfProjects.length
   }
}

export default ProjectManagementPlatformStore
