import React, { Component } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { InputField } from '../../../Common/components/InputField'
import { Button } from '../../../Common/components/Button'

import {
   SignInFormHeading,
   IbHubsLogo,
   FormTag,
   FormContainer,
   SignInFormContainer
} from './styledComponents'

import stringConstants from '../../constants/stringConstants/stringConstants.json'
import { getUserDisplayableErrorMessage } from '../../../Common/utils/APIUtils'

class SignInForm extends Component<any, any> {
   render() {
      const {
         username,
         password,
         onChangeUsername,
         onChangePassword,
         onUserSubmit,
         apiStatus,
         apiError,
         usernameEmptyMessage,
         passwordEmptyMessage
      } = this.props

      let isValidUser = true
      let isValidPass = true

      if (Boolean(apiError)) {
         const error = JSON.parse(apiError)
         if (error.status === 404) {
            isValidUser = false
         }
         if (error.status === 401) {
            isValidPass = false
         }
      }

      const isValidUsername = usernameEmptyMessage
         ? false
         : isValidUser
         ? true
         : false

      const usernameErrorMessage = usernameEmptyMessage
         ? usernameEmptyMessage
         : apiError
         ? getUserDisplayableErrorMessage(apiError)
         : ''

      const isValidPassword = passwordEmptyMessage
         ? false
         : isValidPass
         ? true
         : false

      const passwordErrorMessage = passwordEmptyMessage
         ? passwordEmptyMessage
         : apiError
         ? getUserDisplayableErrorMessage(apiError)
         : ''

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
               <FormTag>
                  <InputField
                     type='text'
                     onChange={onChangeUsername}
                     value={username}
                     placeholder='username'
                     errorMessage={usernameErrorMessage}
                     labelText='username'
                     isValidInput={isValidUsername}
                  />
                  <InputField
                     type='password'
                     onChange={onChangePassword}
                     value={password}
                     placeholder='password'
                     errorMessage={passwordErrorMessage}
                     labelText='password'
                     isValidInput={isValidPassword}
                  />
                  <Button
                     className='mt-2'
                     type='submit'
                     value='Sign In'
                     onClick={onUserSubmit}
                     apiStatus={apiStatus}
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
