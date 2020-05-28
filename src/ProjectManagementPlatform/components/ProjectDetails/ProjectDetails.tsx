import React, { Component } from 'react'
import { TableBody, TableRow, TableData } from './styledComponents'

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
         <TableBody>
            <TableRow>
               <TableData>{title}</TableData>
               <TableData>{createdBy}</TableData>
               <TableData>{createdAt}</TableData>
               <TableData>{projectType}</TableData>
               <TableData>{description}</TableData>
               <TableData>{workflowType}</TableData>
               <TableData>{developers}</TableData>
            </TableRow>
         </TableBody>
      )
   }
}

export default ProjectDetails
