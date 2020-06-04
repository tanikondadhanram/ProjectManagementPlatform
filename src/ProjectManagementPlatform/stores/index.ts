import ListOfTasksFixtureService from '../services/ListOfTasksService/index.fixture'
import CreateTaskFixtureService from '../services/CreateTaskService/index.fixture'

import { ProjectManagementPlatformStore } from './ProjectManagementPlatformStore'
import { ProjectPostStore } from './ProjectPostStore'
import { WorkFlowStore } from './WorkFlowsStore'
import { TasksStore } from './TasksStore'
import { CreateTaskStore } from './CreateTaskStore'
import StatesFixtureService from '../services/GetStatesService/index.fixture'
import { StatesStore } from './StatesStore'
import ProjectsAPI from '../services/ProjectsService/index.api'

import ProjectPostService from '../services/ProjectPostService/index.api'
import WorkFlowService from '../services/WorkFlowService/index.api'

// import ListOfTasksService from "../services/ListOfTasksService/index.api"
// import ProjectsAPI from "../services/ProjectsService/Projects.api"
// import WorkFlowService from "../services/WorkFlowService/index.api"
// import ProjectPostService from "../services/ProjectPostService/ProjectPostService.api"

const projectsApi = new ProjectsAPI()
const projectManagementPlatformStore = new ProjectManagementPlatformStore(
   projectsApi
)

const projectPostService = new ProjectPostService()
const projectPostStore = new ProjectPostStore(projectPostService)

const workFlowApi = new WorkFlowService()

const workFlowStore = new WorkFlowStore(workFlowApi)

// const listOfTasksService = new ListOfTasksService()
const listOfTasksFixtureService = new ListOfTasksFixtureService()
const tasksStore = new TasksStore(listOfTasksFixtureService)

const createTaskFixtureService = new CreateTaskFixtureService()
const createTaskStore = new CreateTaskStore(createTaskFixtureService)

const statesFixtureService = new StatesFixtureService()
const statesStore = new StatesStore(statesFixtureService)

export {
   projectManagementPlatformStore,
   workFlowStore,
   projectPostStore,
   tasksStore,
   createTaskStore,
   statesStore
}
