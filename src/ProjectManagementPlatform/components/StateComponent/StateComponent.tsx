import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Select from 'react-select'
import { API_FETCHING } from '@ib/api-constants'

@inject('statesStore')
@observer
class StateComponent extends Component<any, any> {
   doNetworkCalls = () => {
      const { statesStore } = this.props
      const { getStates, states } = statesStore
      if (!Boolean(states)) {
         getStates()
      }
   }

   getOptions = () => {
      const options: any = []
      const { statesStore } = this.props
      const { states } = statesStore
   }
   render() {
      const { statesStore } = this.props
      const { states, apiStatus } = statesStore
      const options = states ? this.getOptions() : []
      return (
         <span onClick={this.doNetworkCalls}>
            <Select
               isLoading={apiStatus === API_FETCHING ? true : false}
               options={options}
            />
         </span>
      )
   }
}

export default StateComponent
