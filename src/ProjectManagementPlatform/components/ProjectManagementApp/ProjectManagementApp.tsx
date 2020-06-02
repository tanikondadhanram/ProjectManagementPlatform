import React, { Component } from 'react'
import { observer } from 'mobx-react'

import { Header } from '../Header'
import { ListOfProjects } from '../ListOfProjects'
import { Pagination } from '../Pagination'
import { CreateProject } from '../CreateProject'

import { ProjectManagementAppContainer } from './styledComponents'

@observer
class ProjectManagementApp extends Component {
   render() {
      return (
         <ProjectManagementAppContainer>
            <Header />
            <CreateProject />
            <ListOfProjects />
            <Pagination />
         </ProjectManagementAppContainer>
      )
   }
}

export default ProjectManagementApp
