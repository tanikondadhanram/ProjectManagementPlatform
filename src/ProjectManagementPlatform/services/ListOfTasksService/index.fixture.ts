import data from '../../fixtures/ListOfTasks.json'

class ListOfTasksFixtureService {
   getListOfTasksAPI = requestObject => {
      const { limit, offset } = requestObject
      return new Promise(resolve =>
         setTimeout(
            () =>
               resolve({
                  tasks: data.tasks.slice().splice(offset, limit)
               }),
            2000
         )
      )
   }
}

export default ListOfTasksFixtureService
