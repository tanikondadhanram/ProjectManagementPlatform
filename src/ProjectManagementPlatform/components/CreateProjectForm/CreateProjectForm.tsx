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
   CloseProjectModal,
   FormHeading
} from './styledComponents'

import stringConstants from '../../strings/stringConstants.json'

import { API_FETCHING } from '@ib/api-constants'
import { ButtonWithLoader } from '../../../Common/components/ButtonWithLoader'

@inject('workFlowStore', 'projectPostStore', 'projectManagementPlatformStore')
@observer
class CreateProjectForm extends Component<any, any> {
   // @observable projectTitle!: string | null
   // @observable projectDescription!: string | null
   // @observable projectWorkFlow!: string | null
   // @observable workFlowId!: number | null
   // @observable projectType!: string | null
   // @observable assignedTo!: any

   // constructor(props) {
   //    super(props)
   //    this.projectTitle = null
   //    this.projectDescription = null
   //    this.projectWorkFlow = null
   //    this.projectType = null
   //    this.workFlowId = null
   //    this.assignedTo = null
   // }
   onCreateProjectButtonClick = () => {
      const { onCreateButtonClick } = this.props.projectPostStore
      onCreateButtonClick(this.onPostSuccess, this.onPostFailure)
   }

   // @action.bound
   // onChangeProjectTitle(event) {
   //    this.projectTitle = event.target.value
   // }

   // @action.bound
   // onChangeProjectDescription(event) {
   //    this.projectDescription = event.target.value
   // }

   // @action.bound
   // onChangeProjectType(props) {
   //    this.projectType = props.value
   // }

   // @action.bound
   // onChangeWorkflowType(props) {
   //    this.projectWorkFlow = props.label
   //    this.workFlowId = props.value
   // }

   // @action.bound
   // onChangeAssignedTo(event) {
   //    this.assignedTo = event.target.value
   //    alert(this.assignedTo)
   // }

   // @action.bound
   // onCreateButtonClick(onPostSuccess, onPostFailure) {
   //    if (
   //       this.projectTitle &&
   //       this.projectDescription &&
   //       this.projectWorkFlow &&
   //       this.projectType
   //    ) {
   //       this.ProjectPostCall(onPostSuccess, onPostFailure)
   //    } else {
   //       this.projectTitle = this.projectTitle ? this.projectTitle : ''
   //       this.projectDescription = this.projectDescription
   //          ? this.projectDescription
   //          : ''
   //       this.projectWorkFlow = this.projectWorkFlow ? this.projectWorkFlow : ''
   //       this.projectType = this.projectType ? this.projectType : ''
   //       this.assignedTo = this.assignedTo ? this.assignedTo : ''
   //    }
   // }

   onPostSuccess = () => {
      const {
         toggleModal,
         projectManagementPlatformStore,
         projectPostStore
      } = this.props
      const { getProjects } = projectManagementPlatformStore
      const { apiResponse } = projectPostStore
      getProjects()
      toggleModal()
      toast.success(apiResponse.success_message)
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
         // onChangeAssignedTo,
         // assignedTo,
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

      // const developerProps = {
      //    onChangeAssignedTo,
      //    assignedTo
      // }

      return (
         <CreateProjectContainer>
            <CloseProjectModal onClick={toggleModal}>&times;</CloseProjectModal>
            <FormHeading>{stringConstants['createProject']}</FormHeading>
            <GetProjectTitleSection {...titleSectionProps} />
            <GetProjectDescriptionSection {...descriptionSectionProps} />
            <GetProjectWorkFlowTypes {...workFlowSectionProps} />
            <GetProjectTypes {...projectTypeSectionProps} />
            {/* <GetDevelopers {...developerProps} /> */}
            <ButtonWithLoader
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
   const options: any = []
   if (workFlowTypes) {
      workFlowTypes.workflows.map(type =>
         options.push({
            value: type.workflow_id,
            label: type.name
         })
      )
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
               { value: 'Financial', label: 'financial' },
               { value: 'Classic Software', label: 'classic software' },
               { value: 'CRM', label: 'crm' }
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

// const GetDevelopers = props => {
//    const { onChangeAssignedTo, assignedTo } = props

//    return (
//       <div>
//          <Label>developer</Label>
//          <InputField
//             type='text'
//             value={assignedTo ? assignedTo : ''}
//             onChange={onChangeAssignedTo}
//             isError={assignedTo === ''}
//             className='mb-10'
//          />
//          {assignedTo === '' ? (
//             <ErrorMessage>{stringConstants['fieldRequired']}</ErrorMessage>
//          ) : null}
//       </div>
//    )
// }

export default CreateProjectForm
