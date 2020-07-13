import { observable, action } from 'mobx'
import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { API_INITIAL } from '@ib/api-constants'
import TaskModel from '../models/TaskModel'

class TasksStore {
   @observable taskStoreApiStatus!: number
   @observable taskStoreApiError!: null | string
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
      this.taskStoreApiStatus = API_INITIAL
      this.taskStoreApiError = null
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
   setGetTaskStoreApiStatus(status: number) {
      this.taskStoreApiStatus = status
   }

   @action.bound
   setGetTaskStoreApiError(error: string) {
      this.taskStoreApiError = error
   }

   @action.bound
   setGetTaskStoreAPIResponse(response: any) {
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
         .to(this.setGetTaskStoreApiStatus, this.setGetTaskStoreAPIResponse)
         .catch(this.setGetTaskStoreApiError)
   }

   // @computed
   // get maxPages() {
   //    if (listOfTasks) return this.listOfTasks[0].total_tasks / this.limit
   // }
}

export default TasksStore
