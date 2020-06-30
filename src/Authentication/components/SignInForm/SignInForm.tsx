import React, { Component } from 'react'
import { action } from 'mobx'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { APIStatus } from '@ib/api-constants'

import { CommonInput } from '../../../Common/components/CommonInput'
import { ButtonWithLoader } from '../../../Common/components/ButtonWithLoader'

import stringConstants from '../../constants/stringConstants/stringConstants.json'
import { SignInAPIRequestObject } from '../../stores/types'
import { validateUsername } from '../../utils/validationUtils'

import {
   SignInFormHeading,
   IbHubsLogo,
   FormTag,
   FormContainer,
   SignInFormContainer
} from './styledComponents'

interface SignInFormProps {
   setUser: (usrDetails: SignInAPIRequestObject) => void
   signInApiStatus: APIStatus
}

class SignInForm extends Component<SignInFormProps> {
   usernameRef: React.RefObject<HTMLInputElement> = React.createRef()
   passwordRef: React.RefObject<HTMLInputElement> = React.createRef()

   componentDidMount() {
      this.usernameRef.current?.focus()
   }

   @action.bound
   onUserSubmit(event: { preventDefault: () => void }) {
      event.preventDefault()
      const { setUser } = this.props
      const userDetails = {
         username: String(this.usernameRef.current?.value),
         password: String(this.passwordRef.current?.value)
      }
      setUser(userDetails)
   }

   render() {
      const { signInApiStatus } = this.props

      return (
         <SignInFormContainer>
            <FormContainer>
               <IbHubsLogo
                  src='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/9837b0f6-9165-49b3-995e-c6ac4ed19c55.svg'
                  alt='IbHubs-Logo'
               />
               <SignInFormHeading>
                  {stringConstants['Hi there , please sign up']}
               </SignInFormHeading>
               <FormTag onSubmit={this.onUserSubmit}>
                  <CommonInput
                     type='text'
                     reference={this.usernameRef}
                     placeholder='username'
                     labelText='username'
                     isMandatoryField={true}
                     validateUserInput={validateUsername}
                     // pattern=''
                     // title=''
                  />
                  <CommonInput
                     type='password'
                     reference={this.passwordRef}
                     placeholder='password'
                     labelText='password'
                     isMandatoryField={true}
                     validateUserInput={validateUsername}
                     pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
                     title='Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters'
                  />
                  <ButtonWithLoader
                     className='mt-2'
                     value='Sign In'
                     apiStatus={signInApiStatus}
                  />
               </FormTag>
               <ToastContainer
                  position='bottom-center'
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
               />
            </FormContainer>
         </SignInFormContainer>
      )
   }
}

export default SignInForm
