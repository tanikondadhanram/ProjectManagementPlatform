import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { observable, action } from 'mobx'
import { API_FETCHING } from '@ib/api-constants'
import { observer } from 'mobx-react'
import Select from 'react-select'
import ReactModal from 'react-modal'
import { StateTransitionForm } from '../StateTransitionForm'

@observer
class StateComponent extends Component<any, any> {
   @observable isOpen: boolean = false
   @observable selectedOption: any
   selectedStateId: any = null
   label

   componentDidMount() {
      const { taskDetails } = this.props
      const { state } = taskDetails
      this.selectedOption = { value: state, label: state }
   }

   @action.bound
   toggleModal() {
      this.isOpen = !this.isOpen
   }

   doNetworkCalls = () => {
      const { taskDetails } = this.props
      const { taskId, getStates, states } = taskDetails

      if (!Boolean(states)) {
         const requestObject = {
            projectId: this.props.match.params.id,
            taskId: taskId
         }
         getStates(requestObject)
      }
   }

   @action.bound
   getOptions() {
      const options: any = []
      const { taskDetails } = this.props
      const { states } = taskDetails
      states.map(eachState =>
         options.push({
            value: eachState.state_id,
            label: eachState.name
         })
      )
      return options
   }

   onStateUpdate = props => {
      this.selectedStateId = props.value
      this.toggleModal()
      this.label = props.label
   }

   @action.bound
   updateSelectedOption(value) {
      this.selectedOption = { value, label: value }
   }

   render() {
      const { taskDetails } = this.props
      const { apiStatus, states } = taskDetails

      const formProps = {
         toggleModal: this.toggleModal,
         // updateSelectedOption: this.updateSelectedOption,
         toStateId: this.selectedStateId,
         taskDetails,
         projectId: this.props.match.params.id,
         options: states ? this.getOptions() : [],
         selectedOption: this.selectedOption,
         label: this.label
      }

      const options = states ? this.getOptions() : []

      return (
         <>
            <Select
               isLoading={apiStatus === API_FETCHING ? true : false}
               value={this.selectedOption}
               options={options}
               onFocus={this.doNetworkCalls}
               onChange={this.onStateUpdate}
            />
            <ReactModal
               isOpen={this.isOpen}
               style={{
                  content: {
                     top: '50%',
                     left: '50%',
                     right: 'auto',
                     bottom: 'auto',
                     marginRight: '-50%',
                     transform: 'translate(-50%, -50%)',
                     width: '40%',
                     height: '90%'
                  }
               }}
               ariaHideApp={false}
            >
               <StateTransitionForm {...formProps} />
            </ReactModal>
         </>
      )
   }
}

export default withRouter(StateComponent)
