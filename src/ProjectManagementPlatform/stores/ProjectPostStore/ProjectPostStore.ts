import { observable, action } from 'mobx'
import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

class ProjectPostStore {
   @observable apiStatus!: number
   @observable apiError!: null | string
   @observable apiResponse!: any
   @observable projectTitle!: string | null
   @observable projectDescription!: string | null
   @observable projectWorkFlow!: string | null
   @observable projectType!: string | null
   projectPostService

   constructor(service) {
      this.projectPostService = service
   }

   @action.bound
   init() {
      this.apiStatus = API_INITIAL
      this.apiError = null
      this.projectTitle = null
      this.projectDescription = null
      this.projectWorkFlow = null
      this.projectType = null
   }

   @action.bound
   clearStore() {
      this.init()
   }

   @action.bound
   setGetWorkFlowAPIStatus(status: number) {
      this.apiStatus = status
   }

   @action.bound
   setGetWorkFlowAPIError(error: string) {
      console.log(error)

      this.apiError = error
   }

   @action.bound
   setGetWorkFlowAPIResponse(response: any) {
      this.apiResponse = response
   }

   @action.bound
   ProjectPostCall(onPostSuccess, onPostFailure) {
      const requsetObject = {
         projectTitle: this.projectTitle,
         projectDescription: this.projectDescription,
         projectWorkFlow: this.projectWorkFlow,
         projectType: this.projectType
      }
      const projectPostPromise = this.projectPostService.postProjectAPI(
         requsetObject
      )
      return bindPromiseWithOnSuccess(projectPostPromise)
         .to(this.setGetWorkFlowAPIStatus, response => {
            this.setGetWorkFlowAPIResponse(response)
            onPostSuccess()
            this.clearStore()
         })
         .catch(error => {
            this.setGetWorkFlowAPIError(error)
            onPostFailure()
            this.clearStore()
         })
   }

   @action.bound
   onChangeProjectTitle(event) {
      this.projectTitle = event.target.value
   }

   @action.bound
   onChangeProjectDescription(event) {
      this.projectDescription = event.target.value
   }

   @action.bound
   onChangeProjectType(props) {
      this.projectType = props.value
   }

   @action.bound
   onChangeWorkflowType(props) {
      this.projectWorkFlow = props.value
   }

   @action.bound
   onCreateButtonClick(onPostSuccess, onPostFailure) {
      if (
         this.projectTitle &&
         this.projectDescription &&
         this.projectWorkFlow &&
         this.projectType
      ) {
         this.ProjectPostCall(onPostSuccess, onPostFailure)
      } else {
         this.projectTitle = this.projectTitle ? this.projectTitle : ''
         this.projectDescription = this.projectDescription
            ? this.projectDescription
            : ''
         this.projectWorkFlow = this.projectWorkFlow ? this.projectWorkFlow : ''
         this.projectType = this.projectType ? this.projectType : ''
      }
   }
}

export default ProjectPostStore
