import React, { Component } from 'react'

import { Header } from '../Header'

import { ProjectManagementAppContainer } from './styledComponents'

class ProjectManagementApp extends Component {
   render() {
      return (
         <ProjectManagementAppContainer>
            <Header />
         </ProjectManagementAppContainer>
      )
   }
}

export default ProjectManagementApp
