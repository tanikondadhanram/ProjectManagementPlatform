import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import stringConstants from '../../strings/stringConstants.json'

import { ProjectDetails } from '../ProjectDetails'

import {
   ListOfProjectsTable,
   TableHeader,
   TableHeaderData,
   TableRow
} from './styledComponents'
import LoadingWrapperWithFailure from '../../../components/common/LoadingWrapperWithFailure'

@inject('projectManagementPlatformStore')
@observer
class ListOfProjects extends Component<any, any> {
   componentDidMount() {
      this.doNetworkCalls()
   }

   doNetworkCalls = () => {
      const { projectManagementPlatformStore } = this.props
      projectManagementPlatformStore.getProjects()
   }

   renderListOfProjects = () => {
      const { projectManagementPlatformStore } = this.props
      const { listOfProjects } = projectManagementPlatformStore

      if (Boolean(listOfProjects)) {
         return listOfProjects.map(projectDetails => (
            <ProjectDetails
               key={projectDetails.id}
               projectDetails={projectDetails}
            />
         ))
      }
   }

   render() {
      return (
         <ListOfProjectsTable>
            <TableHeader>
               <TableRow>
                  <TableHeaderData>{stringConstants['title']}</TableHeaderData>
                  <TableHeaderData>
                     {stringConstants['created_by']}
                  </TableHeaderData>
                  <TableHeaderData>
                     {stringConstants['created_at']}
                  </TableHeaderData>
                  <TableHeaderData>
                     {stringConstants['project_type']}
                  </TableHeaderData>
                  <TableHeaderData>
                     {stringConstants['description']}
                  </TableHeaderData>
                  <TableHeaderData>
                     {stringConstants['workflow_type']}
                  </TableHeaderData>
                  <TableHeaderData>
                     {stringConstants['developers']}
                  </TableHeaderData>
               </TableRow>
            </TableHeader>
            {this.renderListOfProjects()}
         </ListOfProjectsTable>
      )
   }
}

export default ListOfProjects

//<LoadingWrapperWithFailure {...loadingWrapperWithFailureProps} />
// const loadingWrapperWithFailureProps = {
//    apiStatus: this.props.projectManagementPlatformStore.apiStatus,
//    apiError: this.props.projectManagementPlatformStore.apiError,
//    onRetryClick: this.doNetworkCalls,
//    renderSuccessUI: this.renderListOfProjects
// }
