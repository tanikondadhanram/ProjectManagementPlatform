import { ProjectManagementPlatformStore } from './ProjectManagementPlatformStore'
import { ProjectPostStore } from './ProjectPostStore'
import { WorkFlowStore } from './WorkFlowsStore'

import ProjectsFixturesAPI from '../services/ProjectsService/Projects.fixtures'
import ProjectPostFixture from '../services/ProjectPostService/ProjectPostService.fixture'
import WorkFlowFixtureService from '../services/WorkFlowService/index.fixture'
// import ProjectsAPI from "../services/ProjectsService/Projects.api"
// import WorkFlowService from "../services/WorkFlowService/index.api"

// const projectsApi = new ProjectsAPI()
const projectsFixturesApi = new ProjectsFixturesAPI()
const projectManagementPlatformStore = new ProjectManagementPlatformStore(
   projectsFixturesApi
)

const projectPostFixture = new ProjectPostFixture()
const projectPostStore = new ProjectPostStore(projectPostFixture)

// const workFlowApi = new WorkFlowService()
const workFlowFixtureApi = new WorkFlowFixtureService()
const workFlowStore = new WorkFlowStore(workFlowFixtureApi)

export { projectManagementPlatformStore, workFlowStore, projectPostStore }
