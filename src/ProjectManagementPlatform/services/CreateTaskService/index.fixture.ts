class CreateTaskFixtureService {
   CreateTaskAPI = requestObject =>
      new Promise(resolve => setTimeout(() => resolve('success'), 2000))
}
export default CreateTaskFixtureService
