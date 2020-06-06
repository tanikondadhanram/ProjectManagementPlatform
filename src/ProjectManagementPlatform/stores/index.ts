import ProjectsAPI from '../services/ProjectsService/index.api'
import ProjectPostService from '../services/ProjectPostService/index.api'
import WorkFlowService from '../services/WorkFlowService/index.api'
import ListOfTasksService from '../services/ListOfTasksService/index.api'
import CreateTaskService from '../services/CreateTaskService/index.api'
import StatesService from '../services/GetStatesService/index.api'

import { ProjectManagementPlatformStore } from './ProjectManagementPlatformStore'
import { ProjectPostStore } from './ProjectPostStore'
import { WorkFlowStore } from './WorkFlowsStore'
import { TasksStore } from './TasksStore'
import { CreateTaskStore } from './CreateTaskStore'
import { StatesStore } from './StatesStore'
import { CheckListStore } from './CheckListStore'
import CheckListService from '../services/CheckListService/index.api'

const projectsApi = new ProjectsAPI()
const projectManagementPlatformStore = new ProjectManagementPlatformStore(
   projectsApi
)

const projectPostService = new ProjectPostService()
const projectPostStore = new ProjectPostStore(projectPostService)

const workFlowApi = new WorkFlowService()

const workFlowStore = new WorkFlowStore(workFlowApi)

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
