import React, { Component } from 'react'
import { toJS } from 'mobx'
import ReactModal from 'react-modal'
import Select from 'react-select'

import { API_FETCHING } from '@ib/api-constants'

import Loader from 'react-loader-spinner'

import stringConstants from '../../strings/stringConstants.json'

import {
   Label,
   InputField,
   ErrorMessage,
   TextArea,
   CloseProjectModal,
   ConfirmProjectButton
} from './styledComponents'

class CreateProjectModal extends Component<any, any> {
   getProjectTitleSection = () => {
      const { projectTitle, onChangeProjectTitle } = this.props

      return (
         <div>
            <Label>{stringConstants['createProjectTitle']}</Label>
            <InputField
               type='text'
               value={projectTitle ? projectTitle : ''}
               onChange={onChangeProjectTitle}
               isError={projectTitle === ''}
            />
            <ErrorMessage isError={projectTitle === ''}>
               {stringConstants['feild_required']}
            </ErrorMessage>
         </div>
      )
   }

   getProjectDescriptionSection = () => {
      const { projectDescription, onChangeProjectDescription } = this.props

      return (
         <div>
            <Label>{stringConstants['createProjectDescription']}</Label>
            <TextArea
               value={projectDescription ? projectDescription : ''}
               onChange={onChangeProjectDescription}
               isError={projectDescription === ''}
            ></TextArea>
            <ErrorMessage isError={projectDescription === ''}>
               {stringConstants['feild_required']}
            </ErrorMessage>
         </div>
      )
   }

   getWorkFlowTypes = () => {
      const { getWorkFlowTypes, workFlowTypes } = this.props
      if (!Boolean(workFlowTypes)) {
         getWorkFlowTypes()
      }
   }

   getWorkFlowOptions = () => {
      const { workFlowTypes } = this.props
      const options: any = [
         { value: 'No Options Found', label: 'No Options Found' }
      ]
      if (workFlowTypes) {
         options.pop()
         for (const [workFlowType] of Object.entries(toJS(workFlowTypes))) {
            options.push({
               value: workFlowType,
               label: workFlowType
            })
         }
      }
      return options
   }

   getProjectWorkFlowTypes = () => {
      const {
         projectWorkFlow,
         onChangeWorkflowType,
         workFlowApiStatus
      } = this.props

      const options: any = this.getWorkFlowOptions()

      const selectedOption = projectWorkFlow

      const isLoading = workFlowApiStatus === API_FETCHING ? true : false

      return (
         <div className='w-full'>
            <Label>{stringConstants['createProjectWorkFlowType']}</Label>

            <div
               className='flex w-full items-center justify-end'
               onClick={this.getWorkFlowTypes}
            >
               <Select
                  className='w-full border-none'
                  options={options}
                  // value={selectedOption}
                  // onChange={onChangeWorkflowType}
               />
               {isLoading ? (
                  <span className='absolute'>
                     <Loader
                        type='Oval'
                        color='#00BFFF'
                        height={25}
                        width={25}
                     />
                  </span>
               ) : null}
            </div>
            <ErrorMessage isError={projectWorkFlow === ''}>
               {stringConstants['feild_required']}
            </ErrorMessage>
         </div>
      )
   }

   getProjectTypes = () => {
      const { projectType, onChangeProjectType } = this.props

      const selectedOption = projectType

      return (
         <div>
            <Label>{stringConstants['createProjectProjectType']}</Label>
            <Select
               options={[
                  { value: 'financial', label: 'financial' },
                  { value: 'classic software', label: 'classic software' },
                  { value: 'crm', label: 'crm' }
               ]}
               onChange={onChangeProjectType}
               value={selectedOption}
               className={
                  projectType === '' ? 'border rounded border-red-400' : ''
               }
               placeholder='Select an option'
            />
            <ErrorMessage isError={projectType === ''}>
               {stringConstants['feild_required']}
            </ErrorMessage>
         </div>
      )
   }

   onCreateProjectButtonClick = () => {
      const {
         projectTitle,
         projectDescription,
         projectWorkFlow,
         projectType,
         toggleModal,
         onCreateButtonClick
      } = this.props

      onCreateButtonClick()

      if (
         projectTitle &&
         projectDescription &&
         projectWorkFlow &&
         projectType
      ) {
         toggleModal()
      }
   }

   render() {
      const { toggleModal } = this.props
      const { isOpen } = this.props

      return (
         <ReactModal
            isOpen={isOpen}
            style={{
               overlay: {},
               content: {
                  margin: 'auto',
                  width: '40%',
                  padding: '3%',
                  display: 'flex',
                  flexDirection: 'column'
               }
            }}
            ariaHideApp={false}
         >
            <CloseProjectModal onClick={toggleModal}>&times;</CloseProjectModal>
            {this.getProjectTitleSection()}
            {this.getProjectDescriptionSection()}
            {this.getProjectWorkFlowTypes()}
            {this.getProjectTypes()}
            <ConfirmProjectButton onClick={this.onCreateProjectButtonClick}>
               {stringConstants['create']}
            </ConfirmProjectButton>
         </ReactModal>
      )
   }
}

export default CreateProjectModal
