import React, { Component } from 'react'
import { jsx, css } from '@emotion/core'
import { ToastContainer } from 'react-toastify'
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

class SignInForm extends Component<any, any> {
   render() {
      const {
         username,
         password,
         usernameRef,
         passwordRef,
         onChangeUsername,
         onChangePassword,
         onUserSubmit,
         apiStatus,
         usernameErrorMessage,
         passwordErrorMessage,
         isValidUsername,
         isValidPassword
      } = this.props

      return (
         <SignInFormContainer>
            <FormContainer onSubmit={onUserSubmit}>
               <IbHubsLogo
                  src='https://cdn.zeplin.io/5d0afc9102b7fa56760995cc/assets/9837b0f6-9165-49b3-995e-c6ac4ed19c55.svg'
                  alt='IbHubs-Logo'
               />
               <SignInFormHeading css={{ border: '1px solid cornflowerblue' }}>
                  {stringConstants['Hi there , please sign up']}
               </SignInFormHeading>

               <FormTag>
                  <InputField
                     type='text'
                     reference={usernameRef}
                     onChange={onChangeUsername}
                     value={username}
                     placeholder='username'
                     errorMessage={usernameErrorMessage}
                     labelText='username'
                     isValidInput={isValidUsername}
                  />
                  <InputField
                     type='password'
                     reference={passwordRef}
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
