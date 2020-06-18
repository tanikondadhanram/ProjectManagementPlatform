import { observable } from 'mobx'
import { action } from 'mobx'
import { API_INITIAL } from '@ib/api-constants'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'

class TaskModel {
   @observable apiStatus!: number
   @observable apiError!: null | string
   @observable state: string
   taskId: number
   issueType: string
   title: string
   assignedTo: []
   description: string
   totalNumberOfTasks: number
   states
   statesService

   constructor(props, service) {
      this.init()
      this.taskId = props['task_id']
      this.issueType = props['issue_type']
      this.title = props['title']
      this.assignedTo = props['assignee']
      this.description = props['description']
      this.state = props['state']
      this.totalNumberOfTasks = props['total_tasks']
      this.statesService = service
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
   setGetStatesAPIStatus(status: number) {
      this.apiStatus = status
   }

   @action.bound
   setGetStatesAPIError(error: string) {
      this.apiError = error
   }

   @action.bound
   setGetStatesAPIResponse(response: any) {
      this.states = response.states
   }

   @action.bound
   getStates(requestObject) {
      const statesPromise = this.statesService.getStatesAPI(requestObject)
      return bindPromiseWithOnSuccess(statesPromise)
         .to(this.setGetStatesAPIStatus, response => {
            this.setGetStatesAPIResponse(response)
         })
         .catch(error => {
            this.setGetStatesAPIError(error)
         })
   }
}

export default TaskModel
