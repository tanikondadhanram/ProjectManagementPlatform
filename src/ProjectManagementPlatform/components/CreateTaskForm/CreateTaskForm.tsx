import React, { Component } from 'react'
import { observable, action } from 'mobx'
import { observer, inject } from 'mobx-react'
import { RouteComponentProps } from 'react-router-dom'
import Select from 'react-select'

import { Button } from '../../../Common/components/Button'

import stringConstants from '../../strings/stringConstants.json'

import {
   CreateTaskContainer,
   CloseProjectModal,
   Label,
   ErrorMessage,
   InputField,
   FieldContainer,
   FormHeading
} from './styledComponents'
import { toast } from 'react-toastify'
import { withRouter } from 'react-router-dom'

@inject('createTaskStore', 'tasksStore')
@observer
class CreateTaskForm extends Component<any & RouteComponentProps> {
   @observable issueType: string | null = null
   @observable title: string | null = null
   @observable description: string | null = null

   @action.bound
   onChangeIssueType(props) {
      this.issueType = props.value
   }

   @action.bound
   onChangeTitle(event) {
      this.title = event.target.value
   }

   @action.bound
   onChangeDescription(event) {
      this.description = event.target.value
   }

   onTaskCreatedSuccessfully = () => {
      const { toggleModal, tasksStore } = this.props
      toggleModal()
      const { getListOfTasks } = tasksStore
      getListOfTasks(this.props.match.params.id)
      toast.success('task Created Successfully')
   }
   onTaskCreatedFailure = () => {
      const { toggleModal } = this.props
      toggleModal()
      toast.error('oops! something went wrong')
   }

   onCreateTaskClick = () => {
      const { createTaskStore } = this.props
      const { postCreatedTask } = createTaskStore
      if (this.issueType && this.title && this.description) {
         const requsetObject = {
            issueType: this.issueType,
            title: this.title,
            description: this.description,
            stateId: 1,
            projectId: this.props.match.params.id
         }
         postCreatedTask(
            requsetObject,
            this.onTaskCreatedSuccessfully,
            this.onTaskCreatedFailure
         )
      } else {
         this.issueType = this.issueType ? this.issueType : ''
         this.title = this.title ? this.title : ''
         this.description = this.description ? this.description : ''
      }
   }

   render() {
      const { toggleModal, createTaskStore } = this.props

      const { apiStatus } = createTaskStore

      const options = [
         { value: 'Task', lable: 'Task' },
         { value: 'Bug', label: 'Bug' },
         { value: 'Developer Story', label: 'Developer story' },
         { value: 'User Story', label: 'User story' },
         { value: 'Enhancement', label: 'Enhancement' }
      ]

      return (
         <CreateTaskContainer>
            <CloseProjectModal onClick={toggleModal}>&times;</CloseProjectModal>
            <FormHeading>
               {stringConstants['createTask'].toUpperCase()}
            </FormHeading>
            <FieldContainer>
               <Label>{stringConstants['title']}</Label>
               <InputField
                  type='text'
                  value={this.title ? this.title : ''}
                  onChange={this.onChangeTitle}
                  isError={this.title === '' ? true : false}
               />
               {this.title === '' ? (
                  <ErrorMessage>
                     {stringConstants['fieldRequired']}
                  </ErrorMessage>
               ) : null}
            </FieldContainer>

            <FieldContainer>
               <Label>{stringConstants['description']}</Label>
               <InputField
                  type='text'
                  value={this.description ? this.description : ''}
                  onChange={this.onChangeDescription}
                  isError={this.description === '' ? true : false}
               />
               {this.description === '' ? (
                  <ErrorMessage>
                     {stringConstants['fieldRequired']}
                  </ErrorMessage>
               ) : null}
            </FieldContainer>

            <FieldContainer>
               <Label>{stringConstants['issueType']}</Label>
               <Select
                  className=''
                  options={options}
                  onChange={this.onChangeIssueType}
               />
               {this.issueType === '' ? (
                  <ErrorMessage>
                     {stringConstants['fieldRequired']}
                  </ErrorMessage>
               ) : null}
            </FieldContainer>

            <Button
               apiStatus={apiStatus}
               style={{ width: '30%', alignSelf: 'center' }}
               onClick={this.onCreateTaskClick}
               value={stringConstants['createTask']}
            />
         </CreateTaskContainer>
      )
   }
}

export default withRouter(CreateTaskForm)
