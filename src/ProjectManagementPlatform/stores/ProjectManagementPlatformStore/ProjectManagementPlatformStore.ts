import { observable, action, computed } from 'mobx'
import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import ProjectModel from '../models/ProjectModel'

class ProjectManagementPlatformStore {
   @observable apiStatus!: number
   @observable apiError!: string | null
   @observable listOfProjects!: any
   @observable offset!: number
   @observable limit!: number
   @observable totalProjectsLength!: number
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
      this.offset = 0
      this.limit = 10
      this.totalProjectsLength = 0
   }

   @action.bound
   clearStore() {
      this.init()
   }

   @action.bound
   navigateToClickedPage(paginationObject) {
      const pageNumber = paginationObject.selected
      this.offset = pageNumber * this.limit
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
      this.totalProjectsLength = response.total_projects
      this.listOfProjects = response.projects.map(
         projectDetails => new ProjectModel(projectDetails)
      )
   }

   @action.bound
   getProjects() {
      const requestObject = {
         limit: this.limit,
         offset: this.offset
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
      let number = this.totalProjectsLength / this.limit
      // number = Math.trunc(number)
      // number = number % 10 === 0 ? number : number + 2
      return Math.ceil(number)
   }
}

export default ProjectManagementPlatformStore
