import states from '../../fixtures/ListOfStates.json'
class StatesFixtureService {
   getStaesAPI = () =>
      new Promise(resolve => setTimeout(() => resolve(states), 2000))
}

export default StatesFixtureService
