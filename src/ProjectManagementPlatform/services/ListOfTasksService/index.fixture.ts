import data from '../../fixtures/ListOfTasks.json'

class ListOfTasksFixtureService {
   getListOfTasksAPI(requestObject) {
      const { limit, offset } = requestObject
      return new Promise(resolve =>
         setTimeout(
            () =>
               resolve({
                  list_of_tasks: data.list_of_tasks
                     .slice()
                     .splice(offset, limit)
               }),
            2000
         )
      )
   }
}

export default ListOfTasksFixtureService
