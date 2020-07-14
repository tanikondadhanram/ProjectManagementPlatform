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

const projectManagementPlatformStore = ProjectManagementPlatformStore.create(
   {
      pmpStoreApiStatus: API_INITIAL,
      pmpStoreApiError: null,

      listOfProjects: [],
      offset: 0,
      limit: 10,
      totalProjectsLength: 0
   },
   {
      ProjectsService: ProjectsAPI.create()
   }
)

const projectPostStore = ProjectPostStore.create(
   {
      projectPostStoreApiStatus: 0,
      projectPostStoreApiError: null,
      projectPostStoreApiResponse: null
   },
   {
      projectPostService: ProjectPostService.create()
   }
)

const workFlowStore = WorkFlowStoreModel.create(
   {
      workFlowStoreApiStatus: 0,
      workFlowStoreApiError: null,
      workFlowTypes: null
   },
   {
      workFlowService: WorkFlowService.create()
   }
)

const tasksStore = TaskStoreModel.create(
   {
      taskStoreApiStatus: 0,
      taskStoreApiError: null,
      listOfTasks: null,
      offset: 0,
      limit: 10
   },
   { listOfTasksService: ListOfTasksService.create() }
)

const createTaskStore = CreateTaskStoreModel.create(
   {
      createTaskApiStatus: API_INITIAL,
      createTaskApiError: null,
      createTaskApiResponse: null
   },
   { createTaskService: CreateTaskService.create() }
)

const statesStore = StatesStoreModel.create(
   {
      statesStoreApiStatus: API_INITIAL,
      statesStoreApiError: null,
      statesStoreApiResponse: null
   },
   { statesService: StatesService.create() }
)

const checkListStore = CheckListStoreModel.create(
   {
      checkListStoreApiStatus: API_INITIAL,
      checkListStoreApiError: null,
      checkListStoreApiResponse: null,
      checkListStorePostApiStatus: API_INITIAL,
      checkListStorePostApiError: null,
      checkListStorePostApiResponse: null
   },
   { checkListService: CheckListService.create() }
)

export {
   projectManagementPlatformStore,
   workFlowStore,
   projectPostStore,
   tasksStore,
   createTaskStore,
   statesStore,
   checkListStore
}
