import { observable, action, computed, reaction, trace } from 'mobx'
import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import ProjectModel from '../models/ProjectModel'

class ProjectManagementPlatformStore {
   @observable apiStatus!: number
   @observable apiError!: string | null
   @observable listOfProjects!: any
   @observable paginationOffset!: number
   @observable paginationLimit!: number
   @observable pageNumber!: number
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
      this.pageNumber = 1
      this.paginationReaction()
   }

   @action.bound
   clearStore() {
      this.init()
   }

   @action.bound
   incerementPaginationValues() {
      this.paginationOffset += 10
      this.pageNumber++
      this.getProjects()
   }

   @action.bound
   decerementPaginationValues() {
      this.paginationOffset -= 10
      this.pageNumber--
      this.getProjects()
   }

   @action.bound
   navigateToClickedPage(pageNumber) {
      this.paginationOffset = (pageNumber - 1) * 10
      this.pageNumber = pageNumber
      this.getProjects()
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

   // @computed
   @action.bound
   getProjects() {
      // trace()
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

   @action.bound
   postProject(requestObject) {
      const projectPromise = this.projectsService.postProjectAPI(requestObject)
      return bindPromiseWithOnSuccess(projectPromise)
         .to(this.setGetProjectsAPIStatus, response => {
            this.setGetProjectsAPIResponse(response)
         })
         .catch(error => {
            this.setGetProjectsAPIError(error)
         })
   }

   @computed
   get maxPages() {
      // return this.listOfProjects.length / this.paginationLimit
      return 5
   }

   paginationReaction = reaction(
      () => this.pageNumber,
      pageNumber => alert(pageNumber)
   )
}

export default ProjectManagementPlatformStore
