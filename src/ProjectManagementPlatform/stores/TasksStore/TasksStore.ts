import { observable, action } from 'mobx'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { API_INITIAL } from '@ib/api-constants'
import TaskModel from '../models/TaskModel'

class TasksStore {
   @observable apiStatus!: number
   @observable apiError!: null | string
   @observable listOfTasks!: any
   @observable offset!: number
   limit!: number
   listOfTasksService

   constructor(service) {
      this.listOfTasksService = service
      this.init()
   }

   @action.bound
   init() {
      this.apiStatus = API_INITIAL
      this.apiError = null
      this.offset = 0
      this.limit = 10
      this.listOfTasks = []
   }

   @action.bound
   clearStore() {
      this.init()
   }

   @action.bound
   navigateToClickedPage(paginationObject) {
      const pageNumber = paginationObject.selected
      this.offset = pageNumber * 10
   }

   @action.bound
   setGetListOfTasksAPIStatus(status: number) {
      this.apiStatus = status
   }

   @action.bound
   setGetListOfTasksAPIError(error: string) {
      this.apiError = error
   }

   @action.bound
   setGetListOfTasksAPIResponse(response: any) {
      this.listOfTasks = response.tasks.map(
         eachTask => new TaskModel(eachTask, this.listOfTasksService)
      )
   }

   @action.bound
   getListOfTasks(projectId) {
      const requestObject = {
         limit: this.limit,
         offset: this.offset,
         projectId
      }
      const listOfTasksPromise = this.listOfTasksService.getListOfTasksAPI(
         requestObject
      )
      return bindPromiseWithOnSuccess(listOfTasksPromise)
         .to(this.setGetListOfTasksAPIStatus, this.setGetListOfTasksAPIResponse)
         .catch(this.setGetListOfTasksAPIError)
   }

   // @computed
   // get maxPages() {
   //    if (listOfTasks) return this.listOfTasks[0].total_tasks / this.limit
   // }
}

export default TasksStore
