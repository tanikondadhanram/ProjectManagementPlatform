import checkList from '../../fixtures/CheckList.json'

class CheckListFixtureService {
   getCheckListAPI = requestObject =>
      new Promise(resolve => setTimeout(() => resolve(checkList), 2000))

   postCheckListAPI = requestObject =>
      new Promise(resolve =>
         setTimeout(() => resolve('State Updated Succesfully'), 2000)
      )
}

export default CheckListFixtureService
