import React, { Component } from 'react'

import { CreateProjectContainer, ProjectTitle } from './styledComponents'

import stringConstants from '../../strings/stringConstants.json'
import { Button } from '../../../Common/components/Button'
import { inject, observer } from 'mobx-react'
import { API_SUCCESS } from '@ib/api-constants'

@inject('projectManagementPlatformStore')
@observer
class CreateProject extends Component<any, any> {
   render() {
      const { togglePopUp, projectManagementPlatformStore } = this.props
      const { apiStatus } = projectManagementPlatformStore
      return (
         <CreateProjectContainer>
            <ProjectTitle>{stringConstants['ProjectTitle']}</ProjectTitle>
            <Button
               style={{
                  width: '10%'
               }}
               onClick={togglePopUp}
               value={stringConstants['addNewProject']}
               disabled={!(apiStatus === API_SUCCESS)}
            />
         </CreateProjectContainer>
      )
   }
}

export default CreateProject
