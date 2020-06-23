import React, { Component } from 'react'
import Select from 'react-select'

import {
   Container,
   FeildContainer,
   Label,
   CloseProjectModal,
   FormHeading,
   FormTag
} from './styledComponents'
import { Button } from '../../../Common/components/Button'
import { inject, observer } from 'mobx-react'
import LoadingWrapperWithFailure from '../../../Common/components/LoadingWrapperWithFailure'

@inject('checkListStore')
@observer
class StateTransitionForm extends Component<any, any> {
   componentDidMount() {
      this.doNetworkCalls()
   }

   doNetworkCalls = () => {
      const { checkListStore, taskDetails, projectId, toStateId } = this.props
      const { getCheckList } = checkListStore
      const { taskId } = taskDetails
      getCheckList({ projectId, taskId, toStateId })
   }

   getCheckListOptions = () => {
      const { checkListStore } = this.props
      const { checkList } = checkListStore

      return checkList.map(eachCheck => (
         <div className='flex flex-wrap my-3' key={eachCheck.id}>
            <input
               className='h-12 w-12 border rounded-full mx-3'
               type='checkbox'
               checked={eachCheck.isChecked}
               onChange={() => null}
               onClick={eachCheck.toggleIsChecked}
               required
            />
            <p>{eachCheck.name}</p>
         </div>
      ))
   }

   updateState = async event => {
      event.preventDefault()
      const {
         // toggleModal,
         toStateId,
         checkListStore,
         taskDetails,
         projectId
      } = this.props
      const { checkList, postCheckList } = checkListStore
      const requestObject = {
         projectId,
         taskId: taskDetails.taskId,
         toStateId,
         checklist: checkList.map(eachCheck => {
            return {
               checklist_id: eachCheck.id,
               is_checked: eachCheck.isChecked
            }
         })
      }
      await postCheckList(requestObject, this.onPostSuccess, this.onPostFailure)
      window.location.reload()
   }

   onPostSuccess = () => {
      // const { toggleModal, tasksStore, projectId } = this.props
      // const { getListOfTasks } = tasksStore
      // getListOfTasks(projectId)
      // alert('called')
      // toggleModal()
   }

   onPostFailure = () => {
      const { toggleModal } = this.props
      toggleModal()
   }

   renderSuccessUI = observer(() => {
      const { toggleModal, taskDetails, checkListStore, label } = this.props
      const { checkList, postApiStatus } = checkListStore
      const { state } = taskDetails

      return (
         <FormTag onSubmit={this.updateState}>
            <CloseProjectModal onClick={toggleModal}>&times;</CloseProjectModal>
            <FormHeading>Update State</FormHeading>
            <FeildContainer>
               <Label>From</Label>
               <Select
                  className='w-full'
                  isDisabled={true}
                  placeholder={state}
               />
            </FeildContainer>
            <FeildContainer>
               <Label>To</Label>
               <Select
                  className='w-full'
                  isDisabled={true}
                  placeholder={label}
               />
            </FeildContainer>
            {checkList ? this.getCheckListOptions() : null}
            <Button
               type='submit'
               className='mt-24'
               apiStatus={postApiStatus}
               value='update'
            />
         </FormTag>
      )
   })

   render() {
      const { checkListStore } = this.props

      const { apiStatus, apiError } = checkListStore
      // const { state } = taskDetails

      const loadingWrapperProps = {
         apiStatus,
         apiError,
         onRetryClick: this.doNetworkCalls,
         renderSuccessUI: this.renderSuccessUI
      }

      return (
         <Container>
            <LoadingWrapperWithFailure {...loadingWrapperProps} />
         </Container>
      )
   }
}

export default StateTransitionForm
