import React, { Component } from 'react'
import { inject } from 'mobx-react'

import { ProjectTasks } from '../../components/ProjectTasks'

@inject('tasksStore')
class ProjectRoute extends Component<any, any> {
   render() {
      const projectTasks = {
         tasksStore: this.props.tasksStore
      }
      return <ProjectTasks {...projectTasks} />
   }
}

export default ProjectRoute
