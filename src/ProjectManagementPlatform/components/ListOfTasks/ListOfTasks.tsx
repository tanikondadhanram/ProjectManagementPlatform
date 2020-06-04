import React, { Component } from 'react'

import stringConstants from '../../strings/stringConstants.json'

import {
   ListOfTasksContainer,
   ListOfTasksTable,
   TableHeader,
   TableRow,
   TableHeaderData
} from './styledComponents'
import { TaskDetails } from '../TaskDetails'
import LoadingWrapperWithFailure from '../../../Common/components/LoadingWrapperWithFailure'
import { withRouter } from 'react-router-dom'

class ListOfTasks extends Component<any, any> {
   componentDidMount() {
      const { getListOfTasks } = this.props
      const projectId = this.props.match.params.id
      getListOfTasks(projectId)
   }

   renderEachTask = () => {
      const { listOfTasks } = this.props
      if (!Boolean(listOfTasks)) {
         return null
      }
      return listOfTasks.map(eachTask => (
         <TaskDetails key={eachTask.taskId} taskDetails={eachTask} />
      ))
   }

   renderSuccessUI = () => {
      return (
         <ListOfTasksTable>
            <TableHeader>
               <TableRow>
                  <TableHeaderData>{stringConstants['title']}</TableHeaderData>
                  <TableHeaderData>
                     {stringConstants['description']}
                  </TableHeaderData>
                  <TableHeaderData>
                     {stringConstants['issueType']}
                  </TableHeaderData>
                  <TableHeaderData>{stringConstants['state']}</TableHeaderData>
                  <TableHeaderData>
                     {stringConstants['assignedTo']}
                  </TableHeaderData>
               </TableRow>
            </TableHeader>
            {this.renderEachTask()}
         </ListOfTasksTable>
      )
   }

   render() {
      const { apiStatus, apiError, getListOfTasks } = this.props
      const loadingWrapperProps = {
         apiStatus,
         apiError,
         onRetryClick: getListOfTasks,
         renderSuccessUI: this.renderSuccessUI
      }
      return (
         <ListOfTasksContainer>
            <LoadingWrapperWithFailure {...loadingWrapperProps} />{' '}
         </ListOfTasksContainer>
      )
   }
}

export default withRouter(ListOfTasks)
