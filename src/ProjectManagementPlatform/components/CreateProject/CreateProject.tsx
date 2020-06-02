import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { observable, action } from 'mobx'
import 'react-dropdown/style.css'

import CreateProjectModel from './CreateProjectModal'

import {
   CreateProjectContainer,
   ProjectTitle,
   CreateProjectButton
} from './styledComponents'

import stringConstants from '../../strings/stringConstants.json'

@inject('workFlowStore', 'projectPostStore')
@observer
class CreateProject extends Component<any, any> {
   @observable isOpen: boolean

   constructor(props) {
      super(props)
      this.isOpen = false
   }

   @action.bound
   toggleModal() {
      this.isOpen = !this.isOpen
   }

   doNetworkCalls = () => {
      const { workFlowStore } = this.props
      const { getWorkFlowTypes } = workFlowStore

      getWorkFlowTypes()
   }

   render() {
      const { workFlowStore, projectPostStore } = this.props

      const {
         workFlowTypes,
         apiStatus: workFlowApiStatus,
         apiError: workFlowApiError
      } = workFlowStore

      const {
         projectTitle,
         projectDescription,
         projectWorkFlow,
         projectType,
         onChangeWorkflowType,
         onChangeProjectTitle,
         onChangeProjectDescription,
         onChangeProjectType,
         onCreateButtonClick
      } = projectPostStore

      const modelProps = {
         isOpen: this.isOpen,
         toggleModal: this.toggleModal,
         getWorkFlowTypes: this.doNetworkCalls,
         projectTitle,
         projectDescription,
         workFlowTypes,
         projectType,
         workFlowApiStatus,
         workFlowApiError,
         projectWorkFlow,
         onChangeWorkflowType,
         onChangeProjectTitle,
         onChangeProjectDescription,
         onChangeProjectType,
         onCreateButtonClick
      }

      return (
         <CreateProjectContainer>
            <ProjectTitle>{stringConstants['ProjectTitle']}</ProjectTitle>
            <CreateProjectButton onClick={this.toggleModal}>
               {stringConstants['addNewProject']}
            </CreateProjectButton>
            <CreateProjectModel {...modelProps} />
         </CreateProjectContainer>
      )
   }
}

export default CreateProject
