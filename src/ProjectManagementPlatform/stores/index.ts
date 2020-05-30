import { ProjectManagementPlatformStore } from './ProjectManagementPlatformStore'
import ProjectsFixturesAPI from '../services/ProjectsService/Projects.fixtures'
import WorkFlowFixtureService from '../services/WorkFlowService/index.fixture'
import { WorkFlowStore } from './WorkFlowsStore'
// import ProjectsAPI from "../services/ProjectsService/Projects.api"
// import WorkFlowService from "../services/WorkFlowService/index.api"

// const projectsApi = new ProjectsAPI()
const projectsFixturesApi = new ProjectsFixturesAPI()
const projectManagementPlatformStore = new ProjectManagementPlatformStore(
   projectsFixturesApi
)

// const workFlowApi = new WorkFlowService()
const workFlowFixtureApi = new WorkFlowFixtureService()
const workFlowStore = new WorkFlowStore(workFlowFixtureApi)

export { projectManagementPlatformStore, workFlowStore }
