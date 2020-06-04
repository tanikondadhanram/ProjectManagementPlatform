import React, { Component } from 'react'
import {
   TableBody,
   TableRow,
   TableData,
   IbHubsLogo,
   UserDetails
} from './styledComponents'
import { IB_HUBS_LOGO_PATH } from '../../constants/ImagesPaths'
import stringConstants from '../../strings/stringConstants.json'
import { withRouter } from 'react-router-dom'
import { PROJECT_MANAGEMANT_PLATFORM_PATH } from '../../constants/routeConstants'

class ProjectDetails extends Component<any, any> {
   onProjectClick = () => {
      const { history, projectDetails } = this.props
      const { id } = projectDetails
      history.push(`${PROJECT_MANAGEMANT_PLATFORM_PATH}/${id}`)
   }

   render() {
      const { projectDetails } = this.props
      const title = projectDetails.title
      const createdBy = projectDetails.createdBy
      const createdAt = projectDetails.createdAt
      const projectType = projectDetails.projectType
      const description = projectDetails.description
      const workflowType = projectDetails.workflowType
      const developers = projectDetails.developers

      return (
         <TableBody id={projectDetails.id} onClick={this.onProjectClick}>
            <TableRow>
               <TableData>{title}</TableData>
               <TableData>{'createdBy'}</TableData>
               <TableData>{createdAt}</TableData>
               <TableData>{projectType}</TableData>
               <TableData>{description}</TableData>
               <TableData>{workflowType}</TableData>
               <TableData>
                  <UserDetails>
                     <IbHubsLogo
                        src={IB_HUBS_LOGO_PATH}
                        alt={stringConstants['ibLogoAltText']}
                     />
                     <div>
                        <p>qwertyytrewq</p>
                        <p>1234567890</p>
                     </div>
                  </UserDetails>
               </TableData>
            </TableRow>
         </TableBody>
      )
   }
}

export default withRouter(ProjectDetails)
