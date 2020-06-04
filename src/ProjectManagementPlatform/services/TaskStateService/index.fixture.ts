class TaskStateFixtureService {
   updateTaskStateAPI(requestObject) {
      return new Promise(resolve => setTimeout(() => resolve('qwerty'), 2000))
   }
}

export default TaskStateFixtureService
