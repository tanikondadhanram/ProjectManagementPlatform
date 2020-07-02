import React, { Component } from 'react'
import { observable, action } from 'mobx'

import { MdErrorOutline } from 'react-icons/md'

import { colors } from '../../themes/colors'

import {
   InputFieldContainer,
   InputFieldTag,
   LabelForInputField,
   ErrorMessage,
   InputAndErrorMessageContainer,
   ErrorIcon
} from './styledComponents'

interface CommonInputProps {
   type: string
   isMandatoryField: boolean
   validateUserInput: (
      value: string
   ) => { shouldShowError: boolean; errorMessage: string }
   title?: string
   pattern?: string
   reference?: React.RefObject<HTMLInputElement> | null
   labelText?: string
   placeholder?: string
}

class CommonInput extends Component<CommonInputProps> {
   @observable userInput!: string
   @observable shouldShowError!: boolean
   @observable errorMessage!: string

   constructor(props) {
      super(props)
      this.init()
   }

   componentWillUnmount() {
      this.init()
   }

   @action
   init = () => {
      this.userInput = ''
      this.shouldShowError = false
      this.errorMessage = ''
   }

   handleOnchange = (event: { target: { value: string } }) => {
      this.userInput = event.target.value
   }

   @action
   handleOnblur = () => {
      const validationObject = this.props.validateUserInput(this.userInput)
      this.shouldShowError = validationObject.shouldShowError
      this.errorMessage = validationObject.errorMessage
   }

   render() {
      const {
         labelText,
         placeholder,
         type,
         isMandatoryField,
         reference,
         title,
         pattern
      } = this.props

      return (
         <InputFieldContainer>
            {labelText ? (
               <LabelForInputField>{labelText}</LabelForInputField>
            ) : null}
            <InputAndErrorMessageContainer>
               <InputFieldTag
                  type={type}
                  ref={reference}
                  placeholder={placeholder}
                  isValidInput={!this.shouldShowError}
                  minLength={3}
                  maxLength={15}
                  title={title}
                  pattern={pattern}
                  required={isMandatoryField}
               />
               {this.shouldShowError ? (
                  <ErrorIcon>
                     <MdErrorOutline
                        size='20px'
                        color={colors['neon-red']}
                        className='self-center'
                     />
                  </ErrorIcon>
               ) : null}
            </InputAndErrorMessageContainer>
            {this.shouldShowError ? (
               <ErrorMessage>{this.errorMessage}</ErrorMessage>
            ) : null}
         </InputFieldContainer>
      )
   }
}

export default CommonInput
