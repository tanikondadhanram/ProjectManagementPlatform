import React, { Component } from 'react'
import { observer } from 'mobx-react'
import Loader from 'react-loader-spinner'

import { APIStatus, API_FETCHING } from '@ib/api-constants'

import { CommonButton } from './styledComponents'

interface ButtonWithLoaderProps {
   apiStatus: APIStatus
   value: string
   className?: string
   onClick?: (event: { preventDefault: () => void }) => void
}

@observer
class ButtonWithLoader extends Component<ButtonWithLoaderProps> {
   render() {
      const { apiStatus, className } = this.props
      return (
         <CommonButton type='submit' className={className}>
            {apiStatus === API_FETCHING ? (
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

export default ButtonWithLoader
