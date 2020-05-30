import React, { Component } from 'react'
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'

import { InputField } from '../../../Common/components/InputField'

import {
   AddProjectContainer,
   AddProjectForm,
   TextAreaField,
   Label,
   Option
} from './styledComponents'
import { Button } from '../../../Common/components/Button'
import stringContants from '../../strings/stringConstants.json'

@inject('projectManagementPlatformStore')
@observer
class AddProject extends Component<any, any> {
   @observable projectTitle: any = null
   @observable projectDescription = ''
   @observable projectWorkFlow = ''
   @observable projectType = ''

   onCloseButtonClick = (event: { preventDefault: () => void }) => {
      event.preventDefault()
      const { togglePopUp } = this.props
      togglePopUp()
   }

   @action.bound
   onChangeProjectTitle(event: { target: { value: string } }) {
      this.projectTitle = event.target.value
   }
   @action.bound
   onChangeProjectDescription(event: { target: { value: string } }) {
      this.projectDescription = event.target.value
   }
   @action.bound
   onChangeProjectType(event: { target: { value: string } }) {
      this.projectType = event.target.value
   }
   @action.bound
   onChangeWorkflowType(event: { target: { value: string } }) {
      this.projectWorkFlow = event.target.value
   }

   @action.bound
   onCreateButtonClick(event: { preventDefault: () => void }) {
      event.preventDefault()
      if (
         this.projectTitle &&
         this.projectDescription &&
         this.projectWorkFlow &&
         this.projectType
      ) {
         const { projectManagementPlatformStore } = this.props
         const { postProject } = projectManagementPlatformStore
         postProject({
            projectTitle: this.projectTitle,
            projectDescription: this.projectDescription,
            projectWorkFlow: this.projectWorkFlow,
            projectType: this.projectType
         })
         const { togglePopUp } = this.props
         togglePopUp()
      } else {
      }
   }

   render() {
      return (
         <AddProjectContainer>
            <Button
               onClick={this.onCloseButtonClick}
               style={{
                  width: '10%',
                  float: 'right',
                  margin: '10px'
               }}
               value='X'
            />
            <AddProjectForm>
               <InputField
                  labelText='name'
                  value={this.projectTitle}
                  onChange={this.onChangeProjectTitle}
                  isValidInput={this.projectTitle !== ''}
                  errorMessage={
                     this.projectTitle ? null : stringContants['enter username']
                  }
               />
               <Label>description</Label>
               <TextAreaField
                  onChange={this.onChangeProjectDescription}
               ></TextAreaField>
               <InputField
                  onChange={this.onChangeWorkflowType}
                  labelText='workflow type'
                  value={this.projectWorkFlow}
               />
               <InputField
                  onChange={this.onChangeProjectType}
                  labelText='Project type'
                  value={this.projectType}
               />

               <Button onClick={this.onCreateButtonClick} value='confirm' />
            </AddProjectForm>
         </AddProjectContainer>
      )
   }
}

const option = (props: { value: React.ReactNode }) => (
   <Option>{props.value}</Option>
)

export default AddProject
