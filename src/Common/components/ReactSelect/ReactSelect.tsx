import React, { Component } from 'react'
import Select from 'react-select'

class ReactSelect extends Component<any> {
   render() {
      return <Select data-testid='select' {...this.props} />
   }
}

export default ReactSelect
