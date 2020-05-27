import React, { Component } from 'react'
import Loader from 'react-loader-spinner'

import { CommonButton } from './styledComponents'

class Button extends Component<any, any> {
   render() {
      const { apiStatus } = this.props
      return (
         <CommonButton {...this.props}>
            {apiStatus === 200 ? (
               <span data-testid='loader'>
                  <Loader type='Oval' color='#ffffff' height={25} width={25} />
               </span>
            ) : (
               this.props.value
            )}
         </CommonButton>
      )
   }
}

export default Button
