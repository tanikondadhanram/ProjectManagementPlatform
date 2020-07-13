import { types } from 'mobx-state-tree'
import { API_INITIAL } from '@ib/api-constants'

const UserModel = types.model({
   username: types.string,
   profile_pic: types.string,
   phone_no: types.string
})

const TaskModel = types.model({
   task_id: types.number,
   issue_type: types.string,
   title: types.string,
   assigned_to: types.array(UserModel),
   description: types.string,
   state: types.string,
   total_tasks: types.number
})

const TaskStoreModel = types
   .model({
      taskStoreApiStatus: types.number,
      taskStoreApiError: types.maybeNull(types.string),
      listOfTasks: types.maybeNull(TaskModel),
      offset: types.number,
      limit: types.number
   })
   .actions(self => ({
      init() {
         self.taskStoreApiStatus = API_INITIAL
         self.taskStoreApiError = null
         self.offset = 0
         self.limit = 10
         self.listOfTasks = null
      },

      clearStore() {
         this.init()
      },
      navigateToClickedPage(paginationObject) {
         const pageNumber = paginationObject.selected
         self.offset = pageNumber * 10
      },
      setGetTaskStoreApiStatus(status) {
         self.taskStoreApiStatus = status
      },
      setGetTaskStoreApiError(error) {
         self.taskStoreApiError = error
      },
      setGetTaskStoreAPIResponse(response) {
         self.listOfTasks = response.tasks.map(eachTask =>
            TaskModel.create({
               task_id: 0,
               issue_type: 'string',
               title: 'string',
               assigned_to: [
                  {
                     username: 'string',
                     profile_pic: 'string',
                     phone_no: 'string'
                  }
               ],
               description: 'string',
               state: 'string',
               total_tasks: 20
            })
         )
      }
   }))

export default TaskStoreModel
