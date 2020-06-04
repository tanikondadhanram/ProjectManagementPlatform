import React, { Component } from 'react'

import stringConstants from '../../strings/stringConstants.json'

import { IB_HUBS_LOGO_PATH } from '../../constants/ImagesPaths'

import { StateComponent } from '../StateComponent'

import {
   TableBody,
   TableRow,
   TableData,
   IbHubsLogo,
   UserDetails
} from './styledComponents'

class TaskDetails extends Component<any, any> {
   render() {
      const { taskDetails } = this.props
      const { title, taskId } = taskDetails

      return (
         <TableBody id={taskId}>
            <TableRow>
               <TableData>{title}</TableData>
               <TableData>{'createdBy'}</TableData>
               <TableData>{'createdAt'}</TableData>
               <TableData>
                  <StateComponent />
               </TableData>
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

export default TaskDetails
