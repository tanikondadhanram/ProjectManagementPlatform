import React, { Component } from 'react'
import { observable, action } from 'mobx'
import { observer } from 'mobx-react'

import { Header } from '../Header'

import { ListOfProjects } from '../ListOfProjects'
import { Pagination } from '../Pagination'
import { CreateProject } from '../CreateProject'
import { ProjectManagementAppContainer } from './styledComponents'
import { AddProject } from '../AddProject'

@observer
class ProjectManagementApp extends Component {
   @observable shouldShowPopUp = false

   @action.bound
   togglePopUp() {
      this.shouldShowPopUp = !this.shouldShowPopUp
   }

   render() {
      return (
         <ProjectManagementAppContainer showPopUp={this.shouldShowPopUp}>
            {this.shouldShowPopUp ? (
               <AddProject togglePopUp={this.togglePopUp} />
            ) : null}
            <Header />
            <CreateProject
               shouldShowPopUp={this.shouldShowPopUp}
               togglePopUp={this.togglePopUp}
            />
            <ListOfProjects />
            <Pagination />
         </ProjectManagementAppContainer>
      )
   }
}

export default ProjectManagementApp
