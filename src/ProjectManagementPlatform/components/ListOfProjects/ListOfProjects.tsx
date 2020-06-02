import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import stringConstants from '../../strings/stringConstants.json'

import { ProjectDetails } from '../ProjectDetails'

import {
   ListOfProjectsContainer,
   ListOfProjectsTable,
   TableHeader,
   TableHeaderData
} from './styledComponents'
import LoadingWrapperWithFailure from '../../../Common/components/LoadingWrapperWithFailure'
import NoDataView from '../../../Common/components/NoDataView'

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

      return (
         <ListOfProjectsTable>
            <TableHeader>
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
            </TableHeader>
            {Boolean(listOfProjects)
               ? listOfProjects.map(projectDetails => (
                    <ProjectDetails
                       key={projectDetails.id}
                       projectDetails={projectDetails}
                    />
                 ))
               : null}
         </ListOfProjectsTable>
      )
   }

   render() {
      const { projectManagementPlatformStore } = this.props

      const {
         apiStatus,
         apiError,
         getProjects,
         listOfProjects
      } = projectManagementPlatformStore

      const renderSuccessUI =
         listOfProjects.length === 0 ? NoDataView : this.renderListOfProjects

      const props = {
         apiStatus,
         apiError,
         onRetryClick: getProjects,
         renderSuccessUI
      }

      return (
         <ListOfProjectsContainer>
            <LoadingWrapperWithFailure {...props} />
         </ListOfProjectsContainer>
      )
   }
}

export default ListOfProjects
