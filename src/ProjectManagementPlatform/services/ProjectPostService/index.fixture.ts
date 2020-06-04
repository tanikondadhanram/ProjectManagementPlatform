import response from '../../fixtures/ProjectPostFixture.json'

class ProjectPostFixture {
   postProjectAPI(requestObject) {
      return new Promise(resolve => setTimeout(() => resolve(response), 2000))
   }
}

export default ProjectPostFixture
