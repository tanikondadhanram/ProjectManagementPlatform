import React, { Component } from 'react'

import { InputField } from '../../../Common/components/InputField'
import { Button } from '../../../Common/components/Button'

import {
   SignInFormHeading,
   IbHubsLogo,
   FormTag,
   FormContainer,
   SignInFormContainer,
   NetworkErrorMessage
} from './styledComponents'

import stringConstants from '../../constants/stringConstants/stringConstants.json'

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
                     errorMessage={
                        apiError
                           ? apiError
                           : usernameEmptyMessage
                           ? usernameEmptyMessage
                           : null
                     }
                     labelText='username'
                     isValidInput={
                        apiError
                           ? !apiError.includes('username')
                           : usernameEmptyMessage
                           ? false
                           : true
                     }
                  />
                  <InputField
                     type='password'
                     onChange={onChangePassword}
                     value={password}
                     placeholder='password'
                     errorMessage={
                        apiError
                           ? apiError
                           : passwordEmptyMessage
                           ? passwordEmptyMessage
                           : null
                     }
                     labelText='password'
                     isValidInput={
                        apiError
                           ? !apiError.includes('password')
                           : passwordEmptyMessage
                           ? false
                           : true
                     }
                  />
                  <Button
                     className='mt-2'
                     type='submit'
                     value='Sign In'
                     onClick={onUserSubmit}
                     apiStatus={apiStatus}
                  />
               </FormTag>
               <NetworkErrorMessage>
                  {apiError ? apiError.includes('network') : null}
               </NetworkErrorMessage>
            </FormContainer>
         </SignInFormContainer>
      )
   }
}

export default SignInForm
