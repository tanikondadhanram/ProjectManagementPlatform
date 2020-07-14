import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import stringConstants from '../../strings/stringConstants.json'

import { ProjectDetails } from '../ProjectDetails'

import {
   ListOfProjectsContainer,
   ListOfProjectsTable,
   TableHeader,
   TableHeaderData,
   TableRow
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

      let userDetails: any = window.localStorage.getItem('userDetails')

      userDetails = JSON.parse(JSON.parse(userDetails))
      const isAdmin = userDetails.is_admin

      return (
         <ListOfProjectsTable>
            <TableHeader>
               <TableRow>
                  <TableHeaderData>{stringConstants['title']}</TableHeaderData>
                  {isAdmin ? null : (
                     <TableHeaderData>
                        {stringConstants['created_by']}
                     </TableHeaderData>
                  )}
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
                     {stringConstants['assignedTo']}
                  </TableHeaderData>
               </TableRow>
            </TableHeader>

            {listOfProjects.map(projectDetails => (
               <ProjectDetails
                  key={projectDetails.id}
                  projectDetails={projectDetails}
               />
            ))}
         </ListOfProjectsTable>
      )
   }

   render() {
      const { projectManagementPlatformStore } = this.props

      const {
         pmpStoreApiStatus,
         pmpStoreApiError,
         getProjects,
         listOfProjects
      } = projectManagementPlatformStore

      const renderSuccessUI =
         listOfProjects.length === 0 ? NoDataView : this.renderListOfProjects

      const props = {
         apiStatus: pmpStoreApiStatus,
         apiError: pmpStoreApiError,
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
