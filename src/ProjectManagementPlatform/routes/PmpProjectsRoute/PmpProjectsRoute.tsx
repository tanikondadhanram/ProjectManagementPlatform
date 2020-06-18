import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import { HomePage } from '../../components/HomePage'

@inject('projectManagementPlatformStore')
@observer
class PmpProjectsRoute extends Component<any, any> {
   render() {
      const homePageProps = {
         projectManagementPlatformStore: this.props
            .projectManagementPlatformStore
      }
      return <HomePage {...homePageProps} />
   }
}

export default PmpProjectsRoute
