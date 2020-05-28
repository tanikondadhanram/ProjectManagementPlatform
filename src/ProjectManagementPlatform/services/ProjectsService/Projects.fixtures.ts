import projectsData from '../../fixtures/ListOfProjects.json'

class ProjectsFixturesAPI {
   getProjectsAPI = requestObject => {
      const { limit, offset } = requestObject
      return new Promise(resolve => resolve(projectsData.splice(offset, limit)))
   }
}

export default ProjectsFixturesAPI
