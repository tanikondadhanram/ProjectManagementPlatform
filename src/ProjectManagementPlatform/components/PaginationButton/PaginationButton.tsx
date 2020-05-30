import React, { Component } from 'react'
import { Button } from './styledComponents'

class PaginationButton extends Component<any, any> {
   render() {
      return <Button {...this.props}>{this.props.value}</Button>
   }
}

export default PaginationButton
