import workFlowTypes from '../../fixtures/workFlowTypes.json'

class WorkFlowFixtureService {
   getWorkFlowAPI(requestObject) {
      return new Promise(resolve =>
         setTimeout(() => resolve(workFlowTypes), 2000)
      )
   }
}

export default WorkFlowFixtureService
