import React, { Component } from 'react'

import stringConstants from '../../strings/stringConstants.json'

import { StateComponent } from '../StateComponent'

import {
   TableBody,
   TableRow,
   TableData,
   IbHubsLogo,
   UserDetails
} from './styledComponents'

let ids = 0

class TaskDetails extends Component<any, any> {
   render() {
      const { taskDetails } = this.props
      const { title, description, issueType } = taskDetails
      const { assignedTo } = taskDetails
      ++ids
      return (
         <TableBody id={ids.toString()}>
            <TableRow>
               <TableData>{title}</TableData>
               <TableData>{description}</TableData>
               <TableData>{issueType}</TableData>
               <TableData>
                  <StateComponent taskDetails={taskDetails} />
               </TableData>
               <TableData>
                  <UserDetails>
                     <IbHubsLogo
                        src={assignedTo.profile_pic}
                        alt={stringConstants['ibLogoAltText']}
                     />
                     <div>
                        <p>{assignedTo.username}</p>
                        <p>{assignedTo.phone_no}</p>
                     </div>
                  </UserDetails>
               </TableData>
            </TableRow>
         </TableBody>
      )
   }
}

export default TaskDetails
