import states from '../../fixtures/ListOfStates.json'
class StatesFixtureService {
   getStatesAPI = () =>
      new Promise(resolve => setTimeout(() => resolve(states), 2000))
}

export default StatesFixtureService
