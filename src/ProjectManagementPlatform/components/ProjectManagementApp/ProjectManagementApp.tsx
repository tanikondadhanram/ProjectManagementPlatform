import React, { Component } from 'react'

import { Header } from '../Header'

import { ProjectManagementAppContainer } from './styledComponents'
import { ListOfProjects } from '../ListOfProjects'
import { Pagination } from '../Pagination'

class ProjectManagementApp extends Component {
   render() {
      return (
         <ProjectManagementAppContainer>
            <Header />
            <ListOfProjects />
            <Pagination />
         </ProjectManagementAppContainer>
      )
   }
}

export default ProjectManagementApp
