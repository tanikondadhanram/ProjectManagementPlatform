import { observable, action } from 'mobx'
import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

class ProjectPostStore {
   @observable apiStatus!: number
   @observable apiError!: null | string
   @observable apiResponse!: any
   @observable projectTitle: string | null = null
   @observable projectDescription: string | null = null
   @observable projectWorkFlow: string | null = null
   @observable projectType: string | null = null
   projectPostService

   constructor(service) {
      this.projectPostService = service
   }

   @action.bound
   init() {
      this.apiStatus = API_INITIAL
      this.apiError = null
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
      this.apiError = error
   }

   @action.bound
   setGetWorkFlowAPIResponse(response: any) {
      this.apiResponse = response
   }

   @action.bound
   ProjectPostCall() {
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
         .to(this.setGetWorkFlowAPIStatus, this.setGetWorkFlowAPIResponse)
         .catch(this.setGetWorkFlowAPIError)
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
   onCreateButtonClick() {
      if (
         this.projectTitle &&
         this.projectDescription &&
         this.projectWorkFlow &&
         this.projectType
      ) {
         this.ProjectPostCall()
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
