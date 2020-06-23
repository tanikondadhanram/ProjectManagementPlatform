import React, { Component } from 'react'
import { MdErrorOutline } from 'react-icons/md'
import {
   InputFieldContainer,
   InputFeildTag,
   LabelForInputFeild,
   ErrorMessage,
   InputAndErrorMessageContainer,
   ErrorIcon
} from './styledComponents'
import { colors } from '../../themes/colors'

type InputFieldProps = {
   type: string
   isValidInput: boolean
   errorMessage: string | null
   value: string | null
   labelText?: string
   placeholder?: string
   reference?: React.RefObject<HTMLInputElement> | null
   onChange: (event: { target: { value: string } }) => void
}

class InputField extends Component<InputFieldProps> {
   isError: boolean = false
   render() {
      let {
         isValidInput,
         labelText,
         errorMessage,
         value,
         reference
      } = this.props

      this.isError = isValidInput || isValidInput === undefined ? true : false
      return (
         <InputFieldContainer>
            {labelText ? (
               <LabelForInputFeild>{labelText}</LabelForInputFeild>
            ) : null}
            <InputAndErrorMessageContainer>
               <InputFeildTag
                  {...this.props}
                  ref={reference}
                  value={value ? value : ''}
                  isValidInput={this.isError}
               />
               {!this.isError ? (
                  <ErrorIcon>
                     <MdErrorOutline
                        size='20px'
                        color={colors['neon-red']}
                        className='self-center'
                     />
                  </ErrorIcon>
               ) : null}
            </InputAndErrorMessageContainer>
            {!this.isError ? <ErrorMessage>{errorMessage}</ErrorMessage> : null}
         </InputFieldContainer>
      )
   }
}

export default InputField
