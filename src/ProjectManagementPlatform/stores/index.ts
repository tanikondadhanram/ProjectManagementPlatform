import { types } from 'mobx-state-tree'

import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { API_INITIAL } from '@ib/api-constants'

import ProjectsAPI from '../services/ProjectsService/index.mst'
import ProjectPostService from '../services/ProjectPostService/index.mst'
import WorkFlowService from '../services/WorkFlowService/index.mst'
import ListOfTasksService from '../services/ListOfTasksService/index.mst'
import CreateTaskService from '../services/CreateTaskService/index.mst'
import StatesService from '../services/GetStatesService/index.mst'
import CheckListService from '../services/CheckListService/index.mst'

import ProjectManagementPlatformStore from './ProjectManagementPlatformStore/pmpStore.mst'
import ProjectPostStore from './ProjectPostStore/ProjectPostStore.mst'
import WorkFlowStoreModel from './WorkFlowsStore/WorkFlowStore.mst'
import TaskStoreModel from './TasksStore/TasksStore.mst'
import CreateTaskStoreModel from './CreateTaskStore/CreateTaskStore.mst'
import StatesStoreModel from './StatesStore/statesStore.mst'
import CheckListStoreModel from './CheckListStore/CheckListStore.mst'

const ProjectManagementPlatformStoreWithService = types
   .compose(ProjectManagementPlatformStore, ProjectsAPI)
   .actions(self => ({
      getProjects() {
         const requestObject = {
            limit: self.limit,
            offset: self.offset
         }

         const projectsPromise = self.getProjectsAPI(requestObject)
         return bindPromiseWithOnSuccess(projectsPromise)
            .to(self.setGetPmpStoreApiStatus, response => {
               self.setGetProjectsAPIResponse(response)
            })
            .catch(error => {
               self.setGetPmpStoreApiError(error)
            })
      }
   }))

const projectManagementPlatformStore = ProjectManagementPlatformStoreWithService.create(
   {
      pmpStoreApiStatus: API_INITIAL,
      pmpStoreApiError: null,

      listOfProjects: [],
      offset: 0,
      limit: 10,
      totalProjectsLength: 0
   }
)

const ProjectPostStoreWithService = types
   .compose(ProjectPostService, ProjectPostStore)
   .actions(self => ({
      projectPostCall(
         requestObject,
         onPostSuccess = () => null,
         onPostFailure = () => null
      ) {
         const projectPostPromise = self.postProjectAPI(requestObject)
         return bindPromiseWithOnSuccess(projectPostPromise)
            .to(self.setGetProjectPostStoreApiStatus, response => {
               self.setGetProjectPostStoreApiResponse(response)
               onPostSuccess()
            })
            .catch(error => {
               self.setGetProjectPostStoreApiError(error)
               onPostFailure()
            })
      }
   }))

const projectPostStore = ProjectPostStoreWithService.create({
   projectPostStoreApiStatus: 0,
   projectPostStoreApiError: null,
   projectPostStoreApiResponse: null
})

const WorkFlowStoreWithService = types
   .compose(WorkFlowStoreModel, WorkFlowService)
   .actions(self => ({
      getWorkFlowTypes() {
         const workFlowPromise = self.getWorkFlowAPI({})
         return bindPromiseWithOnSuccess(workFlowPromise)
            .to(self.setGetWorkFlowStoreApiStatus, response => {
               self.setGetWorkFlowAPIResponse(response)
            })
            .catch(error => {
               self.setGetWorkFlowStoreApiError(error)
            })
      }
   }))

const workFlowStore = WorkFlowStoreWithService.create({
   workFlowStoreApiStatus: 0,
   workFlowStoreApiError: null,
   workFlowTypes: null
})

const TaskStoreWithService = types
   .compose(TaskStoreModel, ListOfTasksService)
   .actions(self => ({
      getListOfTasks(projectId) {
         const requestObject = {
            limit: self.limit,
            offset: self.offset,
            projectId
         }
         const listOfTasksPromise = self.getListOfTasksAPI(requestObject)
         return bindPromiseWithOnSuccess(listOfTasksPromise)
            .to(self.setGetTaskStoreApiStatus, self.setGetTaskStoreAPIResponse)
            .catch(self.setGetTaskStoreApiError)
      }
   }))

const tasksStore = TaskStoreWithService.create({
   taskStoreApiStatus: 0,
   taskStoreApiError: null,
   listOfTasks: null,
   offset: 0,
   limit: 10
})

const CreateTaskStoreWithService = types
   .compose(CreateTaskStoreModel, CreateTaskService)
   .actions(self => ({
      postCreatedTask(
         requsetObject,
         onTaskCreatedSuccessfully = () => null,
         onTaskCreatedFailure = () => null
      ) {
         const workFlowPromise = self.CreateTaskAPI(requsetObject)
         return bindPromiseWithOnSuccess(workFlowPromise)
            .to(self.setGetCreateTaskCreateTaskApiStatus, response => {
               self.setGetCreateTaskCreateTaskAPiResponse(response)
               onTaskCreatedSuccessfully()
            })
            .catch(error => {
               self.setGetCreateTaskCreateTaskAPiError(error)
               onTaskCreatedFailure()
            })
      }
   }))

const createTaskStore = CreateTaskStoreWithService.create({
   createTaskApiStatus: API_INITIAL,
   createTaskApiError: null,
   createTaskApiResponse: null
})

const StatesStoreWithService = types
   .compose(StatesService, StatesStoreModel)
   .actions(self => ({
      getStates(requestObject) {
         const statesPromise = self.getStatesAPI()
         return bindPromiseWithOnSuccess(statesPromise)
            .to(self.setGetStatesStoreApiStatus, response => {
               self.setGetStatesAPIResponse(response)
            })
            .catch(error => {
               self.setGetStatesStoreApiError(error)
            })
      }
   }))

const statesStore = StatesStoreWithService.create({
   statesStoreApiStatus: API_INITIAL,
   statesStoreApiError: null,
   statesStoreApiResponse: null
})

const CheckListStoreWithService = types
   .compose(CheckListService, CheckListStoreModel)
   .actions(self => ({
      getCheckList(reqeustOptions) {
         const checkListPromise = self.getCheckListAPI()
         return bindPromiseWithOnSuccess(checkListPromise)
            .to(self.setGetCheckListAPIStatus, response => {
               self.setGetCheckListAPIResponse(response)
            })
            .catch(error => {
               self.setGetCheckListAPIError(error)
            })
      },
      postCheckList(requestObject, onSuccess, onFailure) {
         const checkListPromise = self.postCheckListAPI(requestObject)

         return bindPromiseWithOnSuccess(checkListPromise)
            .to(self.setGetCheckListStorePostAPIStatus, response => {
               self.setGetCheckListStorePostApiResponse(response)
               onSuccess()
            })
            .catch(error => {
               self.setGetCheckListStorePostApiError(error)
               onFailure()
            })
      }
   }))

const checkListStore = CheckListStoreWithService.create({
   checkListStoreApiStatus: API_INITIAL,
   checkListStoreApiError: null,
   checkListStoreApiResponse: null,
   checkListStorePostApiStatus: API_INITIAL,
   checkListStorePostApiError: null,
   checkListStorePostApiResponse: null
})

export {
   projectManagementPlatformStore,
   workFlowStore,
   projectPostStore,
   tasksStore,
   createTaskStore,
   statesStore,
   checkListStore
}
