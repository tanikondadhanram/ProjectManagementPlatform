import { ProjectManagementPlatformStore } from './ProjectManagementPlatformStore'
import ProjectsFixturesAPI from '../services/ProjectsService/Projects.fixtures'
// import ProjectsAPI from "../services/ProjectsService/Projects.api"

// const projectsApi = new ProjectsAPI()
const projectsFixturesApi = new ProjectsFixturesAPI()
const projectManagementPlatformStore = new ProjectManagementPlatformStore(
   projectsFixturesApi
)

export { projectManagementPlatformStore }
