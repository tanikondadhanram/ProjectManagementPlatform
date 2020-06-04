import { observable } from 'mobx'
import { action } from 'mobx'

class TaskModel {
   taskId: number
   issueType: string
   title: string
   assignedTo: []
   description: string
   @observable state: string
   totalNumberOfTasks: number

   constructor(props) {
      this.taskId = props['task_id']
      this.issueType = props['issue_type']
      this.title = props['title']
      this.assignedTo = props['assigned_to']
      this.description = props['description']
      this.state = props['state']
      this.totalNumberOfTasks = props['total_tasks']
   }

   @action.bound
   updateTaskState(state) {
      this.state = state
   }
}

export default TaskModel
