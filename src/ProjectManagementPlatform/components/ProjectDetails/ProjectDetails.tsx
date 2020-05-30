import React, { Component } from 'react'
import { TableBody, TableData, IbHubsLogo } from './styledComponents'
import { IB_HUBS_LOGO_PATH } from '../../constants/ImagesPaths'
import stringConstants from '../../strings/stringConstants.json'

class ProjectDetails extends Component<any, any> {
   render() {
      const { projectDetails } = this.props
      const title = projectDetails.name
      const createdBy = projectDetails.created_by
      const createdAt = projectDetails.created_at
      const projectType = projectDetails.project_type
      const description = projectDetails.description
      const workflowType = projectDetails.workflow_type
      const developers = projectDetails.developers

      return (
         <TableBody id={projectDetails.id}>
            <TableData>{title}</TableData>
            <TableData>{createdBy}</TableData>
            <TableData>{createdAt}</TableData>
            <TableData>{projectType}</TableData>
            <TableData>{description}</TableData>
            <TableData>{workflowType}</TableData>
            <TableData className='flex'>
               <IbHubsLogo
                  src={IB_HUBS_LOGO_PATH}
                  alt={stringConstants['ibLogoAltText']}
               />
               <p>
                  {Math.random()
                     .toString()
                     .substr(0, 9)}
               </p>
            </TableData>
         </TableBody>
      )
   }
}

export default ProjectDetails
