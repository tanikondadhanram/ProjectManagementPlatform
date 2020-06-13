import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import stringConstants from '../../strings/stringConstants.json'

import { goToSpecificProject } from '../../utils/NavigationUtils'

import {
   TableBody,
   TableRow,
   TableData,
   IbHubsLogo,
   UserDetails
} from './styledComponents'

let ids = 0

class ProjectDetails extends Component<any, any> {
   onProjectClick = () => {
      const { history, projectDetails } = this.props
      const { id } = projectDetails
      goToSpecificProject(history, id)
   }

   render() {
      ids++
      const { projectDetails } = this.props
      const { id } = projectDetails
      const title = projectDetails.title
      const createdBy = projectDetails.createdBy
      const createdAt = projectDetails.createdAt
      const projectType = projectDetails.projectType
      const description = projectDetails.description
      const workflowType = projectDetails.workflowType
      const developers = projectDetails.developers

      const developerImg =
         developers.length !== 0 ? developers[0].profile_pic : ''

      let userDetails: any = window.localStorage.getItem('userDetails')

      userDetails = JSON.parse(JSON.parse(userDetails))
      const isAdmin = userDetails.is_admin

      return (
         <TableBody id={ids.toString()} onClick={this.onProjectClick}>
            <TableRow>
               <TableData>{title}</TableData>
               {isAdmin ? null : (
                  <TableData>
                     <div className='flex justify-between'>
                        <IbHubsLogo src={createdBy.profile_pic} />
                        <div>
                           <p>{createdBy.username}</p>
                           <p>{createdBy.phone_no}</p>
                        </div>
                     </div>
                  </TableData>
               )}
               <TableData>{createdAt}</TableData>
               <TableData>{projectType}</TableData>
               <TableData>{description.slice(0, 20)}...</TableData>
               <TableData>{workflowType}</TableData>
               <TableData className='flex items-center'>
                  <UserDetails>
                     {developerImg ? (
                        <IbHubsLogo
                           src={developerImg}
                           alt={stringConstants['ibLogoAltText']}
                        />
                     ) : null}
                  </UserDetails>
                  ...
               </TableData>
            </TableRow>
         </TableBody>
      )
   }
}

export default withRouter(ProjectDetails)
