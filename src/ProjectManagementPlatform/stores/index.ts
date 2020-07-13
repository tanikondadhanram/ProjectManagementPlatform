import { types } from 'mobx-state-tree'

import { bindPromiseWithOnSuccess } from '@ib/mobx-promise'
import { API_INITIAL } from '@ib/api-constants'

import ProjectsAPI from '../services/ProjectsService/index.mst'
import ProjectPostService from '../services/ProjectPostService/index.mst'
import WorkFlowService from '../services/WorkFlowService/index.mst'
import ListOfTasksService from '../services/ListOfTasksService/index.api'
import CreateTaskService from '../services/CreateTaskService/index.api'
import StatesService from '../services/GetStatesService/index.api'

import ProjectManagementPlatformStore from './ProjectManagementPlatformStore/pmpStore.mst'
import ProjectPostStore from './ProjectPostStore/ProjectPostStore.mst'
import WorkFlowStoreModel from './WorkFlowsStore/WorkFlowStore.mst'
import { TasksStore } from './TasksStore'
import { CreateTaskStore } from './CreateTaskStore'
import { StatesStore } from './StatesStore'
import { CheckListStore } from './CheckListStore'
import CheckListService from '../services/CheckListService/index.api'

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

const listOfTasksService = new ListOfTasksService()
const tasksStore = new TasksStore(listOfTasksService)

const createTaskService = new CreateTaskService()
const createTaskStore = new CreateTaskStore(createTaskService)

const statesService = new StatesService()
const statesStore = new StatesStore(statesService)

const checkListService = new CheckListService()
const checkListStore = new CheckListStore(checkListService)

export {
   projectManagementPlatformStore,
   workFlowStore,
   projectPostStore,
   tasksStore,
   createTaskStore,
   statesStore,
   checkListStore
}
