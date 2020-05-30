import React, { Component } from 'react'
import { observable, action, entries } from 'mobx'
import { observer, inject } from 'mobx-react'

import {
   AddProjectContainer,
   AddProjectForm,
   TextAreaField,
   Label,
   WorkFLowTypes,
   ProjectFLowTypes,
   OptionTag,
   Div,
   ErrorMessage,
   InputTag
} from './styledComponents'
import { Button } from '../../../Common/components/Button'
import stringContants from '../../strings/stringConstants.json'
import LoadingWrapperWithFailure from '../../../components/common/LoadingWrapperWithFailure'

@inject('projectManagementPlatformStore', 'workFlowStore')
@observer
class AddProject extends Component<any, any> {
   @observable projectTitle: any = null
   @observable projectDescription: any = null
   @observable projectWorkFlow: any = null
   @observable projectType: any = null
   workFlowTypes: any = null

   onCloseButtonClick = (event: { preventDefault: () => void }) => {
      event.preventDefault()
      const { togglePopUp } = this.props
      togglePopUp()
   }

   componentDidMount() {
      this.doNetworkCalls()
   }

   doNetworkCalls = () => {
      const { workFlowStore } = this.props
      const { getWorkFlowTypes } = workFlowStore
      getWorkFlowTypes()
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
         this.projectTitle = ''
         this.projectDescription = ''
         this.projectWorkFlow = ''
         this.projectType = ''
      }
   }

   getWorkFlowOptions = () => {
      const { workFlowTypes } = this.props.workFlowStore
      const workFlowOptions: any = []
      workFlowOptions.push(
         <Option key={'workFlowType'} value={'workFlowType'} selected />
      )
      for (const [workFlowType] of entries(workFlowTypes)) {
         workFlowOptions.push(
            <Option key={workFlowType} value={workFlowType} />
         )
      }
      return workFlowOptions
   }

   getProjectTypeOptions = () => {
      return (
         <>
            <Option value='Software Types' selected />
            <Option value='Classic Software' />
            <Option value='Royal Software' />
            <Option value='Good Software' />
         </>
      )
   }

   renderSuccessUi = observer(() => {
      return (
         <>
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
               <Label>title</Label>
               <InputTag
                  value={this.projectTitle !== null ? this.projectTitle : ''}
                  onChange={this.onChangeProjectTitle}
               />
               <ErrorMessage visible={this.projectTitle === ''}>
                  *this field is required
               </ErrorMessage>
               <Label>description</Label>
               <TextAreaField
                  onChange={this.onChangeProjectDescription}
               ></TextAreaField>
               <ErrorMessage visible={this.projectDescription === ''}>
                  *this field is required
               </ErrorMessage>
               <Div>
                  <Label>workFlowType</Label>
                  <WorkFLowTypes onChange={this.onChangeWorkflowType}>
                     {this.getWorkFlowOptions()}
                  </WorkFLowTypes>
               </Div>
               <ErrorMessage visible={this.projectWorkFlow === ''}>
                  *this field is required
               </ErrorMessage>
               <Div>
                  <Label>Project FlowType</Label>
                  <ProjectFLowTypes onChange={this.onChangeProjectType}>
                     {this.getProjectTypeOptions()}
                  </ProjectFLowTypes>
               </Div>
               <ErrorMessage visible={this.projectType === ''}>
                  *this field is required
               </ErrorMessage>

               <Button onClick={this.onCreateButtonClick} value='confirm' />
            </AddProjectForm>
         </>
      )
   })

   render() {
      const { apiStatus, apiError } = this.props.workFlowStore
      const props = {
         apiStatus,
         apiError,
         onRetryClick: this.doNetworkCalls,
         renderSuccessUI: this.renderSuccessUi
      }
      return (
         <AddProjectContainer>
            <LoadingWrapperWithFailure {...props} />
         </AddProjectContainer>
      )
   }
}

const Option = props => <OptionTag>{props.value}</OptionTag>

export default AddProject
