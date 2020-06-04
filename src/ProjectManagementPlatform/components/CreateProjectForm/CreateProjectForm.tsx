import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Select from 'react-select'
import { toast } from 'react-toastify'

import {
   CreateProjectContainer,
   Label,
   InputField,
   ErrorMessage,
   TextArea,
   CloseProjectModal
} from './styledComponents'

import stringConstants from '../../strings/stringConstants.json'
import { toJS, entries } from 'mobx'
import { API_FETCHING } from '@ib/api-constants'
import { Button } from '../../../Common/components/Button'
import { isNumber } from 'util'

@inject('workFlowStore', 'projectPostStore')
@observer
class CreateProjectForm extends Component<any, any> {
   onCreateProjectButtonClick = () => {
      const { onCreateButtonClick } = this.props.projectPostStore
      onCreateButtonClick(this.onPostSuccess, this.onPostFailure)
   }

   onPostSuccess = () => {
      const { toggleModal } = this.props
      toggleModal()
      toast.success('successfully created')
   }

   onPostFailure = () => {
      const { toggleModal } = this.props
      toggleModal()
      toast.error('sorry something went wrong')
   }

   render() {
      const { toggleModal, projectPostStore, workFlowStore } = this.props

      const {
         getWorkFlowTypes,
         apiStatus: workFlowApiStatus,
         workFlowTypes
      } = workFlowStore

      const {
         projectTitle,
         onChangeProjectTitle,
         projectDescription,
         onChangeProjectDescription,
         projectWorkFlow,
         onChangeWorkflowType,
         projectType,
         onChangeProjectType,
         apiStatus: projectPostApiStatus
      } = projectPostStore

      const titleSectionProps = {
         projectTitle,
         onChangeProjectTitle
      }

      const descriptionSectionProps = {
         projectDescription,
         onChangeProjectDescription
      }

      const workFlowSectionProps = {
         getWorkFlowTypes,
         projectWorkFlow,
         onChangeWorkflowType,
         workFlowApiStatus,
         workFlowTypes
      }

      const projectTypeSectionProps = {
         projectType,
         onChangeProjectType
      }

      return (
         <CreateProjectContainer>
            <CloseProjectModal onClick={toggleModal}>&times;</CloseProjectModal>
            <GetProjectTitleSection {...titleSectionProps} />
            <GetProjectDescriptionSection {...descriptionSectionProps} />
            <GetProjectWorkFlowTypes {...workFlowSectionProps} />
            <GetProjectTypes {...projectTypeSectionProps} />
            <Button
               className='w-1/2'
               apiStatus={projectPostApiStatus}
               onClick={this.onCreateProjectButtonClick}
               value={stringConstants['create']}
            />
         </CreateProjectContainer>
      )
   }
}

const GetProjectTitleSection = props => {
   const { projectTitle, onChangeProjectTitle } = props

   return (
      <>
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
      </>
   )
}

const GetProjectDescriptionSection = props => {
   const { projectDescription, onChangeProjectDescription } = props

   return (
      <>
         <Label>{stringConstants['createProjectDescription']}</Label>
         <TextArea
            value={projectDescription ? projectDescription : ''}
            onChange={onChangeProjectDescription}
            isError={projectDescription === ''}
         ></TextArea>
         <ErrorMessage isError={projectDescription === ''}>
            {stringConstants['feild_required']}
         </ErrorMessage>
      </>
   )
}

const getWorkFlowOptions = workFlowTypes => {
   // console.log(workFlowTypes)

   const options: any = []
   if (workFlowTypes) {
      for (const [totalWorkFlows, workFlowType] of Object.entries(
         toJS(workFlowTypes)
      )) {
         // options.push({
         //    value: workFlowType,
         //    label: workFlowType
         // })
      }
   }
   return options
}

const getWorkFlows = props => {
   const { getWorkFlowTypes, workFlowTypes } = props

   if (!Boolean(workFlowTypes)) {
      getWorkFlowTypes()
   }
}

const GetProjectWorkFlowTypes = props => {
   const {
      projectWorkFlow,
      onChangeWorkflowType,
      workFlowApiStatus,
      workFlowTypes,
      getWorkFlowTypes
   } = props

   const options: any = getWorkFlowOptions(workFlowTypes)

   const isLoading = workFlowApiStatus === API_FETCHING ? true : false
   return (
      <div className='w-full'>
         <Label>{stringConstants['createProjectWorkFlowType']}</Label>

         <div
            className='flex w-full items-center justify-center'
            onFocus={() => getWorkFlows({ workFlowTypes, getWorkFlowTypes })}
         >
            <Select
               className={
                  projectWorkFlow === ''
                     ? 'border border-red-500 w-full rounded'
                     : 'w-full'
               }
               options={options}
               onChange={onChangeWorkflowType}
               isLoading={isLoading}
            />
         </div>
         <ErrorMessage isError={projectWorkFlow === ''}>
            {stringConstants['feild_required']}
         </ErrorMessage>
      </div>
   )
}

const GetProjectTypes = props => {
   const { projectType, onChangeProjectType } = props

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

export default CreateProjectForm
