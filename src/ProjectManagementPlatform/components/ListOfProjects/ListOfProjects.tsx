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

      return (
         <ListOfProjectsContainer>
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
         </ListOfProjectsContainer>
      )
   }

   render() {
      const { projectManagementPlatformStore } = this.props
      const {
         apiStatus,
         apiError,
         getProjects
      } = projectManagementPlatformStore
      const props = {
         apiStatus,
         apiError,
         onRetryClick: getProjects,
         renderSuccessUI: this.renderListOfProjects
      }

      return <LoadingWrapperWithFailure {...props} />
   }
}

export default ListOfProjects
