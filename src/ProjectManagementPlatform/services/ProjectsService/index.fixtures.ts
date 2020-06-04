import projectsData from '../../fixtures/ListOfProjects.json'

class ProjectsFixturesAPI {
   getProjectsAPI = requestObject => {
      const { limit, offset } = requestObject

      return new Promise(resolve =>
         setTimeout(
            () => resolve(projectsData.slice().splice(offset, limit)),
            2000
         )
      )
   }

   postProjectAPI = requestObject => {
      return new Promise(resolve =>
         setTimeout(() => resolve(requestObject), 2000)
      )
   }
}

export default ProjectsFixturesAPI
